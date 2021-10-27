const url = "https://character-database.becode.xyz";

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
  const response = await fetch(url + "/characters/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

const del = async (url, id) => {
  const response = await fetch(url + "/characters/" + id, {
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
  
  // single character page
let target = document.querySelector(".card__container");
let deleteChar = document.querySelector("#del");
let currentPageUrl = window.location.href;
let currentID = currentPageUrl.split("=")[1];

const displayCharacter = async()=>{
    
    let currentCharacter = await getCharacterById(currentID);
    console.log(currentCharacter);

    let card = document.querySelector("#templateCard");
    let templateSingle = card.cloneNode(true).content;
    let image = templateSingle.querySelector("#avatarImg");
    let name = templateSingle.querySelector(".card__name");
    let shortDesc = templateSingle.querySelector(".card__shortDesc");
    let desc = templateSingle.querySelector(".card__longDesc");

    image.setAttribute("src", "data:image/jpeg;base64,"+ currentCharacter.image);
    image.setAttribute( "width", "100px");
    image.setAttribute( "height", "100px");
    name.innerHTML= currentCharacter.name;
    shortDesc.innerHTML= currentCharacter.shortDescription;
    desc = currentCharacter.description;
    target.appendChild(templateSingle);

}

// delete character
deleteChar.addEventListener("click", async()=>{

if (confirm("Are You Sure")){
    
    alert ("Character deleted");
    await del (url, currentID);
    window.location.href = "/";

};

});
//Return Home package

/* let returnHome = document.querySelector("#home");
returnHome.addEventListener('click', window.lo)
 */
displayCharacter();




