const url = "https://character-database.becode.xyz";

const cardTemplate = document.querySelector("#card-template");

const get = async (url) => {
  try {
    const req = await fetch(url);
    const data = await req.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllCharacters = async () => {
  const characters = await get(`${url}/characters`);
  return characters;
};

const getCharacterById = async (id) => {
  const character = await get(`${url}/characters/${id}`);
  return character;
};

const post = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

const del = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
  });
};

// display all
const home = async () => {
  const char1 = await getCharacterById("a4d08a81-d02b-4545-97f8-87ee7bdb190b");
  console.log("char1=", char1.name);

  const characters = await getAllCharacters();
  const parentEl = document.querySelector(".hero-wrapper");

  characters.forEach((character) => {
    const templateNode = cardTemplate.content.firstElementChild.cloneNode(true);

    const currentCharacter = document
      .createElement("div")
      .appendChild(templateNode);
    console.log(currentCharacter);
    currentCharacter.setAttribute("id", character.id);

    const img = currentCharacter.querySelector("img.avatar-hero-card");
    img.setAttribute("src", `data:image/png;base64,${character.image}`);
    img.setAttribute("width", "100px");
    img.setAttribute("height", "100px");

    const name = currentCharacter.querySelector(".hero-name-card");
    name.textContent = character.name;
    parentEl.appendChild(currentCharacter);

    const smallDescription = currentCharacter.querySelector(
      ".hero-description-card"
    );
    smallDescription.textContent = character.shortDescription;

    const ditailsButton = currentCharacter.querySelector(".btn-see-hero");
    ditailsButton.setAttribute(
      "href",
      `./html/singleCharacter.html?id=${character.id}`
    );
  });
};

// -- Main page open form for add character --
const openForm = () => {
  document.querySelector(".form-container").style.display = "flex";
};
const closeForm = () => {
  document.querySelector(".form-container").style.display = "none";
};

home();




























































































































































const put = async (url, data, id) => {
  const response = await fetch(url+"/characters/"+testid, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};








let testid="1d91da00-5905-41cd-8586-497788053ff8";

//Start Phil
let submitIndex = document.querySelector("#submit_index");
let submitButton = document.querySelector("#submit_button");

let nameField = document.querySelector("#a");
let shortDescField = document.querySelector("#b");
let longDescField = document.querySelector("#c");

if ( typeof nameField !== undefined){ 
  nameField.value= "";}
shortDescField.value="";
longDescField.value="";

submitIndex.addEventListener("click", async()=>{
  /* let heroeIndex = document.querySelector("#submit_index").value; */


  let testall= await get(url);
  let test= await get(url+"/characters/"+testid);

  
  /* console.log(test); */
  /* console.log(testall); */
  let editImage = test.image;
  let editName = test.name;
  let editShortDesc = test.shortDescription;
  let editLongDesc =  test.description;
  document.querySelector("#i").src=("data:image/jpeg;base64,"+editImage);
  nameField.value= editName;
  shortDescField.value= editShortDesc;
  longDescField.value= editLongDesc;

  console.log(editName);

  
})

submitButton.addEventListener("click", async()=>{
  /* let imageInput = document.querySelector("#i").src; */
  let test= await get(url+"/characters/"+testid);
  
  
  let imageInput = test.image;

  let nameInput = document.querySelector("#a").value;
  let editShortDescInput = document.querySelector("#b").value;
  let editLongDescInput = document.querySelector("#c").value;
  
  
  console.log(nameInput);
  console.log(editShortDescInput);
  console.log(editLongDescInput);
  
  let editHeroe = new Object;
  editHeroe.id = testid;
  editHeroe.image = imageInput;
  editHeroe.name = nameInput;
  editHeroe.shortDescription = editShortDescInput;
  editHeroe.description = editShortDescInput;

  console.log(editHeroe);
  let update = await put(url,editHeroe,testid);
  
  


});

