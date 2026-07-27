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
import { ExternalLink, Globe, Box, CheckCircle2, DollarSign } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function LaunchpadPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Launchpad" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                        Launchpad
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    A software collaboration platform that provides bug tracking, code hosting, and Ubuntu package building.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-orange-500/5 hover:bg-orange-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-orange-500">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Developed by Canonical, Launchpad is primarily used for Ubuntu and other free software projects. It allows developers to host their code using Bazaar or Git, track bugs, manage translations, and build Personal Package Archives (PPAs).
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Canonical</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">PPA</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Source Control</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-orange-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-orange-500 hover:text-orange-500 group/btn" asChild>
                            <a href="https://launchpad.net/" target="_blank" rel="noreferrer">
                                Launchpad Website
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-orange-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-orange-500" />
                            Features & Usage
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-orange-600" />
                            <h3 className="font-semibold text-orange-700 dark:text-orange-300">Personal Package Archives (PPA)</h3>
                        </div>
                        <p className="text-sm text-orange-600 dark:text-orange-400">
                            Launchpad enables developers to easily upload source packages, which are automatically built and published as APT repositories for Ubuntu users.
                        </p>
                    </div>

                    <div className="rounded-lg bg-muted/50 p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold">Pricing</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            <strong>Free:</strong> Completely free for open source software projects.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">How to Use</h3>
                        <ol className="space-y-4">
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                <div>
                                    <p className="font-medium">Create an Account</p>
                                    <p className="text-sm text-muted-foreground">Sign up for an Ubuntu One account to access Launchpad.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                <div>
                                    <p className="font-medium">Host Code</p>
                                    <p className="text-sm text-muted-foreground">Push your source code using Git or Bazaar.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                <div>
                                    <p className="font-medium">Build PPAs</p>
                                    <p className="text-sm text-muted-foreground">Submit Debian packaging files to automatically build and distribute `.deb` packages to Ubuntu users.</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
