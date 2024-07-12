import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"

import { PencilIcon } from "~assets/svgs/Icons"

import { Modal } from "../src/components/Modal"

export const config: PlasmoCSConfig = {
  matches: ["https://www.linkedin.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const App = () => {
  const [showIcon, setShowIcon] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    console.log("showIcon state:", showIcon)
  }, [showIcon])

  useEffect(() => {
    console.log("isModalOpen state:", isModalOpen)
  }, [isModalOpen])

  useEffect(() => {
    const handleFocus = (event: FocusEvent) => {
      if (
        (event.target as HTMLElement).classList.contains(
          "msg-form__contenteditable"
        )
      ) {
        console.log("Message input field focused")
        setShowIcon(true)
        console.log("showIcon", showIcon)
      }
    }

    const handleBlur = (event: FocusEvent) => {
      if (
        (event.target as HTMLElement).classList.contains(
          "msg-form__contenteditable"
        )
      ) {
        console.log("Message input field blurred")
        setShowIcon(false)
        console.log("Blur show icon", showIcon)
      }
    }

    // Add event listeners for focus and blur events on the message input field
    document.addEventListener("focusin", handleFocus)
    // document.addEventListener("focusout", handleBlur)

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("focusin", handleFocus)
      // document.removeEventListener("focusout", handleBlur)
    }
  }, [])

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsModalOpen(true)
  }

  return (
    <React.Fragment>
      <div
        style={{
          position: "fixed",
          bottom: "80px",
          right: "380px",
          zIndex: 1000,
          cursor: "pointer"
        }}
        onClick={handleIconClick}>
        {showIcon && <PencilIcon />}
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onSubmit={(inputValue) => console.log(inputValue)}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </React.Fragment>
  )
}

export default App

// const PlasmoOverlay = () => {
//   return (
//     <div className="z-50 flex fixed top-32 right-8">
//       <CountButton />
//     </div>
//   )
// }

// export default PlasmoOverlay
