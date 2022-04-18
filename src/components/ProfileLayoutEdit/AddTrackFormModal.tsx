import { useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import { Loading, LoadingElement } from "src/components/shared/Loading";
import ErrorLabel from 'src/components/shared/ErrorLabel'
import { gqlErrorFirstMessage } from "@muft/dailyfns"
import { getGqlClient } from "src/lib/gqlClient"
import { TUserLink } from 'src/lib/types'
import { mutationUserLinkCreate } from 'src/lib/graphql/schema/connect'
import { parseUrlToEmbedded } from './IframeParser'

export type AddTrackFormModalProps = {
  onChange?: (res: TUserLink) => void
}

const AddTrackFormModal = (props: AddTrackFormModalProps) => {
  const { onChange } = props
  const loadingEl = useRef<LoadingElement>(null);
  const [show, setShow] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, reset, control, setValue } = useForm({

  });

  const onSubmit = (data) => {
    // console.log(data)
    data.link = parseUrlToEmbedded(data.link)
    // return
    if(!data.link) {
      toast.error("Cannot Parse Link");
      return
    }

    // console.log(data)
    // return
    const variables = {
      source: data.source,
      label: data.label,
      link: data.link,
    }

    loadingEl.current?.show();
    getGqlClient().request(mutationUserLinkCreate, {input: variables})
    .then((res) => {
      typeof(onChange)=="function" && onChange(res?.userLinkCreate)
      setShow(false)
    })
    .catch((err) => {
      const msg = gqlErrorFirstMessage(err, {
        capitalize: true
      })
      toast.error(msg);
    })
    .finally(() => {
      loadingEl.current?.hide();
    });
  };
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ToastContainer />
      <Loading ref={loadingEl} overlay />
      <Button variant="primary" size="sm" onClick={handleShow}>
        Add Video & Audio Tracks
      </Button>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Video & Audio Tracks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Label</label>
            <select
              {...register("label")}
              className="form-control w-100 mr-2"
            >
              <option value="My Own Music">My Own Music</option>
              <option value="My Play List">My Play List</option>
              <option value="My DJ Mix">My DJ Mix</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Source</label>
            <select
              {...register("source")}
              className="form-control w-100 mr-2"
            >
              <option value="youtube">Youtube</option>
              <option value="vimeo">Vimeo</option>
              <option value="spotify">Spotify</option>
              <option value="soundcloud">SondCloud</option>
              <option value="itunes">iTunes</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Link</label>
            <textarea className="form-control"  {...register("link", {required: true})}
            ></textarea>
            	<ErrorLabel field={errors.link} />
          </div>

          <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default AddTrackFormModal