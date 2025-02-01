export const onLogout = () => {
  window.sessionStorage.clear()
}

export const formattedAddress = (ele?: string) => {
  if (ele)
    return `${ele?.substr(0, 5)}...${ele?.substr(35)}`
}
export const formattedHash = (ele: string) => {
  return `${ele?.substr(0, 10)}...${ele?.substr(55)}`
}