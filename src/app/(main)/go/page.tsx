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
import { ExternalLink, Terminal, Globe, ShieldCheck, FileJson, Server, Code, Box, CheckCircle2, DollarSign } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';
import { GoWizard } from './go-wizard';

export default function GoPage() {
    return (
        <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Go" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                        Go Modules (go mod)
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Dependency management system built into the Go programming language.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-cyan-600 dark:text-cyan-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A module is a collection of Go packages stored in a file tree with a go.mod file at its root. The go.mod file defines the module's module path, which is also the import path used for the root directory, and its dependency requirements.
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">Go</Badge>
                            <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">Dependency Management</Badge>
                            <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">Built-in</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-cyan-500 hover:text-cyan-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://go.dev/ref/mod" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Go Modules Reference</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-cyan-500 hover:text-cyan-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://pkg.go.dev/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">pkg.go.dev</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <GoWizard />
        </div>
    );
}
