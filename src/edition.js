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
  // let update = await put(url,editHeroe,testid);

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
