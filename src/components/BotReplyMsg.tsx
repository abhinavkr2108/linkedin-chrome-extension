import React from "react"

interface BotReplyMsgProps {
  text: string
}
export default function BotReplyMsg({ text }: BotReplyMsgProps) {
  return (
    <div className="bg-blue-200 text-gray-500 rounded-md font-semibold p-4">
      {text}
    </div>
  )
}
