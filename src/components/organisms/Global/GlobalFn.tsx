export const getCurrentTheme = () => {
  return localStorage.getItem("theme") || 'light'
}

export const setCurrentTheme = (name: string) => {
  console.log("set theme", name)
  localStorage.setItem("theme", name)
}

export const removeTheme = () => {
  localStorage.removeItem("theme")
}

export const getToggleTheme = () => {
  console.log(localStorage.getItem("theme"), localStorage.getItem("theme")=='light' ? 'dark' : 'light')
  return localStorage.getItem("theme")=='light' ? 'dark' : 'light'
}