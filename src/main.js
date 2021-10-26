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








let testid="dcaf3afb-3f20-4e7b-90a9-55b3eaafaf1d";

//Start Phil
let submitIndex = document.querySelector("#submit_index");
let submitButton = document.querySelector("#submit_button");

let nameField = document.querySelector("#a");
let shortDescField = document.querySelector("#b");
let longDescField = document.querySelector("#c");

nameField.value="";
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
