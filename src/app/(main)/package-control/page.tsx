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
import { ExternalLink, Globe, Box, DollarSign, CheckCircle2, GitPullRequest, Code, FileText, Sparkles } from 'lucide-react';
import { PlatformLogo } from '@/components/platform-icons';

export default function PackageControlPage() {
    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-300 ease-in-out">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <PlatformLogo platformName="Package Control" className="h-10 w-10" />
                    <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                        Package Control
                    </h1>
                </div>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    The official package manager and repository for Sublime Text plugins, syntax definitions, and themes
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 border-none bg-amber-500/5 hover:bg-amber-500/10 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="text-amber-600 dark:text-amber-400">Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Package Control is the ubiquitous package manager for Sublime Text 3 and 4, used by millions of developers worldwide. It enables discovering, installing, upgrading, and removing packages directly from Sublime Text&apos;s command palette.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Publishing a package is done through a simple Pull Request to the open-source <code>package_control_channel</code> repository on GitHub. Once accepted, Package Control automatically crawls your repository tags and releases, distributing updates with zero manual intervention.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Free & Open Source</Badge>
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Git Tag Automated Sync</Badge>
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Python & JSON</Badge>
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Sublime Text 3 & 4</Badge>
                            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Cross-Platform</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md hover:shadow-lg transition-shadow duration-300 group">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                            Resources
                        </CardTitle>
                        <CardDescription>Official links</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-between hover:border-amber-500 hover:text-amber-600 group/btn" asChild>
                            <a href="https://packagecontrol.io/" target="_blank" rel="noreferrer">
                                Package Control Home
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-amber-500 hover:text-amber-600 group/btn" asChild>
                            <a href="https://packagecontrol.io/docs/submitting_a_package" target="_blank" rel="noreferrer">
                                Submitting a Package Guide
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                        <Button variant="outline" className="w-full justify-between hover:border-amber-500 hover:text-amber-600 group/btn" asChild>
                            <a href="https://github.com/wbond/package_control_channel" target="_blank" rel="noreferrer">
                                Channel Repository (GitHub)
                                <ExternalLink className="h-4 w-4 opacity-50 group-hover/btn:opacity-100" />
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="border-border/50 hover:border-amber-500/50 transition-colors duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Box className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                            Submission Workflow & Automated Crawling
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-green-700 dark:text-green-300">Git Tag-Based Automated Releases</h3>
                            </div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                                Once your package is added to the channel repository, you never need to submit updates manually! Whenever you create a new Git release or semver tag (e.g., <code>v1.2.0</code>) on GitHub, GitLab, or Bitbucket, Package Control automatically updates the package for all users.
                            </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">Pricing & Requirements</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                <strong>Package Distribution:</strong> 100% Free ($0).
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                <strong>Host Requirements:</strong> Public Git repository on GitHub, GitLab, or Bitbucket with valid semantic versioning tags.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">How to Submit a Package</h3>
                            <ol className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                                    <div>
                                        <p className="font-medium">Prepare Your Repository & Semantic Tags</p>
                                        <p className="text-sm text-muted-foreground">Ensure your plugin contains a clean directory structure with a <code>README.md</code>, license, and python/syntax files. Push a release tag using SemVer (e.g. <code>git tag 1.0.0 &amp;&amp; git push origin --tags</code>).</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                                    <div>
                                        <p className="font-medium">Fork wbond/package_control_channel</p>
                                        <p className="text-sm text-muted-foreground">Fork the repository <code>github.com/wbond/package_control_channel</code> and locate the file <code>repository/&lt;letter&gt;.json</code> corresponding to the first letter of your package name.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">3</span>
                                    <div>
                                        <p className="font-medium">Add Your Package JSON Entry</p>
                                        <p className="text-sm text-muted-foreground">Insert your package definition into the alphabetized array:</p>
                                        <pre className="mt-2 p-3 rounded-md bg-zinc-950 text-zinc-100 text-xs overflow-x-auto font-mono">&#123;&#10;  &quot;name&quot;: &quot;MyAwesomePlugin&quot;,&#10;  &quot;details&quot;: &quot;https://github.com/username/my-awesome-plugin&quot;,&#10;  &quot;labels&quot;: [&quot;syntax&quot;, &quot;formatting&quot;]&#10;&#125;</pre>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">4</span>
                                    <div>
                                        <p className="font-medium">Submit Pull Request & Automatic Verification</p>
                                        <p className="text-sm text-muted-foreground">Open a Pull Request. Automated GitHub CI tests check that your repository is reachable, valid, and follows naming guidelines before human review merge.</p>
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Supported Package Types</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-amber-600 dark:text-amber-400">Python Plugins</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Code execution, linters, Git integrations, snippets, and editor enhancements.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-amber-600 dark:text-amber-400">Color Schemes & Themes</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Custom UI themes and `.sublime-color-scheme` workbench styling.</p>
                                </div>
                                <div className="p-3 border rounded-lg bg-card">
                                    <h4 className="font-medium text-sm text-amber-600 dark:text-amber-400">Syntax Definitions</h4>
                                    <p className="text-xs text-muted-foreground mt-0.5">Custom language highlighting built with `.sublime-syntax` YAML definitions.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
