
import { AurWizard } from './aur-wizard';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';

function AurWizardFallback() {
  return (
    <div className="flex h-96 items-center justify-center">
      <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}

export default function AurPage() {
  return (
    <Suspense fallback={<AurWizardFallback />}>
      <AurWizard />
    </Suspense>
  );
}
