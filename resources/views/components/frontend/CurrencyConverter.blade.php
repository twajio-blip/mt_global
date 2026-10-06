@props(['data' => []])

@php
    $title = 'Currency Converter';

    if (is_array($data)) {
        foreach ($data as $record) {
            if (!is_array($record)) {
                continue;
            }
            foreach ($record as $subVal) {
                if (is_array($subVal)) {
                    if (isset($subVal['instances']) && is_array($subVal['instances'])) {
                        foreach ($subVal['instances'] as $inst) {
                            if (!empty($inst['title'])) $title = $inst['title'];
                            if (!empty($inst['Title'])) $title = $inst['Title'];
                        }
                    } else {
                        if (!empty($subVal['title'])) $title = $subVal['title'];
                        if (!empty($subVal['Title'])) $title = $subVal['Title'];
                    }
                }
            }
            if (!empty($record['title'])) $title = $record['title'];
            if (!empty($record['Title'])) $title = $record['Title'];
        }
    }

    $widgetId = 'currency-converter-' . uniqid();
    $defaultCurrencies = ['USD', 'BDT', 'EUR', 'GBP', 'INR', 'CNY', 'JPY', 'AED', 'SAR', 'CAD', 'AUD', 'SGD', 'MYR', 'THB'];
@endphp

<section class="overflow-hidden rounded-[5px] border border-[#D8E0E6] bg-white">
    <h2 class="bg-[#105493] px-3 py-2 text-[14px] font-semibold uppercase tracking-wide text-white">
        {{ $title }}
    </h2>
    <div class="p-3 text-[14px] leading-relaxed text-[#1E2933]">
        <div class="space-y-2.5">
            <div>
                <label for="{{ $widgetId }}-amount" class="mb-1 block text-[13px] font-medium text-[#64717C]">
                    Amount
                </label>
                <input id="{{ $widgetId }}-amount" type="number" min="0" step="any" value="1"
                    class="w-full rounded-[5px] border border-[#D8E0E6] bg-white px-3 py-2 text-[14px] text-[#1E2933] placeholder:text-[#64717C] focus:border-[#105493] focus:outline-none focus:ring-1 focus:ring-[#105493]">
            </div>

            <div class="grid grid-cols-2 gap-2">
                <div>
                    <label for="{{ $widgetId }}-from" class="mb-1 block text-[13px] font-medium text-[#64717C]">
                        From
                    </label>
                    <div class="relative">
                        <select id="{{ $widgetId }}-from"
                            class="w-full appearance-none rounded-[5px] border border-[#D8E0E6] bg-white px-3 py-2 pr-8 text-[14px] text-[#1E2933] focus:border-[#105493] focus:outline-none focus:ring-1 focus:ring-[#105493]">
                            @foreach($defaultCurrencies as $curr)
                                <option value="{{ $curr }}" {{ $curr === 'USD' ? 'selected' : '' }}>{{ $curr }}</option>
                            @endforeach
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64717C]">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label for="{{ $widgetId }}-to" class="mb-1 block text-[13px] font-medium text-[#64717C]">
                        To
                    </label>
                    <div class="relative">
                        <select id="{{ $widgetId }}-to"
                            class="w-full appearance-none rounded-[5px] border border-[#D8E0E6] bg-white px-3 py-2 pr-8 text-[14px] text-[#1E2933] focus:border-[#105493] focus:outline-none focus:ring-1 focus:ring-[#105493]">
                            @foreach($defaultCurrencies as $curr)
                                <option value="{{ $curr }}" {{ $curr === 'BDT' ? 'selected' : '' }}>{{ $curr }}</option>
                            @endforeach
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#64717C]">
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <button id="{{ $widgetId }}-btn" type="button"
                class="inline-flex min-h-[40px] w-full items-center justify-center rounded-[5px] bg-[#105493] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#073B6B]">
                Convert
            </button>

            <p id="{{ $widgetId }}-result" aria-live="polite"
                class="rounded-[5px] bg-[#EDF5FB] px-3 py-2 text-[14px] font-medium text-[#073B6B]">
                1 USD = 121.45 BDT
            </p>

            <p class="text-[12.5px] text-[#64717C]">
                Indicative rates only. Confirm with your authorised dealer bank.
            </p>
        </div>
    </div>
</section>

<script>
    (function () {
        const amountInput = document.getElementById('{{ $widgetId }}-amount');
        const fromSelect = document.getElementById('{{ $widgetId }}-from');
        const toSelect = document.getElementById('{{ $widgetId }}-to');
        const convertBtn = document.getElementById('{{ $widgetId }}-btn');
        const resultEl = document.getElementById('{{ $widgetId }}-result');

        if (!amountInput || !fromSelect || !toSelect || !convertBtn || !resultEl) return;

        let rates = {
            USD: 1,
            BDT: 121.45,
            EUR: 0.92,
            GBP: 0.78,
            INR: 83.6,
            CNY: 7.24,
            JPY: 152.3,
            AED: 3.67,
            SAR: 3.75,
            CAD: 1.36,
            AUD: 1.52,
            SGD: 1.35,
            MYR: 4.70,
            THB: 36.50
        };

        function populateDropdowns(currencyList) {
            const currentFrom = fromSelect.value || 'USD';
            const currentTo = toSelect.value || 'BDT';

            fromSelect.innerHTML = '';
            toSelect.innerHTML = '';

            currencyList.forEach(code => {
                const optFrom = document.createElement('option');
                optFrom.value = code;
                optFrom.textContent = code;
                if (code === currentFrom) optFrom.selected = true;
                fromSelect.appendChild(optFrom);

                const optTo = document.createElement('option');
                optTo.value = code;
                optTo.textContent = code;
                if (code === currentTo) optTo.selected = true;
                toSelect.appendChild(optTo);
            });
        }

        function doConvert() {
            const val = parseFloat(amountInput.value);
            if (isNaN(val) || val <= 0) {
                resultEl.textContent = 'Please enter a valid amount.';
                return;
            }
            const fromCurr = fromSelect.value;
            const toCurr = toSelect.value;
            const fromRate = rates[fromCurr] || 1;
            const toRate = rates[toCurr] || 1;
            const converted = (val / fromRate) * toRate;
            resultEl.textContent = `${val} ${fromCurr} = ${converted.toFixed(2)} ${toCurr}`;
        }

        convertBtn.addEventListener('click', doConvert);
        amountInput.addEventListener('input', doConvert);
        fromSelect.addEventListener('change', doConvert);
        toSelect.addEventListener('change', doConvert);

        fetch('https://open.er-api.com/v6/latest/USD')
            .then(res => res.json())
            .then(data => {
                if (data && data.result === 'success' && data.rates) {
                    rates = data.rates;
                    const allCurrencies = Object.keys(data.rates).sort();
                    populateDropdowns(allCurrencies);
                    doConvert();
                }
            })
            .catch(err => {
                // Keep initial fallback currencies & rates if offline
            });
    })();
</script>
