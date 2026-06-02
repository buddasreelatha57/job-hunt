export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("authChange"));
};

export const logoutUser = () => {
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("authChange"));
};

export const getUser = () => {
  try {
    const data = localStorage.getItem("user");
    if (!data || data === "undefined") return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
};
