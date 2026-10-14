---
title: Aro Music
description: >-
  An Android music app combining local playback, YouTube Music discovery, and
  Spotify playlist imports. Kotlin and Compose power the app, with a Next.js
  companion website.
technologies:
  - Kotlin
  - Jetpack Compose
  - Media3
  - Room
  - Hilt
  - Ktor
  - Next.js
  - TypeScript
github: 'https://github.com/sahilcodexx/aro-music'
live: 'https://aromusic.vercel.app/'
timeline: Active development
role: Android & web developer
status: in-progress
featured: true
applicationCategory: MusicApplication
operatingSystem: Android
image: /aromusic.avif
liveLabel: Visit website
isLive: true
betaUrl: 'https://github.com/sahilcodexx/aro-music/releases'
statusLabel: Live beta
problem: >-
  Local songs and playlists from different services need a consistent listening
  experience. Aro brings library browsing, online discovery, and imported
  playlists into one Android app.
contribution: >-
  My work spans Spotify connection and playlist-loading refinements, home-feed
  behavior, genre discovery, app updates, release validation, and the companion
  website. Aro builds on PixelPlay, Meld, and InnerTubeX, with their credits
  retained.
outcome: >-
  A development prerelease with recorded local and online playback checks,
  authenticated Spotify playlist loading, and a responsive app website. The
  release record includes 246 passing debug and 246 passing release unit tests
  for the genre and update follow-up.
decisions:
  - title: Load playlists progressively
    description: >-
      Playlist titles and source counts appear before all tracks finish
      matching. Playable tracks arrive in order, and complete snapshots stay
      fresh for six hours to avoid repeating the same work.
  - title: Keep the feed stable
    description: >-
      Recommendations remain cached when a track changes. Playback and artwork
      colors update independently, while pull to refresh requests new discovery
      content.
  - title: Separate catalog and playback
    description: >-
      Spotify provides metadata and playlists. Aro matches tracks to YouTube
      Music for playback and creates local import copies, so source counts and
      playable counts can differ.
  - title: Validate the release artifact
    description: >-
      The development workflow checks unit tests, emulator behavior, signing,
      and native alignment. The signed APK is also checked on a physical phone.
evidence:
  - label: Release validation
    href: 'https://github.com/sahilcodexx/aro-music/blob/main/RELEASE_CHECKLIST.md'
  - label: Playlist implementation notes
    href: 'https://github.com/sahilcodexx/aro-music/blob/main/SPOTIFY_INTEGRATION.md'
  - label: Download releases
    href: 'https://github.com/sahilcodexx/aro-music/releases'
---

## The listening experience

Browse songs, artists, albums, favorites, and playlists from the phone's local library. Search YouTube Music for online discovery, open related-song queues, or connect Spotify to browse account playlists and liked songs. Lyrics, listening history, and an equalizer sit within the same app.

Home separates recently played songs, pinned speed dial tracks, daily mixes, and discovery shelves. Artwork colors carry across the player, navigation, and backgrounds. Loading placeholders reserve shelf space while recommendations arrive.

## Architecture and service boundaries

Jetpack Compose powers the interface, Media3 handles playback, Room stores local data, Hilt supplies dependencies, and Ktor supports network requests. The repository separates the phone app, shared functionality, and adapted InnerTubeX sources.

Spotify connection uses an in-app sign-in page and a saved session. Playlist imports become editable local copies. Removed, restricted, or unmatched songs can reduce the playable count, and changes to the original playlist do not automatically synchronize.

## A companion website with usable interactions

The Next.js website uses real app screens and Aro's rounded typography. Visitors can switch between previews with keyboard-accessible buttons. Selection changes are announced through a live region; light and dark themes persist locally.

Reduced-motion preferences disable scrolling effects and movement. Native question disclosures and direct release links keep the main information accessible without relying on animation. The mobile menu restores focus when closed with Escape.

## Current scope

The phone app requires Android 11 or newer. Physical validation is recorded for a Samsung ARM64 phone, with selected emulator checks on API 30 and 36. Broader device and optional-provider coverage remains ongoing. Google Drive is disabled pending OAuth setup, and Wear OS is outside the current phone validation scope.

Aro retains the credits and notices for its upstream projects. Component licensing remains unresolved for the combined app, as documented in the [license status](https://github.com/sahilcodexx/aro-music/blob/main/LICENSE_STATUS.md). The [release checklist](https://github.com/sahilcodexx/aro-music/blob/main/RELEASE_CHECKLIST.md) records what has been tested and what remains.
