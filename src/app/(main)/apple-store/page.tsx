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

export default function AppleStorePage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Apple App Store</CardTitle>
                            <CardDescription>
                                Distribute apps on iOS, iPadOS, macOS, watchOS, and tvOS
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">$99/year</Badge>
                            <Badge>Software</Badge>
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
                            <strong>Developer Program:</strong> $99 USD/year (individual or organization)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Apple takes 30% (15% for small businesses under $1M/year)
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Enroll in the Apple Developer Program</p>
                                    <p className="text-sm text-muted-foreground">Sign up at developer.apple.com with your Apple ID</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Develop your app using Xcode</p>
                                    <p className="text-sm text-muted-foreground">Use Swift or Objective-C with Apple's development tools</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Create app listing in App Store Connect</p>
                                    <p className="text-sm text-muted-foreground">Add screenshots, descriptions, and metadata</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Submit for App Review</p>
                                    <p className="text-sm text-muted-foreground">Apple reviews all apps (usually 24-48 hours)</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Mac with Xcode required for development
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Must comply with App Store Review Guidelines
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Screenshots for all supported device sizes
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Privacy policy and privacy labels required
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://appstoreconnect.apple.com" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                App Store Connect
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://developer.apple.com/app-store/review/guidelines/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Review Guidelines
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
