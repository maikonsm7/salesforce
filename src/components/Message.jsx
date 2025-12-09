import { useEffect, useState } from "react"
import bus from "../helpers/bus"

export const Message = () => {
  const [type, setType] = useState("")
  const [message, setMessage] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(()=>{
    bus.addListener('flash', ({message, type}) => {
      setVisible(true)
      setMessage(message)
      setType(type)
      setTimeout(()=>{
        setVisible(false)
      }, 4000)
    })
  }, [])

  return (
    <>
      {visible && (
        <div className="p-3 text-center">
          <span className={`p-2 rounded ${type}`}>{message}</span>
        </div>
      )}
    </>
  )
}
