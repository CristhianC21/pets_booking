document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("offline", onOffline, false);
document.addEventListener("online", onOnline, false);


function onDeviceReady() {

  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  // document.getElementById('deviceready').classList.add('ready');

  window.addEventListener("batterystatus", onBatteryStatus, false);


}
var indexPet = 0;
function captureImage(index) {
  indexPet = index;
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 80,
    destinationType: Camera.DestinationType.DATA_URL
  });


}

function onSuccess(imageData) {
  console.log(indexPet);
  var allPetsStored = JSON.parse(localStorage.getItem("allPets"));

  allPetsStored[indexPet].imageAnimals.push(imageData);

  localStorage.setItem("allPets", JSON.stringify(allPetsStored));

}

function onFail(message) {
  alert('Failed to capture image: ' + message);
  console.log('Failed to capture image: ' + message);
}



function openModal(x) {

  console.log(x);
  var allPetsStored = JSON.parse(localStorage.getItem("allPets"));
  const imageAnimal = allPetsStored[x].imageAnimals;

  const modal = document.createElement("ion-modal");
  modal.componentProps = {
    images: imageAnimal
  };

  const content = document.createElement("ion-content");
  modal.appendChild(content);

  const scroll = document.createElement("ion-scroll");
  scroll.class = "modal-scroll";
  scroll.scrollY = "True";
  content.appendChild(scroll);

  const list = document.createElement("ion-list");
  scroll.appendChild(list);


  for (let i = 0; i < imageAnimal.length; i++) {
    const item = document.createElement("ion-item");
    list.appendChild(item);

    const img = document.createElement("img");
    img.src = "data:image/jpeg;base64," + imageAnimal[i];
    item.appendChild(img);
  }

  document.body.appendChild(modal);
  return modal.present();
}


function onBatteryStatus(status) {
  var batteryLevel = status.level;
  if (batteryLevel < 20) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'true');

    document.getElementById("themeToggle").style.display = "none";
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
    document.getElementById("themeToggle").style.display = "block";
  }

}
var app = document.querySelector("ion-app");

function onOnline() {
  document.getElementById("connection-warning").style.display = "none";
}


function onOffline() {
  document.getElementById("connection-warning").style.display = "block";
}