import React  from 'react'
import { IQuestion } from '@obsidian/type'
import Question from "../../../components/manager/questions/ShowQuestion";
import useQuestions from "../../../hooks/use-questions";
import CreateQuestion from "../../../components/manager/questions/CreateQuestion";

export default function HomeQuestion () {
	const { fetch } = useQuestions()
	const { data } = fetch()

  return (
		<div className="relative">

			<div className="flex items-start justify-between w-full">
				<h1 className="text-2xl font-medium">Hello Questions</h1>
				<div>
					<CreateQuestion />
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
	)
}