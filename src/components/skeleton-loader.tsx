'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-muted',
                className
            )}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <div className="flex gap-2 mt-auto">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-full mt-4" />
        </div>
    );
}

export function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Hero skeleton */}
            <div className="rounded-lg border bg-card overflow-hidden">
                <Skeleton className="h-48 md:h-64 w-full" />
            </div>

            {/* Tabs skeleton */}
            <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-9 w-24 rounded-md" />
                ))}
            </div>

            {/* Section skeleton */}
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export function PageSkeleton() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6 animate-in fade-in duration-300">
            <div className="rounded-lg border bg-card">
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <Skeleton className="h-8 w-48 mb-2" />
                            <Skeleton className="h-4 w-72" />
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-12 rounded-full" />
                        </div>
                    </div>
                </div>
                <div className="p-6 pt-0 space-y-6">
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-36" />
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="h-6 w-6 rounded-full shrink-0" />
                                <div className="flex-1">
                                    <Skeleton className="h-5 w-48 mb-1" />
                                    <Skeleton className="h-4 w-72" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-10 w-48" />
                    </div>
                </div>
            </div>
        </div>
    );
}
