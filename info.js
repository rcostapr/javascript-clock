var cd;
var ctx2;
var startPoint;
var endPoint;
var midPoint;

function init() {
  cd = document.getElementById("canvas2");
  cd.width = 500;
  cd.height = 500;

  ctx2 = cd.getContext("2d");
}

function draw() {
  startPoint = {
    x: 200,
    y: 200,
  };
  endPoint = {
    x: startPoint.x + 100,
    y: startPoint.y + 100,
  };

  ctx2.beginPath();
  ctx2.setLineDash([1, 2]);

  // rotate around center - find mid-point using lerp
  midPoint = {
    x: startPoint.x + (endPoint.x - startPoint.x) * 0.5,
    y: startPoint.y + (endPoint.y - startPoint.y) * 0.5,
  };

  // translate to midpoint
  ctx2.translate(midPoint.x, midPoint.y);

  // rotate some angle (radians)
  ctx2.rotate(0.25 * Math.PI); // = 45°

  // translate back
  ctx2.translate(-midPoint.x, -midPoint.y);

  // draw line
  ctx2.moveTo(startPoint.x, startPoint.y);
  ctx2.lineTo(endPoint.x, endPoint.y);
  ctx2.stroke();
  ctx2.closePath();

  // reset transforms
  ctx2.setTransform(1, 0, 0, 1, 0, 0);
}

init();
draw();

function buildClock(clockid) {
  let container = document.getElementById(clockid);
  let canvasid = clockid + "-canvas";
  let canvas = `<canvas id="${canvasid}" width="160" height="160"></canvas>`;
  container.innerHTML = canvas;

  centerPoint = {
    x: 80,
    y: 80,
  };
  endPoint = {
    x: centerPoint.x,
    y: centerPoint.y - 40,
  };

  numberPoint = {
    x: centerPoint.x,
    y: centerPoint.y - 56,
  };

  // rotate around center
  midPoint = {
    x: centerPoint.x + (endPoint.x - centerPoint.x) * 0.5,
    y: centerPoint.y + (endPoint.y - centerPoint.y) * 0.5,
  };

  let current = 0;
  let inc = 2 / 60; //clock second rotation

  let dataini = new Date("2020-12-17T21:59:45");

  var c = document.getElementById(canvasid);
  setInterval(function () {
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    // Border
    drawBorder(ctx);

    // Numbers
    drawNumbers(ctx);

    let sec = leadingZeros(dataini.getSeconds());
    let min = leadingZeros(dataini.getMinutes());
    let hour = leadingZeros(dataini.getHours());
    let str = `${hour}:${min}:${sec}`;
    document.getElementById("digital").innerHTML = str;

    // Seconds Pointer
    drawSeconds(ctx, sec * (2 / 60));

    // Minutes Pointer
    drawMinutes(ctx, (min * 2) / 60);

    // Hour Pointer
    let incHour = 2 / 12;
    let incMin = incHour * (min / 60);
    drawHour(ctx, hour * incHour + incMin);

    // center
    drawCenter(ctx);

    // Ticks
    drawTicks(ctx);
    drawBigTicks(ctx);

    current += inc;
    dataini.setTime(dataini.getTime() + 1000);
  }, 1000);
}

function drawHour(ctx, rotation) {
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.strokeStyle = "#fffddd";
  // translate to centerPoint
  ctx.translate(centerPoint.x, centerPoint.y);

  // rotate some angle (radians)
  ctx.rotate(rotation * Math.PI); // 0.25 = 45°
  // translate back
  ctx.translate(-centerPoint.x, -centerPoint.y);

  // draw line
  ctx.moveTo(centerPoint.x, centerPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y + 10);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();

  // reset transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawMinutes(ctx, rotation) {
  ctx.beginPath();
  ctx.lineCap = "round";
  ctx.strokeStyle = "#fffddd";
  // translate to centerPoint
  ctx.translate(centerPoint.x, centerPoint.y);

  // rotate some angle (radians)
  ctx.rotate(rotation * Math.PI); // 0.25 = 45°
  // translate back
  ctx.translate(-centerPoint.x, -centerPoint.y);

  // draw line
  ctx.moveTo(centerPoint.x, centerPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y + 5);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();

  // reset transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawSeconds(ctx, rotation) {
  ctx.beginPath();
  ctx.lineCap = "round";
  // translate to centerPoint
  ctx.translate(centerPoint.x, centerPoint.y);

  // rotate some angle (radians)
  ctx.rotate(rotation * Math.PI); // 0.25 = 45°
  // translate back
  ctx.translate(-centerPoint.x, -centerPoint.y);

  // draw line
  ctx.moveTo(centerPoint.x, centerPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.closePath();

  // reset transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawBorder(ctx) {
  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, 70, 0, 2 * Math.PI);
  ctx.arc(centerPoint.x, centerPoint.y, 67, 0, 2 * Math.PI);
  ctx.strokeStyle = "#F5EEF8";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.closePath();
  // reset transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawNumbers(ctx) {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "white";
  ctx.font = "12px Arial";

  let inc = 2 / 12;
  let rotation = inc * 0;

  for (let hour = 1; hour < 13; hour++) {
    rotation = inc * hour;
    ctx.beginPath();

    // translate to centerpoint
    ctx.translate(centerPoint.x - 4, centerPoint.y + 4);

    // rotate some angle (radians)
    ctx.rotate(rotation * Math.PI);

    // translate back
    ctx.translate(-centerPoint.x, -centerPoint.y);

    ctx.translate(numberPoint.x, numberPoint.y);
    ctx.rotate(-rotation * Math.PI);
    ctx.translate(-numberPoint.x, -numberPoint.y);

    ctx.strokeText(hour, numberPoint.x, numberPoint.y);

    // close path
    ctx.closePath();

    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

function drawTicks(ctx) {
  let inc = 2 / 60;
  let rotation = inc * 0;

  for (let tick = 1; tick < 61; tick++) {
    rotation = inc * tick;
    ctx.beginPath();
    ctx.strokeStyle = "#fffddd";
    // translate to centerpoint
    ctx.translate(centerPoint.x, centerPoint.y);

    // rotate some angle (radians)
    ctx.rotate(rotation * Math.PI);

    // translate back
    ctx.translate(-centerPoint.x, -centerPoint.y);

    // draw line
    ctx.moveTo(endPoint.x, endPoint.y - 25);
    ctx.lineTo(endPoint.x, endPoint.y - 30);
    ctx.lineWidth = 1;
    ctx.stroke();

    // close path
    ctx.closePath();

    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

function drawBigTicks(ctx) {
  let inc = 2 / 12;
  let rotation = inc * 0;

  for (let tick = 1; tick < 61; tick++) {
    rotation = inc * tick;
    ctx.beginPath();
    ctx.strokeStyle = "#fffddd";
    // translate to centerpoint
    ctx.translate(centerPoint.x, centerPoint.y);

    // rotate some angle (radians)
    ctx.rotate(rotation * Math.PI);

    // translate back
    ctx.translate(-centerPoint.x, -centerPoint.y);

    // draw line
    ctx.moveTo(endPoint.x, endPoint.y - 25);
    ctx.lineTo(endPoint.x, endPoint.y - 30);
    ctx.lineWidth = 3;
    ctx.stroke();

    // close path
    ctx.closePath();

    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

function drawCenter(ctx) {
  ctx.beginPath();
  ctx.arc(centerPoint.x, centerPoint.y, 2, 0, 2 * Math.PI);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.closePath();
  // reset transforms
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
function leadingZeros(val) {
  if (val < 10) {
    val = "0" + val;
  }
  return val;
}
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
