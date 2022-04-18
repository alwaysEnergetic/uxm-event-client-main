import React, { Fragment } from 'react';

function ListToComma(props: {items: any[]|undefined, itemKey?: string}) {
  const { items=[], itemKey=null } = props
  
  if(!itemKey) return null
  if(!items || items.length == 0) return null

  let values: any = [];
  for(let item of items) {
    values.push(item[itemKey])
  }

  if(values.length == 0) return null

  let value = values.join(', ')

  return value
}

export default ListToComma