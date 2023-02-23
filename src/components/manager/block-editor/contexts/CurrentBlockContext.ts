import {Dispatch, SetStateAction, createContext } from "react";

type types = any | null
type State = [currentBlockMenu: types, setCurrentBlockMenu: Dispatch<SetStateAction<types>>]

export default createContext<State>(null)