const url = "https://character-database.becode.xyz/";

const get = async (url) => {
  return await (await fetch(url)).json();
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

















































































































































































//Start Phil

let submitButton = document.querySelector("#submit-button");
console.log(submitButton);
submitButton.addEventListener("click", ()=>{

  let editNameInput= document.querySelector("#input__Name");
  let editShortDescInput= document.querySelector("#input__shortDesc");
  let editlongDescInput= document.querySelector("#input__longDesc");

  console.log(editNameInput);

}


);
