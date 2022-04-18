import { useEffect } from 'react'
import { getUserUID, isLoggedIn } from "src/components/organisms/Auth/auth";

function PostMessageIframe() {
  useEffect(() => {
    // if the sites is not under iframe
    if(self==top) return;
    
    let loggedIn = isLoggedIn()
    window.parent.postMessage({ "type": "frame", "isLoggedIn": loggedIn }, '*');
  }, [])

  return null
}
export default PostMessageIframe
