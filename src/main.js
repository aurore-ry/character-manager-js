const url = "https://character-database.becode.xyz/characters";
let encode = encodeURI(url);

const cardTemplate = document.querySelector(".hero-card");

console.log("encoded= ", encode);

const get = async (url, id) => {
  try {
    return await (await fetch(url + id)).json();
  } catch (error) {
    console.error(error.message);
  }
};

console.log("get=", get);

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

// main page character

// display all
const home = async () => {
  const characters = await get(url, "");
  characters.forEach((character) => {
    const currentCharacter = document.importNode(cardTemplate.content, true);
    const img = document.querySelector("img.avatar-hero-card");
  });
};

// -- Main page open form for add character --
const openForm = () => {
  document.querySelector(".form-container").style.display = "flex";
};
const closeForm = () => {
  document.querySelector(".form-container").style.display = "none";
};
