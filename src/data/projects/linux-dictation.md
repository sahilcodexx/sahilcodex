---
title: Linux Dictation
description: >-
  A planned free dictation app focused on Linux. Record speech, transcribe it
  locally, and insert the text into your workflow without a cloud transcription
  subscription.
technologies:
  - Linux
  - Local inference
  - Speech to text
timeline: Upcoming
role: Developer
status: planning
statusLabel: Upcoming
isLive: false
featured: true
applicationCategory: ProductivityApplication
operatingSystem: Linux
problem: >-
  I want a free voice-dictation workflow that runs locally and treats Linux as
  a primary platform. The goal is to speak instead of typing while keeping
  transcription on the user's machine.
contribution: >-
  This project is in planning. The scope covers desktop audio capture, local
  speech recognition, and getting the resulting text into the application
  the user is working in. Linux Dictation is a working title.
decisions:
  - title: Run transcription locally
    description: >-
      The planned app will process speech on the device. Model choice, download
      size, and CPU or GPU requirements still need evaluation.
  - title: Start with Linux
    description: >-
      Desktop integration will focus on Linux. Microphone permissions, global
      shortcuts, and text insertion need to be tested on Wayland and X11.
  - title: Keep dictation simple
    description: >-
      The intended flow is a shortcut to start recording, another action to
      stop, and a transcript ready to insert or copy. Recording and processing
      state should stay visible throughout.
outcome: >-
  Upcoming project. No downloadable build, public repository, or performance
  results are available yet. The first milestone is a local recording-to-text
  prototype, followed by Linux desktop integration.
---

## The intended workflow

Trigger dictation, speak, and stop recording. A local speech-recognition model
will turn the audio into text. The goal is to insert that text into the active
application, with copying available when direct insertion is unsupported.

The app is intended to be free to use and runnable locally. Transcription
should work without a cloud service after the required model has been
downloaded.

## What needs to be proved

The first prototype will test transcription quality and processing time on
Linux hardware. Those results will guide the model and implementation choices.
Desktop testing will then cover audio capture, shortcut behavior, and text
insertion across Wayland and X11.

These are planned capabilities. The stack, supported distributions, and release
date will be documented as implementation and testing progress.
