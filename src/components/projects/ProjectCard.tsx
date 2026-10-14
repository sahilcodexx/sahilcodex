import { useMemo } from 'react';
import React from 'react';
import Container from '@/components/layouts/Container';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCardData } from '@/config/projects/ProjectCardData';
import { cn } from '@/lib/utils';
import { Github } from '@/lib/techIcons';

const ProjectCard = ({
  completed = ProjectCardData,
  limit,
}: {
  completed?: any[];
  limit?: number;
}) => {
  const displayedProjects = useMemo(() => {
    const arr = limit ? [...completed].slice(-limit) : [...completed];
    return arr.reverse();
  }, [completed, limit]);

  const N = displayedProjects.length;

  return (
    <Container className="relative">
      {/* Double vertical line divider in the absolute center (visible sm-up) */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-0 hidden w-px sm:block"
        style={{ left: 'calc(50% - 6px)', backgroundColor: 'var(--border)' }}
      />
      <div
        className="pointer-events-none absolute top-0 bottom-0 z-0 hidden w-px sm:block"
        style={{ left: 'calc(50% + 5px)', backgroundColor: 'var(--border)' }}
      />

      {/* Grid of projects */}
      <div className="relative grid grid-cols-1 gap-0 sm:grid-cols-2">
        {displayedProjects.map((items, index) => {
          // Desktop (2-col): show separator after every right-column card (odd index), not after last row
          const showDesktopSep = index % 2 === 1 && index < N - 1;
          // Mobile (1-col): show separator after every card except the last card
          const showMobileSep = index < N - 1;

          return (
            <React.Fragment key={items.id}>
              <div className="relative flex flex-col p-4">
                <div className="flex flex-1 flex-col">
                  {/* Card Container */}
                  <div className="group/card border-border bg-background/50 dark:hover:bg-accent/15 relative flex flex-1 flex-col gap-1 overflow-hidden rounded-xl border p-2 shadow-sm hover:bg-neutral-100/60 dark:border-neutral-800 dark:bg-neutral-950/70">
                    <div className="relative flex flex-1 flex-col gap-1">
                      {/* Card Body wrapping screenshot and info (links to detailed slug) */}
                      <Link
                        href={items.projectDetailsPageSlug ?? items.links.details}
                        className="flex flex-1 flex-col gap-1 text-left hover:no-underline"
                      >
                        {items.img?.src ? (
                          <Image
                            alt={items.img.alt}
                            src={items.img.src}
                            width={1200}
                            height={630}
                            className="h-52 w-full rounded-lg object-cover object-top"
                          />
                        ) : (
                          <div
                            aria-hidden="true"
                            className="bg-muted/30 text-muted-foreground flex h-52 w-full items-center justify-center rounded-lg text-sm"
                          >
                            {items.statusLabel === 'Upcoming' ? 'Coming soon' : null}
                          </div>
                        )}

                        {/* Header with Title and Pulsing Status */}
                        <div className="mt-2.5 pt-0.5 flex items-center justify-between px-1">
                          <h2 className="group-hover/card:text-primary text-lg leading-snug font-bold capitalize">
                            {items.title}
                          </h2>

                          {/* Status Badge */}
                          <div className="flex shrink-0 items-center gap-1.5 select-none">
                            <span
                              className={cn(
                                'inline-flex size-2 rounded-full',
                                items.isWorking ? 'bg-green-500' : 'bg-amber-500'
                              )}
                            />
                            <span className="text-muted-foreground text-xs font-medium">
                              {items.statusLabel || (items.isWorking ? 'Live' : 'Building')}
                            </span>
                          </div>
                        </div>

                        {/* Subheading */}
                        {items.subheading && (
                          <p className="text-neutral-500 dark:text-neutral-400 px-1 text-[11px] font-medium -mt-1 mb-1.5">
                            {items.subheading}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-muted-foreground line-clamp-2 min-h-[38px] px-1 text-sm">
                          {items.description}
                        </p>

                        <div className="flex flex-wrap gap-2 px-1">
                          {items.technologies.slice(0, 4).map((tech: any, techIdx: number) => (
                            <span
                              key={techIdx}
                              className="bg-background text-muted-foreground rounded-sm border px-1.5 py-0.5 text-xs shadow-xs select-none hover:shadow-none"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      </Link>

                      {/* Footer Live and GitHub Split Links */}
                      <div className="border-border relative z-20 mt-2 flex items-center border-t pt-2">
                        {items.links.website &&
                        items.links.github &&
                        items.links.website !== items.links.github ? (
                          <>
                            <a
                              href={items.links.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground w-full border-r text-center text-sm text-nowrap"
                            >
                              Live link
                            </a>
                            <a
                              href={items.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-foreground flex w-full items-center justify-center gap-2 text-sm"
                            >
                              GitHub
                              <Github />
                            </a>
                          </>
                        ) : items.links.github || items.links.website ? (
                          <a
                            href={items.links.github || items.links.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground flex w-full items-center justify-center gap-2 text-sm"
                          >
                            {items.links.github ? 'GitHub' : 'Live link'}
                            {items.links.github && (
                              <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 496 512"
                                className="size-3.5"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                              </svg>
                            )}
                          </a>
                        ) : (
                          <Link
                            href={items.projectDetailsPageSlug ?? items.links.details}
                            className="text-muted-foreground hover:text-foreground w-full text-center text-sm"
                          >
                            View plans
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-screen-width separator on desktop */}
              {showDesktopSep && (
                <div className="col-span-2 screen-line-top screen-line-bottom hidden h-3 sm:block" />
              )}

              {/* Full-screen-width separator on mobile */}
              {showMobileSep && (
                <div className="screen-line-top screen-line-bottom block h-3 sm:hidden" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </Container>
  );
};

export default ProjectCard;
