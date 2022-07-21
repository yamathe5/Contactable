import { HomePage } from "./home-page.js";
import DOMHandler from "../dom-handler.js";

function render() {
  return `
    <main class="section">
      <section class="container">
        <div class="js-navigation nav">
          <h1 class="nav-heading">Create new contact</h1>
          <a href="#" class="nav-link">Logout</a>
        </div>
        <div class="js-contacts contacts">
          <form>
            <label>
              Name:
            </label>
            <input type="text" placeholder="Name">
            </input>
          </fomr>
        </div>
        <br>
        <a class="nav-link back-home-js" href="#">Back</a>
      </section>
    </main>
  `;
}

function listenBackLink(){
  const backLink = document.querySelector(".back-home-js")

  backLink.addEventListener("click", e => {
    e.preventDefault();
    DOMHandler.load(HomePage)
  })
}

const createContact = {
  toString(){
    return render()
  },
  addListeners(){
    listenBackLink()
  }
}

export default createContact;