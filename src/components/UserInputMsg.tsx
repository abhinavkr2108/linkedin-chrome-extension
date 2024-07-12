import React from "react"

interface UserInputMsgProps {
  inputValue: string
}
export default function UserInputMsg({ inputValue }: UserInputMsgProps) {
  return (
    <div className="bg-gray-300 text-gray-500 rounded-md font-semibold p-4">
      {inputValue}
    </div>
  )
}
