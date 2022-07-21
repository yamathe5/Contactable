import DOMHandler from "./dom-handler.js";
import { HomePage } from "./pages/home-page.js";
import LoginPage from "./pages/login-page.js";
import { getUser } from "./services/users-service.js";
import { tokenKey } from "./config.js";
import STORE from "./store.js";

export default async function init() {
  try{
    const token = sessionStorage.getItem(tokenKey)
  
    if(!token) throw new Error()
  
    const user = await getUser()
    STORE.user = user

    await STORE.fetchCategories();
    DOMHandler.load(HomePage)
  } catch(error) {
    sessionStorage.removeItem(tokenKey);
    DOMHandler.load(LoginPage)
  }
}
