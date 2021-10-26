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
