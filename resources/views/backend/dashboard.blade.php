<x-Deshboard-layout>
    @php
        $statusClass = function ($job) {
            $status = $job->status ?? ($job->is_active ? 'active' : 'inactive');
            return match ($status) {
                'active' => 'bg-[#DCFCE7] text-[#166534]',
                'draft' => 'bg-[#FEF3C7] text-[#92400E]',
                default => 'bg-[#FEE2E2] text-[#991B1B]',
            };
        };
        $statusLabel = fn ($job) => match ($job->status ?? ($job->is_active ? 'active' : 'inactive')) {
            'active' => 'Published',
            'draft' => 'Draft',
            default => 'Inactive',
        };
        $initials = function ($name) {
            return collect(explode(' ', trim((string) $name)))
                ->filter()
                ->take(2)
                ->map(fn ($part) => strtoupper(substr($part, 0, 1)))
                ->implode('') ?: '-';
        };
    @endphp

    <div class="space-y-8 py-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
                <h1 class="text-2xl font-bold text-skin-backend-text-base">Welcome back</h1>
                <p class="mt-1 text-sm text-skin-backend-text-base text-opacity-55">Here's how your published jobs are performing.</p>
            </div>
            <a href="{{ route('jobs.jobs.index') }}" class="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-skin-backend-accent px-4 text-sm font-semibold text-skin-invert transition-opacity hover:opacity-90">
                <i class="fa-solid fa-plus text-xs"></i>
                Add New Job
            </a>
        </div>

        <ul class="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            @foreach ($data['job_stats'] as $stat)
                <li>
                    <a href="{{ $stat['route'] }}" class="block h-full rounded-xl border border-default border-opacity-10 bg-skin-backend-secondary p-5 transition-[border-color,box-shadow] duration-150 hover:border-skin-backend-accent-text hover:shadow-lg">
                        <p class="text-sm font-medium text-skin-backend-text-base text-opacity-65">{{ $stat['label'] }}</p>
                        <p class="mt-2 text-3xl font-bold tabular-nums text-skin-backend-text-base">{{ formatNumberShort($stat['value']) }}</p>
                        <p class="mt-1 text-[13px] text-skin-backend-text-base text-opacity-45">{{ $stat['note'] }}</p>
                    </a>
                </li>
            @endforeach
        </ul>

        <div class="grid gap-6 xl:grid-cols-5">
            <section aria-labelledby="recent-cvs" class="rounded-2xl border border-default border-opacity-10 bg-skin-backend-secondary xl:col-span-3">
                <div class="flex items-center justify-between border-b border-default border-opacity-10 px-5 py-4">
                    <h2 id="recent-cvs" class="text-base font-semibold text-skin-backend-text-base">Recent CV Submissions</h2>
                    <a href="{{ route('cvs.index') }}" class="flex items-center gap-1 text-sm font-semibold text-skin-backend-accent-text hover:opacity-80">
                        View all <i class="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                </div>
                <ul class="divide-y divide-default divide-opacity-10">
                    @forelse ($data['recent_cvs'] as $application)
                        @php
                            $job = $application->job;
                            $country = $job?->country;
                        @endphp
                        <li class="flex items-center gap-3 px-5 py-3.5">
                            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-skin-backend-primary text-[13px] font-semibold text-skin-backend-accent-text">
                                {{ $initials($application->full_name) }}
                            </span>
                            <div class="min-w-0 flex-1">
                                <p class="truncate text-[15px] font-medium text-skin-backend-text-base">{{ $application->full_name }}</p>
                                <p class="flex items-center gap-1.5 truncate text-[13px] text-skin-backend-text-base text-opacity-50">
                                    @if ($country?->flag_code)
                                        <img src="https://flagcdn.com/w40/{{ $country->flag_code }}.png" alt="" class="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                                    @endif
                                    <span class="truncate">{{ $job?->title ?? 'Deleted job' }}</span>
                                </p>
                            </div>
                            <span class="shrink-0 text-[13px] text-skin-backend-text-base text-opacity-45">{{ $application->created_at?->diffForHumans() }}</span>
                        </li>
                    @empty
                        <li class="px-5 py-10 text-center text-sm text-skin-backend-text-base text-opacity-50">No CV submissions yet.</li>
                    @endforelse
                </ul>
            </section>

            <section aria-labelledby="recent-jobs" class="rounded-2xl border border-default border-opacity-10 bg-skin-backend-secondary xl:col-span-2">
                <div class="flex items-center justify-between border-b border-default border-opacity-10 px-5 py-4">
                    <h2 id="recent-jobs" class="text-base font-semibold text-skin-backend-text-base">Recent Job Posts</h2>
                    <a href="{{ route('jobs.jobs.index') }}" class="flex items-center gap-1 text-sm font-semibold text-skin-backend-accent-text hover:opacity-80">
                        All jobs <i class="fa-solid fa-arrow-right text-xs"></i>
                    </a>
                </div>
                <ul class="divide-y divide-default divide-opacity-10">
                    @forelse ($data['recent_jobs'] as $job)
                        @php
                            $cvCount = (int) $job->applications_count;
                            $barWidth = min(100, round(($cvCount / $data['max_job_cvs']) * 100));
                        @endphp
                        <li class="px-5 py-3.5">
                            <div class="flex items-start justify-between gap-3">
                                <div class="min-w-0">
                                    <a href="{{ route('jobs.jobs.index', ['search' => $job->title]) }}" class="block truncate text-[15px] font-medium text-skin-backend-text-base hover:text-skin-backend-accent-text">
                                        {{ $job->title }}
                                    </a>
                                    <p class="mt-0.5 flex items-center gap-1.5 text-[13px] text-skin-backend-text-base text-opacity-50">
                                        @if ($job->country?->flag_code)
                                            <img src="https://flagcdn.com/w40/{{ $job->country->flag_code }}.png" alt="" class="h-4 w-6 rounded-[2px] object-cover ring-1 ring-black/10">
                                        @endif
                                        {{ $job->country?->name ?? 'No country' }}
                                    </p>
                                </div>
                                <span class="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold {{ $statusClass($job) }}">
                                    {{ $statusLabel($job) }}
                                </span>
                            </div>
                            <div class="mt-2.5 flex items-center gap-3">
                                <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-skin-backend-primary" aria-hidden>
                                    <div class="h-full rounded-full bg-skin-backend-accent" style="width: {{ $barWidth }}%"></div>
                                </div>
                                <a href="{{ route('cvs.index', ['search' => $job->title]) }}" class="w-14 shrink-0 text-right text-[13px] font-semibold tabular-nums text-skin-backend-text-base hover:text-skin-backend-accent-text">
                                    {{ $cvCount }} {{ \Illuminate\Support\Str::plural('CV', $cvCount) }}
                                </a>
                            </div>
                        </li>
                    @empty
                        <li class="px-5 py-10 text-center text-sm text-skin-backend-text-base text-opacity-50">No jobs found.</li>
                    @endforelse
                </ul>
            </section>
        </div>
    </div>
</x-Deshboard-layout>
