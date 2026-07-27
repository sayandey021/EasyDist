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
import { ExternalLink, Terminal, Globe, FileJson, Server } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function PackagistPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Packagist" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                        Packagist
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The main Composer repository for PHP packages. It aggregates public PHP packages installable with Composer.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-orange-500/5 hover:bg-orange-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-orange-500">PHP Package Registry</CardTitle>
                        <CardDescription>
                            Discover and distribute PHP libraries
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The primary repository for Composer, the PHP package manager. It aggregates all public PHP packages installable with Composer, serving as the central hub for the PHP ecosystem.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The primary repository for Composer, the PHP package manager. It aggregates all public PHP packages installable with Composer, serving as the central hub for the PHP ecosystem.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">PHP</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Composer</Badge>
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">Open Source</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform" />
                            Ecosystem
                        </CardTitle>
                        <CardDescription>Learn more</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-amber-500 hover:text-amber-500 group/btn" asChild>
                            <a href="https://packagist.org/" target="_blank" rel="noreferrer">
                                Packagist.org
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-amber-500 hover:text-amber-500 group/btn" asChild>
                            <a href="https://getcomposer.org/doc/" target="_blank" rel="noreferrer">
                                Composer Docs
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 hover:border-orange-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-orange-500" />
                            Using Composer
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 font-mono text-sm">
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-orange-500"># Install a package from Packagist</span>
                                <br />
                                composer require vendor/package-name
                            </div>
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-orange-500"># Initialize a new composer.json</span>
                                <br />
                                composer init
                            </div>
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-orange-500"># Install dependencies from composer.json</span>
                                <br />
                                composer install
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="border-border/50 hover:border-orange-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-orange-500" />
                            Publishing
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="mt-1 bg-orange-500/10 p-1.5 rounded-full h-fit">
                                    <FileJson className="h-4 w-4 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">composer.json</h4>
                                    <p className="text-sm text-muted-foreground">Ensure your repository has a valid <code>composer.json</code> file describing your package's metadata.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 bg-orange-500/10 p-1.5 rounded-full h-fit">
                                    <Globe className="h-4 w-4 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">Submit Repository</h4>
                                    <p className="text-sm text-muted-foreground">Submit your public Git repository URL (e.g. GitHub, GitLab) directly on Packagist.org to publish.</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
