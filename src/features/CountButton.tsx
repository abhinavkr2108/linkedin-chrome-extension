import React, { useReducer, useState } from "react"

import { Modal } from "~components/Modal"

export const CountButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  return (
    <React.Fragment>
      <button
        onClick={() => setIsModalOpen(true)}
        type="button"
        className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none
        shadow-lg hover:shadow-md
        active:scale-105 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900">
        Open Modal
      </button>
    </React.Fragment>
  )
}
