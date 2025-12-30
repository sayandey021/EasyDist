
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
  { id: 1, name: 'Application Details' },
  { id: 2, name: 'Build & Source' },
  { id: 3, name: 'Generate Manifest' },
];

const formSchema = z.object({
  appId: z
    .string()
    .min(1, 'App ID is required.')
    .regex(/^[A-Za-z_][A-Za-z0-9_]*\.[A-Za-z_][A-Za-z0-9_]*(\.[A-Za-z0-9_]+)*$/, {
      message: 'Must be a reverse-domain name, e.g. com.github.user.AppName',
    }),
  iconPath: z.string().optional(),
  runtime: z.string().min(1, 'Runtime is required.'),
  runtimeVersion: z.string().min(1, 'Runtime version is required.'),
  sdk: z.string().min(1, 'SDK is required.'),
  command: z.string().min(1, 'Command is required.'),
  sourceType: z.enum(['git', 'archive']).default('git'),
  sourceUrl: z.string().url('Source URL must be a valid URL.'),
  sourceTag: z.string().optional(),
  sourceCommit: z.string().optional(),
  sourceSha256: z.string().optional(),
  buildsystem: z.enum(['simple', 'meson', 'cmake', 'cmake-ninja', 'qmake', 'autotools']).default('simple'),
  buildCommands: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function FlathubWizard() {
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      appId: '',
      iconPath: '',
      runtime: 'org.gnome.Platform',
      runtimeVersion: '46',
      sdk: 'org.gnome.Sdk',
      command: 'my-app',
      sourceType: 'git',
      sourceUrl: '',
      sourceTag: '',
      sourceCommit: '',
      sourceSha256: '',
      buildsystem: 'meson',
      buildCommands: 'meson setup --prefix=/app build\nninja -C build\nninja -C build install'
    },
    mode: 'onChange',
  });

  const sourceType = form.watch('sourceType');

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onStep1Submit = async () => {
    const isValid = await form.trigger(['appId', 'command', 'runtime', 'runtimeVersion', 'sdk']);
    if (isValid) {
      nextStep();
    } else {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill out all required fields before proceeding."
      })
    }
  };

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'Flathub',
      packageName: data.appId,
      packageVersion: data.sourceTag || 'latest',
    });
    nextStep();
  };

  const generateManifest = (data: FormData) => {
    const manifest = {
      'app-id': data.appId,
      runtime: data.runtime,
      'runtime-version': data.runtimeVersion,
      sdk: data.sdk,
      command: data.command,
      modules: [
        {
          name: data.appId.split('.').pop()?.toLowerCase(),
          buildsystem: data.buildsystem,
          ...(data.buildCommands && { 'build-commands': data.buildCommands?.split('\n') }),
          sources: [
            {
              type: data.sourceType,
              url: data.sourceUrl,
              ...(data.sourceType === 'git' && data.sourceTag && { tag: data.sourceTag }),
              ...(data.sourceType === 'git' && data.sourceCommit && { commit: data.sourceCommit }),
              ...(data.sourceType === 'archive' && data.sourceSha256 && { sha256: data.sourceSha256 }),
            },
          ],
        },
      ],
    };
    return JSON.stringify(manifest, null, 2);
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
  }


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Form {...form}>
            <form onSubmit={(e) => { e.preventDefault(); onStep1Submit(); }}>
              <CardContent className="space-y-8 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Application Identity</h3>
                  <FormField
                    control={form.control}
                    name="appId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application ID</FormLabel>
                        <FormControl>
                          <Input placeholder="com.github.user.AppName" {...field} />
                        </FormControl>
                        <FormDescription>A unique, reverse-DNS style identifier for your app.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="command"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Executable Command</FormLabel>
                        <FormControl>
                          <Input placeholder="my-app" {...field} />
                        </FormControl>
                        <FormDescription>The command to run the application binary.</FormDescription>
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
                          <Input placeholder="share/icons/hicolor/256x256/apps/myapp.png" {...field} />
                        </FormControl>
                        <FormDescription>Path to your app icon (will be installed to /app/share/icons/).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Runtime Environment</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="runtime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Runtime</FormLabel>
                          <FormControl>
                            <Input placeholder="org.gnome.Platform" {...field} />
                          </FormControl>
                          <FormDescription>The base runtime for your app.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="runtimeVersion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Runtime Version</FormLabel>
                          <FormControl>
                            <Input placeholder="46" {...field} />
                          </FormControl>
                          <FormDescription>The version of the runtime.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sdk"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SDK</FormLabel>
                          <FormControl>
                            <Input placeholder="org.gnome.Sdk" {...field} />
                          </FormControl>
                          <FormDescription>The build SDK.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
                  <h3 className="text-lg font-medium">Source Code</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="sourceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a source type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="git">Git Repository</SelectItem>
                              <SelectItem value="archive">Source Archive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sourceUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://github.com/user/repo.git" {...field} />
                          </FormControl>
                          <FormDescription>URL of the git repo or source archive.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {sourceType === 'git' && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="sourceTag"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Git Tag / Branch (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="v1.2.3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sourceCommit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Git Commit Hash (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. a1b2c3d..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {sourceType === 'archive' && (
                    <FormField
                      control={form.control}
                      name="sourceSha256"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Source Archive SHA256 Hash</FormLabel>
                          <FormControl>
                            <Input placeholder="The SHA256 hash of the source archive" {...field} />
                          </FormControl>
                          <FormDescription>You must calculate this hash yourself for the source archive.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Build Configuration</h3>
                  <FormField
                    control={form.control}
                    name="buildsystem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Build System</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a build system" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="simple">simple</SelectItem>
                            <SelectItem value="meson">meson</SelectItem>
                            <SelectItem value="cmake">cmake</SelectItem>
                            <SelectItem value="cmake-ninja">cmake-ninja</SelectItem>
                            <SelectItem value="qmake">qmake</SelectItem>
                            <SelectItem value="autotools">autotools</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buildCommands"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Build Commands</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="meson setup --prefix=/app build..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>The commands needed to build your application, one per line.</FormDescription>
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
        const manifestContent = generateManifest(formData);
        const filename = `${formData.appId}.json`;
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated Flathub Manifest</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{filename}</code> in your repository.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={manifestContent} language="json" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => downloadFile(manifestContent, filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Save this manifest file to your project's repository.</li>
                <li>Follow the <a href="https://docs.flathub.org/docs/for-app-authors/submission" target="_blank" rel="noopener noreferrer" className="text-primary underline">Flathub submission guide</a> to submit your app.</li>
                <li>This typically involves creating a new repository on GitHub to host your manifest and opening a pull request to the Flathub repository.</li>
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
              <CardTitle>Flathub Manifest Creator</CardTitle>
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
