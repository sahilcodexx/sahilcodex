'use client';

import { useState } from 'react';
import ThemeToggel from './ThemeToggel';
import Link from 'next/link';
import Container from '../layouts/Container';
import { motion } from 'motion/react';
import { CommandMany } from './CommandMany';
import { Menu, Search } from 'lucide-react';
import { Pixelify_Sans } from 'next/font/google';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const pixelify = Pixelify_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const navList = [
  { name: 'Components', href: '/components' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Projects', href: '/projects' },
];

const Navbar = () => {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <div className="bg-background dark:bg-[#050505] sticky top-0 isolate z-50 pt-1">
        <Container>
          <div>
            <motion.div
              className={`before:bg-border after:bg-border relative m-auto mt-1 flex w-full max-w-screen items-center justify-between gap-2 overflow-visible px-4 py-1.5 transition-shadow duration-300 before:absolute before:top-0 before:left-1/2 before:z-[1] before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]`}
            >
              <div>
                <Link href="/">
                  <h2
                    className={`${pixelify.className} text-2xl uppercase`}
                    style={{ fontFamily: 'var(--font-pixelify), "Pixelify Sans", sans-serif' }}
                  >
                    SAHIL
                  </h2>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-3 md:flex">
                  {navList.map((items) => {
                    return (
                      <Link
                        key={items.name}
                        href={items.href}
                        className="text-md font-light text-pretty underline-offset-5 hover:underline"
                      >
                        {items.name}
                      </Link>
                    );
                  })}
                  <CommandMany />
                </div>
                <span className="bg-border hidden h-4 w-px md:block"></span>
                <ThemeToggel />

                {/* Mobile Navigation Dropdown */}
                <div className="md:hidden border-l">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer rounded-full"
                        aria-label="Menu"
                      >
                        <Menu size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" side="bottom" sideOffset={8} className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/" className="w-full cursor-pointer">
                          Home
                        </Link>
                      </DropdownMenuItem>
                      {navList.map((items) => (
                        <DropdownMenuItem key={items.name} asChild>
                          <Link href={items.href} className="w-full cursor-pointer">
                            {items.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Floating Bottom Search Button for Mobile */}
      <div className="fixed inset-x-0 bottom-6 z-50 mx-auto w-fit md:hidden">
        <Button
          onClick={() => setCommandOpen(true)}
          size="default"
          variant="outline"
          className="bg-background/95 gap-2 rounded-full border px-5 shadow-lg backdrop-blur-md transition-transform active:scale-95"
        >
          <Search size={16} />
          <span>Search</span>
        </Button>
      </div>

      <CommandMany open={commandOpen} onOpenChange={setCommandOpen} hideButton />
    </>
  );
};

export default Navbar;
