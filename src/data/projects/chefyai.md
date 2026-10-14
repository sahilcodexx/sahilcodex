---
title: ChefyAI
description: >-
  A recipe assistant built with React and Puter.js. It keeps conversation
  context, checks AI readiness, and handles pending responses and provider
  errors in the chat.
image: >-
  https://raw.githubusercontent.com/sahilcodexx/ai-recipe/refs/heads/main/public/stage-1768141052622.webp
technologies:
  - React
  - JavaScript
  - Tailwind CSS
  - Framer Motion
  - Puter.js
  - Vite
github: 'https://github.com/sahilcodexx/ai-recipe'
live: 'https://chefyai.vercel.app/'
timeline: 1 month
role: Frontend Developer
team: Solo Project
status: completed
featured: true
isPublished: true
problem: >-
  A recipe question often needs a follow-up: swap an ingredient, change a
  portion, or clarify a step. ChefyAI uses a conversation so each request can
  build on the previous answer.
contribution: >-
  Built the recipe chat, Puter authentication integration, request state, and
  responsive frontend.
outcome: >-
  A deployed recipe chat with provider authentication and a complete
  request-and-response flow. AI generation runs through Puter.js from the
  browser.
statusLabel: Completed
decisions:
  - title: Keep conversation context
    description: >-
      Each request includes the message history and a cooking-focused system
      prompt. Follow-up questions use the existing conversation instead of
      starting from an isolated prompt.
  - title: Wait for the provider
    description: >-
      The interface checks whether the Puter AI client is ready and exposes that
      state. Empty input is ignored before a request is sent.
  - title: Handle response variation
    description: >-
      The reply handler accepts string responses or message objects. Pending
      requests show feedback, and caught errors appear in the conversation.
evidence:
  - label: Recipe chat source
    href: >-
      https://github.com/sahilcodexx/ai-recipe/blob/main/src/components/pages/AiRecipe.jsx
---

## From a question to a conversation

Ask for a recipe or describe available ingredients, then follow up in the same chat. The interface retains previous messages, moves the conversation to the latest response, and shows when the assistant is waiting for an answer.

## Keeping the frontend understandable

Provider readiness, authentication, input, message history, and request progress have different responsibilities. Keeping those states distinct makes it possible to explain why the interface is waiting and handle errors without discarding the conversation.

The project uses Puter for provider access rather than maintaining a custom AI backend. The source makes that integration and its client-side state handling available to inspect.
