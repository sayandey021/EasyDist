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

export default function MicrosoftStorePage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Microsoft Store</CardTitle>
                            <CardDescription>
                                Publish apps and games on the Windows Microsoft Store
                            </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="default" className="bg-green-600">Free (Individual)</Badge>
                            <Badge variant="secondary">$99 (Company)</Badge>
                            <Badge>Software</Badge>
                            <Badge>Games</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Free for Individuals!</h3>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            As of 2024, Microsoft has eliminated the registration fee for individual developers. No credit card required!
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Individual Developer:</strong> FREE (identity verification with government ID required)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Company/Organization:</strong> $99 USD one-time fee
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Microsoft takes 15% for games and apps (12% if customer purchases through MS Store on PC)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create a Microsoft Partner Center account</p>
                                    <p className="text-sm text-muted-foreground">Sign up for a developer account at Partner Center</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Reserve your app name</p>
                                    <p className="text-sm text-muted-foreground">Choose a unique name for your app in the store</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Package your app as MSIX</p>
                                    <p className="text-sm text-muted-foreground">Create an MSIX package using Visual Studio or msixpackagingtool</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Submit for certification</p>
                                    <p className="text-sm text-muted-foreground">Upload your package and fill in store listing details</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                MSIX or AppX package format
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                App must pass Microsoft Store certification
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Screenshots and promotional images required
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Privacy policy URL (for apps accessing personal data)
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://partner.microsoft.com/dashboard" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Partner Center Dashboard
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://learn.microsoft.com/en-us/windows/apps/publish/" target="_blank">
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
