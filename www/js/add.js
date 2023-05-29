currentPetTpye = "";
quantityPets = 0;

async function savePet() {
    const alert = document.createElement("ion-alert");
    petName = document.getElementById("newPetName");
    petType = document.querySelector('#type');
    petDate = document.getElementById("newAdopDate");
    medicalHistory = document.getElementById("medicalHistory");
    console.log("PET TYPE+___>",petType.value);
    console.log(petName.value, petType.value, petDate.value, medicalHistory.value);

    if (petName.value == "" || petType.value == "" || petDate.value == "") {
        alert.header = "MyPets";
        alert.message = "Please fill all the details";
        alert.buttons = ["OK"];
    } else {
        alert.header = "MyPets";
        alert.message = "Are you sure you want to save this pet?";
        alert.buttons = [
            {
                text: "Cancel",
                role: "cancel",
            },
            {
                text: "OK",
                role: "confirm",
                handler: () => {
                    sendNewPet(quantityPets,petName.value, petType.value, petDate.value, medicalHistory.value);
                    loadPets();
                    document.querySelector('#tabMain').select('list');
                    
                    petName.value = '';
                    petName.placeholder = 'Pet name (ex: Spencer)';
                    document.querySelector('ion-select').innerHTML = 'Select Pet Type';
                    petDate.value = '';
                    petDate.placeholder = 'Birthday/Adoption Date dd/mm/yyyy';
                    medicalHistory.value = '';
                    medicalHistory.placeholder = 'Enter the Medical History of your pet if required.';
                },
            },
        ];
    }

    document.body.appendChild(alert);
    await alert.present();
}

function getTimestamp(){
  const date= new Date().toLocaleString()   
  return date 
}


function sendNewPet(indexPos,namePet, surnamePet, datePet, medicalHistoryPet) {
    var AllPets = JSON.parse(localStorage.getItem("allPets"));
    const newPet = {
        indexPosLocal : indexPos,
        namePetLocal: namePet,
        typePetLocal: surnamePet,
        datPetLocal: datePet,
        medHistoryPetLocal: medicalHistoryPet,
        adoptionDate: getTimestamp()
    };

    if (AllPets == null) {
        AllPets = [];
    }

    AllPets.push(newPet);
    localStorage.setItem("allPets", JSON.stringify(AllPets));
    document.getElementById('routerLink').setAttribute("href","/")
}
