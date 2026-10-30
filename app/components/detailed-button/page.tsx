import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { ArrowRight } from 'lucide-react';
import ComponentDocPage from '@/components/components/ComponentDocPage';
import DetailedButton from '@/components/ui/detailed-button';

const sourceCode = readFileSync(
  path.join(process.cwd(), 'src/components/ui/detailed-button.tsx'),
  'utf8',
);

const stylesheet = readFileSync(
  path.join(process.cwd(), 'src/components/ui/detailedbutton.module.css'),
  'utf8',
);

const usageCode = `import DetailedButton from "@/components/ui/detailed-button";

export default function Page() {
  return (
    <div className="flex flex-wrap gap-3">
      <DetailedButton variant="blue">Continue</DetailedButton>
      <DetailedButton variant="graphite">Cancel</DetailedButton>
      <DetailedButton variant="violet">Upgrade</DetailedButton>
      <DetailedButton variant="green">Done</DetailedButton>
    </div>
  );
}`;

export const metadata: Metadata = {
  title: 'Detailed Button - UI Components | Sahil',
  description:
    'Tactile four-variant button with inset gloss, gradient border, spring press feedback, and reduced-motion support. Built with Motion and shadcn/ui.',
  openGraph: {
    title: 'Detailed Button - UI Components | Sahil',
    description:
      'Tactile four-variant button with inset gloss, gradient border, spring press feedback, and reduced-motion support.',
  },
};

export default function Page() {
  return (
    <ComponentDocPage
      title="Detailed Button"
      description="A tactile button with four color variants, inset gloss, and a gradient border. Motion adds a light spring lift on hover and press, and the whole thing respects reduced-motion preferences."
      registryName="detailed-button"
      dependencies={['motion']}
      registryDependencies={['button']}
      sourcePath="components/ui/detailed-button.tsx"
      sourceCode={sourceCode}
      usageCode={usageCode}
      stylesheet={stylesheet}
      stylesheetPath="components/ui/detailedbutton.module.css"
      preview={
        <div className="flex flex-wrap items-center justify-center gap-3">
          <DetailedButton variant="blue">
            Continue
            <ArrowRight />
          </DetailedButton>
          <DetailedButton variant="graphite">Cancel</DetailedButton>
          <DetailedButton variant="violet">Upgrade</DetailedButton>
          <DetailedButton variant="green">Done</DetailedButton>
        </div>
      }
    />
  );
}
