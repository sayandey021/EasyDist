'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Textarea } from '@/components/ui/textarea';
import CodeBlock from '@/components/code-block';
import { ArrowRight, ArrowLeft, Check, Download, Package, ExternalLink } from 'lucide-react';
import { saveHistoryItem } from '@/lib/history';

const formSchema = z.object({
  modulePath: z.string().min(1, 'Module path is required'),
  goVersion: z.string().min(1, 'Go version is required (e.g., 1.22.0)'),
  dependencies: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, name: 'About' },
  { id: 2, name: 'Module Setup' },
  { id: 3, name: 'Dependencies' },
  { id: 4, name: 'Generate Config' },
];

export function GoWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    modulePath: 'github.com/username/project',
    goVersion: '1.22.0',
    dependencies: '',
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = (data: FormData) => {
    saveHistoryItem({
      type: 'Go',
      packageName: data.modulePath,
      packageVersion: data.goVersion,
      formData: data,
    });
    setFormData({ ...formData, ...data });
    nextStep();
  };

  const generateGoMod = (data: FormData) => {
    let output = `module ${data.modulePath}\n\n`;
    output += `go ${data.goVersion}\n\n`;

    if (data.dependencies && data.dependencies.trim()) {
      output += `require (\n`;
      const deps = data.dependencies.split('\n');
      for (const dep of deps) {
        if (dep.trim()) {
          output += `\t${dep.trim()}\n`;
        }
      }
      output += `)\n`;
    }

    return output;
  };

  const downloadGoMod = () => {
    const data = form.getValues();
    const content = generateGoMod(data);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `go.mod`);
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
                <h3 className="text-xl font-semibold">About Go Modules</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A module is a collection of Go packages stored in a file tree with a go.mod file at its root. 
                  The go.mod file defines the module's module path, which is also the import path used for the root directory, and its dependency requirements.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="rounded-lg bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 p-4">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-cyan-600 dark:text-cyan-400 space-y-1">
                      <li>Built-in dependency management</li>
                      <li>Semantic versioning support</li>
                      <li>Reproducible builds via go.sum</li>
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
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(form.getValues()); }}>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Module Setup</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="modulePath"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module Path</FormLabel>
                          <FormControl>
                            <Input placeholder="github.com/username/project" {...field} />
                          </FormControl>
                          <FormDescription>
                            The module path is typically the repository URL where the code is hosted.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="goVersion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Go Version</FormLabel>
                          <FormControl>
                            <Input placeholder="1.22.0" {...field} />
                          </FormControl>
                          <FormDescription>
                            The minimum version of Go required by your module.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-between gap-2">
                <Button type="button" variant="ghost" onClick={prevStep}>
                  <ArrowLeft /> Back
                </Button>
                <Button type="submit">
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        );
      case 3:
        return (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dependencies (Optional)</h3>
                  <FormField
                    control={form.control}
                    name="dependencies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Packages</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="github.com/gin-gonic/gin v1.9.1&#10;github.com/stretchr/testify v1.8.4" 
                            className="min-h-[150px] font-mono text-sm"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Enter one dependency per line (module path and version).
                        </FormDescription>
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
                  Generate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </form>
          </Form>
        );
      case 4:
        return (
          <CardContent className="space-y-6 p-6">
            <div className="rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-4 mb-6">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="font-semibold text-green-700 dark:text-green-300">go.mod Generated</h3>
              </div>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Your Go module configuration is ready.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">go.mod</h3>
              <p className="text-sm text-muted-foreground">
                Copy this content or download it as a go.mod file.
              </p>
              <div className="relative mt-2">
                <CodeBlock code={generateGoMod(formData)} language="go" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-10 top-2 h-7 w-7 text-muted-foreground hover:text-foreground"
                  onClick={downloadGoMod}
                  title="Download go.mod"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-medium mb-2">Next Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Place the <code className="bg-muted px-1 py-0.5 rounded">go.mod</code> file in the root of your repository.</li>
                <li>Run <code className="bg-muted px-1 py-0.5 rounded">go mod tidy</code> to add missing and remove unused modules.</li>
              </ol>
            </div>
          </CardContent>
        );
    }
  };

  return (
    <div className="mx-auto w-full">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Go Module Generator</CardTitle>
              <CardDescription>
                Step {step} of {steps.length}: {steps[step - 1].name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2" title={s.name}>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      step > s.id
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
        <div className="w-full">
          <div key={step} className="animate-in fade-in duration-300">
            {renderStepContent()}
          </div>
        </div>
        {step === 4 && (
          <CardFooter className='justify-start'>
            <Button variant="ghost" onClick={prevStep}>
              <ArrowLeft /> Back to Edit
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
