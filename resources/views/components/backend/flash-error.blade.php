@props(['message', 'type'])
@php
    $alertId = 'dismiss-alert-' . uniqid();
@endphp

<div id="{{ $alertId }}"
    class="fixed top-5 right-5 z-[9999] transition duration-300 {{$type=='success' ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-red-200 border-red-200 text-red-800'}} border text-sm rounded-lg p-4"
    role="alert">
    <div class="flex">
        <div class="flex-shrink-0">
            <i class="fa-regular fa-circle-check"></i>

        </div>
        <div class="ms-2">
            <div class="text-sm font-medium pr-5">
                {{ $message }}
            </div>
        </div>
        <div class="ps-3 ms-auto">
            <div class="-mx-1.5 -my-1.5">
                <button type="button"
                    class="inline-flex flash-dismiss bg-teal-50 rounded-lg p-1.5 {{$type=='success' ? 'text-teal-500 focus:ring-teal-600 focus:ring-offset-teal-50 hover:bg-teal-100' : 'text-red-500 focus:ring-red-600 focus:ring-offset-red-50 hover:bg-red-100'}}  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    data-alert-id="{{ $alertId }}">
                    <span class="sr-only">Dismiss</span>
                    <svg class="flex-shrink-0 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</div>

<script>
    (function () {
        const alert = document.getElementById(@json($alertId));
        if (!alert) return;

        const dismiss = function () {
            alert.classList.add('translate-x-5', 'opacity-0');
            setTimeout(function () {
                alert.remove();
            }, 300);
        };

        const button = alert.querySelector('.flash-dismiss');
        if (button) {
            button.addEventListener('click', dismiss);
        }

        setTimeout(dismiss, 3000);
    })();
</script>
