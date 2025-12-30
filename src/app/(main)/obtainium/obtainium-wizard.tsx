'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Download,
    Copy,
} from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { saveHistoryItem } from '@/lib/history';
import { Separator } from '@/components/ui/separator';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

const steps = [
    { id: 1, name: 'App Details' },
    { id: 2, name: 'Source Configuration' },
    { id: 3, name: 'Generate Config' },
];

const formSchema = z.object({
    id: z.string().min(1, 'App ID is required.'),
    name: z.string().min(1, 'App name is required.'),
    author: z.string().optional(),
    url: z.string().url('Must be a valid URL.'),
    sourceType: z.enum([
        'github',
        'gitlab',
        'codeberg',
        'fdroid',
        'izzyondroid',
        'apkpure',
        'aptoide',
        'uptodown',
        'huawei',
        'other'
    ]).default('github'),
    additionalSettings: z.object({
        includePrereleases: z.boolean().default(false),
        fallbackToOlderReleases: z.boolean().default(true),
        trackOnly: z.boolean().default(false),
        versionExtractionRegEx: z.string().optional(),
        matchGroupToUse: z.string().optional(),
        apkFilterRegEx: z.string().optional(),
    }).optional(),
    categories: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function ObtainiumWizard() {
    const [step, setStep] = useState(1);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '',
            name: '',
            author: '',
            url: '',
            sourceType: 'github',
            additionalSettings: {
                includePrereleases: false,
                fallbackToOlderReleases: true,
                trackOnly: false,
                versionExtractionRegEx: '',
                matchGroupToUse: '',
                apkFilterRegEx: '',
            },
            categories: '',
        },
        mode: 'onChange',
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const onStep1Submit = async () => {
        const isValid = await form.trigger(['id', 'name', 'url', 'sourceType']);
        if (isValid) {
            nextStep();
        } else {
            toast({
                variant: "destructive",
                title: "Validation Error",
                description: "Please fill out all required fields before proceeding."
            });
        }
    };

    const onSubmit = (data: FormData) => {
        saveHistoryItem({
            type: 'Obtainium',
            packageName: data.id,
            packageVersion: 'latest',
        });
        nextStep();
    };

    const generateConfig = (data: FormData) => {
        const config = {
            id: data.id,
            url: data.url,
            author: data.author || data.id.split('.')[1] || 'Unknown',
            name: data.name,
            additionalSettings: JSON.stringify({
                includePrereleases: data.additionalSettings?.includePrereleases || false,
                fallbackToOlderReleases: data.additionalSettings?.fallbackToOlderReleases ?? true,
                trackOnly: data.additionalSettings?.trackOnly || false,
                versionExtractionRegEx: data.additionalSettings?.versionExtractionRegEx || '',
                matchGroupToUse: data.additionalSettings?.matchGroupToUse || '',
                apkFilterRegEx: data.additionalSettings?.apkFilterRegEx || '',
            }),
            ...(data.categories && { categories: data.categories.split(',').map(c => c.trim()) }),
        };
        return JSON.stringify(config, null, 2);
    };

    const generateObtainiumUrl = (data: FormData) => {
        const baseUrl = 'obtainium://add/';
        return `${baseUrl}${encodeURIComponent(data.url)}`;
    };

    const downloadFile = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'application/json;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copied!",
            description: "Link copied to clipboard."
        });
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <Form {...form}>
                        <form onSubmit={(e) => { e.preventDefault(); onStep1Submit(); }}>
                            <CardContent className="space-y-8 p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">App Identity</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>App ID (Package Name)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="com.example.app" {...field} />
                                                    </FormControl>
                                                    <FormDescription>The Android package name.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>App Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="My App" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="author"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Author (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Developer name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Source</h3>
                                    <FormField
                                        control={form.control}
                                        name="sourceType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Source Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select source type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="github">GitHub</SelectItem>
                                                        <SelectItem value="gitlab">GitLab</SelectItem>
                                                        <SelectItem value="codeberg">Codeberg</SelectItem>
                                                        <SelectItem value="fdroid">F-Droid</SelectItem>
                                                        <SelectItem value="izzyondroid">IzzyOnDroid</SelectItem>
                                                        <SelectItem value="apkpure">APKPure</SelectItem>
                                                        <SelectItem value="aptoide">Aptoide</SelectItem>
                                                        <SelectItem value="uptodown">Uptodown</SelectItem>
                                                        <SelectItem value="huawei">Huawei AppGallery</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Source URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://github.com/user/repo" {...field} />
                                                </FormControl>
                                                <FormDescription>URL to the app's releases page.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end gap-2">
                                <Button type="submit">
                                    Next <ArrowRight />
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                );
            case 2:
                return (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-8 p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Release Settings</h3>
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="additionalSettings.includePrereleases"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Include Pre-releases</FormLabel>
                                                        <FormDescription>
                                                            Include alpha, beta, and RC versions.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="additionalSettings.fallbackToOlderReleases"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Fallback to Older Releases</FormLabel>
                                                        <FormDescription>
                                                            If latest has no APK, try older releases.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="additionalSettings.trackOnly"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                                    <div className="space-y-0.5">
                                                        <FormLabel className="text-base">Track Only</FormLabel>
                                                        <FormDescription>
                                                            Only notify about updates, don't download.
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Advanced Filters (Optional)</h3>
                                    <FormField
                                        control={form.control}
                                        name="additionalSettings.apkFilterRegEx"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>APK Filter RegEx</FormLabel>
                                                <FormControl>
                                                    <Input placeholder=".*arm64.*\.apk" {...field} />
                                                </FormControl>
                                                <FormDescription>Filter APK files by name (e.g., for specific architectures).</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="additionalSettings.versionExtractionRegEx"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Version Extraction RegEx</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="v([0-9.]+)" {...field} />
                                                </FormControl>
                                                <FormDescription>Custom regex to extract version from release tag.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="categories"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Categories</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Utilities, Productivity" {...field} />
                                                </FormControl>
                                                <FormDescription>Comma-separated list of categories.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="justify-between gap-2">
                                <Button type="button" variant="ghost" onClick={prevStep}>
                                    <ArrowLeft /> Back
                                </Button>
                                <Button type="submit">
                                    Generate <ArrowRight />
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                );
            case 3:
                const formData = form.getValues();
                const configContent = generateConfig(formData);
                const obtainiumUrl = generateObtainiumUrl(formData);
                const filename = `${formData.id}.json`;
                return (
                    <CardContent className="space-y-6 p-6">
                        <div>
                            <h3 className="text-lg font-medium">Quick Add Link</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                Users can click this link to add your app directly to Obtainium:
                            </p>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 bg-muted p-2 rounded text-sm break-all">{obtainiumUrl}</code>
                                <Button variant="outline" size="icon" onClick={() => copyToClipboard(obtainiumUrl)}>
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium">Crowdsourced Config</h3>
                            <p className="text-sm text-muted-foreground">
                                Submit this config to <a href="https://apps.obtainium.imranr.dev/" target="_blank" className="text-primary underline">apps.obtainium.imranr.dev</a>
                            </p>
                            <div className="relative mt-2">
                                <CodeBlock code={configContent} language="json" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2 h-7 w-7"
                                    onClick={() => downloadFile(configContent, filename)}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Next Steps</h3>
                            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                                <li>Share the Obtainium link in your app's README.</li>
                                <li>Optionally submit to the <a href="https://apps.obtainium.imranr.dev/" target="_blank" className="text-primary underline">crowdsourced app list</a>.</li>
                                <li>Users can now track and update your app directly from source!</li>
                            </ol>
                        </div>
                    </CardContent>
                );
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Obtainium Config Generator</CardTitle>
                            <CardDescription>
                                Step {step} of {steps.length}: {steps[step - 1].name}
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-2">
                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${step > s.id
                                            ? 'bg-primary text-primary-foreground'
                                            : step === s.id
                                                ? 'border-2 border-primary text-primary'
                                                : 'bg-muted text-muted-foreground'
                                            }`}
                                    >
                                        {step > s.id ? <Check className="h-4 w-4" /> : s.id}
                                    </div>
                                    {i < steps.length - 1 && (
                                        <div className="h-0.5 w-8 bg-border" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <div className="min-h-[500px]">
                    <div key={step} className="animate-in fade-in duration-300">
                        {renderStepContent()}
                    </div>
                </div>
                {step === 3 && (
                    <CardFooter className="justify-end">
                        <Button variant="ghost" onClick={prevStep}>
                            <ArrowLeft /> Back to Edit
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
