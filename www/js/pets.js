function sendNewPet(namePet, surnamePet, datePet) {
  var AllPets = JSON.parse(localStorage.getItem("allPets"));
  const newPet = {
    namePetLocal: namePet,
    typePetLocal: surnamePet,
    datPetLocal: datePet,
    imageAnimal: []
  };

  if (AllPets == null) {
    AllPets = [];
  }

  AllPets.push(newPet);
  localStorage.setItem("allPets", JSON.stringify(AllPets));
  window.location.href = "index.html";
}

function removePet(numIndex) {
  var storedContacts = JSON.parse(localStorage.getItem("allPets"));

  storedContacts.splice(numIndex, 1);

  localStorage.setItem("allPets", JSON.stringify(storedContacts));
  loadPets();
}

function removeAll() {
  var storedPets = JSON.parse(localStorage.getItem("allPets"));
  storedPets.splice(0, storedPets.length);
  localStorage.setItem("allPets", JSON.stringify(storedPets));
  loadPets();
}

async function removeAllPets() {
  const alert = document.createElement("ion-alert");
  const toast = document.createElement("ion-toast");
  if (JSON.parse(localStorage.getItem("allPets")).length > 0) {
    alert.header = "Delete all pets?"
    alert.message = "Are you sure you want to delete All pets?";
    alert.buttons = [
      {
        text: "Cancel",
        role: "cancel",
      },
      {
        text: "OK",
        role: "confirm",
        handler: () => {
          toast.message = "All pets were cleared";
          toast.duration = "1000";
          document.getElementById("content").appendChild(toast);
          removeAll();

        },
      },
    ];

    document.body.appendChild(alert);

    await alert.present();
    await toast.present();
  }
}

function iconPets(petType) {
  if (petType == 'Dog') {
    return "paw-outline"
  }
  else if (petType == 'Cat') {
    return "logo-octocat"
  }
  else if (petType == 'Bird') {
    return "logo-twitter"
  }
  else if (petType == 'Fish') {
    return "fish-outline"
  }
  else if (petType == 'Other') {
    return "planet-outline"
  }
}

function loadPets() {


  var AllPets = JSON.parse(localStorage.getItem("allPets"));
  document.getElementById("pets").innerHTML = "";

  if (AllPets == null || AllPets.length == 0) {
    quantityPets = 0;
    const ionText = document.createElement("ion-text");
    ionText.innerHTML = `<ion-text class="ion-padding">You haven't added any pets
    yet. Please start by clicking on the + icon.</ion-text>`;

    document.getElementById("pets").appendChild(ionText);
  } else {
    quantityPets = AllPets.length;
    console.log(AllPets);
    for (var i = 0; i < AllPets.length; i++) {
      const ionitem = document.createElement("ion-item");
      const item = AllPets[i];
      type = iconPets
      console.log(item);
      ionitem.innerHTML = `
      <ion-icon size="large" name="${iconPets(item.typePetLocal)}" slot="start"></ion-icon>
    <ion-label>
      <h1>${item.namePetLocal}</h1>
      <p>Birthday/Adopted: ${item.datPetLocal}</p>
      <p>Creation date: ${item.adoptionDate}</p>
      <ion-buttons slot="start">
        <ion-button onclick="captureImage(${i})">
          <ion-icon color="colorapp" name="camera"></ion-icon>
        </ion-button>
      </ion-buttons>

      <ion-buttons>
        <ion-button onclick="openModal(${i})">
          <ion-icon color="colorapp" name="images"></ion-icon>
        </ion-button>
      </ion-buttons>

    </ion-label>
    <ion-button color="colorapp" onclick="removePet(${i})">
      <ion-icon name="trash-outline"></ion-icon>
    </ion-button>
    <ion-reorder slot="end"></ion-reorder>
               
    <div id="image-modal"></div>

        `;


      document.getElementById("pets").appendChild(ionitem);
    }
  }
  document.getElementById("routerLink").setAttribute('href', '/');
  // document.getElementById("routerLink").removeAttribute('href');
  document.getElementById('numPets').innerHTML = quantityPets;

}

