export const isValidlogin = () => {
  return JSON.parse(localStorage.getItem("user"))?JSON.parse(window.localStorage.getItem("user")).email:"";
}

export const isValidEmail = (value) => {
  return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value))
}

export const isValidPassword = (value) => {
  return !(value && !/^[A-Z0-9]{8,256}$/i.test(value))
}

export const isValidTitle = (value) => {
  return !(value && /^.{1,125}$/i.test(value));
}