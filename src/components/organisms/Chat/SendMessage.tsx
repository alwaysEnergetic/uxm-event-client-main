import { useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDollyFlatbedAlt, faEnvelope } from "@symbolia/plsicon"
import { useForm } from "react-hook-form";

interface SendMessageProps {
  onMessage: (msg: string) => void
}

const SendMessage: React.FC<SendMessageProps> = (props) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    if(data.msgInput.trim()){
      let message = data.msgInput.trim()
      props.onMessage(message);
    }
    reset();
  }

  return <form onSubmit={handleSubmit(onSubmit)} className='my-3 p-1'>
    <textarea 
      placeholder="Enter your message here"
      maxLength={10000}
      className='w-100 form-control border-info' 
      {...register('msgInput', { required: true })} 
      onKeyDown={(e) => {
        if (e.code === "Enter") { 
          e.preventDefault()
          handleSubmit(onSubmit)();
        }
      }}  
    />

    <div className='d-flex justify-content-between'>
      <div className="note opacity-75 fs-12 mt-1">Max Limit: 10000 Chars</div>
      <button type='submit' className="btn btn-primary btn-sm px-5 mx-2 my-2">
        <FontAwesomeIcon icon={faEnvelope} /> Send
      </button>
    </div>
  </form>
}

export default SendMessage