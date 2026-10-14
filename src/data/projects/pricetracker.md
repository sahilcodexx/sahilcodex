---
title: Price Tracker
description: >-
  A product-price tracker built with Next.js, Supabase, and Firecrawl. It saves
  extracted product data and price history; scheduled checks and email alerts
  remain in development.
image: /projects/trackhatke.avif
technologies:
  - Next.js
  - TypeScript
  - Supabase
  - Firecrawl
  - Resend
github: 'https://github.com/sahilcodexx/price-tracker'
live: 'https://trackhatke.vercel.app/'
timeline: 2 months
role: Full-Stack Developer
team: Solo Project
status: in-progress
featured: true
isPublished: true
problem: >-
  A current price gives little context on whether a product is getting cheaper.
  Price Tracker collects product information and historical observations in one
  dashboard.
contribution: >-
  Built the product submission flow, scraping integration, database writes, and
  price-history retrieval. The repository also includes work toward automated
  checks and email alerts.
outcome: >-
  A developing full-stack tracker with product extraction and price-history
  code. Scheduled checks and email delivery are implementation work in progress,
  rather than a verified production service.
statusLabel: In development
decisions:
  - title: Extract before saving
    description: >-
      A Next.js Server Action passes the submitted URL to Firecrawl and uses the
      extracted product information to create a tracked record.
  - title: Keep a separate history
    description: >-
      Current product data and historical price observations are stored
      separately. A history query retrieves observations for the selected
      product.
  - title: Separate background work
    description: >-
      A dedicated price-check route contains the refresh and alert flow, with a
      separate email helper. This automation is still under development.
evidence:
  - label: Product actions
    href: 'https://github.com/sahilcodexx/price-tracker/blob/main/app/actions.ts'
  - label: Price-check route
    href: >-
      https://github.com/sahilcodexx/price-tracker/blob/main/app/api/cron/check-price/route.js
---

## Following the data

A product URL moves through extraction, a saved product record, and a historical price entry. The dashboard can retrieve those entries for the product instead of treating every scrape as an unrelated result.

## What is still being built

The repository includes a price-check endpoint and an email helper, but those files do not establish that a scheduled job or alert service is operating reliably. The current case study focuses on the implemented data flow and keeps that automation work separate from the result.

The source provides a concrete review path through Server Actions, scraping, authenticated database access, and history queries.
