'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock = ({ code, language, className }: CodeBlockProps) => {
  const [hasCopied, setHasCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    });
  };

  return (
    <div
      className={cn(
        'relative rounded-md border bg-muted font-mono text-sm',
        className
      )}
    >
      <pre className="overflow-x-auto p-4">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-7 w-7 text-muted-foreground"
        onClick={copyToClipboard}
      >
        {hasCopied ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default CodeBlock;
