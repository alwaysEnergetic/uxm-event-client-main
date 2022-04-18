import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@symbolia/plsicon'
import { getLoginUrl } from '../../organisms/Auth/auth'
import { useAuth } from 'src/components/organisms/Auth/AuthContext'

export default function LoginButton(props: {redirect?: string, title?: string})  {
  const { redirect="/", title='LOGIN or REGISTER' } = props
  const { isAuthenticated } = useAuth()

  const url = getLoginUrl(redirect)
  return !isAuthenticated ? 
    <a href={url} className="btn btn-primary btn-sm1 mb-2 mb-sm-0">
      <FontAwesomeIcon icon={faUser} className="me-2" />{title}</a>
   : null
}