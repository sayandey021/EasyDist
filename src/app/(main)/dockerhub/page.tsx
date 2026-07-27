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
import { ExternalLink, Terminal, ShieldCheck, Box, Settings, HardDrive } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function DockerHubPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Docker Hub" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                        Docker Hub
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The world's largest library and community for container images. Push, pull, and manage your containerized applications with ease.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-blue-500/5 hover:bg-blue-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-blue-500">Container Registry</CardTitle>
                        <CardDescription>
                            Host and distribute your container images globally
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The world's largest library and community for container images. It provides a centralized resource for image discovery, distribution, user collaboration, and automated build workflows.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            The world's largest library and community for container images. It provides a centralized resource for image discovery, distribution, user collaboration, and automated build workflows.
                        </p>
                        
                        
                        
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Public & Private Repos</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Automated Builds</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Webhooks</Badge>
                            <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Vulnerability Scanning</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-cyan-500 group-hover:scale-110 transition-transform" />
                            Getting Started
                        </CardTitle>
                        <CardDescription>Quick links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-cyan-500 hover:text-cyan-500 group/btn" asChild>
                            <a href="https://hub.docker.com/" target="_blank" rel="noreferrer">
                                Docker Hub Home
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-cyan-500 hover:text-cyan-500 group/btn" asChild>
                            <a href="https://docs.docker.com/docker-hub/" target="_blank" rel="noreferrer">
                                Documentation
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 hover:border-blue-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-blue-500" />
                            Basic Workflow
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 font-mono text-sm">
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-blue-500"># Log in to Docker Hub</span>
                                <br />
                                docker login
                            </div>
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-blue-500"># Build and tag your image</span>
                                <br />
                                docker build -t username/my-app:1.0 .
                            </div>
                            <div className="p-3 bg-muted/50 rounded-md border border-border/50">
                                <span className="text-blue-500"># Push to the registry</span>
                                <br />
                                docker push username/my-app:1.0
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="border-border/50 hover:border-blue-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-blue-500" />
                            Key Features
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="mt-1 bg-blue-500/10 p-1.5 rounded-full h-fit">
                                    <HardDrive className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">Unlimited Public Repos</h4>
                                    <p className="text-sm text-muted-foreground">Share your open-source container images with the world for free.</p>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <div className="mt-1 bg-blue-500/10 p-1.5 rounded-full h-fit">
                                    <Settings className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-foreground">Automated Builds</h4>
                                    <p className="text-sm text-muted-foreground">Automatically build images from source code in an external repository like GitHub or Bitbucket.</p>
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
