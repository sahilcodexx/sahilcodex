---
title: Mechanical Keyboard
description: >-
  A React keyboard component library with Apple Magic Keyboard and Keychron K2
  layouts, physical key tracking, switch sounds, and haptic feedback on
  supported devices.
image: /projects/keyui.avif
technologies:
  - React
  - TypeScript
  - Tailwind CSS
  - Web Audio
  - Web Haptics
github: 'https://github.com/sahilcodexx/MechanicalKeyboard'
live: 'https://keyui.vercel.app/'
timeline: 2 Weeks
role: Frontend & Audio Engineer
team: Solo
status: completed
featured: true
problem: >-
  An interactive keyboard has to respond to real key presses as well as clicks
  and touch. This project combines those inputs with keyboard geometry, sound,
  and visual feedback.
contribution: >-
  Built reusable keyboard components and the interface for exploring their
  layouts and interaction feedback.
outcome: >-
  An interactive demo and reusable keyboard components for React projects, with
  layout, theme, and feedback behavior visible in the repository.
statusLabel: Completed
decisions:
  - title: Reflect physical input
    description: >-
      Physical key presses activate the corresponding keys in the rendered
      layout, connecting hardware input to the visual component.
  - title: Combine input feedback
    description: >-
      Key interactions include switch sounds and haptic feedback on supported
      touch devices. Sound is configurable through the component interface.
  - title: Make the component reusable
    description: >-
      The repository provides copyable React components with theme and sound
      options, including Apple Magic Keyboard and Keychron K2 replicas.
evidence:
  - label: Component usage
    href: 'https://github.com/sahilcodexx/MechanicalKeyboard#readme'
---

## Interaction is the main feature

The keyboard connects a physical key press to a visible keycap and sound. On compatible touch devices, haptic feedback adds another response to the interaction. The layout matters because differently sized keys must still read as a real keyboard.

## Beyond the demo

A component can be configured with a theme and enabled sound, then placed inside another React application. That makes the demo a way to inspect a reusable interface, with the implementation available for developers who want to adapt it.

Device support determines whether haptic feedback is available. The component's visual and sound behavior can be explored directly in the live project.
