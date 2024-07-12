import { Fragment, useState } from "react"

import { Modal } from "../src/components/Modal"
import { CountButton } from "../src/features/CountButton"

import "~style.css"

function IndexPopup() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  return (
    <>
      <div className="w-[500px] h-[500px] bg-slate-100 flex flex-col justify-center items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="flex flex-row items-center px-4 py-2 text-sm rounded-lg transition-all border-none
          shadow-lg hover:shadow-md
          active:scale-105 bg-slate-50 hover:bg-slate-100 text-slate-800 hover:text-slate-900">
          Generate Reply
        </button>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onSubmit={(inputValue) => console.log(inputValue)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default IndexPopup
