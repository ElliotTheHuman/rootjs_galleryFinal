/* your javascript goes here */

$(document).ready(initiateApp);

var pictures = [
  "images/landscape-1.jpg",
  "images/landscape-10.jpg",
  "images/landscape-11.jpg",
  "images/landscape-13.jpg",
  "images/landscape-15.jpg",
  "images/landscape-17.jpg",
  "images/landscape-18.jpg",
  "images/landscape-19.jpg",
  "images/landscape-2.jpg",
  "images/landscape-3.jpg",
  "images/landscape-8.jpg",
  "images/landscape-9.jpg",
  "images/pexels-photo-132037.jpeg",
  "images/pretty.jpg"
];

function initiateApp() {
  /*advanced: add jquery sortable call here to make the gallery able to be sorted
		//on change, rebuild the images array into the new order
  */

  makeGallery(pictures);
  addModalCloseHandler();

  var gallerySelector = $("#gallery");
  gallerySelector.sortable({
    items: "> figure",
    update: rebuildImageArray
  });
}

function rebuildImageArray() {
  // Set pictures to an empty array
  pictures = [];

  // Grab the children of #gallery (in their current order) and use them to rebuild the pictures array
  var galleryChildElements = $("#gallery").children();
  var imagesUrlSubDirectory = "images/";

  for (
    var childIndex = 0;
    childIndex < galleryChildElements.length;
    childIndex++
  ) {
    pictures.push(
      imagesUrlSubDirectory + galleryChildElements[childIndex].innerText
    );
  }
}

function makeGallery(imageArray) {
  //use loops and jquery dom creation to make the html structure inside the #gallery section
  //create a loop to go through the images in the imageArray
  //create the elements needed for each picture, store the elements in variable
  //attach a click handler to the figure you create.  call the "displayImage" function.
  //append the element to the #gallery section
  // side note: make sure to remove the hard coded html in the index.html when you are done!

  for (
    var imageArrayIndex = 0;
    imageArrayIndex < imageArray.length;
    imageArrayIndex++
  ) {
    // Creating imageElement (i.e. <figure> and child elements)
    var imageRelativeUrl = imageArray[imageArrayIndex];

    var imageElement = $("<figure>", {
      class: "imageGallery col-xs-12 col-sm-6 col-md-4",
      style: "background-image:url(" + imageRelativeUrl + ");"
    });

    var positionOfFileName = 1;
    var imageFileName = imageRelativeUrl.split("/")[positionOfFileName];

    var imageElementCaption = $("<figcaption>", {
      text: imageFileName
    });

    imageElement.append(imageElementCaption);

    // Adding click handler to imageElement
    imageElement.click(displayImage);

    // append element to the #gallery section
    var gallerySelector = $("#gallery");
    gallerySelector.append(imageElement);
  }
}

function addModalCloseHandler() {
  //add a click handler to the img element in the image modal.  When the element is clicked, close the modal
  //for more info, check here: https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp

  var modalBodyImageSelector = $(".modal-body img");
  var modalSelector = $("#galleryModal");

  modalBodyImageSelector.click(function() {
    modalSelector.modal("hide");
  });
}

function displayImage() {
  //find the url of the image by grabbing the background-image source, store it in a variable
  //grab the direct url of the image by getting rid of the other pieces you don't need
  //grab the name from the file url, ie the part without the path.  so "images/pexels-photo-132037.jpeg" would become
  // pexels-photo-132037
  //take a look at the lastIndexOf method
  //change the modal-title text to the name you found above
  //change the src of the image in the modal to the url of the image that was clicked on
  //show the modal with JS.  Check for more info here:
  //https://www.w3schools.com/bootstrap/bootstrap_ref_js_modal.asp

  var clickedImage = $(this);

  // Grabbing and formatting background-image of clicked Element
  var clickedImageFullUrl = clickedImage.css("background-image");
  var indexOfImagesInFullUrl = clickedImageFullUrl.lastIndexOf("images");
  var clickedImageRelativeUrlRaw = clickedImageFullUrl.substring(
    indexOfImagesInFullUrl
  );
  var clickedImageRelativeUrl = clickedImageRelativeUrlRaw
    .replace('"', "")
    .replace(")", "");

  var clickedImageFileNameRaw = clickedImageRelativeUrl.split("/")[1];
  var clickedImageFileName = clickedImageFileNameRaw.replace(".jpg", "");

  // Working with modal
  var modalTitleSelector = $(".modal-title");
  modalTitleSelector.text(clickedImageFileName);

  var modalBodyImageSelector = $(".modal-body img");
  modalBodyImageSelector.attr("src", clickedImageRelativeUrl);

  // Show modal
  var modalSelector = $("#galleryModal");
  modalSelector.modal();
}
