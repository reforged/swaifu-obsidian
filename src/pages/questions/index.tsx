import React, { Dispatch, SetStateAction } from 'react'
import { classNames } from '../../helper'
import useComponentVisible from '../../hooks/useComponentVisible'
import { IQuestion } from '../../utils'
import { etiquettes } from '../../utils/data'

type QuestionProps = {
  data: IQuestion

}

const data: IQuestion[] = [
	{id:'1',label: 'exo math', enonce: 'Lorem ipsum', max_reponse: 4, etiquettes: etiquettes},
	{id:'2',label: 'exo python', enonce: 'Lorem ipsum', max_reponse: 4, etiquettes: []},
	{id:'3',label: 'exo java', enonce: 'Lorem ipsum', max_reponse: 4, etiquettes: []},
]


export default function HomeQuestion () {
	const { ref, isVisible, toggle } = useComponentVisible()
  return (
		<div className="relative">
			<h1 className="text-2xl font-medium">Hello Questions</h1>

			<div className="mt-8 flex flex-col">
				<div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8" >
					<div className="inline-block min-w-full py-2 align-middle">
						<div className="shadow-sm ring-1 ring-black ring-opacity-5">
							<table className="min-w-full border-separate" style={{ borderSpacing: 0 }}>
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
										>
											Titre
										</th>
										<th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pr-4 pl-3 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
									</tr>
								</thead>
								<tbody className="bg-white">
									{ data.map((item: IQuestion, index) => (
										<tr key={item.id}>
											<td className={classNames(
											index !== data.length -1 ? "border-b border-gray-200" : "",
											"whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
										)}
										>
											{item.label}
										</td>
										<td
                      className={classNames(
												index !== data.length -1 ? "border-b border-gray-200" : "",
												" relative whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      <a href="#" className="text-indigo-600 px-2 py-1 border rounded-md hover:text-indigo-900">
                        Edit<span className="sr-only">, {item.label}</span>
                      </a>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

const Question = ({  data }: QuestionProps) => {


	return (
		<div></div>
	)
}


const CreateQuestion = () => {
	const { ref, isVisible, toggle } = useComponentVisible()
	return (
		<div></div>
	)
}