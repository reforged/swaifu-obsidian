import React, {useContext, useState} from 'react'
import {IQuestion} from '../../../../utils'
import useQuestions from "../../../../hooks/use-questions";
import ModalEditor from "../../../../components/manager/questions/modal/ModalEditor";
import QuestionContext from "../../../../contexts/QuestionContext";
import ShowQuestionContext from "../../../../contexts/ShowQuestionContext";
import ModalQuestionView from "../../../../components/manager/questions/modal/Question";
import {ChatBubbleBottomCenterTextIcon, TrashIcon} from "@heroicons/react/24/outline";
import {classNames, filteredData} from "../../../../utils/helper";
import Manager from "../../../../layouts/manager";
import Board from "../../../../components/manager/board/Board";
import BoardContext from "../../../../contexts/BoardContext";
import {Options} from "../../../../components/manager/board/types";

const pages = [
	{ label: 'Home', href: '/manager/qcm', current: false},
	{ label: 'Questions', href: '/manager/qcm/questions', current: true},
	{ label: 'Etiquettes', href: '/manager/qcm/etiquettes', current: false},
	{ label: 'Séquences', href: '/manager/qcm/sequences', current: false},
	{ label: 'Sessions', href: '/manager/qcm/sessions', current: false},
	{ label: 'Examens', href: '/manager/qcm/examens', current: false},
]

const navigation = [
	{name: "QCM", href: '/manager/qcm', current: false},
	{name: "Questions", href: '/manager/qcm/questions', current: true},
]


export default function HomeQuestion () {
	const { fetch } = useQuestions()
	const { data } = fetch()
	const [showQuestion, setShowQuestion] = useState<IQuestion | null>(null)
	const [question, setQuestion] = useState<IQuestion>({
		type: '',
		label: 'Untitled',
		etiquettes: [],
		reponses: [],
		enonce: []
	})

	const options: Options<IQuestion> = {
		view: 'galerie',
		label: 'Questions',
		search: '',
		structure: [],
		keys: ['label'],
		open: false,
		option: ['filter', "mode"],
	}

  return (
		<Manager
			layout={{
				label: 'Questions',
				location: navigation,
				navigation: pages
			}}
		>
			<QuestionContext.Provider value={[question, setQuestion]}>
				<ShowQuestionContext.Provider value={[showQuestion, setShowQuestion]}>
					<div className="relative">
						<div className="flex items-start justify-between w-full">
							<div>
								{ data && <ModalQuestionView questions={data} />
								}


							</div>
						</div>


						<Board<IQuestion> name={"Question"} options={options} action={<ModalEditor data={data} />}>
							<BoardContext.Consumer>
								{([board, setBoard]) => (
									<>
										{ board.view === 'liste'
											? <div>
												{data &&
													<div className="flex flex-col gap-2 p-4">
														{ data.map((question: IQuestion) => (
															<Liste question={question} />
															))}
													</div>
												}
											</div>
											: <div>
												{ data &&
													<div className="grid grid-cols-3 gap-4 p-4">
														{ filteredData<IQuestion>(data, ['label'], board.search).map((question: IQuestion) => (
															<Question key={question.id} question={question} />
														))}
													</div>
												}
											</div>

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

function Liste ({ question }) {
	const [showQuestion, setShowQuestion] = useContext(ShowQuestionContext)

	function handle () {
		setShowQuestion(question )
	}

	return (
		<div>
			<button
				className="bg-[#E2E9F3] w-full py-1 px-4"
				onClick={handle}
			>
				<div className="flex items-center justify-between w-full">
					<div>
						{question.label}
					</div>
					<div className="flex items-center flex-col">
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

function Question ({ question }: any) {
	const [showQuestion, setShowQuestion] = useContext(ShowQuestionContext)
	const { destroy } = useQuestions()
	const { mutate: deleteQuestion} = destroy()

	function handle () {
		setShowQuestion(question)
		console.log("test", showQuestion)
	}

	function onDelete () {
		deleteQuestion(question.id)
	}

	return (
		<div>
			<button
				className="bg-[#E2E9F3] relative group aspect-video flex w-full h-full text-left p-4 rounded-md hover:shadow-md duration-200 ease-in-out"
			>
				<div className="invisible absolute top-0 right-0 p-4 group-hover:visible">
					<button onClick={onDelete} className="hover:bg-gray-300 p-1 rounded-md">
						<TrashIcon className="w-6 text-gray-600" />
					</button>
				</div>
				<div className="flex flex-col justify-between h-full w-full" onClick={handle}>
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