import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import ComponentDocPage from '@/components/components/ComponentDocPage';
import TextToolbar from '@/components/ui/text-toolbar';

const sourceCode = readFileSync(
  path.join(process.cwd(), 'src/components/ui/text-toolbar.tsx'),
  'utf8',
);

const usageCode = `import TextToolbar from "@/components/ui/text-toolbar";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <TextToolbar />
    </div>
  );
}`;

export const metadata: Metadata = {
  title: 'Text Toolbar - UI Components | Sahil',
  description:
    'Rich interactive text formatting toolbar with live selection tracking, color wheel palette, typography controls, and popover actions. Built with Radix UI.',
  openGraph: {
    title: 'Text Toolbar - UI Components | Sahil',
    description:
      'Rich interactive text formatting toolbar with live selection tracking, color wheel palette, typography controls, and popover actions.',
  },
};

export default function Page() {
  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Toolbar Hand';
          src: url('/fonts/toolbar-hand.ttf') format('truetype');
          font-weight: 400 700;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
      <ComponentDocPage
        title="Text Toolbar"
        description="An interactive floating text editing toolbar with real-time selection handles, an HSL color wheel palette, font picker, text styling toggles, and mention/link popovers."
        registryName="text-toolbar"
        dependencies={['radix-ui', 'lucide-react']}
        sourcePath="components/ui/text-toolbar.tsx"
        sourceCode={sourceCode}
        usageCode={usageCode}
        preview={
          <div className="flex w-full items-center justify-center py-4">
            <TextToolbar />
          </div>
        }
      />
    </>
  );
}
