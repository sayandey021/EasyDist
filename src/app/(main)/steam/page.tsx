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

export default function SteamPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Steam</CardTitle>
                            <CardDescription>
                                Distribute games on the world's largest PC gaming platform
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">$100/game</Badge>
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
                            <strong>App Credit Fee:</strong> $100 USD per game (refundable after $1,000 in sales)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Valve takes 30% (25% after $10M, 20% after $50M)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create a Steamworks account</p>
                                    <p className="text-sm text-muted-foreground">Sign up at partner.steamgames.com and complete onboarding</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Pay the app credit fee</p>
                                    <p className="text-sm text-muted-foreground">$100 per game, refundable once your game earns $1,000</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Set up your store page</p>
                                    <p className="text-sm text-muted-foreground">Add description, screenshots, trailers, and capsule images</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Upload your build via Steamworks</p>
                                    <p className="text-sm text-muted-foreground">Use SteamPipe to upload and manage your game builds</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
                                <div>
                                    <p className="font-medium">Complete review checklist and release</p>
                                    <p className="text-sm text-muted-foreground">Steam reviews all games before they can be released</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Game builds for Windows, macOS, or Linux
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Store capsule images (various sizes required)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                At least 5 screenshots
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Tax and banking information for payments
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://partner.steamgames.com" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Steamworks Partner
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://partner.steamgames.com/doc/home" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Steamworks Documentation
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
