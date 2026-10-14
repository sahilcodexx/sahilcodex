---
title: Repimly
description: >-
  An image editor combining Fabric.js canvas tools with AI processing. Next.js
  powers the app, Convex stores projects, and ImageKit handles image storage and
  transformations.
image: /projects/repimly.avif
technologies:
  - Next.js
  - TypeScript
  - React
  - Fabric.js
  - Convex
  - Clerk
  - ImageKit
  - Tailwind CSS
github: 'https://github.com/sahilcodexx/Image-Editor-AI'
live: 'https://repimly.vercel.app/'
timeline: Ongoing
role: Full-Stack Developer
team: Solo
status: in-progress
featured: true
isPublished: true
problem: >-
  Image editing involves more than a single AI request. Repimly brings manual
  adjustments, AI tools, and saved projects into one canvas-based workflow.
contribution: >-
  The project connects the editing interface, canvas state, authenticated
  project management, and image-processing services.
outcome: >-
  An image-editing application in active development, with manual tools, AI
  processing, and cloud-backed project management described in the repository.
statusLabel: In development
decisions:
  - title: A canvas for manual edits
    description: >-
      Fabric.js provides the editing layer for image and text manipulation.
      Crop, resize, and color adjustments sit alongside the AI tools.
  - title: Persist the project
    description: >-
      Convex stores project data, Clerk supplies authentication, and ImageKit
      handles image assets. These services have separate roles in the editing
      workflow.
  - title: Connect tools to one workspace
    description: >-
      AI retouching, upscaling, background removal, and image extension are
      exposed from the editor rather than separate standalone pages.
evidence:
  - label: Editor structure and tools
    href: 'https://github.com/sahilcodexx/Image-Editor-AI#readme'
---

## The editing workflow

Start a project with an uploaded image or blank canvas. Resize or crop the canvas, adjust image properties, add text, or use an AI tool. Project management and saving give the editor a workflow beyond uploading an image and receiving a processed file.

## The integration work

Canvas operations, remote image processing, and saved project data need to agree about which image is being edited. The repository separates canvas context, project database functions, and image services so their responsibilities can be reviewed individually.

This project is still developing. Its strongest review surface is the connection between an interactive canvas and the services used for authentication, persistence, and image processing.
