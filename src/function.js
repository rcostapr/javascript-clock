function img() {
  var canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  image = new Image();

  // Wait for the sprite sheet to load
  image.onload = function () {
    Promise.all([
      // Cut out two sprites from the sprite sheet
      createImageBitmap(image, 0, 0, 32, 32),
      createImageBitmap(image, 32, 0, 32, 32),
    ]).then(function (sprites) {
      // Draw each sprite onto the canvas
      ctx.drawImage(sprites[0], 0, 0);
      ctx.drawImage(sprites[1], 32, 32);
    });
  };

  // Load the sprite sheet from an image file
  image.src = "sprites.png";
}
