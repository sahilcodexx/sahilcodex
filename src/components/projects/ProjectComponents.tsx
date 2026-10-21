import React, { ReactNode } from 'react';
import CopyButton from '@/components/ui/copy-button';
import Bun from '@/components/icons/tech/Bun';
import { ZoomableImage } from '@/components/projects/ZoomableImage';
import JavaScript from '@/components/icons/tech/JavaScript';
import MongoDB from '@/components/icons/tech/MongoDB';
import NextJS from '@/components/icons/tech/NextJS';
import NodeJS from '@/components/icons/tech/NodeJS';
import PostgreSQL from '@/components/icons/tech/PostgreSQL';
import Prisma from '@/components/icons/tech/Prisma';
import ReactIcon from '@/components/icons/tech/ReactIcon';
import TypeScript from '@/components/icons/tech/TypeScript';
import { Badge } from '@/components/ui/badge';

// Technology mapping
const TechnologyComponents: Record<string, () => React.ReactNode> = {
  'Next.js': NextJS,
  nextjs: NextJS,
  React: ReactIcon,
  react: ReactIcon,
  TypeScript: TypeScript,
  typescript: TypeScript,
  JavaScript: JavaScript,
  javascript: JavaScript,
  'Node.js': NodeJS,
  nodejs: NodeJS,
  node: NodeJS,
  MongoDB: MongoDB,
  mongodb: MongoDB,
  PostgreSQL: PostgreSQL,
  postgresql: PostgreSQL,
  Prisma: Prisma,
  prisma: Prisma,
  Bun: Bun,
  bun: Bun,
};

// Technology badge
const Technology = ({ name = '' }: { name?: string }) => {
  const TechComponent = TechnologyComponents[name] || TechnologyComponents[name?.toLowerCase()];

  return (
    <div className="text-foreground border-border bg-muted/50 flex size-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-normal tracking-wide shadow-xs select-none [&_svg]:size-3.5">
      {TechComponent && (
        <span className="flex size-3.5 shrink-0 items-center justify-center [&_svg]:size-3.5">
          <TechComponent />
        </span>
      )}
      <span className="text-foreground text-xs font-medium tracking-wide whitespace-nowrap">
        {name}
      </span>
    </div>
  );
};

// Tech stack
const TechStack = ({ technologies = [] }: { technologies?: string[] }) => (
  <div className="bg-card/60 border-border my-6 rounded-xl border p-4 sm:p-6">
    <h4 className="text-foreground mb-3 text-lg font-semibold">Technology Stack</h4>
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Technology key={tech} name={tech} />
      ))}
    </div>
  </div>
);

// Project meta
const ProjectMeta = ({
  timeline,
  role,
  team,
  status,
}: {
  timeline?: string;
  role?: string;
  team?: string;
  status?: string;
}) => (
  <div className="bg-card/60 border-border my-6 grid gap-4 rounded-xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
    {timeline && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Timeline
        </h5>
        <p className="text-foreground mt-1 text-sm font-semibold">{timeline}</p>
      </div>
    )}

    {role && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Role</h5>
        <p className="text-foreground mt-1 text-sm font-semibold">{role}</p>
      </div>
    )}

    {team && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">Team</h5>
        <p className="text-foreground mt-1 text-sm font-semibold">{team}</p>
      </div>
    )}

    {status && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
          Status
        </h5>
        <div className="mt-1">
          <Badge
            variant={
              status === 'completed'
                ? 'default'
                : status === 'in-progress'
                  ? 'secondary'
                  : 'outline'
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
    )}
  </div>
);

interface ImageProps {
  src: string;
  alt: string;
  [key: string]: unknown;
}

interface ChildrenProps {
  children: ReactNode;
  [key: string]: unknown;
}

interface CodeProps {
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}

export const ProjectComponents = {
  // Image tag
  img: ({ src, alt, ...props }: ImageProps) => (
    <ZoomableImage src={src} alt={alt} width={800} height={450} {...props} />
  ),

  // Headings with custom styles
  h1: ({ children, ...props }: ChildrenProps) => (
    <h1 className="text-foreground mb-4 text-3xl font-bold tracking-tight sm:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ChildrenProps) => (
    <h2 className="text-foreground mt-8 mb-3 text-2xl font-semibold tracking-tight" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ChildrenProps) => (
    <h3 className="text-foreground mt-6 mb-2 text-xl font-medium tracking-tight" {...props}>
      {children}
    </h3>
  ),

  // Paragraph styling
  p: ({ children, ...props }: ChildrenProps) => (
    <p className="text-foreground/90 mb-6 text-base leading-relaxed font-normal" {...props}>
      {children}
    </p>
  ),

  // Lists styling
  ul: ({ children, ...props }: ChildrenProps) => (
    <ul className="text-foreground/90 mb-4 list-disc pl-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ChildrenProps) => (
    <ol className="text-foreground/90 mb-4 list-decimal pl-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ChildrenProps) => (
    <li className="text-foreground/90 mb-2 ml-2 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  // Tables
  table: ({ children, ...props }: ChildrenProps) => (
    <div className="not-prose my-6 w-full overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: ChildrenProps) => (
    <thead className="border-border border-b" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }: ChildrenProps) => (
    <th
      className="text-muted-foreground px-3 py-2 text-xs font-medium tracking-wide uppercase"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: ChildrenProps) => (
    <td className="border-border/60 text-foreground/90 border-b px-3 py-2 align-top" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }: ChildrenProps) => (
    <strong className="text-foreground font-semibold" {...props}>
      {children}
    </strong>
  ),

  // Inline code block
  code: ({ children, className, ...props }: CodeProps) => {
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="bg-muted/80 text-foreground border-border/60 rounded-md border px-1.5 py-0.5 font-mono text-xs font-semibold"
        {...props}
      >
        {children}
      </code>
    );
  },
  em: ({ children, ...props }: ChildrenProps) => (
    <em className="text-foreground/90 font-semibold not-italic" {...props}>
      {children}
    </em>
  ),
  // Blockquote
  blockquote: ({ children, ...props }: ChildrenProps) => (
    <blockquote
      className="border-primary/60 text-muted-foreground my-6 border-l-4 pl-4 italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  pre: ({ children, ...props }: ChildrenProps) => {
    const getRawText = (node: React.ReactNode): string => {
      if (!node) return '';
      if (typeof node === 'string' || typeof node === 'number') {
        return node.toString();
      }
      if (Array.isArray(node)) {
        return node.map(getRawText).join('');
      }
      if (React.isValidElement(node)) {
        return getRawText(node.props.children);
      }
      return '';
    };
    const codeText = getRawText(children);

    return (
      <div className="group relative my-6 w-full">
        <CopyButton text={codeText} />
        <pre
          className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-100 sm:p-6 sm:text-sm dark:bg-neutral-900/95 [&_code]:rounded-none! [&_code]:border-none! [&_code]:bg-transparent! [&_code]:p-0! [&_code]:text-inherit!"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  hr: ({ ...props }) => <hr className="border-border my-12 border-t" {...props} />,

  Technology,
  TechStack,
  ProjectMeta,
};
