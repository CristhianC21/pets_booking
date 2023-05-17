currentPetTpye = "";
quantityPets = 0;
function loadTypes() {
    const petTypes = [
        {
            id: 1,
            name: "Dog",
        },
        {
            id: 2,
            name: "Cat",
        },
        {
            id: 3,
            name: "Bird",
        },
        {
            id: 4,
            name: "Fish",
        },
        {
            id: 5,
            name: "Other",
        },
    ];

    const compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    const selectEl = document.querySelector('ion-select');
    selectEl.compareWith = compareWithFn;

    petTypes.forEach((option, i) => {
        const selectOption = document.createElement('ion-select-option');
        selectOption.value = option;
        selectOption.textContent = option.name;
        selectEl.appendChild(selectOption);
    });


    selectEl.addEventListener('ionChange', () => {

        console.log(selectEl.value.name);
        currentPetTpye = selectEl.value.name;
    });

}

async function savePet() {
    const alert = document.createElement("ion-alert");
    petName = document.getElementById("newPetName").value;
    petType = currentPetTpye;
    petDate = document.getElementById("newAdopDate").value;
    medicalHistory = document.getElementById("medicalHistory").value;

    console.log(petName, petType, petDate, medicalHistory);

    if (petName == "" || petType == "" || petDate == "") {
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
                    sendNewPet(petName, petType, petDate, medicalHistory);
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


function sendNewPet(namePet, surnamePet, datePet, medicalHistoryPet) {
    var AllPets = JSON.parse(localStorage.getItem("allPets"));
    const newPet = {
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
    window.location.href = "index.html";
}

