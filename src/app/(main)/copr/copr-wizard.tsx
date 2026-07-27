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

const steps = [
    { id: 1, name: 'About' },
    { id: 2, name: 'Package Details' },
    { id: 3, name: 'Build Configuration' },
    { id: 4, name: 'Generate Spec File' },
];

const formSchema = z.object({
    name: z.string().min(1, 'Package name is required.'),
    version: z.string().min(1, 'Version is required.'),
    release: z.string().default('1'),
    summary: z.string().min(1, 'Summary is required.'),
    license: z.string().min(1, 'License is required.'),
    url: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
    source0: z.string().min(1, 'Source URL is required.'),
    buildRequires: z.string().optional(),
    requires: z.string().optional(),
    description: z.string().min(1, 'Description is required.'),
    prep: z.string().optional(),
    build: z.string().optional(),
    install: z.string().optional(),
    files: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function CoprWizard() {
    const [step, setStep] = useState(1);
    const { toast } = useToast();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            version: '1.0.0',
            release: '1',
            summary: '',
            license: 'MIT',
            url: '',
            source0: '',
            buildRequires: 'gcc\nmake',
            requires: '',
            description: '',
            prep: '%autosetup',
            build: '%configure\n%make_build',
            install: '%make_install',
            files: '%license LICENSE\n%doc README.md\n%{_bindir}/%{name}',
        },
        mode: 'onChange',
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const onStep1Submit = async () => {
        const isValid = await form.trigger(['name', 'version', 'summary', 'license', 'description']);
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
            type: 'Copr',
            packageName: data.name,
            packageVersion: data.version,
        });
        nextStep();
    };

    const generateSpecFile = (data: FormData) => {
        const buildRequiresList = data.buildRequires?.split('\n').filter(Boolean).map(br => `BuildRequires:  ${br}`).join('\n') || '';
        const requiresList = data.requires?.split('\n').filter(Boolean).map(r => `Requires:       ${r}`).join('\n') || '';

        return `Name:           ${data.name}
Version:        ${data.version}
Release:        ${data.release}%{?dist}
Summary:        ${data.summary}

License:        ${data.license}
${data.url ? `URL:            ${data.url}` : ''}
Source0:        ${data.source0}

${buildRequiresList}
${requiresList}

%description
${data.description}

%prep
${data.prep || '%autosetup'}

%build
${data.build || '%configure\n%make_build'}

%install
${data.install || '%make_install'}

%files
${data.files || '%license LICENSE\n%{_bindir}/%{name}'}

%changelog
* $(date +"%a %b %d %Y") Your Name <your.email@example.com> - ${data.version}-${data.release}
- Initial package
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

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <CardContent className="space-y-6 p-6">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">About Copr</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Copr is an easy-to-use automatic build system providing a package repository as its output. It is hosted by the Fedora Project but you can build packages for Fedora, EPEL, Mageia, and openSUSE.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4">
                                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Key Features</h4>
                                        <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-400 space-y-1">
                                            <li>Automatic builds from source</li>
                                            <li>Hosted Yum/DNF repositories</li>
                                            <li>Cross-distribution support</li>
                                        </ul>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Software metadata (Name, Version, etc.)</li>
                      <li>Source code or binary download URL</li>
                      <li>Basic understanding of the platform</li>
                    </ul>
                  </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end gap-2">
                            <Button onClick={nextStep}>
                                Start Wizard <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </>
                );
            case 2:
                return (
                    <Form {...form}>
                        <form onSubmit={(e) => { e.preventDefault(); onStep1Submit(); }}>
                            <CardContent className="space-y-8 p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Package Identity</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Package Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="my-app" {...field} />
                                                    </FormControl>
                                                    <FormDescription>The name of your RPM package.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="version"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Version</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="1.0.0" {...field} />
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
                                                <FormLabel>Summary</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="A brief description of your package" {...field} />
                                                </FormControl>
                                                <FormDescription>One-line summary of your package.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                                                            <SelectItem value="MIT">MIT</SelectItem>
                                                            <SelectItem value="GPL-3.0-only">GPL-3.0</SelectItem>
                                                            <SelectItem value="GPL-2.0-only">GPL-2.0</SelectItem>
                                                            <SelectItem value="Apache-2.0">Apache-2.0</SelectItem>
                                                            <SelectItem value="BSD-3-Clause">BSD-3-Clause</SelectItem>
                                                            <SelectItem value="LGPL-3.0-only">LGPL-3.0</SelectItem>
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
                                                    <FormLabel>Project URL (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://github.com/user/project" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="A detailed description of your package..."
                                                        rows={3}
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>

                        </form>
                    </Form>
                );
            case 3:
                return (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-8 p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Source Code</h3>
                                    <FormField
                                        control={form.control}
                                        name="source0"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Source URL</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://github.com/user/repo/archive/v%{version}.tar.gz" {...field} />
                                                </FormControl>
                                                <FormDescription>URL to the source tarball. Use %{'{'}version{'}'} for version substitution.</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Dependencies</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="buildRequires"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Build Requirements</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="gcc&#10;make&#10;cmake"
                                                            rows={4}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>One package per line.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="requires"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Runtime Requirements</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="glibc&#10;openssl"
                                                            rows={4}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>One package per line.</FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Build Steps</h3>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="prep"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>%prep Section</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows={3} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="build"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>%build Section</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows={3} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <FormField
                                            control={form.control}
                                            name="install"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>%install Section</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows={3} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="files"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>%files Section</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows={3} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>

                        </form>
                    </Form>
                );
            case 4:
                const formData = form.getValues();
                const specContent = generateSpecFile(formData);
                const filename = `${formData.name}.spec`;
                return (
                    <CardContent className="space-y-6 p-6">
                        <div>
                            <h3 className="text-lg font-medium">Generated RPM Spec File</h3>
                            <p className="text-sm text-muted-foreground">
                                Save this as <code>{filename}</code> and upload to Copr.
                            </p>
                            <div className="relative mt-2">
                                <CodeBlock code={specContent} language="ini" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-10 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                                    onClick={() => downloadFile(specContent, filename)}
                                >
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Next Steps</h3>
                            <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                                <li>Create an SRPM using <code>rpmbuild -bs {filename}</code></li>
                                <li>Go to <a href="https://copr.fedorainfracloud.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Copr Dashboard</a> and create a new project.</li>
                                <li>Upload your SRPM or link your Git repository with this spec file.</li>
                                <li>Select the Fedora/EPEL versions you want to build for.</li>
                            </ol>
                        </div>
                    </CardContent>
                );
        }
    };

    return (
        <div className="mx-auto w-full max-w-none">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Copr Spec File Generator</CardTitle>
                            <CardDescription>
                                Step {step} of {steps.length}: {steps[step - 1].name}
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {steps.map((s, i) => (
                                <div key={s.id} className="flex items-center gap-2" title={s.name}>
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
                <div className="w-full">
                    <div key={step} className="animate-in fade-in duration-300">
                        {renderStepContent()}
                    </div>
                </div>                {step > 1 && step < 4 && (
                    <CardFooter className='justify-between gap-2'>
                        <Button type="button" variant="ghost" onClick={prevStep}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button
                            onClick={() => {
                                if (step === 2) onStep1Submit();
                                else form.handleSubmit(onSubmit)();
                            }}
                        >
                            Next <ArrowRight />
                        </Button>
                    </CardFooter>
                )}
                {step === 4 && (
                    <CardFooter className='justify-end'>
                        <Button variant="ghost" onClick={prevStep}>
                            <ArrowLeft /> Back to Edit
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    );
}
