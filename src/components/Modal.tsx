import { useState } from "react"

import { GenerateIcon, InsertIcon, RegenerateIcon } from "~assets/svgs/Icons"

import BotReplyMsg from "./BotReplyMsg"
import UserInputMsg from "./UserInputMsg"

type Message = {
  sender: "user" | "bot"
  text: string
}
interface Props {
  isOpen: boolean
  onSubmit: (inputValue: string) => void
  onClose: () => void
}

export const Modal = ({ isOpen, onSubmit, onClose }: Props) => {
  const [inputValue, setInputValue] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(inputValue)
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: inputValue,
        sender: "user"
      }
    ])
    setInputValue("")

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask. This is a hardcoded bot reply.",
          sender: "bot"
        }
      ])
    }, 1000)
  }

  const handleInsert = () => {
    const botMessage = messages.find((message) => message.sender === "bot")
    if (botMessage) {
      // Find the LinkedIn message input field using the appropriate selector
      const linkedInMessageField = document.querySelector(
        ".msg-form__contenteditable[contenteditable='true']"
      ) as HTMLElement | null

      if (linkedInMessageField) {
        const pElement = document.createElement("p")
        pElement.textContent = botMessage.text
        linkedInMessageField.innerHTML = ""
        linkedInMessageField.appendChild(pElement)
        linkedInMessageField.focus()
      } else {
        console.error("LinkedIn message field not found")
      }
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div className="bg-slate-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full max-w-xl m-4">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close modal">
            <svg
              className="h-6 w-6 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit}>
              <div className="mt-4 flex flex-col gap-3">
                {messages.map((message: Message, index: number) =>
                  message.sender == "user" ? (
                    <div className="flex justify-end">
                      <UserInputMsg key={index} inputValue={message.text} />
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <BotReplyMsg key={index} text={message.text} />
                    </div>
                  )
                )}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-lg"
                placeholder="Your Prompt"
              />
              <div className="mt-4 flex justify-end">
                {messages.length == 0 ? (
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <div className="flex flex-row items-center gap-2">
                      <GenerateIcon />
                      <p>Generate</p>
                    </div>
                  </button>
                ) : (
                  <div className="flex flex-row items-center gap-4">
                    <button
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-lg font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      onClick={handleInsert}>
                      <div className="flex flex-row items-center gap-2">
                        <InsertIcon />
                        <p>Insert</p>
                      </div>
                    </button>
                    <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <div className="flex flex-row items-center gap-2">
                        <RegenerateIcon />
                        <p>Regenerate</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
