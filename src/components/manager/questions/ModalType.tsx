import React, { useState, Dispatch, SetStateAction, useEffect } from 'react'
import SelectType from './editor/SelectType'
import { IReponse, ITypeQuestion } from '@obsidian/type'
import useComponentVisible from '../../../hooks/useComponentVisible'
import { ListBulletIcon, PencilSquareIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactElement, classNames } from '../../../utils/helper'


const types: ITypeQuestion[] = [
  {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
  {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
]

type Props = {
	type: ITypeQuestion | null
	setType: Dispatch<SetStateAction<ITypeQuestion | null>>
}


export default function ({ type, setType }: Props) {
	useEffect(() => {
		console.log(type)
		
	}, [type])
	
  return (
		<div className="relative">
			<Content 
				setType={setType}
				type={type}
			/>
		</div>
	)
}

type ContentProps = {
	type: ITypeQuestion | null
	setType: Dispatch<SetStateAction<ITypeQuestion | null>>
}
const Content = ({ type, setType }: ContentProps) => {
	const { ref, isVisible, toggle } = useComponentVisible()

	return (
		<div className='grid grid-cols-12'>
			<div className="text-gray-500 flex items-center gap-2 col-span-4 xl:col-span-2">
				<QuestionMarkCircleIcon className='w-6 h-6' />
				<span className="text-md">Type</span>
			</div>
			<div className='hover:bg-gray-200 relative w-full col-span-8 xl:col-span-10 p-2 rounded-md duration-100 ease-in-out'>
				<div className="" onClick={toggle}>
					{ type ?
					<div className="text-sm flex items-center">
						<div className="bg-orange-100 rounded-md px-2">{ type.name}</div>
					</div>
						
						: <div className="text-gray-500">Empty</div>
					}
				</div>

				<AnimatePresence>
					{ isVisible &&
						<motion.div
						animate={{opacity: 1}}
						transition={{
							duration: 0.2,
							ease: [0.5, 0.71, 1, 1.5],
						}}
						exit={{opacity: 0}}
						initial={{opacity: 0}}
					>

						<div ref={ref} className="absolute w-full top-0 divide-y left-0 bg-white border rounded-md z-50">
							<Modal type={type} setType={setType} />
						</div>
					</motion.div>
					}
				</AnimatePresence>

			</div>
		</div>
	)
}

type ModalProps = {
	type: ITypeQuestion | null
	setType: Dispatch<SetStateAction<ITypeQuestion | null>>
}
const Modal = ({ type, setType }: ModalProps) => {
	return (
		<div>
			<div className="bg-gray-100 p-2">
				{ type ? 
					<div className="flex items-center gap-1 flex-wrap">
						<div className='bg-orange-100 rounded-md px-2 flex items-center gap-1'>
							<span>{type.name}</span>
						</div>
					</div>
					: <div className='text-gray-600 text-md'>Choissisez un type de question</div>
				}

				
			</div>
			<div className="bg-white p-2">
				<span className="font-medium text-sm text-gray-600">Select an type</span>
        <div className="flex flex-col">

					{ types.map((item: ITypeQuestion, index: number) => (
						<div className="group hover:bg-gray-100 py-1 px-2 rounded-md relative" key={index}>
							<button
								onClick={() => {
									setType(item)
								}}
								className={"flex items-center justify-between w-full"}
							>
								<div className="flex items-center gap-2 text-gray-500">
									<ReactElement tag={item.icon} className={classNames('w-4 h-4')}/>
									<span className=''>{item.name}</span>
								</div>
							</button>
						
						</div>
					))}
				</div>
			</div>
		</div>
		
	)
}