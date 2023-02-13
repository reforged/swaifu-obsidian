import React, {useContext, useState} from 'react'
import { IQuestion } from '@obsidian/type'
import Question from "../../../components/manager/questions/ShowQuestion";
import useQuestions from "../../../hooks/use-questions";
import ModalEditor from "../../../components/manager/questions/modal/ModalEditor";
import QuestionContext from "../../../contexts/QuestionContext";

export default function HomeQuestion () {
	const { fetch } = useQuestions()
	const { data } = fetch()
	const state = useState<IQuestion>({
		type: '',
		label: '',
		etiquettes: [],
		reponses: [],
		enonce: ''
	})

  return (
		<QuestionContext.Provider value={state}>
			<div className="relative">

				<div className="flex items-start justify-between w-full">
					<h1 className="text-2xl font-medium">Hello Questions</h1>
					<div>
						<ModalEditor />
					</div>
				</div>

				<div className="mt-8">
					{ data &&
						<div className="flex flex-col gap-4">
							{ data.map((question: IQuestion) => (
								<Question key={question.id} question={question} />
							))}
						</div>
					}
				</div>
			</div>
		</QuestionContext.Provider>

	)
}