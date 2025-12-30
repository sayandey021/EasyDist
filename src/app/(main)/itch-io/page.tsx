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
import { ExternalLink, DollarSign, CheckCircle2, Heart } from 'lucide-react';
import Link from 'next/link';

export default function ItchIoPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Itch.io</CardTitle>
                            <CardDescription>
                                Indie-friendly platform for games, tools, and digital content
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary">Free</Badge>
                            <Badge variant="outline">Pay what you want</Badge>
                            <Badge>Games</Badge>
                            <Badge>Software</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Heart className="h-5 w-5 text-pink-500" />
                            <h3 className="font-semibold">Indie-Friendly Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Publishing Fee:</strong> Completely free to publish
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> You choose! Itch.io suggests 10%, but you can set 0-100%
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Pricing Model:</strong> Free, paid, pay-what-you-want, or donations
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create an itch.io account</p>
                                    <p className="text-sm text-muted-foreground">Sign up for free at itch.io</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Create a new project</p>
                                    <p className="text-sm text-muted-foreground">Click "Dashboard" → "Create new project"</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Upload your files</p>
                                    <p className="text-sm text-muted-foreground">Upload ZIP/builds directly or use butler CLI for updates</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Customize your page</p>
                                    <p className="text-sm text-muted-foreground">Add cover image, screenshots, description, and theme</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
                                <div>
                                    <p className="font-medium">Publish!</p>
                                    <p className="text-sm text-muted-foreground">No review process - publish instantly</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Why Itch.io?</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                No approval process - publish immediately
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                You set your own revenue share (even 0%)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Great for game jams and early access
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Supports web games (HTML5), downloadables, and more
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Butler CLI for easy updates and delta patching
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://itch.io/dashboard" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Itch.io Dashboard
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://itch.io/docs/butler/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Butler CLI Docs
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
