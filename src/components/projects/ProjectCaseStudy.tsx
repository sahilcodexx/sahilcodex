import { ArrowUpRight } from 'lucide-react';

export interface CaseStudy {
  problem?: string;
  contribution?: string;
  decisions?: Array<{ title: string; description: string }>;
  outcome?: string;
  evidence?: Array<{ label: string; href: string }>;
  isUpcoming?: boolean;
}

export function ProjectCaseStudy({
  problem,
  contribution,
  decisions = [],
  outcome,
  evidence = [],
  isUpcoming = false,
}: CaseStudy) {
  return (
    <section aria-label="Project case study" className="not-prose mb-10">
      {(problem || contribution) && (
        <div className="border-border space-y-4 border-y py-6">
          <h2 className="text-foreground text-base font-medium">The brief</h2>
          <div className="space-y-3 text-base leading-7">
            {problem && <p className="text-foreground">{problem}</p>}
            {contribution && <p className="text-muted-foreground">{contribution}</p>}
          </div>
        </div>
      )}

      {decisions.length > 0 && (
        <div className="py-7">
          <h2 className="text-foreground mb-5 text-base font-medium">
            {isUpcoming ? 'Planned approach' : 'Implementation notes'}
          </h2>
          <ol className="divide-border divide-y">
            {decisions.map((decision, index) => (
              <li
                key={decision.title}
                className="grid grid-cols-[24px_1fr] gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[32px_160px_1fr] sm:gap-4"
              >
                <span
                  aria-hidden="true"
                  className="text-muted-foreground pt-0.5 font-mono text-[13px]"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-foreground text-base leading-7 font-medium">{decision.title}</h3>
                <p className="text-muted-foreground col-start-2 text-base leading-7 sm:col-start-auto">
                  {decision.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      )}

      {(outcome || evidence.length > 0) && (
        <div className="border-border space-y-4 border-y py-6">
          <h2 className="text-foreground text-base font-medium">
            {isUpcoming ? 'Project status' : 'Current result'}
          </h2>
          <div className="space-y-4">
            {outcome && <p className="text-muted-foreground text-base leading-7">{outcome}</p>}
            {evidence.length > 0 && (
              <ul className="flex flex-wrap gap-x-5 gap-y-3">
                {evidence.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground inline-flex items-center gap-1 text-sm underline decoration-neutral-400/40 underline-offset-4 hover:decoration-current focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                      {link.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
