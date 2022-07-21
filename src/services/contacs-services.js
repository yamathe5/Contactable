import { tokenKey, BASE_URI } from "../config.js"

export async function listContacts(){
  try{
    const token = sessionStorage.getItem(tokenKey);
    let url = `${BASE_URI}/contacts`
    const res = await fetch(url,{
      method: "GET",
      headers: {
        Authorization: `Token token=${token}`
      }
    })
  
    const contacts = await res.json()
    sortContacts(contacts)
    return contacts
  }catch(error){
    console.log(error)
  }
}

function sortContacts(contacts){
  contacts.sort(function (a, b) {
    if (a.name.to > b.name) {
      return 1;
    }
    if (a.name <= b.name) {
      return -1;
    }
    return 0;
  });
}
