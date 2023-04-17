import React, {useContext} from "react";
import {IQuestion, IReponse} from "../../../../../utils";
import SessionContext from "../../../../../contexts/SessionContext";

type Props = {
	question: IQuestion
}

export default function LeftPartStat ({ question } : Props ) {
	const etiquettes = question.etiquettes
	const [session, setSession] = useContext(SessionContext)

	function moyenne (reponses: IReponse[]) {
		const res = reponses.map((item) => {
			return !!item.valide
		}).filter((item) => !!item).length
		return Math.round(res*100/reponses.length)
	}


	return (
		<>
			<div className="col-span-4 border-r h-full p-4">
				<div className="flex flex-col">
					<h1>{question.label}</h1>
					<div className="grid grid-cols-2 gap-6 pt-4">
						<div className="flex flex-col p-3 bg-gray-100 rounded-md">
							<span className="text-gray-900 text-sm">Type de Question</span>
							<span className="text-gray-500">{question.type}</span>
						</div>
					</div>

					<div className="relative py-4">
						<div className="absolute inset-0 flex items-center" aria-hidden="true">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-white px-2 text-sm font-title text-gray-500 uppercase">Overview</span>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
							<span className="text-gray-900">Nombre de participants</span>
							<span className="text-gray-800 text-7xl">{session.reponses.filter((item) => item.question_id === question.id).length}</span>
						</div>
						{ question.type !== "libre" &&
              <div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
                <span className="text-gray-900 text-sm">Nombre de reponses</span>
                <span className="text-gray-800 text-7xl">{question.reponses.length}</span>
              </div>
						}
						{ question.type !== "libre" &&
							<div className="flex flex-col p-3 gap-3 bg-gray-100 rounded-md aspect-video">
								<span className="text-gray-900 text-sm">Taux de réussite</span>
								<span className="text-gray-800 text-7xl">{moyenne(session.reponses.filter((item) => item.question_id === question.id))}%</span>
							</div>
						}


					</div>
					<div className="pt-4">
						<div className="flex flex-1 gap-2 items-center">
							{etiquettes.map((item, index) => (
								<div className="px-3 py-1 rounded-full bg-gray-200" key={index}>
									{item.label}
								</div>
							))}
						</div>
					</div>

				</div>
			</div>
		</>
	)
}