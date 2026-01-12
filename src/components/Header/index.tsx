'use client';

import { SidebarTrigger } from '@ui/sidebar';
import { ThemeToggle } from '../ThemeToggle';

export default function Header() {
  return (
    <div className='flex-1 flex flex-col'>
      <header className='h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10'>
        <div className='flex items-center'>
          <SidebarTrigger className='cursor-pointer' />
          <h1 className='text-xl font-semibold ml-4 text-foreground'>
            FCJA.DEV
          </h1>
        </div>
        <ThemeToggle />
      </header>
    </div>
  );
}
