import React, { useState, useRef } from 'react';
import classnames from 'classnames'
import { getToken } from 'src/components/organisms/Auth/auth';

export type UploadResponse = {
  id: number
  uid: string
  url: string
}

type UploadProps = {
  onComplete?: (res: UploadResponse, file?: File) => void
  onError?: (error: Error, file?: File) => void
  onUploading?: (status: boolean) => void
  inputRef?: HTMLInputElement
  inputClassName?: string
}
const Upload = (props: UploadProps) => {
  const { onComplete, onError, onUploading, inputRef=null, inputClassName } = props
  const [selectedFile, setSelectedFile] = useState<File>();
	const [isFilePicked, setIsFilePicked] = useState(false);

  // console.log(inputRef)

  // const inputRef_ = useRef<HTMLInputElement>(inputRef)
  

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    typeof(onUploading)=="function" && onUploading(true);
    const target= event.target;
    const file: File = (target.files as FileList)[0];
    
		setSelectedFile(file);
		setIsFilePicked(true);
    const formData = new FormData();
    formData.append('file', file);
    const uploadHost = String(process.env.NEXT_PUBLIC_API_UPLOAD_HOST)
    // const uploadHost = 'http://localhost:2107/media/upload'
    fetch( uploadHost, {
        credentials: 'include',
        method: 'POST',
        body: formData,
        headers: {
          // "Content-Type": "application/json",
          "Accept": "application/json",
          'x-auth-token': getToken()
        } as any
      }
    )
    .then((res) => {
      // console.log("RESHDJ", res)
      if(!res.ok) throw new Error(res.statusText);
      return res.json()
    })
    .then((result: {data: UploadResponse}) => {
      console.log('Success:', result);
      typeof(onComplete)=="function" && onComplete(result.data, file)
    })
    .catch((error) => {
      console.error('Error Custom:', error);
      typeof(onError)=="function" && onError(error, file)
      typeof(onUploading)=="function" && onUploading(false);
    });
	};

  const handleSubmission = () => {
		// const formData = new FormData();

		// formData.append('File', selectedFile);

		// fetch(
    //     'https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>',
    //     {
    //       method: 'POST',
    //       body: formData,
    //     }
    //   )
    //     .then((response) => response.json())
    //     .then((result) => {
    //       console.log('Success:', result);
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    // };
	};

  let inputClassNames = classnames('btn btn-secondary', inputClassName);


  return(
    <>
    <div>
        <input ref={inputRef as any} type="file" onChange={changeHandler} className={inputClassNames} />
        {/* <button onClick={handleSubmission}>
          Upload!
        </button> */}
    </div>
    </>
  )


}

export default Upload