const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID

export default function config () {
  return {
    BACKEND_URL,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    EMAILJS_USER_ID
  }
}