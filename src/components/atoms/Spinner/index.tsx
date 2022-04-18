import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef, Ref, useMemo } from "react";
import ReactDOM from "react-dom";
import styles from "./Spinner.module.scss";

export interface LoadingElement {
  show: () => void;
  hide: () => void;
  isVisible: () => boolean;
}

function LoadingFunc(
  props: { overlay?: boolean; show?: boolean },
  ref: Ref<LoadingElement>
) {
  const { overlay = false, show = false } = props;
  const [visible, setVisible] = useState(show);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },

    isVisible: () => {
      return visible;
    },
  }));

  if (!visible) return null;

  return (
    <div className={styles.Loader}>
      {overlay ? <div className='overlay'></div> : null}
      <div className='spinner-border text-primary-light' role='status'>
        {/* <span className="sr-only">Loading...</span> */}
      </div>
    </div>
  );
}

export const Loading = forwardRef(LoadingFunc);

enum SpinState {
  Hidden = "HIDDEN",
  Show = "SHOW",
  Hide = "HIDE",
  Shown = "SHOWN"
}

export function useSpinner() {
  // if (typeof window == "undefined") return; // Do not render SSR
  const loadingEl = useRef<LoadingElement>();
  const [divEl, setDivEl] = useState<HTMLDivElement>()
  
  const [visible, setVisible] = useState<SpinState>(SpinState.Hidden)

  useEffect(() => {
    // console.log("Testttt")
    // if(!isShow) return
    let div = document.createElement("div")
    div.className = "loaderEl"
    setDivEl(div)
    document.body.appendChild(div);
  }, [])

  useEffect(() => {
    // Create the divEl if not exists
    if(!divEl) {
      let div = document.createElement("div")
      div.className = "loaderEl"
      document.body.appendChild(div);
      setDivEl(div)
    }

    // Rerun the function on creating divEl as this ok will run again and it will found the divEl
    if (visible==SpinState.Show && divEl) {
      ReactDOM.render(
        <Loading show={true} overlay={false} ref={loadingEl as any} />,
        divEl
      );
      setVisible(SpinState.Shown)
    }

    // We did not use bool to prevent this cond to true on initial page load
    // This cond was executiong on inital page load we only want it to run on executiont the hide() func only
    if (visible==SpinState.Hide && divEl) {
      loadingEl.current && loadingEl.current.hide()
      divEl.remove()
      setDivEl(undefined)
      setVisible(SpinState.Hidden)
    }

  }, [visible, divEl])

  function showSpinner(props: { overlay: boolean } = { overlay: false }) {
    setVisible(SpinState.Show)
  }

  function hideSpinner() {
    setVisible(SpinState.Hide)
  }

  function isSpinning() {
    return (loadingEl.current && loadingEl.current.isVisible()) || false;
  }

  // Memomize the values so we can use the same refernce inside useCallback
  // and also it will not rerender the hook so it will prevent going infinte inside useCallback when
  // passed as dependency
  return useMemo(() => {
    return {
      isSpinning,
      showSpinner,
      hideSpinner,
    };
  }, []);
}
