const url = "https://character-database.becode.xyz";
const cardTemplate = document.querySelector("#card-template");
const createCharacterPopup = document.querySelector(".form-container");

// Network helpers

const get = async (url) => {
  try {
    const req = await fetch(url);
    const data = await req.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const post = async (url, values) => {
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const put = async (url, data, id) => {
  const response = await fetch(url + "/characters/" + testid, {
    method: "PUT",
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

// Service functions

const getAllCharacters = async () => {
  const characters = await get(`${url}/characters`);
  return characters;
};

const getCharacterById = async (id) => {
  const character = await get(`${url}/characters/${id}`);
  return character;
};

const createCharacter = async ({
  name,
  shortDescription,
  description,
  image,
}) => {
  const newCharacter = await post(`${url}/characters`, {
    name,
    shortDescription,
    description,
    image,
  });

  if (newCharacter.id == null) {
    throw new Error(newCharacter.message);
  }

  return newCharacter.id;
};

const readImage = (file) =>
  new Promise((resolve, reject) => {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith("image/")) {
      console.log("File is not an image.", file.type, file);
      return reject(new Error("File is not an image."));
    }

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      return resolve(event.target.result);
    });
    reader.readAsDataURL(file);
  });

// display all
const home = async () => {
  const characters = await getAllCharacters();
  const parentEl = document.querySelector(".hero-wrapper");

  characters.forEach((character) => {
    const templateNode = cardTemplate.content.firstElementChild.cloneNode(true);

    const currentCharacter = document
      .createElement("div")
      .appendChild(templateNode);
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

// Add new character
const onCreateCharacterFormSubmit = async (ev) => {
  ev.preventDefault();

  const imageEl = createCharacterPopup.querySelector("#character-image");
  const nameEl = createCharacterPopup.querySelector("#character-name");
  const shortDescriptionEl = createCharacterPopup.querySelector(
    "#character-short-description"
  );
  const descriptionEl = createCharacterPopup.querySelector(
    "#character-description"
  );

  const imageFileList = imageEl.files;

  const name = nameEl.value;
  const shortDescription = shortDescriptionEl.value;
  const description = descriptionEl.value;
  const image = await readImage(imageFileList[0]);

  try {
    const newCharacterId = await createCharacter({
      name,
      shortDescription,
      description,
      image: image.replace(/data:image\/[a-z]+\;base64,/gi, ""),
    });

    window.location.href = `/html/singleCharacter.html?id=${newCharacterId}`;
  } catch (error) {
    const errorEl = createCharacterPopup.querySelector(
      "#create-character-error"
    );

    errorEl.textContent = error.message;
  }
};

const onCreateCharacterPopupOpen = () => {
  const form = document.querySelector("#new-character-form");
  form.addEventListener("submit", onCreateCharacterFormSubmit);
};

// -- Main page open form for add character --
const openForm = () => {
  createCharacterPopup.style.display = "flex";
  onCreateCharacterPopupOpen();
};
const closeForm = () => {
  createCharacterPopup.style.display = "none";
};

home();

//Start Phil
// editor page 
let currentPageUrl = window.location.href;
let currentID = currentPageUrl.split("=")[1];
let testid = currentID;

let submitIndex = document.querySelector("#submit_index");
let submitButton = document.querySelector("#submit_button");

let nameField = document.querySelector("#a");
let shortDescField = document.querySelector("#b");
let longDescField = document.querySelector("#c");

nameField.value = "";

shortDescField.value = "";
longDescField.value = "";

let fonctionEdition =  async () => {
  /* let heroeIndex = document.querySelector("#submit_index").value; */

  let testall = await get(url);
  let test = await get(url + "/characters/" + testid);

  /* console.log(test); */
  /* console.log(testall); */
  let editImage = test.image;
  let editName = test.name;
  let editShortDesc = test.shortDescription;
  let editLongDesc = test.description;
  document.querySelector("#i").src = "data:image/jpeg;base64," + editImage;
  nameField.value = editName;
  shortDescField.value = editShortDesc;
  longDescField.value = editLongDesc;

  console.log(editName);
};

fonctionEdition();

submitButton.addEventListener("click", async () => {
  /* let imageInput = document.querySelector("#i").src; */
  let test = await get(url + "/characters/" + testid);

  let imageInput = test.image;

  let nameInput = document.querySelector("#a").value;
  let editShortDescInput = document.querySelector("#b").value;
  let editLongDescInput = document.querySelector("#c").value;

  console.log(nameInput);
  console.log(editShortDescInput);
  console.log(editLongDescInput);

  let editHeroe = new Object();
  editHeroe.id = testid;
  editHeroe.image = imageInput;
  editHeroe.name = nameInput;
  editHeroe.shortDescription = editShortDescInput;
  editHeroe.description = editShortDescInput;

  console.log(editHeroe);
//   let update = await put(url, editHeroe, testid);
var userselection = confirm("Are you sure you want to update");

  if (userselection == true) {
    let update = await put(url, editHeroe, testid);
    if (update.ok) {
      alert("Character Updated");
      window.location.href = "/";
    } else {
      alert("Error:" + update.status);
    }
  } else {
    alert("Aborted");
  }
});