import DOMHandler from "../dom-handler.js";
import { logout } from "../services/session-service.js"
import LoginPage from "./login-page.js";
import STORE from "../store.js";
import createContact from "./create-contact.js";
import contactDetail from "./contact-detail.js";


function render() {
  const contacts = STORE.contacts;
  const favorites = STORE.favorites;
  return `
    <main class="section">
      <section class="container">
        <h1 class="nav-heading">Contactable</h1>
        <a class="nav-link text-center block mb-8 js-logout">Logout</a>
        ${ favorites.length ? renderFavorites(favorites) : "" }  

        <div class="js-contacts contacts">
          <h2 class="contacts-heading">Contacts (${contacts.length})</h2>
          <ul class="cards-js">
            ${contacts.map(contact =>contactCard(contact)).join("")}
          </ul>
        </div>
        <br><br><br><br>
        <div class="button-add button-add-js">
          <img src="assets/images/add.png">
        </div>
      </section>
    </main>
  `;
}

function listenLogout() {
  const a = document.querySelector(".js-logout") // Capturar
  // Agregar evento
  a.addEventListener("click", async (event) => {
    // =>> que hago con esto?
    event.preventDefault();

    try {
      await logout();
      DOMHandler.load(LoginPage);
    } catch (error){
      console.log(error.message);
    }
  })
}



function contactCard(contact){
  let pin = contact.favorite ? "#000000" : "#E5E5E5"
  return `
    <li class="card-contact" data-id=${contact.id}>
      <img src="assets/images/avatar.png" class="image-contact">
      <h3 class="name-contact">
        ${contact.name}
      </h3>
      <div class="star-container" ${contact.favorite ? "favorite" : "" }>
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.2089 6.67501L13.2581 5.81016L10.5979 0.417196C10.5253 0.26954 10.4057 0.150009 10.2581 0.0773524C9.88778 -0.10546 9.43778 0.0468837 9.25262 0.417196L6.59246 5.81016L0.641682 6.67501C0.47762 6.69845 0.32762 6.77579 0.212776 6.89298C0.0739361 7.03568 -0.00257088 7.22766 6.5967e-05 7.42675C0.00270281 7.62583 0.0842678 7.81572 0.226838 7.9547L4.53231 12.1524L3.51512 18.0797C3.49127 18.2176 3.50652 18.3594 3.55916 18.489C3.6118 18.6187 3.69972 18.731 3.81294 18.8132C3.92616 18.8955 4.06015 18.9443 4.19973 18.9543C4.3393 18.9642 4.47888 18.9349 4.60262 18.8695L9.92528 16.0711L15.2479 18.8695C15.3932 18.9469 15.562 18.9727 15.7237 18.9445C16.1315 18.8742 16.4057 18.4875 16.3354 18.0797L15.3182 12.1524L19.6237 7.9547C19.7409 7.83985 19.8182 7.68985 19.8417 7.52579C19.905 7.11563 19.619 6.73595 19.2089 6.67501ZM13.5065 11.5617L14.3526 16.4906L9.92528 14.1656L5.49793 16.493L6.34403 11.5641L2.76278 8.07188L7.71278 7.35235L9.92528 2.86876L12.1378 7.35235L17.0878 8.07188L13.5065 11.5617Z" fill="${pin}"/>
        </svg>
      </div>
    </li>
  `
}

function listenAddContact(){
  const newContact = document.querySelector(".button-add-js")

  newContact.addEventListener("click", e => {
    DOMHandler.load(createContact);
  })
}

function listenContactDetail(){
  const cards = document.querySelectorAll(".cards-js")

  cards.forEach( card => {
    card.addEventListener("click", function(e){
      if(e.target.matches("svg")) return;
      const contactCard = e.target.closest("[data-id]")
      contactDetail.id = contactCard.dataset.id
      DOMHandler.load(contactDetail)
    })
  })
}

function renderFavorites(favorites){
  return `
    <div class="js-contacts contacts">
      <h2 class="contacts-heading">Favorites</h2>
      <ul class="cards-js">
        ${favorites.map(favorite =>contactCard(favorite)).join("")}
      </ul>
    </div>
  `
}

function listenMousePositionStar(){
  const star_containers = document.querySelectorAll(".star-container")

  star_containers.forEach( star_container => {
    star_container.addEventListener("mouseover", e => {
      const star = star_container.children[0].children[0];
      if(star_container.hasAttribute("favorite")) return 
      star.setAttribute("fill", "#000000");
    })
  })

  star_containers.forEach( star_container => {
    star_container.addEventListener("mouseleave", e => {
      const star = star_container.children[0].children[0];
      if(star_container.hasAttribute("favorite")) return
      star.setAttribute("fill", "#E5E5E5");
    })
  })
}

function listenMarkFavorite(){
  const star_containers = document.querySelectorAll(".star-container")

  star_containers.forEach( star_container => {
    star_container.addEventListener("click", e => {
      let id = star_container.parentElement.dataset.id;
      let new_favorite = STORE.contacts.filter( contact => contact.id == id )[0]
      
      new_favorite.favorite = !star_container.hasAttribute("favorite")

      STORE.favorites = STORE.contacts.filter(contact => contact.favorite)
      DOMHandler.load(HomePage)
    })
  })
}

export const HomePage = {
  toString() {
    return render()
  },
  addListeners() {
    listenAddContact();
    listenContactDetail();
    listenMousePositionStar();
    listenMarkFavorite();
    listenLogout();
  }
}
