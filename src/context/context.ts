import { SetStateAction, createContext, Dispatch } from "react";

interface IActiveContext {
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}

export const ActiveContext = createContext<IActiveContext>({
  activeId: null,
  setActiveId: () => {},
})

interface IUserInput {
  userInput: string | null;
  setUserInput: Dispatch<SetStateAction<string | null>>;
}

export const UserInputContext = createContext<IUserInput>({
  userInput: null,
  setUserInput: () => {},
})