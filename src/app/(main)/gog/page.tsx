'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, DollarSign, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function GOGPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">GOG.com</CardTitle>
                            <CardDescription>
                                DRM-free game distribution platform by CD Projekt
                            </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">Curated</Badge>
                            <Badge>Games</Badge>
                            <Badge>DRM-Free</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Curated Platform</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            GOG is a curated store. Games are reviewed before acceptance. Known for quality DRM-free titles.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Developer Fee:</strong> No upfront fee
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> GOG takes 30% (negotiable for larger titles)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Submit your game for consideration</p>
                                    <p className="text-sm text-muted-foreground">Fill out the game submission form on GOG</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Game review by GOG team</p>
                                    <p className="text-sm text-muted-foreground">GOG evaluates game quality and fit for their platform</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">If accepted, sign publishing agreement</p>
                                    <p className="text-sm text-muted-foreground">Complete legal and financial paperwork</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Prepare DRM-free build</p>
                                    <p className="text-sm text-muted-foreground">GOG requires games to be completely DRM-free</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                100% DRM-free games
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                30-day money-back guarantee for customers
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                GOG Galaxy client (optional for players)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Strong community of PC gamers
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://partners.gog.com/login?requested-route=aHR0cHM6Ly9wYXJ0bmVycy5nb2cuY29tLw%3D%3D#" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Partner Program
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://www.gog.com/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                GOG.com
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
