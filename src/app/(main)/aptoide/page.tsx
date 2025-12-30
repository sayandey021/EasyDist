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

export default function AptoidePage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Aptoide</CardTitle>
                            <CardDescription>
                                Independent Android app marketplace with 300M+ users
                            </CardDescription>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="default" className="bg-green-600">Free</Badge>
                            <Badge>Software</Badge>
                            <Badge>Games</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Free to Publish!</h3>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            No registration fee. Open platform for Android app distribution.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Developer Account:</strong> FREE
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Aptoide takes 25% (lower than most stores)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create an Aptoide Developer account</p>
                                    <p className="text-sm text-muted-foreground">Sign up at aptoide.com/developers</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Create your app store (optional)</p>
                                    <p className="text-sm text-muted-foreground">You can have your own branded store on Aptoide</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Upload your APK</p>
                                    <p className="text-sm text-muted-foreground">Standard Android APK format</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">App goes live</p>
                                    <p className="text-sm text-muted-foreground">Minimal review process</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                300+ million users worldwide
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Lower revenue share (25%)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Create your own branded store
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Independent from Google Play
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://connect.aptoide.com/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Developer Portal
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://en.aptoide.com/company" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                About Aptoide
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
