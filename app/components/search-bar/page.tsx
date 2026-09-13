import type { Metadata } from 'next';
import SearchBarDocPage from '@/components/components/SearchBarDocPage';

export const metadata: Metadata = {
  title: 'Search Bar — Command-Palette Style Searchable Dropdown UI | Sahil',
  description:
    'Animated UI component for a command-palette style searchable dropdown with keyboard navigation, live match highlighting, and click-outside dismissal. Built with Motion and Lucide icons.',
  openGraph: {
    title: 'Search Bar Component — Sahil',
    description:
      'Animated UI component for a command-palette style searchable dropdown with keyboard navigation, live match highlighting, and click-outside dismissal.',
  },
};

export default function Page() {
  return <SearchBarDocPage />;
}
