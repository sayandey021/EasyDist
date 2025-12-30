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
import { ExternalLink, DollarSign, CheckCircle2, Info } from 'lucide-react';
import Link from 'next/link';

export default function OpenAPKPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">OpenAPK</CardTitle>
                            <CardDescription>
                                Curated platform for free and open-source Android applications
                            </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="default" className="bg-green-600">Free</Badge>
                            <Badge>FOSS</Badge>
                            <Badge>Software</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Free to Submit!</h3>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            OpenAPK is free for open-source developers. Submit your FOSS Android app for listing.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Submission:</strong> FREE
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Requirements:</strong> Open-source apps only (FOSS)
                        </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">FOSS Only</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            OpenAPK only accepts free and open-source applications. Apps are sourced from
                            GitHub, F-Droid, and other trusted platforms. Your source code must be publicly available.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Submit</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Ensure your app is open-source</p>
                                    <p className="text-sm text-muted-foreground">Host your source code on GitHub, GitLab, or similar</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Prepare your APK</p>
                                    <p className="text-sm text-muted-foreground">Have a signed APK ready for distribution</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Submit via the app submission form</p>
                                    <p className="text-sm text-muted-foreground">Fill out the submission form on OpenAPK</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Wait for review</p>
                                    <p className="text-sm text-muted-foreground">OpenAPK team will verify and list your app</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Curated FOSS Android apps
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Links to official source repositories
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Privacy-focused platform
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Verified authentic downloads
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <Button asChild>
                            <Link href="https://openapk.net/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                OpenAPK Website
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://openapk.net/about/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                About
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
