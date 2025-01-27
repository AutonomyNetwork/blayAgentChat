export const onLogout = () => {
  window.sessionStorage.removeItem("email");
  window.sessionStorage.removeItem("userId");
  window.sessionStorage.removeItem("name");
  window.sessionStorage.removeItem("picture");
  window.sessionStorage.removeItem("token");
  window.sessionStorage.removeItem("refresh_token");
}