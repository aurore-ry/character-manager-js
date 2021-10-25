const url = "https://character-database.becode.xyz/characters";
let encode = encodeURI(url);
console.log("encoded= ", encode);

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

// main page character

const openForm = () => {
  document.querySelector(".form-container").style.display = "flex";
};
const closeForm = () => {
  document.querySelector(".form-container").style.display = "none";
};
