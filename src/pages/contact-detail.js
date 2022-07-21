import STORE from "../store.js"
import { HomePage } from "./home-page.js"
import DOMHandler from "../dom-handler.js";
function render() {
  return `
    <main class="section">
      <section class="container">
        <div class="js-navigation nav">
          <h1 class="nav-heading">Contact detail</h1>
          <a href="#" class="nav-link">Logout</a>
        </div>
        <div class="js-contacts contacts">
          ${renderData(contactDetail.id)}
        </div>
      </section>
    </main>
  `;
}

function renderData(id){
  let contact = STORE.contacts.filter(contact => contact.id == id)[0]
  return `
    <h1>
      ${contact.name}
    </h1>
    <p>
      ${contact.id}
    </p>
    <p>
      ${contact.email}
    </p>
    <br>
    <a class="nav-link back-home-js" href="#">Back</a>
  `
}

function listenBackLink(){
  const backLink = document.querySelector(".back-home-js")

  backLink.addEventListener("click", e => {
    e.preventDefault();
    DOMHandler.load(HomePage)
  })
}

const contactDetail = {
  id: null,
  toString(){
    return render()
  },
  addListeners(){
    listenBackLink()
  }
}

export default contactDetail;
