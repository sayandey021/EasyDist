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
} from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { calculateSHA256 } from '@/lib/crypto';
import CodeBlock from '@/components/code-block';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import type { SettingsData } from '@/lib/settings';
import { settingsKey } from '@/lib/settings';
import { saveHistoryItem } from '@/lib/history';

const steps = [
  { id: 1, name: 'Upload APK' },
  { id: 2, name: 'Metadata Details' },
  { id: 3, name: 'Generate Metadata' },
];

const formSchema = z.object({
  appName: z.string().min(1, 'App Name is required.'),
  packageName: z
    .string()
    .min(1, 'Package Name is required.')
    .regex(/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[a-z0-9_]*$/, {
      message: 'Invalid Android package name format.',
    }),
  versionCode: z.coerce.number().int().positive('Version code must be a positive integer.'),
  versionName: z.string().min(1, 'Version name is required.'),
  apkName: z.string().min(1, 'APK Filename is required.'),
  hash: z.string().min(64, 'SHA256 hash is required.'),
  signer: z.string().optional(),
  iconPath: z.string().optional(),
  summary: z.string().min(1, 'Summary is required.'),
  description: z.string().min(1, 'Description is required.'),
  webSite: z.string().url('Must be a valid URL.'),
  sourceCode: z.string().url('Must be a valid URL.'),
  issueTracker: z.string().url('Must be a valid URL.'),
  license: z.string().min(1, 'License is required.'),
  authorName: z.string().min(1, 'Author Name is required.'),
  authorEmail: z.string().email().optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

export function FDroidWizard() {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isHashing, startHashing] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appName: '',
      packageName: '',
      versionCode: 1,
      versionName: '',
      apkName: '',
      hash: '',
      signer: '',
      iconPath: '',
      summary: '',
      description: '',
      webSite: '',
      sourceCode: '',
      issueTracker: '',
      license: '',
      authorName: '',
      authorEmail: '',
    },
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem(settingsKey);
    if (savedSettings) {
      try {
        const parsedSettings: SettingsData = JSON.parse(savedSettings);
        if (parsedSettings.authorName) {
          form.setValue('authorName', parsedSettings.authorName);
        }
        if (parsedSettings.authorEmail) {
          form.setValue('authorEmail', parsedSettings.authorEmail);
        }
      } catch (error) {
        console.error('Failed to parse settings for F-Droid wizard', error);
      }
    }
  }, [form]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      form.setValue('apkName', selectedFile.name);
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select an APK file to continue.',
      });
      return;
    }

    startHashing(async () => {
      const hash = await calculateSHA256(file);
      form.setValue('hash', hash);
      toast({
        title: 'APK Hash Calculated',
        description:
          "The file's SHA256 hash has been calculated. Please fill in the remaining details.",
      });
      setStep(2);
    });
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'F-Droid',
      packageName: data.packageName,
      packageVersion: data.versionName,
    });
    nextStep();
  };

  const generateYaml = (data: FormData) => {
    let yaml = `Categories:
  - Multimedia
Name: ${data.appName}
Summary: ${data.summary}
Description: |-
  ${data.description.replace(/\n/g, '\n  ')}
License: ${data.license}
WebSite: ${data.webSite}
SourceCode: ${data.sourceCode}
IssueTracker: ${data.issueTracker}

AuthorName: ${data.authorName}
`;
    if (data.authorEmail) {
      yaml += `AuthorEmail: ${data.authorEmail}\n`;
    }

    yaml += `
RepoType: git
Repo: ${data.sourceCode}

Builds:
  - versionName: ${data.versionName}
    versionCode: ${data.versionCode}
    commit: ${data.versionName}
    subdir: app
    init:
      - sed -i -e '/applicationId/d' build.gradle
      - echo "applicationId \\"${data.packageName}\\"" >> build.gradle
    apk: ${data.apkName}
    gradle:
      - yes
    scandelete:
      - app/build/outputs/apk/release/app-release-unsigned.apk

AutoUpdateMode: Version %v
UpdateCheckMode: Tags
CurrentVersion: ${data.versionName}
CurrentVersionCode: ${data.versionCode}
`;
    return yaml;
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
  }


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CardContent className="flex flex-col items-center justify-center gap-6 p-10 text-center">
            <FileUp className="h-16 w-16 text-muted-foreground" />
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">Upload Your APK</h3>
              <p className="text-muted-foreground">
                Select your application's APK file to calculate its SHA256 hash.
              </p>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                id="apkFile"
                type="file"
                accept=".apk"
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
                  <h3 className="text-lg font-medium">Application Metadata</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="appName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>App Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., My Awesome App" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="packageName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Name</FormLabel>
                          <FormControl>
                            <Input placeholder="com.example.app" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="versionName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Version Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1.0.0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="versionCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Version Code</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="e.g., 1" {...field} />
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
                          <Input placeholder="A short, one-line summary of the app." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A full description of your application. You can use Markdown."
                            rows={4}
                            {...field}
                          />
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
                          <Input placeholder="e.g., GPL-3.0-or-later" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="iconPath"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Icon Path (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="fastlane/metadata/android/en-US/images/icon.png" {...field} />
                        </FormControl>
                        <FormDescription>Path to your app icon (supports adaptive icons).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Links and Author</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="webSite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="https://my-awesome-app.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      name="issueTracker"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Tracker URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/user/repo/issues" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="authorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="authorEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author Email (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Build Details (Advanced)</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="apkName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>APK Filename</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>The name of the generated APK file.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="signer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Signer (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 123abc..." {...field} />
                          </FormControl>
                          <FormDescription>The SHA256 hash of the signing certificate.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="hash"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>APK SHA256 Hash</FormLabel>
                          <FormControl>
                            <Input {...field} readOnly />
                          </FormControl>
                          <FormDescription>Auto-calculated from the uploaded file.</FormDescription>
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
        const yamlContent = generateYaml(formData);
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated F-Droid Metadata</h3>
              <p className="text-sm text-muted-foreground">
                Save this content as a YAML file (e.g., <code>{formData.packageName}.yml</code>) in your F-Droid data repository fork.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={yamlContent} language="yaml" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => downloadFile(yamlContent, `${formData.packageName}.yml`)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Fork the <a href="https://gitlab.com/fdroid/fdroiddata" target="_blank" rel="noopener noreferrer" className="text-primary underline">F-Droid data repository</a> on GitLab.</li>
                <li>Add this new YAML file to the `metadata` directory in your forked repository.</li>
                <li>Commit the file, push to your fork, and then open a Merge Request to the main F-Droid repository.</li>
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
              <CardTitle>F-Droid Metadata Creator</CardTitle>
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
        <div className="min-h-[400px]">
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
