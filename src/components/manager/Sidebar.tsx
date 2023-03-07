import React, {Fragment, useState} from 'react'
import { NavLink, Link } from 'react-router-dom'
import {
  HomeIcon,
  ListBulletIcon,
  ChatBubbleBottomCenterTextIcon,
  UserIcon,
  DocumentTextIcon,
  UserGroupIcon
} from '@heroicons/react/24/solid'
import { classNames, ReactElement } from '../../utils/helper'
import Profil from "./Profil";
import {Menu, Transition} from "@headlessui/react";
import {InformationCircleIcon} from "@heroicons/react/24/outline";

type LinkItem = {
  label: string
  href?: string
  icon?: (...props: any) => JSX.Element
  children?: LinkItem[]
}

export default function Sidebar ({ ...props }) {
  const links: LinkItem[] = [
    { label: 'Home', href: '/manager/home', icon: HomeIcon },
    { label: 'QCM', href: '/manager/qcm', icon: ListBulletIcon},
    { label: 'Comptes', href: '/manager/comptes', icon: UserGroupIcon}
    /*{
      label: 'QCM',
      children: [
        { label: 'Étiquettes', href: '/manager/etiquettes', icon: TagIcon},
        { label: 'Questions', href: '/manager/questions', icon: ChatBubbleBottomCenterTextIcon},
        { label: 'Séquences', href: '/manager/sequences', icon: DocumentTextIcon}
      ]
    },
    {
      label: 'Comptes',
      children: [
        { label: 'Utilisateurs', href: '/manager/users', icon: UserIcon},
      ]
    }*/
  ]

  const [open, setOpen] = useState<boolean>(false)

  return (
    <div {...props}>
      <div className="flex flex-col justify-between h-full bg-white">
          <Link to={"/"} className="inline-flex border">
            <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
              <a
                href="#"
                className="flex h-20 w-20 items-center justify-center  focus:outline-none "
              >
                <img
                  className="h-12 w-auto"
                  src="https://cdn.discordapp.com/attachments/935833137349541918/1071833266841210961/branding.png"
                  alt="Your Company"
                />
              </a>
            </div>
          </Link>
          <div className="flex flex-col justify-between border-r h-full py-8">
            <div className=" flex flex-col gap-4">
              {links.map((link) =>
                <LinkItem key={link.label} link={link} /> )
              }
            </div>

            <div>
              <div className="relative flex flex-col gap-4 py-4">
                <Info />
              </div>
            </div>
          </div>

        </div>


    </div>
  )
}

function Info () {
  return (
    <div className="mx-auto relative">
      <Menu>
        <Menu.Button >
          {(active) => (
            <div className={classNames(
              active.open ? 'bg-[#E2E9F3] text-[#5B50D6]' : '',
              'flex rounded-md p-3 mx-auto hover:bg-[#E2E9F3] hover:text-[#5B50D6] ease-in-out duration-200'
            )}>
              <InformationCircleIcon className="w-6 h-auto" />
            </div>

          )}

        </Menu.Button>
        <Transition>
          <div className="absolute rounded-md left-[100%] ml-4 bottom-0 w-72 origin-top-left rounded-md bg-white shadow-lg flex flex-1">
            <div className="flex flex-col flex-1 p-4">
              <span className="text-gray-400">Besoin d'aide ?</span>
              <div className="flex flex-col flex-1 pt-4">
                <a href="https://docs.reforged.fr" target="_blank">
                  <div className="flex items-center gap-2 p-2 group hover:bg-[#E2E9F3] rounded-md">
                     <span>
                      <DocumentTextIcon className="w-6 h-6 text-[#7A71DE]" />
                    </span>
                    <span className="text-gray-700 font-medium group-hover:text-[#7A71DE]">Voir la documentation</span>
                  </div>

                </a>
              </div>
            </div>
          </div>
        </Transition>
      </Menu>
    </div>
  )
}

function LinkItem ({ link }: { link: LinkItem }): JSX.Element {
  return (
    <NavLink to={link.href!} className={({ isActive }) => classNames('flex rounded-md p-3 mx-auto hover:bg-[#E2E9F3] hover:text-[#5B50D6] ease-in-out duration-200', isActive ? 'bg-[#E2E9F3]' : '')}>
      {({ isActive }) => (
          <ReactElement tag={link.icon!} className={classNames('w-6', isActive ? 'text-[#5B50D6]' : '')} />
      )}
    </NavLink>
  )
}

function ChildLinks ({ link }: { link: LinkItem }): JSX.Element {
  return (
    <div className="mt-5">
      <div className="py-2 text-xs tracking-wide font-bold opacity-50">{link.label}</div>
      <div className="flex flex-col">
        {link.children?.map((child) => (
          <NavLink
            to={child.href!}
            key={child.label}
            className={({ isActive }) => classNames('px-3 py-2 rounded-md flex space-x-2', isActive ? 'bg-purple-100': '')}
          >
            {({ isActive }) => (
              <Fragment>
                <ReactElement tag={child.icon!} className={classNames('w-5', isActive ? 'text-purple-600' : '')} />
                <span className={classNames('font-medium text-sm', isActive ? 'text-purple-600': '')}>{child.label}</span>
              </Fragment>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}