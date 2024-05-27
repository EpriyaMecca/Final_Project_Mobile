const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const captureButton = document.getElementById("captureButton");
const kameraButton = document.getElementById("kameraButton");
const inputBuktis = document.getElementById("buktis");
const inputBuktisEnc = document.getElementById("buktisEnc");
const videoContainer = document.getElementById("videoContainer");

kameraButton.addEventListener("click", function () {
   videoContainer.style.display = "block";
   navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
         video.srcObject = stream;
         video.play();
      })
      .catch(function (err) {
         console.log("An error occurred: " + err);
      });
});

// Capture the photo
captureButton.addEventListener("click", function () {
   const context = canvas.getContext("2d");
   canvas.width = video.videoWidth;
   canvas.height = video.videoHeight;
   context.drawImage(video, 0, 0, canvas.width, canvas.height);

   video.srcObject.getTracks().forEach((track) => track.stop());

   // Convert the image to a data URL and store it in the hidden input
   const dataURL = canvas.toDataURL("image/png");
   inputBuktisEnc.value = dataURL.split(",")[1];
});

// File input change
inputBuktis.addEventListener("change", function (event) {
   const file = event.target.files[0];
   const reader = new FileReader();
   reader.onloadend = function () {
      inputBuktisEnc.value = reader.result.split(",")[1];
   };
   reader.readAsDataURL(file);
});

// Submit form data
function submitForm() {
   const form = document.getElementById("dataForm");
   const formData = new FormData(form);
   fetch(
      "https://script.google.com/macros/s/AKfycbxfPXRbzFpQsI9uhHbuo5TQhjiCcGpRwvFHMRWN6jM5DLH5e895UWLMDP6xEvTDm8HjLA/exec",
      {
         method: "POST",
         body: formData,
      }
   )
      .then((response) => {
         return response.text();
      })
      .then((data) => {
         console.log(data);
         form.reset();
         window.location.href = "index.html";
      })
      .catch((error) => {
         console.error("Error:", error);
      });
}
