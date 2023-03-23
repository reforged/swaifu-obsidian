import {Pie} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ShowEnonce from "../../panel/question/show-enonce";
import AnswerStat from "./AnswerStat";
import {PlusIcon} from "@heroicons/react/24/outline";
import React from "react";
import {IQuestion} from "../../../../../utils";


ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
    labels: ["JavaScript", "Python", "Ruby"],
    datasets: [
        {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: [
                "rgb(133, 105, 241)",
                "rgb(164, 101, 241)",
                "rgb(101, 143, 241)",
            ],
            hoverOffset: 4,

        },
    ],
}


type Props = {
    question: IQuestion
}

export default function RightPartStat ( {question} : Props) {

    const responses = question.reponses

    return (
        <>
                <div className="col-span-8 h-full p-4">
                    <div className="flex flex-col">
                        <div>
                            <span>{question.label}</span>
                        </div>



                            <div className="mt-20 flex flex-col gap-4 relative">
                                <div className="absolute top-0 right-0 p-4 z-10">
                                    </div>
                                <ShowEnonce question={question}/>
                                <div className="flex justify-center items-center mt-6">
                                    <div className=" w-96 h-96">
                                        <Pie  data={data} />
                                    </div>
                                </div>
                            </div>
                        <div className="pt-8">
                            {responses.map((item) => (
                                <div className="border py-8 px-2 rounded-md relative">
                                    <span className="text-xs absolute top-0 left-0 m-2 p-2  rounded-md bg-gray-50">Réponses</span>
                                    <div className="flex flex-col gap-4 pt-6">
                                        <AnswerStat answer={item} />
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
        </>

    )
}