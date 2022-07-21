import { listContacts } from "./services/contacs-services.js"

async function fetchContacts(){
  STORE.contacts = await listContacts();
  STORE.favorites = STORE.contacts.filter(contact => contact.favorite)
}

const STORE = {
  user: null,
  contacts: [],
  favorites: [],
  fetchContacts
}

export default STORE;
