import useComponentVisible from "../../../../../hooks/useComponentVisible";
import React, {useEffect, useState} from "react";
import Markdoc from "@markdoc/markdoc";
import Fence from "../../../Fence";
import {AnimatePresence, motion} from "framer-motion";
import {ArrowDownRightIcon, XMarkIcon} from "@heroicons/react/20/solid";
import {ListBulletIcon, PencilSquareIcon, PlusIcon, QueueListIcon} from "@heroicons/react/24/outline";
import Markdown from "../../../Markdown";
import {IEtiquette, IQuestion} from "../../../../../utils";
import {classNames, ReactElement} from "../../../../../utils/helper";
import LeftPartStat from "./left-part";
import RightPartStat from "./right-part";

type Props = {
    question: IQuestion
}

type ButtonProps = {
    click: () => any
    data: any
}
type EtiquetteProps = {
    data: IEtiquette
}

function TypeQuestion ({ type }: { type: string}) {
    const types = [
        {name: 'Réponse libre', icon: PencilSquareIcon, value: 'input'},
        {name: 'Réponse multiple', icon: ListBulletIcon, value: 'checkbox'},
        {name: 'Réponse unique', icon: QueueListIcon, value: 'radio'},
    ]

    let selection = 0

    types.map((item, index) => {
        if (item.value === type) {
            selection = index

        }
    })

    return (
        <div className="flex items-center gap-2 text-gray-700">
            <ReactElement tag={types[selection].icon} className={classNames('w-6 h-6')} />
            <span>{types[selection].name}</span>
        </div>
    )
}

const Etiquette = ({ data }: EtiquetteProps) => {
    return (
        <div className="bg-white border border-gray-300 text-gray-900 px-2 rounded-full">
            <span>{ data.label }</span>
        </div>
    )
}

const Button = ({ click, data }: ButtonProps) => {
    return (
        <button
            type={"button"}
            onClick={click}
            className={"w-full text-left"}
        >
            <div className="bg-gray-50 rounded-md p-3 duration-100 ease-in-out hover:bg-gray-100">
                <div className="flex flex-col gap-4">
                    <div>
                        { data.etiquettes
                            && <div className="flex items-center gap-3">
                                { data.etiquettes.map((etiquette: IEtiquette) => <Etiquette key={etiquette.id} data={etiquette} />)}
                            </div>
                        }
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-900 text-3xl font-bold">{ data.label }</span>
                        <TypeQuestion type={data.type}/>
                    </div>
                </div>
            </div>
        </button>

    )
}

export default function QuestionStat ({ question }: Props) {
    const { ref, isVisible, toggle } = useComponentVisible()
    const [body, setBody] = useState<string>(question.enonce)
    const [bodyMd, setBodyMd] = useState<any>()
    useEffect(() => {
        const ast = Markdoc.parse(body)

        const content = Markdoc.transform(ast, {
            nodes: {
                fence: {
                    render: 'Fence',
                    attributes: {
                        content: { type: String },
                        language: { type: String}
                    }
                }
            }
        })
        const children = Markdoc.renderers.react(content, React, {
            components: {
                Fence: Fence
            }
        })
        setBodyMd(children)
    }, [body])

    const close = () => {
        toggle()
    }

    return (
        <div>
            <Button click={toggle} data={question} />
            <AnimatePresence>
                { isVisible &&
                    <motion.div
                        className="fixed z-[99] inset-0 bg-black bg-opacity-[30%] backdrop-blur-[2px] backdrop-brightness-100"
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.2,
                            ease: [0.5, 0.71, 1, 1.5],
                        }}
                        exit={{ opacity: 0}}
                        initial={{ opacity: 0}}
                    >

                        <div className="absolute w-full h-full p-8">
                            <div className="relative h-full overflow-hidden rounded-md">
                                <div className="border border-gray-200 h-full bg-white">
                                    <div className="relative border h-full">
                                        <div className="w-full bg-gray-100 flex justify-between items-center p-4 relative">
                                            <div className="text-center w-full">
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-12 h-full">
                                            <LeftPartStat question={question} />
                                            <RightPartStat question={question} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}