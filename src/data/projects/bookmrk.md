---
title: Bookmrk
description: >-
  A bookmark workspace with search, custom tags, and a command palette. Next.js
  and Supabase handle account-based storage; optimistic updates keep editing
  responsive.
image: /projects/bookmrkit.avif
technologies:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - Supabase
  - cmdk
github: 'https://github.com/sahilcodexx/Bookmrk'
live: 'https://bookmrkit.vercel.app/'
timeline: Active Development
role: Full-stack developer
team: Solo
status: in-progress
featured: true
problem: >-
  Saved links lose their value when finding one takes longer than searching the
  web again. Bookmrk gives bookmarks a searchable workspace with custom tags and
  keyboard commands.
contribution: >-
  The work spans the dashboard, bookmark and tag APIs, authentication, and the
  client-side data layer that keeps the interface in sync with saved data.
outcome: >-
  A web workspace with bookmark CRUD, custom tags, search, and keyboard actions.
  The current implementation persists bookmarks through a signed-in account.
statusLabel: In development
decisions:
  - title: Optimistic editing
    description: >-
      Adds, edits, and deletes update the interface before the request finishes.
      Failed requests restore the previous state and show an error, so
      responsiveness does not hide a failed save.
  - title: Account-aware storage
    description: >-
      Supabase authentication and per-request database clients connect browser
      sessions to server routes. Row-level security scopes bookmark and tag
      queries to the signed-in user.
  - title: Keyboard access
    description: >-
      A Cmd-K palette exposes actions such as adding a bookmark, focusing
      search, and clearing filters. A shared data hook keeps these controls
      separate from persistence logic.
evidence:
  - label: Bookmark data hook
    href: >-
      https://github.com/sahilcodexx/Bookmrk/blob/main/lib/hooks/use-bookmarks.ts
  - label: Database access
    href: 'https://github.com/sahilcodexx/Bookmrk/blob/main/lib/bookmarks.ts'
---

## A workflow for finding things again

Save a URL with a title and tags, then narrow the collection through search and tag filters. Editing and deletion stay within the same workspace. The command palette makes common actions available without moving between menus.

## Where the engineering sits

The `useBookmarks` hook owns the bookmark list and mutation helpers. API routes handle requests, while the database access functions work with the user's Supabase session. This separates interface state, HTTP handling, and storage instead of placing all three inside the page.

The useful detail is the rollback path. An optimistic interface needs to recover from a rejected request as carefully as it handles a successful one. The hook replaces temporary entries with saved records and removes them if creation fails.
