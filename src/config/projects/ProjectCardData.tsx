import Motion from '@/components/icons/social/FramerMotion';
import ReactJs from '@/components/icons/tech/ReactIcon';
import { Convex } from '@/components/icons/tech/Convex';
import { Firecrawl } from '@/components/icons/tech/FireCrawl';
import Gsap from '@/components/icons/tech/Gsap';
import JavaScript from '@/components/icons/tech/JavaScript';
import NextJs from '@/components/icons/tech/NextJS';
import { Supabase } from '@/components/icons/tech/Supabase';
import TailwindCss from '@/components/icons/tech/TailwindCss';
import TypeScript from '@/components/icons/tech/TypeScript';
import Vite from '@/components/icons/tech/Vite';
import { NodeJs, Npm } from '@/lib/techIcons';
import { Code2, Database, Music2, Smartphone } from 'lucide-react';

export const ProjectCardData = [
  {
    id: 1,
    title: 'Movie Finder',
    subheading: 'React Movie App',
    img: {
      src: '/projects/project2.avif',
      alt: 'Movie Finder project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A React movie search app using TMDB, with a 900 ms search debounce, loading and error states, and an Appwrite-backed list of frequently searched movies.',
    links: {
      website: 'https://find-moviename.vercel.app/',
      github: 'https://github.com/sahilcodexx/movie-app',
      details: '/projects/findmovie',
    },
    technologies: [
      {
        name: 'JavaScript',
        icon: <JavaScript />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Appwrite',
        icon: <Database />,
        href: 'https://appwrite.io/',
      },
      {
        name: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/findmovie',
  },
  {
    id: 2,
    title: 'Nova Gaming',
    subheading: 'Interactive Web Experience',
    img: {
      src: '/projects/project3.avif',
      alt: 'Nova Gaming GSAP animated project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A GSAP animation project built with JavaScript, Vite, and Tailwind CSS. Reusable animation helpers organize the motion work behind the interactive landing page.',
    links: {
      website: 'https://nova-gsap.vercel.app/',
      github: 'https://github.com/sahilcodexx/nova-gsap',
      details: '/projects/nova',
    },
    technologies: [
      {
        name: 'JavaScript',
        icon: <JavaScript />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'GSAP',
        icon: <Gsap />,
        href: 'https://greensock.com/gsap/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/nova',
  },
  {
    id: 3,
    title: 'ChefyAI',
    subheading: 'AI-Powered Recipe Generator',
    img: {
      src: '/projects/project1.avif',
      alt: 'ChefyAI project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A recipe assistant built with React and Puter.js. It keeps conversation context, checks AI readiness, and handles pending responses and provider errors in the chat.',
    links: {
      website: 'https://chefyai.vercel.app/',
      github: 'https://github.com/sahilcodexx/ai-recipe',
      details: '/projects/chefyai',
    },
    technologies: [
      {
        name: 'JavaScript',
        icon: <JavaScript />,
        href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      },
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Framer Motion',
        icon: <Motion />,
        href: 'https://www.framer.com/motion/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/chefyai',
  },
  {
    id: 4,
    title: 'Figart',
    subheading: 'Browser Design Workspace',
    img: {
      src: '/projects/figart.avif',
      alt: 'Figart design workspace project image',
      width: 2402,
      height: 1420,
    },
    description:
      'A browser design workspace for interfaces and vector artwork. An SVG canvas, layers, auto layout, and reusable design elements sit next to account-backed file storage.',
    links: {
      website: 'https://figart.vercel.app/',
      github: 'https://github.com/sahilcodexx/Figart',
      details: '/projects/figart',
    },
    technologies: [
      {
        name: 'Next.js',
        icon: <NextJs />,
        href: 'https://nextjs.org/',
      },
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Convex',
        icon: <Convex />,
        href: 'https://www.convex.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/figart',
  },
  {
    id: 5,
    title: 'Price Tracker',
    subheading: 'Automated Price Monitor',
    img: {
      src: '/projects/trackhatke.avif',
      alt: 'Price Tracker project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A product-price tracker built with Next.js, Supabase, and Firecrawl. It saves extracted product data and price history; scheduled checks and email alerts remain in development.',
    links: {
      website: 'https://trackhatke.vercel.app/',
      github: 'https://github.com/sahilcodexx/price-tracker',
      details: '/projects/pricetracker',
    },
    technologies: [
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Firecrawl',
        icon: <Firecrawl />,
        href: 'https://firecrawl.dev/',
      },
      {
        name: 'Next.js',
        icon: <NextJs />,
        href: 'https://nextjs.org/',
      },
      {
        name: 'SupaBase',
        icon: <Supabase />,
        href: 'https://supabase.com/',
      },
    ],
    isWorking: false,
    isBulding: true,
    details: true,
    projectDetailsPageSlug: '/projects/pricetracker',
  },
  {
    id: 6,
    title: 'tcxcommit',
    subheading: 'AI Git Commit Generator',
    img: {
      src: '/projects/tccommit.avif',
      alt: 'tcxcommit project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A TypeScript CLI that reads a Git diff and asks OpenRouter for a conventional commit message. Developers can accept, regenerate, or exit before committing.',
    links: {
      website: 'https://tcxcommit.vercel.app/',
      github: 'https://github.com/sahilcodexx/tcxcommit',
      npm: 'https://www.npmjs.com/package/tcxcommit',
      details: '/projects/tcxcommit',
    },
    technologies: [
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'Node.js',
        icon: <NodeJs />,
        href: 'https://nodejs.org/',
      },
      {
        name: 'NPM-Cli Tool',
        icon: <Npm />,
        href: 'https://www.npmjs.com/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/tcxcommit',
  },
  {
    id: 7,
    title: 'Mechanical Keyboard',
    subheading: 'Interactive React Keyboard Components',
    img: {
      src: '/projects/keyui.avif',
      alt: 'Mechanical Keyboard project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A React keyboard component library with Apple Magic Keyboard and Keychron K2 layouts, physical key tracking, switch sounds, and haptic feedback on supported devices.',
    links: {
      website: 'https://keyui.vercel.app/',
      github: 'https://github.com/sahilcodexx/MechanicalKeyboard',
      details: '/projects/mechanicalkeyboard',
    },
    technologies: [
      {
        name: 'React',
        icon: <ReactJs />,
        href: 'https://reactjs.org/',
      },
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Vite',
        icon: <Vite />,
        href: 'https://vitejs.dev/',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/mechanicalkeyboard',
  },
  {
    id: 8,
    title: 'Bookmrk',
    subheading: 'Bookmark Workspace',
    img: {
      src: '/projects/bookmrkit.avif',
      alt: 'Bookmrk project image',
      width: 1920,
      height: 1080,
    },
    description:
      'A bookmark workspace with search, custom tags, and a command palette. Next.js and Supabase handle account-based storage; optimistic updates keep editing responsive.',
    links: {
      website: 'https://bookmrkit.vercel.app/',
      github: 'https://github.com/sahilcodexx/Bookmrk',
      details: '/projects/bookmrk',
    },
    technologies: [
      {
        name: 'Next.js',
        icon: <NextJs />,
        href: 'https://nextjs.org/',
      },
      {
        name: 'TypeScript',
        icon: <TypeScript />,
        href: 'https://www.typescriptlang.org/',
      },
      {
        name: 'TailwindCSS',
        icon: <TailwindCss />,
        href: 'https://tailwindcss.com/',
      },
      {
        name: 'Supabase',
        icon: <Supabase />,
        href: 'https://supabase.com/',
      },
    ],
    isWorking: false,
    isBulding: true,
    details: true,
    projectDetailsPageSlug: '/projects/bookmrk',
  },
  {
    id: 9,
    title: 'Aro Music',
    subheading: 'Android Music Player',
    img: {
      src: '/aromusic.avif',
      alt: 'Aro Music website with the Android home screen and music player',
      width: 2072,
      height: 1222,
    },
    description:
      'An Android music app combining local playback, YouTube Music discovery, and Spotify playlist imports. Kotlin and Compose power the app, with a Next.js companion website.',
    links: {
      website: 'https://aromusic.vercel.app/',
      github: 'https://github.com/sahilcodexx/aro-music',
      details: '/projects/aro-music',
    },
    technologies: [
      { name: 'Kotlin', icon: <Code2 />, href: 'https://kotlinlang.org/' },
      {
        name: 'Jetpack Compose',
        icon: <Smartphone />,
        href: 'https://developer.android.com/compose',
      },
      {
        name: 'Media3',
        icon: <Music2 />,
        href: 'https://developer.android.com/media/media3',
      },
      {
        name: 'Room',
        icon: <Database />,
        href: 'https://developer.android.com/training/data-storage/room',
      },
    ],
    isWorking: true,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/aro-music',
  },
  {
    id: 10,
    title: 'Linux Dictation',
    subheading: 'Local Voice-to-Text App · Upcoming',
    img: {
      src: '',
      alt: '',
      width: 1920,
      height: 1080,
    },
    description:
      'A planned free dictation app focused on Linux. Record speech, transcribe it locally, and insert the text into your workflow without a cloud transcription subscription.',
    links: {
      website: '',
      github: '',
      details: '/projects/linux-dictation',
    },
    technologies: [
      { name: 'Linux', icon: <Code2 />, href: '' },
      { name: 'Local inference', icon: <Code2 />, href: '' },
      { name: 'Speech to text', icon: <Code2 />, href: '' },
    ],
    statusLabel: 'Upcoming',
    isWorking: false,
    isBulding: false,
    details: true,
    projectDetailsPageSlug: '/projects/linux-dictation',
  },
];
