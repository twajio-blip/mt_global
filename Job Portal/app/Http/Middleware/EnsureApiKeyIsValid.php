<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureApiKeyIsValid
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $expectedKey = env('JOB_PORTAL_API_KEY', 'jp_live_sec_99a8b7c6d5e4f3a2b1c0');

        $providedKey = $request->header('X-API-KEY')
            ?? $request->bearerToken()
            ?? $request->query('api_key');

        if (!$providedKey || !hash_equals($expectedKey, (string) $providedKey)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated. A valid API Key is required via header "X-API-KEY" or "Authorization: Bearer <key>".',
            ], 401);
        }

        return $next($request);
    }
}

