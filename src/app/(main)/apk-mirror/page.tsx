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

export default function APKMirrorPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">APKMirror</CardTitle>
                            <CardDescription>
                                Trusted source for verified Android APK downloads
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
                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Community-Driven Platform</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            APKMirror is primarily a community-driven mirror. Apps are typically uploaded by users and verified by signature matching with Play Store versions.
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
                            <strong>Revenue Model:</strong> Ad-supported platform owned by Android Police
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How Apps Get Listed</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Publish on Google Play first</p>
                                    <p className="text-sm text-muted-foreground">APKMirror verifies apps against Play Store signatures</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Submit your APK</p>
                                    <p className="text-sm text-muted-foreground">Upload via their submission form or contact them directly</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Signature verification</p>
                                    <p className="text-sm text-muted-foreground">APKMirror verifies the APK signature matches the official release</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Highly trusted by Android community
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Signature verification for all APKs
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Version history available for all apps
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                APKM (split APK) and XAPK support
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Owned and operated by Android Police (reputable tech site)
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://www.apkmirror.com/apk-upload/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Upload APK
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://www.apkmirror.com/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                APKMirror Website
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
