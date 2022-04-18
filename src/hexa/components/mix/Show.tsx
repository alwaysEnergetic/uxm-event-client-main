import React, { Fragment, useEffect, useState } from 'react';

interface ShowProps {
  show: boolean;
  children?: any
}

function Show(props: ShowProps) {
  const { show } = props
  const [shown, setShown] = useState(show)
  // if(!show) return null

  useEffect(() => {
    setShown(show)
  }, [show])

  if(!shown) return null

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}

export default Show