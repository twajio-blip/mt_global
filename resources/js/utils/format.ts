export function formatDate(iso: string | null | undefined): string {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
        return String(iso);
    }
}

export function formatDateTime(iso: string | null | undefined): string {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    } catch {
        return String(iso);
    }
}

export function formatRelativeDay(iso: string | null | undefined): string {
    if (!iso) return '-';
    try {
        const d = new Date(iso);
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays <= 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return formatDate(iso);
    } catch {
        return formatDate(iso);
    }
}

export function formatFileSize(bytes: number | null | undefined): string {
    if (!bytes || bytes <= 0) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function initials(name: string | null | undefined): string {
    if (!name) return 'U';
    return name
        .replace(/^Md\.\s*/i, '')
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');
}

