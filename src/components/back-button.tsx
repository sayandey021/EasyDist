'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Don't show back button on dashboard or settings
    if (pathname === '/' || pathname === '/settings') {
        return null;
    }

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2 mb-4 hover:bg-accent"
        >
            <ArrowLeft className="h-4 w-4" />
            Back
        </Button>
    );
}
