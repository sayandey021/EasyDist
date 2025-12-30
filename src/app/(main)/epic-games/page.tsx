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

export default function EpicGamesPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Epic Games Store</CardTitle>
                            <CardDescription>
                                Publish games on the Epic Games Store with lower fees
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">$100 per game</Badge>
                            <Badge>Games</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Submission Fee:</strong> $100 USD per game (one-time)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Epic takes only 12% (vs. 30% on other stores)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Starting June 2025:</strong> Keep 100% of first $1M earned per app per year
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 text-green-600">
                            <strong>Epic First Run:</strong> 100% revenue for first 6 months (exclusive launch)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Apply to the Epic Games Store</p>
                                    <p className="text-sm text-muted-foreground">Submit your game through the Epic Games Dev Portal</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Complete onboarding</p>
                                    <p className="text-sm text-muted-foreground">Set up your organization and complete legal agreements</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Create your store page</p>
                                    <p className="text-sm text-muted-foreground">Add game details, media assets, and pricing</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Upload your build</p>
                                    <p className="text-sm text-muted-foreground">Use BuildPatch Tool to upload and manage builds</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Game must meet Epic's content guidelines
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Store page assets (key art, screenshots, logos)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Age rating (IARC or equivalent)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Support for Epic Online Services recommended
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://dev.epicgames.com/portal" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Epic Dev Portal
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://dev.epicgames.com/docs" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Documentation
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
