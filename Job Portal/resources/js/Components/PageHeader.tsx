import React from 'react';

interface PageHeaderProps {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between min-w-0">
            <div className="min-w-0">
                <h1 className="text-2xl font-bold tracking-tight text-ink-900 md:text-[28px]">{title}</h1>
                {description && <p className="mt-1 text-[15px] text-ink-600">{description}</p>}
            </div>
            {actions && <div className="flex flex-wrap sm:flex-nowrap gap-2 max-w-full">{actions}</div>}
        </div>
    );
}

