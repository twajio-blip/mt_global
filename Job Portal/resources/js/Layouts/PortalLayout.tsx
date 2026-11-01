import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboardIcon,
    BriefcaseIcon,
    FileTextIcon,
    PlusCircleIcon,
    GlobeIcon,
    LayersIcon,
    ExternalLinkIcon,
    LogOutIcon,
    MenuIcon,
    XIcon,
    Building2Icon,
} from "lucide-react";
import { BrandLogo } from "../Components/BrandLogo";
import { initials } from "../utils/format";

interface PortalLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    {
        href: "/portal/dashboard",
        label: "Dashboard",
        icon: LayoutDashboardIcon,
        match: (p: string) => p === "/portal" || p === "/portal/dashboard",
    },
    {
        href: "/portal/jobs",
        label: "Jobs",
        icon: BriefcaseIcon,
        match: (p: string) =>
            p.startsWith("/portal/jobs") && p !== "/portal/jobs/create",
    },
    {
        href: "/portal/jobs/create",
        label: "Add Job",
        icon: PlusCircleIcon,
        match: (p: string) => p === "/portal/jobs/create",
    },
    {
        href: "/portal/applications",
        label: "Applications / CVs",
        icon: FileTextIcon,
        match: (p: string) =>
            p.startsWith("/portal/applications") || p.startsWith("/portal/cvs"),
    },
    {
        href: "/portal/setup/countries",
        label: "Countries Setup",
        icon: GlobeIcon,
        match: (p: string) => p.startsWith("/portal/setup/countries"),
    },
    {
        href: "/portal/setup/designations",
        label: "Designations Setup",
        icon: LayersIcon,
        match: (p: string) => p.startsWith("/portal/setup/designations"),
    },
    {
        href: "/portal/setup/company",
        label: "Company Setup",
        icon: Building2Icon,
        match: (p: string) => p.startsWith("/portal/setup/company"),
    },
];

export function PortalLayout({ children }: PortalLayoutProps) {
    const { url, props } = usePage<any>();
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = props.auth?.user || {
        name: "Admin User",
        email: "admin@jobportal.com",
    };

    const navContent = (
        <div className="flex h-full flex-col bg-brand-900 text-brand-100">
            <div className="px-5 pb-6 pt-6">
                <Link href="/portal/dashboard" className="block focus:outline-none">
                    <BrandLogo variant="light" subtitle="Admin Portal" />
                </Link>
            </div>

            <nav aria-label="Portal" className="flex-1 px-3">
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const active = item.match(url);
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] font-medium transition-colors duration-150 ease-out ${
                                        active
                                            ? "bg-white/10 text-white font-semibold"
                                            : "text-brand-200 hover:bg-white/5 hover:text-white"
                                    }`}
                                >
                                    <Icon
                                        className="h-[18px] w-[18px]"
                                        aria-hidden
                                    />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}

                    <li>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-[15px] font-medium text-brand-200 transition-colors duration-150 ease-out hover:bg-white/5 hover:text-white"
                        >
                            <LogOutIcon
                                className="h-[18px] w-[18px]"
                                aria-hidden
                            />
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="border-t border-white/10 p-4">
                <a
                    href="/jobs"
                    target="_blank"
                    rel="noreferrer"
                    className="mb-4 flex items-center gap-2 px-1 text-sm text-brand-200 hover:text-white"
                >
                    <ExternalLinkIcon className="h-4 w-4" aria-hidden />
                    View public website
                </a>
                <div className="flex items-center gap-3 px-1">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                        {initials(user.name)}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                            {user.name}
                        </p>
                        <p className="truncate text-[12px] text-brand-200">
                            {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen w-full bg-surface overflow-x-hidden">
            {/* Desktop Aside */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
                {navContent}
            </aside>

            {/* Mobile Header */}
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-brand-900 px-4 lg:hidden">
                <Link href="/portal/dashboard" className="focus:outline-none">
                    <BrandLogo variant="light" subtitle="Admin Portal" />
                </Link>
                <button
                    type="button"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open navigation"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
                >
                    <MenuIcon className="h-5 w-5" />
                </button>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-ink-900/50 backdrop-blur-[2px]"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden
                    />
                    <div className="fixed inset-y-0 left-0 z-50 w-72">
                        {navContent}
                        <button
                            type="button"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close navigation"
                            className="absolute right-3 top-5 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10"
                        >
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="lg:pl-64 min-w-0 w-full max-w-full overflow-x-hidden">
                <div className="mx-auto w-full max-w-[1280px] min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-8 overflow-x-hidden">
                    {children}
                </div>
            </main>
        </div>
    );
}
