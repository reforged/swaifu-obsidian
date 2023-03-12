import React, {useContext, useState} from 'react'
import {INavigation, IQuestion} from '../../../../utils'
import useQuestions from "../../../../hooks/use-questions";
import ModalEditor from "../../../../components/manager/questions/modal/ModalEditor";
import QuestionContext from "../../../../contexts/QuestionContext";
import ShowQuestionContext from "../../../../contexts/ShowQuestionContext";
import ModalQuestionView from "../../../../components/manager/questions/modal/Question";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";
import {classNames} from "../../../../utils/helper";
import Hero from "../../../../components/manager/Hero";
import Manager from "../../../../layouts/manager";
import Board from "../../../../components/manager/board/Board";
import BoardContext from "../../../../contexts/BoardContext";

const pages = [
	{ label: 'Home', href: '/manager/qcm', current: false},
	{ label: 'Questions', href: '/manager/qcm/questions', current: true},
	{ label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
	{ label: 'Séquences', href: '/manager/qcm/sequences', current: false},
]


export default function HomeQuestion () {
	const { fetch } = useQuestions()
	const { data } = fetch()
	const showQuestion = useState<IQuestion | null>(null)
	const state = useState<IQuestion>({
		type: '',
		label: 'Untitled',
		etiquettes: [],
		reponses: [],
		enonce: []
	})

  return (
		<Manager
			layout={{
				label: 'Questions',
				location: [],
				navigation: pages
			}}
		>
			<QuestionContext.Provider value={state}>
				<ShowQuestionContext.Provider value={showQuestion}>
					<div className="relative">
						<div className="flex items-start justify-between w-full">
							<div>
								<ModalEditor />
								<ModalQuestionView />
							</div>
						</div>

						{/*<div className="mt-8">
							{ data &&
								<div className="grid grid-cols-3 gap-4">
									{ data.map((question: IQuestion) => (
										<Question key={question.id} question={question} />
									))}
								</div>
							}
						</div>*/}
						<Board name={"Question"} options={["filter", "column", "mode"]}>
							<BoardContext.Consumer>
								{([board, setBoard]) => (
									<>
										{ board.view === 'liste'
											? <div>Liste</div>
											: <div>Galerie</div>

										}
									</>
								)}
							</BoardContext.Consumer>
						</Board>
					</div>
				</ShowQuestionContext.Provider>

			</QuestionContext.Provider>
		</Manager>

	)
}

function Question ({ question }: any) {
	const [showQuestion, setShowQuestion] = useContext(ShowQuestionContext)

	function handle () {
		setShowQuestion(question)
	}

	return (
		<div>
			<button
				className="bg-gray-100 aspect-video flex w-full h-full text-left p-4 rounded-md hover:shadow-md duration-200 ease-in-out"
				onClick={handle}
			>
				<div className="flex flex-col justify-between h-full w-full">
					<div>
						<div>
							<span className="text-gray-400 text-sm">Créé par <span className="text-gray-900">{ question.user.firstname } { question.user.lastname }</span></span>
						</div>
						<div className="flex gap-2 items-center py-2">
							{ question.etiquettes.map((etiquette) => (
								<div className={classNames(
									etiquette.color,
									'px-2 text-sm rounded-full text-[#402C1B]'
								)}>
									{etiquette.label}
								</div>
							))}
						</div>
						<span className="text-xl text-gray-900 font-semibold">
							{question.label}
						</span>
					</div>
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center gap-2 text-gray-600">
							<span>
								<ChatBubbleBottomCenterTextIcon className="w-4 h-4" />
							</span>
							<span>{ question.reponses.length}</span>
						</div>
						<div className="flex flex-col text-right">
							<span className="text-sm">Type de question</span>
							<div className="pt-2">
								{
									question.type === 'input' && <span className="bg-gray-200 px-2 py-1 rounded-md">Libre</span>
								}

								{
									question.type === 'checkbox' && <span className="bg-gray-200 px-2 py-1 rounded-md">QCM</span>
								}

							</div>
						</div>
					</div>

				</div>

			</button>
		</div>

	)
}