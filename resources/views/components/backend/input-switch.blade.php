<label class="inline-flex items-center cursor-pointer">
    <input
        type="checkbox"
        {{ $attributes->merge(['class' => 'sr-only peer']) }}>

    <span
        class="relative block h-6 w-11 rounded-full bg-[#323232] transition-colors duration-200 peer-checked:bg-skin-backend-accent peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-500 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white">
    </span>
</label>
