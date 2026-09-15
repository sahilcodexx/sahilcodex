'use client';

import React, { useState } from 'react';
import Container from "@/components/layouts/Container";
import { devices, software, webExtensions } from "@/config/Gear";
import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import SectionHeading from "@/components/common/SectionHeading";
import RepeatSeparator from "@/components/ui/repeat-separator";

const getDomain = (url: string) => {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return '';
  }
};

export default function GearsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase();

  // Filter items
  const filteredDevices = devices.filter(d => d.name.toLowerCase().includes(query));
  const filteredExtensions = webExtensions.filter(e => e.name.toLowerCase().includes(query));
  const filteredSoftware = software.filter(s => s.name.toLowerCase().includes(query));

  const hasResults = filteredDevices.length > 0 || filteredExtensions.length > 0 || filteredSoftware.length > 0;

  return (
    <Container>
      <RepeatSeparator cn="dark:opacity-40" />

      {/* Page Header */}
      <div>
        <div>
          <SectionHeading
            classname="text-neutral-400 dark:text-neutral-500 font-medium"
            heading="Gears"
          />
          <h1 className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance">
            My gears and tools i use to get my work done.
          </h1>
        </div>
        <div className="flex items-center justify-between screen-line-top screen-line-bottom p-2">
          <Link
            data-slot="button"
            data-variant="link"
            data-size="sm"
            className="group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 decoration-1 underline-offset-3 active:scale-none rounded-[min(var(--radius-lg),10px)] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 h-7 gap-2 border-none px-0 text-muted-foreground hover:text-foreground hover:no-underline"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </Link>
          <div
            data-slot="input-group"
            role="group"
            className="group/input-group relative flex h-9 w-40 sm:w-64 min-w-0 items-center border border-input outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5 rounded-lg shadow-none"
          >
            <input
              data-slot="input-group-control"
              className="h-9 w-full min-w-0 border-input px-2.5 py-1 text-base outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent"
              placeholder="Search Gear…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div
              role="group"
              data-slot="input-group-addon"
              data-align="inline-start"
              className="flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 order-first pl-2 has-[>button]:-ml-1 has-[>kbd]:ml-[-0.15rem]"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M10.278 11.514a5.824 5.824 0 1 1 1.235-1.235l3.209 3.208A.875.875 0 0 1 14.111 15a.875.875 0 0 1-.624-.278l-3.209-3.208Zm.623-4.69a4.077 4.077 0 1 1-8.154 0 4.077 4.077 0 0 1 8.154 0Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              role="group"
              data-slot="input-group-addon"
              data-align="inline-end"
              className={`flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4 order-last has-[>button]:-mr-1 has-[>kbd]:mr-[-0.15rem] pr-2.25 ${searchQuery === '' ? 'hidden' : ''}`}
              data-disabled={searchQuery === ''}
            >
              <button
                data-slot="button"
                data-variant="ghost"
                data-size="icon-xs"
                className="group/button shrink-0 justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-transform outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 flex items-center gap-2 text-sm shadow-none size-6 p-0 has-[>svg]:p-0 rounded-sm border-none"
                type="button"
                title="Clear"
                aria-label="Clear"
                onClick={() => setSearchQuery('')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-x"
                  aria-hidden="true"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <RepeatSeparator cn="dark:opacity-40" />

      {!hasResults ? (
        <div className="py-20 text-center text-muted-foreground">
          No gear found matching "{searchQuery}"
        </div>
      ) : (
        <>
          {/* Devices Section */}
          {filteredDevices.length > 0 && (
            <div className="space-y-4 my-8">
              <SectionHeading heading="Devices" />
              <ul className="divide-y divide-border border-y border-border">
                {filteredDevices.map((device) => (
                  <li key={device.name} className="list-none">
                    <div className="relative flex items-center pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 group">
                      <div className="mx-4 bg-muted flex items-center justify-center rounded-md border border-black/10 p-2 text-[#736F70] dark:border-white/10 [&_svg]:size-4">
                        {device.icon}
                      </div>
                      <div className="flex-1 space-y-1 border-l border-dashed border-border p-4 pr-2">
                        <h3 className="leading-snug font-medium text-balance text-secondary">
                          {device.name}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Web Extensions Section */}
          {filteredExtensions.length > 0 && (
            <div className="space-y-4 my-8">
              <SectionHeading heading="Web Extensions" />
              <ul className="divide-y divide-border border-y border-border">
                {filteredExtensions.map((extension, index) => (
                  <li key={extension.name} className="list-none">
                    <div className="relative flex items-center pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 group">
                      <div className="mx-4 bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10 select-none">
                        <span className="text-secondary text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1 space-y-1 border-l border-dashed border-border p-4 pr-2">
                        <h3 className="leading-snug font-medium text-balance">
                          <Link href={extension.href} target="_blank" rel="noopener">
                            <span className="absolute inset-0" aria-hidden="true"></span>
                            {extension.name}
                          </Link>
                        </h3>
                        <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <div>
                            <dt className="sr-only">Website</dt>
                            <dd>{getDomain(extension.href)}</dd>
                          </div>
                        </dl>
                      </div>
                      <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Software Section */}
          {filteredSoftware.length > 0 && (
            <div className="space-y-4 my-8">
              <SectionHeading heading="Software" />
              <ul className="divide-y divide-border border-y border-border">
                {filteredSoftware.map((app, index) => (
                  <li key={app.name} className="list-none">
                    <div className="relative flex items-center pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-900/40 group">
                      <div className="mx-4 bg-muted flex items-center justify-center rounded-md border border-black/10 px-2 py-1 text-[#736F70] dark:border-white/10 select-none">
                        <span className="text-secondary text-sm font-semibold">{index + 1}</span>
                      </div>
                      <div className="flex-1 space-y-1 border-l border-dashed border-border p-4 pr-2">
                        <h3 className="leading-snug font-medium text-balance">
                          <Link href={app.href} target="_blank" rel="noopener">
                            <span className="absolute inset-0" aria-hidden="true"></span>
                            {app.name}
                          </Link>
                        </h3>
                        <dl className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                          <div>
                            <dt className="sr-only">Website</dt>
                            <dd>{getDomain(app.href)}</dd>
                          </div>
                        </dl>
                      </div>
                      <ArrowUpRight className="text-muted-foreground group-hover:text-foreground size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
