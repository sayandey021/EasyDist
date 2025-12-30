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
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileUp,
  Loader,
  Github,
} from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateSHA256 } from '@/lib/crypto';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import type { SettingsData } from '@/lib/settings';
import { settingsKey } from '@/lib/settings';
import { saveHistoryItem } from '@/lib/history';


const steps = [
  { id: 1, name: 'Upload Installer' },
  { id: 2, name: 'Manifest Details' },
  { id: 3, name: 'Generate Manifest' },
];

const formSchema = z.object({
  packageIdentifier: z
    .string()
    .min(1, 'Package Identifier is required.')
    .regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/, 'Must be in Vendor.AppName format.'),
  packageVersion: z.string().min(1, 'Package Version is required.'),
  packageName: z.string().min(1, 'App Name is required.'),
  publisher: z.string().min(1, 'Publisher is required.'),
  license: z.string().min(1, 'License is required.'),
  shortDescription: z.string().min(1, 'Description is required.'),
  installerUrl: z.string().url('Must be a valid URL.'),
  installerSha256: z.string().min(64, 'SHA256 hash is required.'),
  architecture: z.string().min(1, 'Architecture is required'),
  installerType: z.string().min(1, 'Installer type is required'),
});

type FormData = z.infer<typeof formSchema>;

export function WingetWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isHashing, startHashing] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packageIdentifier: '',
      packageVersion: '',
      packageName: '',
      publisher: '',
      license: '',
      shortDescription: '',
      installerUrl: '',
      installerSha256: '',
      architecture: 'x64',
      installerType: 'exe',
    },
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem(settingsKey);
    if (savedSettings) {
      try {
        const parsedSettings: SettingsData = JSON.parse(savedSettings);
        if (parsedSettings.publisher) {
          form.setValue('publisher', parsedSettings.publisher);
        }
      } catch (error) {
        console.error('Failed to parse settings for WinGet wizard', error);
      }
    }
  }, [form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select an installer file to continue.',
      });
      return;
    }

    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('installerSha256', hash);
      setStep(2);
    });
  };

  const handleHashCalculation = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file available',
        description: 'Please go back and upload an installer file first.',
      });
      return;
    }
    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('installerSha256', hash, { shouldValidate: true });
      toast({
        title: 'Hash Calculated',
        description: 'SHA256 hash has been updated.'
      })
    });
  }

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'WinGet',
      packageName: data.packageIdentifier,
      packageVersion: data.packageVersion,
    });
    nextStep();
  }

  const generateYaml = (data: FormData) => {
    return `PackageIdentifier: ${data.packageIdentifier}
PackageVersion: ${data.packageVersion}
PackageLocale: en-US
Publisher: ${data.publisher}
PackageName: ${data.packageName}
License: ${data.license}
ShortDescription: ${data.shortDescription}
Installers:
  - Architecture: ${data.architecture}
    InstallerType: ${data.installerType}
    InstallerUrl: ${data.installerUrl}
    InstallerSha256: ${data.installerSha256}
ManifestType: singleton
ManifestVersion: 1.6.0
`;
  };

  const generateSubmissionUrl = (data: FormData) => {
    const path = `manifests/${data.publisher.toLowerCase()[0]}/${data.publisher}/${data.packageName}/${data.packageVersion}/${data.publisher}.${data.packageName}.yaml`;
    return `https://github.com/microsoft/winget-pkgs/new/master?filename=${path}`;
  };

  const downloadYaml = () => {
    const data = form.getValues();
    const yamlContent = generateYaml(data);
    const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.publisher}.${data.packageName}.yaml`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CardContent className="flex flex-col items-center justify-center gap-6 p-10 text-center">
            <FileUp className="h-16 w-16 text-muted-foreground" />
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Upload Your Installer</h3>
              <p className="text-muted-foreground">
                Select your application's installer file (.exe, .msi) to
                calculate its SHA256 hash.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="installerFile"
                type="file"
                onChange={handleFileChange}
                disabled={isHashing}
                className="flex-grow"
              />
              <Button onClick={handleFileUpload} disabled={!file || isHashing}>
                {isHashing ? <Loader className="animate-spin" /> : 'Continue'}
              </Button>
            </div>
          </CardContent>
        );
      case 2:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Application Details</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="packageName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., My Awesome App" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="packageVersion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Version</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1.2.3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="publisher"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publisher</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., My Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="packageIdentifier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Identifier</FormLabel>
                          <FormControl>
                            <Input placeholder="Publisher.AppName" {...field} />
                          </FormControl>
                          <FormDescription>
                            A unique ID, e.g., MyCompany.MyApp.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="A brief summary of your application." {...field} />
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
                        <FormControl>
                          <Input placeholder="e.g., MIT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Installer Details</h3>
                  <FormField
                    control={form.control}
                    name="installerUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Installer URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/installer.exe" {...field} />
                        </FormControl>
                        <FormDescription>The public download link for your installer.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="installerSha256"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Installer SHA256 Hash</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input placeholder="SHA256 hash of the installer" {...field} readOnly={isHashing} />
                          </FormControl>
                          <Button type="button" variant="outline" onClick={handleHashCalculation} disabled={isHashing || !file}>
                            {isHashing ? <Loader className="animate-spin" /> : 'Recalculate'}
                          </Button>
                        </div>
                        <FormDescription>The hash was auto-calculated. You can recalculate if you changed the file.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="installerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Installer Type</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., exe, msi" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="architecture"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Architecture</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., x64, x86, arm64" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

              </CardContent>
              <CardFooter className="justify-end gap-2">
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
        const submissionUrl = generateSubmissionUrl(formData);
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated Manifest</h3>
              <p className="text-sm text-muted-foreground">
                Copy this content to your clipboard.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={generateYaml(formData)} language="yaml" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={downloadYaml}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Submit to WinGet</h3>
              <p className="text-sm text-muted-foreground">
                Click the button below to open GitHub and create a new file. You will need to paste the manifest content.
              </p>
              <div className="mt-4">
                <Button asChild>
                  <Link href={submissionUrl} target="_blank" rel="noopener noreferrer">
                    <Github />
                    Create Pull Request
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
              <CardTitle>WinGet Manifest Creator</CardTitle>
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
                  {i < steps.length - 1 && <div className="h-0.5 w-8 bg-border" />}
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
        <div className="min-h-[400px]">
          <div key={step} className="animate-in fade-in duration-300">
            {renderStepContent()}
          </div>
        </div>
        {step === 3 && (
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
