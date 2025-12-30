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

export default function OBSPage() {
    return (
        <div className="mx-auto w-full max-w-4xl space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-2xl">Open Build Service</CardTitle>
                            <CardDescription>
                                Build and distribute packages for multiple Linux distributions from one source
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
                            <h3 className="font-semibold text-green-700 dark:text-green-300">Free &amp; Open Source!</h3>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">
                            OBS is free, open source (GPL), and the public instance at build.opensuse.org is free to use.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Public Instance:</strong> FREE (build.opensuse.org)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Self-Hosted:</strong> FREE (GPL licensed, host your own)
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            <strong>Account Required:</strong> Free openSUSE Account
                        </p>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Info className="h-5 w-5 text-blue-500" />
                            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Multi-Distribution Support</h3>
                        </div>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                            Build packages for openSUSE, SLES, Fedora, RHEL/CentOS, Debian, Ubuntu, Arch, and more - all from a single source!
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Publish</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create an openSUSE Account</p>
                                    <p className="text-sm text-muted-foreground">Sign up at idp-portal.suse.com (free)</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Create a project in OBS</p>
                                    <p className="text-sm text-muted-foreground">Go to build.opensuse.org and create your home project</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Add your package source</p>
                                    <p className="text-sm text-muted-foreground">Upload source tarball and spec/debian files, or link to SCM</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                <div>
                                    <p className="font-medium">Configure build targets</p>
                                    <p className="text-sm text-muted-foreground">Select which distributions and architectures to build for</p>
                                </div>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Build for 20+ Linux distributions
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Supports RPM, DEB, Arch, AppImage, and more
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Automatic repository hosting with download.opensuse.org
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                One-click install buttons for users
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                Branching and collaboration features
                            </li>
                            <li className="flex items-center gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                osc command-line tool for automation
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <Button asChild>
                            <Link href="https://build.opensuse.org/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Open Build Service
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://openbuildservice.org/help/" target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Documentation
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="https://github.com/openSUSE/open-build-service" target="_blank">
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
