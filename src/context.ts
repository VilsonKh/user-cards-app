import { SetStateAction, createContext, Dispatch } from "react";

interface IActiveContextType {
  activeId: string | null;
  setActiveId: Dispatch<SetStateAction<string | null>>;
}

export const ActiveContext = createContext<IActiveContextType>({
  activeId: null,
  setActiveId: () => {},
})