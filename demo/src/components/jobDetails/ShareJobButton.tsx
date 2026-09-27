import React from 'react';
import { Share2Icon } from 'lucide-react';
import { toast } from 'sonner';

interface ShareJobButtonProps {
  title: string;
  className?: string;
}

export function ShareJobButton({ title, className = '' }: ShareJobButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success('Job link copied. Share it on WhatsApp or Facebook.');
    } catch {

      // user dismissed the share sheet
    }};

  return (
    <button type="button" onClick={handleShare} className={className}>
      <Share2Icon className="h-4 w-4" aria-hidden />
      Share
    </button>);

}