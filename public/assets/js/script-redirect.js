function resizeImg(img) {
  var imageWidth = img.clientWidth;
  var imageHeight = img.clientHeight;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  if (imageWidth > imageHeight) {
    if (imageWidth > windowWidth) {
      img.width = windowWidth;
    } else {
      img.width = imageWidth;
    }
  } else {
    if (imageHeight > windowHeight) {
      img.height = windowHeight;
    } else {
      img.height = imageHeight;
    }
  }
}
