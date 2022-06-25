export const handleLogout = async () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};
