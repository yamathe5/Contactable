import DOMHandler from "../dom-handler.js";
import { HomePage }  from "./home-page.js"
import STORE from "../store.js";
import { input } from "../components/input.js";
import { signup } from "../services/session-service.js"
function render(){
  const { signupError } = SignupPage.state;
  return `
    <main class="section">
      <section class="container">
        <h1 class="heading heading--lg text-center mb-4">SignUp</h1>
        <form class="flex flex-column gap-4 mb-4 js-signup-form">
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

          <button class="button button--primary">Sign Up</button>

        </form>
      </section>
    </main>    
  `;
  }

function listenSubmitForm(){
  const form = document.querySelector(".js-signup-form")
  
  form.addEventListener("submit", async (event) => {
    try{
      event.preventDefault();
      const { email, password} = event.target;

      const credentials = {
        email: email.value,
        password: password. value,
      }
      const user = await signup(credentials)
      STORE.user = user

      DOMHandler.load(HomePage)
    } catch(error){
      SignupPage.state.signupError = error.message
      DOMHandler.reload()
    }
  })
}

const SignupPage = {
  toString(){
    return render()
  },
  addListeners(){
    return listenSubmitForm()
  },
  state: {
    signupError: null,
  }
}

export default SignupPage;