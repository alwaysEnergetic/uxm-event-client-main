export function getUserProfileLink(userSlugOrID: string): string {
  let url = "/"
  if(userSlugOrID) {
    url = `/users/${userSlugOrID}`
  }
  return url
}