'use client'

import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as DropdownMenu from '@/components/ui/dropdown-menu'
import { useT } from '@/context/providers'
import { tKey } from '@/i18n/tKey'

const options = [
  { value: 'light', label: tKey('Light'), icon: SunIcon },
  { value: 'dark', label: tKey('Dark'), icon: MoonIcon },
  { value: 'system', label: tKey('System'), icon: MonitorIcon },
]

export default function ThemeToggle() {
  const t = useT()
  const { theme, setTheme } = useTheme()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type='button'
          aria-label={t('Theme')}
          className='text-secondary hover:bg-foreground/5 hover:text-foreground flex size-9 items-center justify-center rounded-full transition-colors'
        >
          {/* both icons are always rendered and swapped with CSS, so there is no hydration
              mismatch while next-themes is still resolving the theme */}
          <SunIcon className='size-5 dark:hidden' />
          <MoonIcon className='hidden size-5 dark:block' />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align='end' className='w-40'>
        <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
          {options.map(option => (
            <DropdownMenu.RadioItem
              key={option.value}
              value={option.value}
              className='focus:bg-foreground/5 focus:text-foreground'
            >
              <option.icon className='size-4' />
              {t(option.label)}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
