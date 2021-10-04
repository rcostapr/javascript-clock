/**
 *
 * @param {string} clockid
 */
function BuildClock(elementid) {
  const self = this;
  this.clockid = elementid;
  this.container = document.getElementById(elementid);
  var container = this.container;
  var canvasid = elementid + "-canvas";
  // Component width
  this.width = 320;
  this.clockRadius = this.width * 0.5;

  this.canvasSize = 200;

  let canvashtml = `<canvas id="${canvasid}" width="${this.canvasSize}" height="${this.canvasSize}"></canvas>`;
  container.innerHTML = canvashtml;
  container.style.backgroundColor = "transparent";
  container.style.width = "100%";

  this.canvas = document.getElementById(canvasid);
  this.canvas.style.margin = "auto";
  this.canvas.style.backgroundColor = "rgb(76 0 0)";
  this.canvas.style.borderRadius = this.canvasSize * 0.5 + "px";
  this.canvas.style.display = "block";

  this.colors = {};
  this.colors.center = "rgb(225 12 12)";
  this.colors.secondPointer = "rgb(221 195 195)";
  this.colors.minutePointer = "#fffddd";
  this.colors.hourPointer = "#fffddd";
  this.colors.ticks = "white";
  this.colors.bigTicks = "white";
  this.colors.numbers = "white";
  this.colors.borders = "#F5EEF8";

  this.fontStyle = "16px Arial";

  this.drawDigital = false;
  this.paramsDigital = null;

  this.dataini = new Date();

  // Center Point
  var centerPoint = {
    x: this.clockRadius,
    y: this.clockRadius,
  };
  // Pointers lenght
  var endPoint = {
    x: centerPoint.x,
    y: centerPoint.y - this.clockRadius * 0.72,
  };

  // Numbers Position
  var numberPoint = {
    x: centerPoint.x,
    y: centerPoint.y - this.clockRadius * 0.78,
  };

  // Middle Point
  var midPoint = {
    x: centerPoint.x + (endPoint.x - centerPoint.x) * 0.5,
    y: centerPoint.y + (endPoint.y - centerPoint.y) * 0.5,
  };

  setInterval(function () {
    // Get Context
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = self.width;
    canvas.height = self.width;

    // Draw Border
    drawBorder(ctx);

    // Draw Numbers
    drawNumbers(ctx);

    let sec = self.leadingZeros(self.dataini.getSeconds());
    let min = self.leadingZeros(self.dataini.getMinutes());
    let hour = self.leadingZeros(self.dataini.getHours());
    // Hour Pointer
    let incHour = 2 / 12;
    let incMin = incHour * (min / 60);
    drawHour(ctx, hour * incHour + incMin);

    // Draw Minutes Pointer
    drawMinutes(ctx, (min * 2) / 60);

    // Draw Seconds Pointer
    drawSeconds(ctx, sec * (2 / 60));

    // Draw Center
    drawCenter(ctx);

    // Draw Ticks
    drawTicks(ctx);
    drawBigTicks(ctx);

    // Get Main Context
    var mctx = self.canvas.getContext("2d");
    // Clear canvas
    mctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
    // Draw  Clock
    mctx.drawImage(
      canvas,
      0,
      0,
      canvas.width,
      canvas.height,
      0,
      0,
      self.canvas.width,
      self.canvas.height
    );

    // Draw Digital
    if (self.drawDigital === true) {
      drawDigital(self.paramsDigital);
    }

    // Set current time
    self.dataini.setTime(self.dataini.getTime() + 1000);
  }, 1000);

  /**
   * Draw Hour Pointersolid 5px rgb(169, 149, 5)
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawHour = function (ctx, rotation) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = self.colors.hourPointer;
    // translate to centerPoint
    ctx.translate(centerPoint.x, centerPoint.y);

    // rotate some angle (radians)
    ctx.rotate(rotation * Math.PI); // 0.25 = 45°
    // translate back
    ctx.translate(-centerPoint.x, -centerPoint.y);

    // draw line
    ctx.moveTo(centerPoint.x, centerPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y * 2.3);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  /**
   * Draw Minute Pointer
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawMinutes = function (ctx, rotation) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = self.colors.minutePointer;
    // translate to centerPoint
    ctx.translate(centerPoint.x, centerPoint.y);

    // rotate some angle (radians)
    ctx.rotate(rotation * Math.PI); // 0.25 = 45°
    // translate back
    ctx.translate(-centerPoint.x, -centerPoint.y);

    // draw line
    ctx.moveTo(centerPoint.x, centerPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y * 1.5);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  /**
   * Draw Seconds Pointer
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawSeconds = function (ctx, rotation) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = self.colors.secondPointer;
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
  };

  /**
   * Draw Border
   * -----------
   * @param {context} ctx
   */
  var drawBorder = function (ctx) {
    ctx.beginPath();
    ctx.arc(
      centerPoint.x,
      centerPoint.y,
      self.clockRadius * 0.95,
      0,
      2 * Math.PI
    );
    ctx.arc(
      centerPoint.x,
      centerPoint.y,
      self.clockRadius * 0.93,
      0,
      2 * Math.PI
    );
    ctx.strokeStyle = self.colors.borders;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  /**
   * Draw Numbers
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawNumbers = function (ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = self.colors.numbers;
    ctx.font = self.fontStyle;

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
  };

  /**
   * Draw Ticks
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawTicks = function (ctx) {
    let inc = 2 / 60;
    let rotation = inc * 0;

    for (let tick = 1; tick < 61; tick++) {
      rotation = inc * tick;
      ctx.beginPath();
      ctx.strokeStyle = self.colors.ticks;
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
  };

  /**
   * Draw Big Ticks
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawBigTicks = function (ctx) {
    let inc = 2 / 12;
    let rotation = inc * 0;

    for (let tick = 1; tick < 61; tick++) {
      rotation = inc * tick;
      ctx.beginPath();
      ctx.strokeStyle = self.colors.bigTicks;
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
  };

  /**
   * Draw Center
   * -----------
   * @param {context} ctx
   * @param {float} rotation
   */
  var drawCenter = function (ctx) {
    ctx.beginPath();
    ctx.arc(centerPoint.x, centerPoint.y, 2, 0, 2 * Math.PI);
    ctx.strokeStyle = self.colors.center;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };

  /**
   * Draw Digital
   * -----------
   * @param {params} object
   */
  var drawDigital = function (params = null) {
    let sec = self.leadingZeros(self.dataini.getSeconds());
    let min = self.leadingZeros(self.dataini.getMinutes());
    let hour = self.leadingZeros(self.dataini.getHours());
    let str = `${hour}:${min}:${sec}`;

    let digitalid = self.clockid + "-digital";
    let olddiv = document.getElementById(digitalid);
    if (olddiv !== null) {
      olddiv.parentNode.removeChild(olddiv);
    }

    let div = document.createElement("div");
    div.setAttribute("id", digitalid);
    self.container.append(div);

    let digital = document.getElementById(digitalid);
    digital.innerHTML = str;
    digital.style.width = "100%";
    digital.style.textAlign = "center";
    digital.style.marginTop = "10px";
    digital.style.font = "16px Arial";
  };

  /**
   * Leading Zeros
   * -------------
   * @param {int} val Value to return
   * @returns string representing a number with 2 or more digits
   */
  this.leadingZeros = function (val) {
    if (val < 10) {
      val = "0" + val;
    }
    return val;
  };
}

BuildClock.prototype.borderStyle = function (style) {
  this.canvas.style.border = style;
};

BuildClock.prototype.backgroundColor = function (color) {
  this.canvas.style.backgroundColor = color;
};

BuildClock.prototype.borderRadius = function (radius) {
  this.canvas.style.borderRadius = radius;
};

BuildClock.prototype.centerColor = function (color) {
  this.colors.center = color;
};

BuildClock.prototype.showDigital = function (params = null) {
  this.drawDigital = true;
  this.paramsDigital = params;
};

BuildClock.prototype.setTime = function (timestring) {
  this.dataini = new Date(timestring);
};

BuildClock.prototype.setSize = function (size) {
  this.canvasSize = size;
};
