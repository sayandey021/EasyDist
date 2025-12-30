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
    ExternalLink,
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
import Link from 'next/link';

const steps = [
    { id: 1, name: 'App Details' },
    { id: 2, name: 'Metadata' },
    { id: 3, name: 'Generate & Submit' },
];

const formSchema = z.object({
    appId: z.string().min(1, 'App ID is required.').regex(/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/, {
        message: 'Must be a valid Android package name (e.g., com.example.app)',
    }),
    name: z.string().min(1, 'App name is required.'),
    summary: z.string().min(1, 'Summary is required.').max(80, 'Summary must be 80 characters or less'),
    description: z.string().min(1, 'Description is required.'),
    license: z.string().min(1, 'License is required.'),
    sourceCode: z.string().url('Must be a valid URL.'),
    issueTracker: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
    changelog: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
    authorName: z.string().optional(),
    authorEmail: z.string().email().optional().or(z.literal('')),
    categories: z.array(z.string()).optional(),
    antiFeatures: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof formSchema>;

const categoryOptions = [
    'Connectivity', 'Development', 'Games', 'Graphics', 'Internet',
    'Money', 'Multimedia', 'Navigation', 'Phone & SMS', 'Reading',
    'Science & Education', 'Security', 'Sports & Health', 'System', 'Theming',
    'Time', 'Writing',
];

const antiFeatureOptions = [
    { value: 'Ads', label: 'Ads - Contains advertising' },
    { value: 'Tracking', label: 'Tracking - Tracks/reports user activity' },
    { value: 'NonFreeNet', label: 'NonFreeNet - Requires non-free network services' },
    { value: 'NonFreeAdd', label: 'NonFreeAdd - Promotes non-free add-ons' },
    { value: 'NonFreeDep', label: 'NonFreeDep - Depends on non-free app' },
    { value: 'NSFW', label: 'NSFW - Contains adult content' },
    { value: 'UpstreamNonFree', label: 'UpstreamNonFree - Upstream source is non-free' },
];

export function IzzyOnDroidWizard() {
    const [step, setStep] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAntiFeatures, setSelectedAntiFeatures] = useState<string[]>([]);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            appId: '',
            name: '',
            summary: '',
            description: '',
            license: 'GPL-3.0-only',
            sourceCode: '',
            issueTracker: '',
            changelog: '',
            authorName: '',
            authorEmail: '',
            categories: [],
            antiFeatures: [],
        },
        mode: 'onChange',
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const onStep1Submit = async () => {
        const isValid = await form.trigger(['appId', 'name', 'summary', 'description']);
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
            type: 'IzzyOnDroid',
            packageName: data.appId,
            packageVersion: 'latest',
        });
        nextStep();
    };

    const generateMetadata = (data: FormData) => {
        const lines = [
            `Categories:${selectedCategories.join(',')}`,
            `License:${data.license}`,
            `AuthorName:${data.authorName || ''}`,
            `AuthorEmail:${data.authorEmail || ''}`,
            `SourceCode:${data.sourceCode}`,
            `IssueTracker:${data.issueTracker || ''}`,
            `Changelog:${data.changelog || ''}`,
            '',
            `Name:${data.name}`,
            `Summary:${data.summary}`,
            '',
            'Description:',
            data.description,
            '.',
            '',
        ];

        if (selectedAntiFeatures.length > 0) {
            lines.push(`AntiFeatures:${selectedAntiFeatures.join(',')}`);
        }

        return lines.join('\n');
    };

    const generateSubmissionTemplate = (data: FormData) => {
        return `## App Inclusion Request

**App ID:** \`${data.appId}\`
**App Name:** ${data.name}
**Source Code:** ${data.sourceCode}
**License:** ${data.license}

### Description
${data.summary}

${data.description}

### Checklist
- [ ] The app is open source under a FOSS license
- [ ] The source code is publicly available
- [ ] The app has a signed APK in releases
- [ ] No proprietary dependencies (or they are documented)

### Anti-Features
${selectedAntiFeatures.length > 0 ? selectedAntiFeatures.map(af => `- ${af}`).join('\n') : 'None'}
`;
    };

    const downloadFile = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleCategory = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const toggleAntiFeature = (af: string) => {
        setSelectedAntiFeatures(prev =>
            prev.includes(af) ? prev.filter(a => a !== af) : [...prev, af]
        );
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
                                            name="appId"
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
                                        name="summary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Summary (max 80 chars)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="A brief one-line description" maxLength={80} {...field} />
                                                </FormControl>
                                                <FormDescription>{field.value?.length || 0}/80 characters</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="A detailed description of your app..."
                                                        rows={5}
                                                        {...field}
                                                    />
                                                </FormControl>
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
                                    <h3 className="text-lg font-medium">Source & License</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="sourceCode"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Source Code URL</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/user/repo" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="license"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>License</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a license" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="GPL-3.0-only">GPL-3.0</SelectItem>
                                                            <SelectItem value="GPL-2.0-only">GPL-2.0</SelectItem>
                                                            <SelectItem value="Apache-2.0">Apache-2.0</SelectItem>
                                                            <SelectItem value="MIT">MIT</SelectItem>
                                                            <SelectItem value="BSD-3-Clause">BSD-3-Clause</SelectItem>
                                                            <SelectItem value="LGPL-3.0-only">LGPL-3.0</SelectItem>
                                                            <SelectItem value="MPL-2.0">MPL-2.0</SelectItem>
                                                            <SelectItem value="AGPL-3.0-only">AGPL-3.0</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="issueTracker"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Issue Tracker (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/user/repo/issues" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="changelog"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Changelog URL (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/user/repo/releases" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {categoryOptions.map(cat => (
                                            <Button
                                                key={cat}
                                                type="button"
                                                variant={selectedCategories.includes(cat) ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => toggleCategory(cat)}
                                            >
                                                {cat}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Anti-Features (if any)</h3>
                                    <p className="text-sm text-muted-foreground">Select any that apply to be transparent with users.</p>
                                    <div className="space-y-2">
                                        {antiFeatureOptions.map(af => (
                                            <Button
                                                key={af.value}
                                                type="button"
                                                variant={selectedAntiFeatures.includes(af.value) ? "destructive" : "outline"}
                                                size="sm"
                                                className="mr-2 mb-2"
                                                onClick={() => toggleAntiFeature(af.value)}
                                            >
                                                {af.label}
                                            </Button>
                                        ))}
                                    </div>
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
                const metadataContent = generateMetadata(formData);
                const submissionTemplate = generateSubmissionTemplate(formData);
                const metadataFilename = `${formData.appId}.yml`;
                return (
                    <CardContent className="space-y-6 p-6">
                        <div>
                            <h3 className="text-lg font-medium">Generated Metadata</h3>
                            <p className="text-sm text-muted-foreground">
                                This is the F-Droid compatible metadata for your app.
                            </p>
                            <div className="relative mt-2">
                                <CodeBlock code={metadataContent} language="yaml" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2 h-7 w-7"
                                    onClick={() => downloadFile(metadataContent, metadataFilename)}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="text-lg font-medium">GitLab Issue Template</h3>
                            <p className="text-sm text-muted-foreground">
                                Copy this to submit an inclusion request on GitLab.
                            </p>
                            <div className="relative mt-2">
                                <CodeBlock code={submissionTemplate} language="markdown" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 top-2 h-7 w-7"
                                    onClick={() => downloadFile(submissionTemplate, 'inclusion-request.md')}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Next Steps</h3>
                            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                                <li>Ensure your app has signed APK releases on GitHub/GitLab/Codeberg.</li>
                                <li>Open an inclusion request on the <a href="https://gitlab.com/AuroraOSS/auroradroid/-/issues/new" target="_blank" className="text-primary underline">IzzyOnDroid GitLab</a>.</li>
                                <li>Wait for Izzy to review and add your app to the repository.</li>
                            </ol>
                            <div className="mt-4">
                                <Button asChild>
                                    <Link href="https://apt.izzysoft.de/fdroid/index/info" target="_blank">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        IzzyOnDroid Info
                                    </Link>
                                </Button>
                            </div>
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
                            <CardTitle>IzzyOnDroid Submission Helper</CardTitle>
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
