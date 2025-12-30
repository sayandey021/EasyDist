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
import { ExternalLink, DollarSign, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AltStorePage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">AltStore PAL</CardTitle>
                            <CardDescription>
                                Alternative iOS app marketplace for EU users (DMA compliant)
                            </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="default" className="bg-green-600">Free</Badge>
                            <Badge>Software</Badge>
                            <Badge variant="outline">EU Only</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Free to Distribute!</h3>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            No distribution fees. Epic Games MegaGrant covers Apple&apos;s Core Technology Fee.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Distribution Fee:</strong> FREE (covered by Epic MegaGrant)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Apple Developer Account:</strong> $99/year (required for notarization)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Apple CTF:</strong> €0.50/install after 1M installs/year (EU apps only)
                        </p>
                    </div>

                    <div className="rounded-lg border border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-amber-500" />
                            <h3 className="font-semibold text-amber-700 dark:text-amber-300">EU Only (DMA)</h3>
                        </div>
                        <p className="text-sm text-amber-600 dark:text-amber-400">
                            AltStore PAL is available only in the European Union due to the Digital Markets Act.
                            Users outside the EU can use the original AltStore via sideloading.
                        </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Patreon Integration</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            AltStore encourages developers to use Patreon for monetization. Connect your Patreon
                            to offer exclusive app access to supporters.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Get an Apple Developer Account</p>
                                    <p className="text-sm text-muted-foreground">Required for app notarization ($99/year)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Create an AltStore Source</p>
                                    <p className="text-sm text-muted-foreground">Host a JSON file describing your apps</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Notarize your IPA</p>
                                    <p className="text-sm text-muted-foreground">Submit your app for Apple notarization</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Share your source URL</p>
                                    <p className="text-sm text-muted-foreground">Users can add your source to AltStore PAL</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Open-source marketplace platform
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                No Apple App Store review process
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Distribute apps rejected by Apple
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Patreon integration for monetization
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Growing indie developer community
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <Button asChild>
                            <Link href="https://altstore.io" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                AltStore Website
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://faq.altstore.io/distribute-your-apps/make-a-source" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Create a Source
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://github.com/altstoreio" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
