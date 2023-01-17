import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { HomeIcon, TagIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'
import { classNames, ReactElement } from '../helper'

type LinkItem = {
  label: string
  href: string
  icon: (...props: any) => JSX.Element
  children?: LinkItem[]
}

export default function Sidebar ({ ...props }) {
  const links: LinkItem[] = [
    { label: 'Home', href: '/', icon: HomeIcon },
    { label: 'Étiquettes', href: '/etiquettes', icon: TagIcon},
    { label: 'Questions', href: '/questions', icon: ChatBubbleBottomCenterTextIcon}
  ]

  return (
    <div {...props}>
      <div className="px-5 py-5">
        {links.map((link) => link.children
          ? <ChildLinks key={link.label} link={link} />
          : <Link key={link.label} link={link} /> )}
      </div>
    </div>
  )
}

function Link ({ link }: { link: LinkItem }): JSX.Element {
  return (
    <NavLink to={link.href} className={({ isActive }) => classNames('px-3 py-2 rounded-md flex space-x-2', isActive ? 'bg-purple-100' : '')}>
      {({ isActive }) => (
        <Fragment>
          <ReactElement tag={link.icon} className={classNames('w-5', isActive ? 'text-purple-600' : '')} />
          <span className={classNames('font-medium text-sm', isActive ? 'text-purple-600' : '')}>{link.label}</span>
        </Fragment>
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
            to={child.href}
            key={child.label}
            className={({ isActive }) => classNames('px-3 py-2 rounded-md flex space-x-2', isActive ? 'bg-purple-100': '')}
          >
            {({ isActive }) => (
              <Fragment>
                <ReactElement tag={child.icon} className={classNames('w-5', isActive ? 'text-purple-600' : '')} />
                <span className={classNames('font-medium text-sm', isActive ? 'text-purple-600': '')}>{child.label}</span>
              </Fragment>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}