
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const steps = [
  { id: 1, name: 'Snap Details' },
  { id: 2, name: 'Generate YAML' },
];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  version: z.string().min(1, 'Version is required.'),
  summary: z.string().min(1, 'Summary is required.'),
  description: z.string().min(1, 'Description is required.'),
  iconPath: z.string().optional(),
  base: z.string().min(1, 'Base is required.'),
  grade: z.enum(['devel', 'stable']).default('devel'),
  confinement: z.enum(['devmode', 'strict', 'classic']).default('devmode'),
  appName: z.string().min(1, 'App name is required.'),
  command: z.string().min(1, 'Command is required.'),
});

type FormData = z.infer<typeof formSchema>;

export function SnapWizard() {
  const [step, setStep] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      version: '0.1.0',
      summary: '',
      description: '',
      iconPath: '',
      base: 'core22',
      grade: 'devel',
      confinement: 'strict',
      appName: '',
      command: '',
    },
    mode: 'onChange',
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'Snap',
      packageName: data.name,
      packageVersion: data.version,
    });
    nextStep();
  };

  const generateYaml = (data: FormData) => {
    return `name: ${data.name}
base: ${data.base}
version: '${data.version}'
summary: ${data.summary}
description: |
  ${data.description.replace(/\n/g, '\n  ')}${data.iconPath ? `\n\nicon: ${data.iconPath}` : ''}

grade: ${data.grade}
confinement: ${data.confinement}

apps:
  ${data.appName}:
    command: ${data.command}

parts:
  ${data.appName}:
    plugin: dump
    source: .
`;
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/yaml;charset=utf-8;' });
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-8 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Core Metadata</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Snap Name</FormLabel>
                          <FormControl>
                            <Input placeholder="my-awesome-app" {...field} />
                          </FormControl>
                          <FormDescription>The unique name for your snap.</FormDescription>
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
                            <Input placeholder="0.1.0" {...field} />
                          </FormControl>
                          <FormDescription>The version of your application.</FormDescription>
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
                          <Input placeholder="A one-line summary of your app." {...field} />
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
                          <Textarea placeholder="A longer description of your application." {...field} />
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
                          <Input placeholder="snap/gui/icon.png" {...field} />
                        </FormControl>
                        <FormDescription>Path to your app icon (PNG, 256x256 or larger recommended).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Environment & Execution</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="base"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base</FormLabel>
                          <FormControl>
                            <Input placeholder="core22" {...field} />
                          </FormControl>
                          <FormDescription>The base snap providing the runtime.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confinement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confinement</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select confinement level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="strict">Strict</SelectItem>
                              <SelectItem value="devmode">Devmode</SelectItem>
                              <SelectItem value="classic">Classic</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>The security confinement for your snap.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>App Name</FormLabel>
                          <FormControl>
                            <Input placeholder="my-app" {...field} />
                          </FormControl>
                          <FormDescription>The name of the application within the snap.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="command"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Command</FormLabel>
                          <FormControl>
                            <Input placeholder="bin/my-app" {...field} />
                          </FormControl>
                          <FormDescription>The command to run your application.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button type="submit">
                  Generate <ArrowRight />
                </Button>
              </CardFooter>
            </form>
          </Form>
        );
      case 2:
        const formData = form.getValues();
        const yamlContent = generateYaml(formData);
        const filename = `snapcraft.yaml`;
        return (
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-lg font-medium">Generated snapcraft.yaml</h3>
              <p className="text-sm text-muted-foreground">
                Save this as <code>{filename}</code> in your project's root directory.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={yamlContent} language="yaml" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => downloadFile(yamlContent, filename)}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Next Steps</h3>
              <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
                <li>Place this <code>snapcraft.yaml</code> file in the root of your project repository.</li>
                <li>Install Snapcraft with <code>sudo snap install snapcraft --classic</code>.</li>
                <li>Run <code>snapcraft</code> in your project directory to build the snap.</li>
                <li>Publish your snap by running <code>snapcraft upload --release=stable your-snap-name_version_arch.snap</code>.</li>
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
              <CardTitle>Snapcraft Creator</CardTitle>
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
        {step === 2 && (
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
