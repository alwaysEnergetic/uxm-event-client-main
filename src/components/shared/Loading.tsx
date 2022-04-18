import React, { useState, useEffect, useImperativeHandle, forwardRef, Ref } from 'react';

export interface LoadingElement {
  show: () => void
  hide: () => void
}

function LoadingFunc(props: {overlay?: boolean, show?: boolean}, ref: Ref<LoadingElement>) {
  const { overlay=false, show=false } = props
  const [visible, setVisible] = useState(show)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    }
  }));

  useEffect(() => {
    setVisible(show)
  }, [show])
  
  if(!visible) return null

  return (
    <div className="LoadingComp">
      <style jsx>{`
        .LoadingComp {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
        
          .overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.5);
          }
        
          .spinnerWrapper {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          }
        
          .spinner-border {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
      {overlay ? <div className="overlay"></div> : null}
      <div className="spinnerWrapper">
        <div className="spinner-border text-primary-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}



export const Loading = forwardRef(LoadingFunc);

// export default Loading
// export default LoadingFunc