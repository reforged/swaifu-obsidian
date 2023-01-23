import React  from 'react'
import { IQuestion } from '@obsidian/type'
import CreateQuestion from "../../components/questions/CreateQuestion";
import useQuestion from "../../hooks/questions/useQuestion";
import Question from "../../components/questions/ShowQuestion";

export default function HomeQuestion () {
	const { fetch } = useQuestion()
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