---
title: tcxcommit
description: >-
  A TypeScript CLI that reads a Git diff and asks OpenRouter for a conventional
  commit message. Developers can accept, regenerate, or exit before committing.
image: /projects/tccommit.avif
technologies:
  - TypeScript
  - Node.js
  - OpenRouter
  - npm
github: 'https://github.com/sahilcodexx/tcxcommit'
live: 'https://tcxcommit.vercel.app/'
npm: 'https://www.npmjs.com/package/tcxcommit'
timeline: 2 Weeks
role: Creator
team: Solo
status: completed
featured: true
isPublished: true
problem: >-
  A commit message should explain the changes, but writing one interrupts the
  development flow. tcxcommit generates a suggestion from the diff and leaves
  the decision with the developer.
contribution: >-
  Built the CLI flow, Git integration, OpenRouter request handling, local
  configuration, and npm package.
outcome: >-
  An npm-distributed developer tool with an interactive commit workflow and
  documented handling for missing changes, network failures, and rate limits.
statusLabel: Completed
decisions:
  - title: Generate from the diff
    description: >-
      The tool reads the staged diff through Git and sends it to OpenRouter as
      the context for a conventional commit suggestion.
  - title: Require a review step
    description: >-
      The terminal presents the message and lets the user accept, regenerate, or
      exit. Committing and the optional push are separate steps in the flow.
  - title: Support configured access
    description: >-
      The CLI supports a personal OpenRouter key and a configured trial path.
      Local configuration records the selected key and trial state.
evidence:
  - label: npm package
    href: 'https://www.npmjs.com/package/tcxcommit'
  - label: CLI workflow
    href: 'https://github.com/sahilcodexx/tcxcommit#how-it-works'
---

## The terminal workflow

Run the CLI from a Git repository. It stages changes automatically, reads the staged diff, and requests a message. Review the result before accepting it; regeneration and exit are available in the same flow. A push is optional after the commit.

The automatic staging behavior matters when reviewing this tool because it affects what enters the diff. The generated message is only as useful as the changes it receives.

## Distribution and configuration

The package can be run through npm installation or npx. Configuration lives on the user's machine, with environment variables also supported for provider access. The repository documents the request flow and failure cases alongside the code.

```bash
npx tcxcommit
```
