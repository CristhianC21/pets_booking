document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Se ejecuta cuando Cordova está listo

  // Obtén una referencia al botón de captura de imagen en tu HTML
  var captureButton = document.getElementById("captureButton");

  // Agrega un evento clic al botón de captura de imagen
  captureButton.addEventListener("click", captureImage);

  // Función para capturar una imagen
  function captureImage() {
    console.log("holahola");
    // Configuración de opciones para la captura de imagen
    var options = {
      quality: 50, // Calidad de la imagen (0-100)
      destinationType: Camera.DestinationType.FILE_URI, // Tipo de resultado (FILE_URI o DATA_URL)
      encodingType: Camera.EncodingType.JPEG, // Tipo de codificación de la imagen
      mediaType: Camera.MediaType.PICTURE, // Tipo de archivo multimedia (PICTURE, VIDEO o ALLMEDIA)
      allowEdit: true, // Permite editar la imagen después de capturarla
      saveToPhotoAlbum: false // Guarda la imagen en el álbum de fotos del dispositivo
    };

    // Llama al método de captura de imagen del plugin de la cámara
    navigator.camera.getPicture(onSuccess, onError, options);
  }

  // Función de éxito para la captura de imagen
  function onSuccess(imageURI) {
    // Aquí puedes manejar la imagen capturada, como mostrarla en un elemento <img> en tu HTML
    var imageElement = document.getElementById("capturedImage");
    imageElement.src = imageURI;
  }

  // Función de error para la captura de imagen
  function onError(errorMessage) {
    // Maneja los errores aquí
    console.error(errorMessage);
  }
}
