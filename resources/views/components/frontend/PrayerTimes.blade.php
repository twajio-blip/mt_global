@php
    $groupData = $data[0][0] ?? $data[0] ?? [];
    $title = $groupData['Title'] ?? 'Prayer Times';
    $uniqueId = 'prayer-widget-' . uniqid();
@endphp

<section class="overflow-hidden rounded-[5px] border border-[#D8E0E6] bg-white">
    <h2 class="bg-[#105493] px-3 py-[9px] text-[14px] font-semibold uppercase tracking-wide text-white">
        {{ $title }}
    </h2>
    <div id="{{ $uniqueId }}" class="p-3 text-[14px] leading-relaxed text-[#1E2933]">
        <div class="flex items-center justify-center py-4 text-[13px] text-[#64717C]">
            <svg class="mr-2 h-4 w-4 animate-spin text-[#105493]" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Loading prayer times...
        </div>
    </div>
</section>

<script>
    (function () {
        const widget = document.getElementById('{{ $uniqueId }}');
        if (!widget) return;

        const enToBn = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
        const bnMonthsByNumber = {
            1: 'মুহররম',
            2: 'সফর',
            3: 'রবিউল আউয়াল',
            4: 'রবিউস সানি',
            5: 'জমাদিউল আউয়াল',
            6: 'জমাদিউস সানি',
            7: 'রজব',
            8: 'শাবান',
            9: 'রমজান',
            10: 'শাওয়াল',
            11: 'জিলকদ',
            12: 'জিলহজ'
        };

        function translateNumber(str) {
            return str.toString().replace(/[0-9]/g, match => enToBn[match]);
        }

        function format12Hour(timeStr) {
            let [hours, minutes] = timeStr.split(':');
            hours = parseInt(hours, 10);
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            return `${hours}:${minutes.padStart(2, '0')} ${ampm}`;
        }

        const url = 'https://api.aladhan.com/v1/timingsByCity?city=Mongla&country=Bangladesh&method=1&school=1';

        fetch(url)
            .then(res => res.json())
            .then(resData => {
                if (!resData || resData.code !== 200 || !resData.data) {
                    throw new Error('Invalid data');
                }
                const apiData = resData.data;

                // 1. Format Gregorian Date
                const [day, month, year] = apiData.date.gregorian.date.split('-');
                const gDate = new Date(`${year}-${month}-${day}`);
                const gregorianFormat = gDate.toLocaleDateString('en-GB', {
                    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                });

                // 2. Format Hijri Date to Bengali
                const hijri = apiData.date.hijri;
                const bnDay = translateNumber(hijri.day);
                const bnYear = translateNumber(hijri.year);
                const monthNum = parseInt(hijri.month.number, 10);
                const bnMonth = bnMonthsByNumber[monthNum] || hijri.month.en;
                const hijriFormat = `${bnDay} ${bnMonth} ${bnYear} হিজরি`;

                // 3. Extract Timings
                const t = apiData.timings;
                const prayers = [
                    { name: 'Fajr', key: 'Fajr' },
                    { name: 'Sunrise', key: 'Sunrise' },
                    { name: 'Dhuhr', key: 'Dhuhr' },
                    { name: 'Asr', key: 'Asr' },
                    { name: 'Maghrib', key: 'Maghrib' },
                    { name: 'Isha', key: 'Isha' }
                ];

                let timingsListHtml = prayers.map(p => {
                    const timeClean = t[p.key].split(' ')[0];
                    const time12 = format12Hour(timeClean);
                    return `
                        <li class="flex items-center justify-between py-1.5">
                            <span class="text-[14px] text-[#1E2933]">${p.name}</span>
                            <span class="text-[14px] font-medium tabular-nums text-[#073B6B]">${time12}</span>
                        </li>
                    `;
                }).join('');

                // 4. Inject HTML matching demo exactly
                widget.innerHTML = `
                    <p class="text-[13px] font-medium text-[#073B6B]">Mongla, Bagerhat</p>
                    <p class="text-[13px] text-[#64717C]">${gregorianFormat}</p>
                    <p class="font-['Noto_Sans_Bengali','Inter',sans-serif] text-[13px] text-[#64717C]">${hijriFormat}</p>
                    <ul class="mt-2.5 divide-y divide-[#D8E0E6] border-t border-[#D8E0E6]">
                        ${timingsListHtml}
                    </ul>
                `;
            })
            .catch(err => {
                widget.innerHTML = `
                    <p class="text-[13px] font-medium text-[#073B6B]">Mongla, Bagerhat</p>
                    <p class="text-[13px] text-[#64717C]">Unable to load live prayer timings.</p>
                `;
            });
    })();
</script>