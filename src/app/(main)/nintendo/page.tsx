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
import { ExternalLink, DollarSign, CheckCircle2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NintendoPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Nintendo</CardTitle>
                            <CardDescription>
                                Distribute games on Nintendo Switch and Nintendo platforms
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">Apply for access</Badge>
                            <Badge>Games</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300">Application Required</h3>
                        </div>
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            Nintendo Developer Portal requires approval. You must register as a Nintendo developer and be approved before you can access dev kits and publish games on Nintendo platforms.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Developer Fee:</strong> Free to apply (no upfront developer fee)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Nintendo takes 30% of sales
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Dev Kits:</strong> Requires purchasing Nintendo Switch dev kit hardware
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Register at Nintendo Developer Portal</p>
                                    <p className="text-sm text-muted-foreground">Create an account and submit your company/studio information</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Get approved and sign agreements</p>
                                    <p className="text-sm text-muted-foreground">Complete NDA and developer agreements with Nintendo</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Obtain development hardware</p>
                                    <p className="text-sm text-muted-foreground">Purchase Nintendo Switch dev kit (SDEV or EDEV)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Develop using Nintendo SDK</p>
                                    <p className="text-sm text-muted-foreground">Access Nintendo SDK, tools, and documentation through the developer portal</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
                                <div>
                                    <p className="font-medium">Submit for Lotcheck certification</p>
                                    <p className="text-sm text-muted-foreground">Pass Nintendo's quality assurance and technical requirements (Lotcheck)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">6</span>
                                <div>
                                    <p className="font-medium">Launch on Nintendo eShop</p>
                                    <p className="text-sm text-muted-foreground">Set pricing, regions, and publish your game on the Nintendo eShop</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Established game studio or strong portfolio
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Access to Nintendo Switch development hardware
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Pass Lotcheck certification requirements
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Age ratings (ESRB, PEGI, CERO, etc.)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Comply with Nintendo's content guidelines
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://developer.nintendo.com/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Nintendo Developer Portal
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://www.nintendo.com/us/switch/online-service/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Nintendo eShop Info
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
