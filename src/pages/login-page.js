import { input } from "../components/input.js";
import { login } from "../services/session-service.js"
import DOMHandler from "../dom-handler.js";
import { HomePage } from "./home-page.js"
import STORE from "../store.js";
import SignupPage from "./signup-page.js";

function render() {
  // const { loginError } = this.state;
  const { loginError } = LoginPage.state;
  return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">Login</h1>
        <form class="flex flex-column gap-4 mb-4 js-login-form">

          ${input({
            label: "email",
            id: "email",
            type: "email",
            placeholder: "nosoydiego@gmail.com",
            required: true,
            value: "test1@mail.com"
          })}

          ${input({
            label: "password",
            id: "password",
            type: "password",
            placeholder: "******",
            required: true,
            value: "123456"
          })}

          ${loginError ? 
            `<p class="text-center error-300">${loginError}</p>`: ''
          }

          <button class="button button--primary">Login</button>
        </form>
        <a href="#" class="block text-center js-signup-link">Create account</a>
      </section>
    </main>
  `;
}

function listenSubmitForm() {
  const form =  document.querySelector(".js-login-form")

  form.addEventListener("submit", async (event) => {
    try {
      event.preventDefault();
  
      const { email, password } = event.target;
  
      const credentials = {
        email: email.value,
        password: password.value,
      }
  
      const user = await login(credentials)
      STORE.user = user
      // console.log(STORE)
      await STORE.fetchContacts()
      console.log(STORE.user)
      DOMHandler.load(HomePage)
    } catch (error) {
      // this.state.loginError = error.message
      LoginPage.state.loginError = error.message
      DOMHandler.reload()
    }
  })
}

function listenSignup() {
  const a = document.querySelector(".js-signup-link")

  a.addEventListener("click", (event) =>{
    event.preventDefault();
    DOMHandler.load(SignupPage);
  } )
}


const LoginPage = {
  toString() {
    // return render.call(this)
    return render()
  },
  addListeners() {
    // listenSubmitForm.call(this)
    listenSubmitForm();
    listenSignup();
  },
  state: {
    loginError: null,
  }
}

export default LoginPage;
