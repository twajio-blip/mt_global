export const pageContainer = 'mx-auto w-full max-w-page px-4 sm:px-6 lg:px-8';

export const inputClass =
'block w-full h-12 rounded-lg border border-line bg-white px-3.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition-[border-color,box-shadow] duration-150 ease-out focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100 disabled:bg-surface';

export const inputErrorClass = 'border-danger-600 focus:border-danger-600 focus:ring-danger-100';

export const textareaClass =
'block w-full rounded-lg border border-line bg-white px-3.5 py-3 text-[15px] text-ink-900 placeholder:text-ink-400 transition-[border-color,box-shadow] duration-150 ease-out focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100';

const buttonBase =
'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60';

export const buttonPrimary = `${buttonBase} h-12 px-5 text-[15px] bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-100`;

export const buttonNavy = `${buttonBase} h-12 px-5 text-[15px] bg-brand-800 text-white hover:bg-brand-900 focus-visible:ring-brand-100`;

export const buttonSecondary = `${buttonBase} h-12 px-5 text-[15px] border border-line bg-white text-ink-900 hover:border-brand-300 hover:text-brand-800 focus-visible:ring-brand-100`;

export const buttonSmPrimary = `${buttonBase} h-10 px-4 text-sm bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-100`;

export const buttonSmSecondary = `${buttonBase} h-10 px-4 text-sm border border-line bg-white text-ink-900 hover:border-brand-300 hover:text-brand-800 focus-visible:ring-brand-100`;

export const iconButton =
'inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-500 transition-[background-color,color] duration-150 ease-out hover:bg-surface hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-200';