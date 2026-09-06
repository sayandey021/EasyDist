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
import { ExternalLink, Terminal, Code, Package, FileJson } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function NuGetPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="NuGet" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                        NuGet
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The package manager for .NET. The NuGet client tools provide the ability to produce and consume packages.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none bg-blue-700/5 hover:bg-blue-700/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-blue-700">.NET Package Ecosystem</CardTitle>
                        <CardDescription>
                            Create, share, and consume .NET libraries
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The package manager for .NET. The client tools provide the ability to produce and consume packages, while the Gallery is the central repository used by authors globally.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The package manager for .NET. The client tools provide the ability to produce and consume packages, while the Gallery is the central repository used by authors globally.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-blue-700/10 text-blue-700">C# / F# / VB</Badge>
                            <Badge variant="secondary" className="bg-blue-700/10 text-blue-700">.NET Core</Badge>
                            <Badge variant="secondary" className="bg-blue-700/10 text-blue-700">MSBuild</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Code className="h-5 w-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Useful links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-indigo-600 hover:text-indigo-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://www.nuget.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">NuGet Gallery</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-indigo-600 hover:text-indigo-600 group/btn h-auto min-h-10 py-2.5 px-3.5 whitespace-normal" asChild>
                            <a href="https://learn.microsoft.com/en-us/nuget/" target="_blank" rel="noreferrer" className="flex items-center justify-between w-full gap-2">
                                <span className="text-left text-sm font-medium leading-snug line-clamp-2 break-words flex-1 min-w-0">Documentation</span>
                                <ExternalLink className="h-4 w-4 shrink-0 opacity-50 group-hover/btn:opacity-100 transition-opacity" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 hover:border-blue-700/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-blue-700" />
                            Common Commands
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 font-mono text-sm">
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-blue-700"># Add a package to your project</span>
                                <br />
                                dotnet add package Newtonsoft.Json
                            </div>
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-blue-700"># Pack your project into a .nupkg</span>
                                <br />
                                dotnet pack -c Release
                            </div>
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-blue-700"># Push package to NuGet.org</span>
                                <br />
                                dotnet nuget push bin/Release/*.nupkg -k {'<api-key>'} -s https://api.nuget.org/v3/index.json
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="border-border/50 hover:border-blue-700/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-blue-700" />
                            Key Concepts
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="mt-1 bg-blue-700/10 p-1.5 rounded-full h-fit">
                                    <FileJson className="h-4 w-4 text-blue-700" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">.nuspec Files</h4>
                                    <p className="text-sm text-muted-foreground">An XML manifest that contains package metadata. Used to build packages.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 bg-blue-700/10 p-1.5 rounded-full h-fit">
                                    <Package className="h-4 w-4 text-blue-700" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">.nupkg Files</h4>
                                    <p className="text-sm text-muted-foreground">A ZIP archive with the .nupkg extension that contains compiled code (DLLs), other files related to that code, and a descriptive manifest.</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
