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

export default function XboxPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Xbox</CardTitle>
                            <CardDescription>
                                Publish games for Xbox consoles and PC via Xbox Game Pass
                            </CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="default" className="bg-green-600">Free (ID@Xbox)</Badge>
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
                            <strong>ID@Xbox Program:</strong> FREE (includes dev kits, no fees)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Microsoft takes 30% (12% if customer uses MS Store on PC)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Dev Mode (Alternative):</strong> $19 one-time to unlock retail Xbox for development
                        </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">ID@Xbox Program</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            Independent developers can apply to ID@Xbox for free dev kits, dedicated support, and Xbox Game Pass opportunities.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Apply to ID@Xbox (recommended for indies)</p>
                                    <p className="text-sm text-muted-foreground">Or use your Microsoft Partner Center account</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Get development tools</p>
                                    <p className="text-sm text-muted-foreground">Download GDK (Game Development Kit) and set up your environment</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Develop and test your game</p>
                                    <p className="text-sm text-muted-foreground">Use dev mode on retail Xbox or dev kit hardware</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Submit for certification</p>
                                    <p className="text-sm text-muted-foreground">Pass Xbox certification requirements</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                GDK-based game build
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Xbox Live integration (achievements, cloud saves, etc.)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Pass certification testing
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Age rating (IARC or regional ratings)
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://www.xbox.com/developers/id" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                ID@Xbox Program
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://learn.microsoft.com/gaming/gdk/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                GDK Documentation
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
