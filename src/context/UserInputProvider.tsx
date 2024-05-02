
import { ReactElement, useState } from 'react'
import {UserInputContext} from './context'
const UserInputProvider = ({children}: {children: ReactElement}) => {
  const [userInput, setUserInput] = useState<string | null>(null)

  const value = {
    userInput, 
    setUserInput
  }
  return (
   <UserInputContext.Provider value={value}>
    {children}
   </UserInputContext.Provider>
  )
}

export default UserInputProvider