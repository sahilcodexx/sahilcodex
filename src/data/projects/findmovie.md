---
title: Movie Finder
description: >-
  A React movie search app using TMDB, with a 900 ms search debounce, loading
  and error states, and an Appwrite-backed list of frequently searched movies.
image: >-
  https://raw.githubusercontent.com/sahilcodexx/movie-app/refs/heads/main/public/stage-1768141462162.webp
technologies:
  - React
  - JavaScript
  - Vite
  - Tailwind CSS
  - TMDB API
  - Appwrite
github: 'https://github.com/sahilcodexx/movie-app'
live: 'https://find-moviename.vercel.app/'
timeline: 3 Days
role: Frontend Developer
team: Solo
status: completed
featured: true
isPublished: true
problem: >-
  Movie search needs to stay responsive while results come from a remote API.
  This project turns a typed title into a browsable set of posters and movie
  information.
contribution: >-
  Built the search interface, TMDB request flow, reusable movie cards, and
  search-count integration with Appwrite.
outcome: >-
  A deployed React app for movie search and browsing, with a second discovery
  surface based on recorded searches.
statusLabel: Completed
decisions:
  - title: Separate typing from fetching
    description: >-
      The input updates immediately. A separate search value changes after a 900
      ms debounce, which reduces requests while someone is still typing.
  - title: Make request state visible
    description: >-
      Loading, result, and error state are tracked separately. The interface can
      show a spinner during a request and a message when fetching fails.
  - title: Track search activity
    description: >-
      Successful searches update an Appwrite search count. Frequently searched
      movies are loaded separately from TMDB discovery results.
evidence:
  - label: Search implementation
    href: 'https://github.com/sahilcodexx/movie-app/blob/main/src/App.jsx'
---

## The search flow

With an empty query, the app requests TMDB's discovery list sorted by popularity. Entering a title switches to the search endpoint after the debounce. Results appear as movie cards rather than raw API data.

## What to inspect

The main React component shows how input state, asynchronous requests, and loading feedback connect. The Appwrite integration adds persistence for search activity without moving the movie catalog into a separate database.

This is a compact frontend project. Its focus is API-backed interaction and React state, with the demo and source available for review.
