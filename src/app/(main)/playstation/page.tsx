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

export default function PlayStationPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">PlayStation</CardTitle>
                            <CardDescription>
                                Distribute games on PlayStation 4 and PlayStation 5
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
                            PlayStation Partners is an invite-only program. You must apply and be approved before you can publish games on PlayStation platforms.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Developer Fee:</strong> Free to apply (no upfront cost once approved)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Revenue Share:</strong> Sony takes 30% of sales
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Dev Kits:</strong> May require purchasing or loaning dev kit hardware
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Apply to PlayStation Partners</p>
                                    <p className="text-sm text-muted-foreground">Submit your application with game concept and studio info</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Get approved and sign agreements</p>
                                    <p className="text-sm text-muted-foreground">Complete NDA and developer agreements</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Obtain development hardware</p>
                                    <p className="text-sm text-muted-foreground">Purchase or loan PS4/PS5 dev kits</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Develop using PlayStation SDK</p>
                                    <p className="text-sm text-muted-foreground">Access SDK, tools, and documentation</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">5</span>
                                <div>
                                    <p className="font-medium">Submit for QA and certification</p>
                                    <p className="text-sm text-muted-foreground">Pass PlayStation's quality and technical requirements</p>
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
                                Access to development hardware (dev kits)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Pass TRC (Technical Requirements Checklist)
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Age ratings and regional compliance
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="https://partners.playstation.net/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                PlayStation Partners
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://www.playstation.com/en-in/corporate/playstation-studios/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Developer Info
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
