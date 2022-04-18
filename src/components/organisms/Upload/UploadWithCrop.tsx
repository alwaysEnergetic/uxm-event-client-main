import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getToken } from 'src/components/organisms/Auth/auth';
import { Loading, LoadingElement } from "src/components/shared/Loading";
export type UploadResponse = {
  id: number
  uid: string
  url: string
}

type UploadProps = {
  onComplete?: (res: UploadResponse, file?: File) => void
  onError?: (error: Error, file?: File) => void
  // onUploading?: (status: boolean) => void
  inputRef?: HTMLInputElement
  inputClassName?: string
  crop?: {
    aspect: number
  }
}
/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
 export function getCroppedImg(image, crop, fileName) {

  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx: any = canvas.getContext("2d");

  // New lines to be added
  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = "high";

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  // As Base64 string
  // const base64Image = canvas.toDataURL("image/jpeg");
  // return base64Image;

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        var a : any = blob
        a.name = fileName;
        resolve(a);
      },
      "image/jpeg",
      1
    );
  });
}


const Upload = (props: UploadProps) => {
  const { onComplete, onError, inputRef=null, inputClassName, crop: crop_ } = props
  const loadingEl = useRef<LoadingElement>(null);
  const [upImg, setUpImg] = useState();
  const [originalFile, setOriginalFile] = useState<File>();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: crop_?.aspect || 16 / 9 });
  const [completedCrop, setCompletedCrop] = useState(null);
  

  const uploadFile = (filenew) => {
    const formData = new FormData();
    formData.append('file', filenew);
    const uploadHost = String(process.env.NEXT_PUBLIC_API_UPLOAD_HOST)
    
    loadingEl.current?.show();
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
      // console.log('Success:', result);
      typeof(onComplete)=="function" && onComplete(result.data, originalFile)
    })
    .catch((error) => {
      console.error('Error Custom:', error);
      typeof(onError)=="function" && onError(error, originalFile)
      // typeof(onUploading)=="function" && onUploading(false);
    })
    .finally(() => {
      loadingEl.current?.hide();
    })
  }

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result as any));
      // console.log(e.target.files[0])
      reader.readAsDataURL(e.target.files[0]);
      setOriginalFile(e.target.files[0])
    }
  };

  const onLoad = useCallback((img) => {
    // console.log(img)
    imgRef.current = img;
  }, []);


  const onComplete_ = async (c) => {
    // console.log(c)
    setCompletedCrop(c as any)
  }
  
  const handleUploadBtn = async () => {
    // console.log(originalFile?.name)
    if(!completedCrop) {
      console.log("Crop is null");
      return
    }
    const croppedImg: any = await getCroppedImg(imgRef.current, completedCrop, "returnedFileName");
    // console.log(croppedImg)
    const myFile = new File([croppedImg], originalFile?.name as any, {
      type: croppedImg.type,
    });
  
    // console.log(myFile)
    uploadFile(myFile)
  }

  return(
    <>
    <div>
      <Loading ref={loadingEl} overlay />
      <div className="py-2">
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg as any}
        onImageLoaded={onLoad}
        crop={crop as any}
        onChange={(c) => setCrop(c as any)}
        onComplete={onComplete_}
      />

      <div className="mt-5 text-end">
        <button className="btn btn-primary" onClick={handleUploadBtn}>Upload</button>
      </div>
    </div>
    </>
  )


}

export default Upload