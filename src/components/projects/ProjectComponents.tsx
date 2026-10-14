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
    <div className="text-foreground flex size-fit items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 text-xs font-normal tracking-wide shadow-xs select-none [&_svg]:size-3.5">
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
    <h4 className="mb-3 text-lg font-semibold text-foreground">Technology Stack</h4>
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
        <h5 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Timeline</h5>
        <p className="text-sm font-semibold text-foreground mt-1">{timeline}</p>
      </div>
    )}

    {role && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Role</h5>
        <p className="text-sm font-semibold text-foreground mt-1">{role}</p>
      </div>
    )}

    {team && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Team</h5>
        <p className="text-sm font-semibold text-foreground mt-1">{team}</p>
      </div>
    )}

    {status && (
      <div>
        <h5 className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Status</h5>
        <div className="mt-1">
          <Badge
            variant={
              status === 'completed' ? 'default' : status === 'in-progress' ? 'secondary' : 'outline'
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
    <ZoomableImage
      src={src}
      alt={alt}
      width={800}
      height={450}
      {...props}
    />
  ),

  // Headings with custom styles
  h1: ({ children, ...props }: ChildrenProps) => (
    <h1 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: ChildrenProps) => (
    <h2 className="mb-3 mt-8 text-2xl font-semibold tracking-tight text-foreground" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: ChildrenProps) => (
    <h3 className="mb-2 mt-6 text-xl font-medium tracking-tight text-foreground" {...props}>
      {children}
    </h3>
  ),

  // Paragraph styling
  p: ({ children, ...props }: ChildrenProps) => (
    <p className="mb-6 leading-relaxed text-foreground/90 font-normal text-base" {...props}>
      {children}
    </p>
  ),

  // Lists styling
  ul: ({ children, ...props }: ChildrenProps) => (
    <ul className="mb-4 list-disc pl-6 text-foreground/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ChildrenProps) => (
    <ol className="mb-4 list-decimal pl-6 text-foreground/90" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ChildrenProps) => (
    <li className="mb-2 ml-2 leading-relaxed text-foreground/90" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: ChildrenProps) => (
    <strong className="font-semibold text-foreground" {...props}>
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
        className="rounded-md bg-muted/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-foreground border border-border/60"
        {...props}
      >
        {children}
      </code>
    );
  },
  em: ({ children, ...props }: ChildrenProps) => (
    <em className="font-semibold not-italic text-foreground/90" {...props}>
      {children}
    </em>
  ),
  // Blockquote
  blockquote: ({ children, ...props }: ChildrenProps) => (
    <blockquote
      className="my-6 border-l-4 border-primary/60 pl-4 italic text-muted-foreground"
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
          className="bg-neutral-950 dark:bg-neutral-900/95 border border-neutral-800 overflow-x-auto rounded-xl p-4 sm:p-6 text-neutral-100 text-xs sm:text-sm font-mono leading-relaxed [&_code]:bg-transparent! [&_code]:border-none! [&_code]:p-0! [&_code]:rounded-none! [&_code]:text-inherit!"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  hr: ({ ...props }) => (
    <hr className="my-12 border-t border-border" {...props} />
  ),

  Technology,
  TechStack,
  ProjectMeta,
};
