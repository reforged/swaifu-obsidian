import React, { useEffect, useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MoonIcon } from '@heroicons/react/24/solid'
import { ComputerDesktopIcon, SunIcon } from '@heroicons/react/20/solid'
import {classNames} from "../utils/helper";

export default function DarkMode () {
  const [theme, setTheme] = useState(localStorage.theme)

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const modes = {
    light: { label: 'Light', handle: () => toLight(), icon: <SunIcon width={24}/> },
    dark: { label: 'Dark', handle: () => toDark(), icon: <MoonIcon width={24}/> },
    default: { label: 'System', handle: () => toOsPreference(), icon: <ComputerDesktopIcon width={24}/> }
  }

  function getCurrentMode () {
    const data: 'light' | 'dark' | 'default' = theme
    return modes[data] || modes.default
  }

  function toggle () {
    const theme = localStorage.theme
    if (theme === 'dark') {
      toLight()
    }
    if (theme === 'light') {
      toDark()
    } else {
      toLight()
    }
  }

  function toDark () {
    localStorage.theme = 'dark'
    setTheme('dark')
  }

  function toLight () {
    localStorage.theme = 'light'
    setTheme('light')
  }

  function toOsPreference () {
    localStorage.removeItem('theme')
    setTheme(null)
  }

  return (
    <div className="relative">
        <button
          onClick={toggle}
          className="flex justify-center items-center self-center text-sky-500 h-full text-sm font-medium focus:outline-none">
          {getCurrentMode().icon}
        </button>

    </div>
  )
}