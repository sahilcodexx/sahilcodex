import type { Metadata } from 'next';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import ComponentDocPage from '@/components/components/ComponentDocPage';
import Password from '@/components/ui/password';

const sourceCode = readFileSync(
  path.join(process.cwd(), 'src/components/ui/password.tsx'),
  'utf8',
);

const usageCode = `import Password from "@/components/ui/password";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Password />
    </div>
  );
}`;

export const metadata: Metadata = {
  title: 'Password Verification - UI Components | Sahil',
  description:
    'Six-digit code verification pill that expands from an idle state, animates each digit with NumberFlow, and confirms with a shine sweep. Built with Motion.',
  openGraph: {
    title: 'Password Verification - UI Components | Sahil',
    description:
      'Six-digit code verification pill that expands from an idle state, animates each digit, and confirms with a shine sweep.',
  },
};

export default function Page() {
  return (
    <ComponentDocPage
      title="Password Verification"
      description="A compact six-digit verification control. It sits idle as a single button, expands into digit cells on focus, shakes and clears on a wrong code, then confirms with a green sweep. The demo code is 123456."
      registryName="password"
      dependencies={['motion', 'lucide-react', '@number-flow/react']}
      sourcePath="components/ui/password.tsx"
      sourceCode={sourceCode}
      usageCode={usageCode}
      preview={<div className="flex min-h-[200px] w-full items-center justify-center"><Password /></div>}
    />
  );
}
