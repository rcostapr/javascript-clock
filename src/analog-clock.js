/**
 * Build Analog Clock
 * @param {string} clockid
 * @param {object} params
 */
function AnalogClock(clockid, params = null) {
    const self = this;
    var elementid = null;
    const _width = 320; // Base Build Size px

    var canvasSize = 320; // Component default width
    var dataini = new Date(); // Component Start Date - Default Current Time

    // Component Options
    var showDigital = false;
    var paramsDigital = null;
    var showTitle = false;

    // Handle Clock Container
    if (typeof clockid == "string") {
        // Set Module Element ID
        elementid = clockid;
    } else {
        console.log("NOT VALID clockid : " + typeof clockid);
        return;
    }
    // Object Container
    var container = document.getElementById(elementid);
    // Set Canvas ID
    var canvasid = elementid + "-canvas";

    // Handle Params
    if (params !== null && typeof params == "object") {
        // Setting Module Properties
        setParams(params);
        // Set Title
        if (params.title) {
            showTitle = true;
        }
    }

    // Html Canvas
    var canvashtml = `<div style="width:100%"><canvas id="${canvasid}" width="${canvasSize}" height="${canvasSize}"></canvas></div>`;
    container.innerHTML = canvashtml;
    container.style.backgroundColor = "transparent";
    container.style.width = "100%";

    if (showTitle === true) {
        ShowTitle(params.title);
    }

    // Clock Radius
    const clockRadius = _width * 0.5;

    // Canvas Html Element
    this.canvas = document.getElementById(canvasid);
    this.canvas.style.margin = "auto";
    this.canvas.style.backgroundColor = "rgb(76 0 0)";
    this.canvas.style.borderRadius = canvasSize * 0.5 + "px";
    this.canvas.style.display = "block";

    // Component Colors
    this.colors = {};
    this.colors.center = "rgb(225 12 12)";
    this.colors.secondPointer = "rgb(221 195 195)";
    this.colors.minutePointer = "#fffddd";
    this.colors.hourPointer = "#fffddd";
    this.colors.ticks = "white";
    this.colors.bigTicks = "white";
    this.colors.numbers = "white";
    this.colors.gradient = "rgb(200 0 0)";
    this.colors.borders = "rgb(76 0 0)";
    // Clock Font Style
    this.fontStyle = "24px Arial";

    // Center Point
    var centerPoint = {
        x: clockRadius,
        y: clockRadius,
    };
    // Pointers lenght
    var endPoint = {
        x: centerPoint.x,
        y: centerPoint.y - clockRadius * 0.72,
    };
    // Numbers Position
    var numberPoint = {
        x: centerPoint.x,
        y: centerPoint.y - clockRadius * 0.77,
    };

    // Loop at each second
    setInterval(build, 1000);

    /**
     * Build Clock
     * -----------
     */
    function build() {
        // Create Temp Context
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = _width;
        canvas.height = _width;

        // Draw Border
        drawBorder(ctx);

        // Draw Numbers
        drawNumbers(ctx);

        let sec = self.leadingZeros(dataini.getSeconds());
        let min = self.leadingZeros(dataini.getMinutes());
        let hour = self.leadingZeros(dataini.getHours());
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
        if (showDigital === true) {
            drawDigital(paramsDigital);
        }

        // Set current time
        dataini.setTime(dataini.getTime() + 1000);
    }

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
        ctx.moveTo(centerPoint.x, centerPoint.y + 20);
        ctx.lineTo(endPoint.x, endPoint.y * 2.3);
        ctx.lineWidth = 7;
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
        ctx.moveTo(centerPoint.x, centerPoint.y + 20);
        ctx.lineTo(endPoint.x, endPoint.y * 1.5);
        ctx.lineWidth = 5;
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
        ctx.moveTo(centerPoint.x, centerPoint.y + 20);
        ctx.lineTo(endPoint.x, endPoint.y * 1.2);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();

        // reset transforms
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    };

    /**
     * Draw Border and Background
     * -----------
     * @param {context} ctx
     */
    var drawBorder = function (ctx) {
        var gradient = ctx.createRadialGradient(
            centerPoint.x,
            centerPoint.y,
            clockRadius * 0.05,
            centerPoint.x,
            centerPoint.y,
            clockRadius
        );
        gradient.addColorStop(0, self.colors.gradient);
        //gradient.addColorStop(1, self.canvas.style.backgroundColor);
        gradient.addColorStop(1, self.colors.borders);

        ctx.beginPath();
        ctx.arc(
            centerPoint.x,
            centerPoint.y,
            clockRadius * 0.95,
            0,
            2 * Math.PI
        );

        ctx.arc(
            centerPoint.x,
            centerPoint.y,
            clockRadius * 0.93,
            0,
            2 * Math.PI
        );
        ctx.lineWidth = 3;
        ctx.strokeStyle = self.colors.borders;
        ctx.fillStyle = gradient;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.fill();
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
        ctx.fillStyle = self.colors.numbers;
        ctx.font = self.fontStyle;

        let inc = 2 / 12;
        let rotation = inc * 0;

        for (let hour = 1; hour < 13; hour++) {
            rotation = inc * hour;
            ctx.beginPath();

            // translate to centerpoint
            ctx.translate(centerPoint.x - 7, centerPoint.y + 9);

            // rotate some angle (radians)
            ctx.rotate(rotation * Math.PI);

            // translate back
            ctx.translate(-centerPoint.x, -centerPoint.y);

            ctx.translate(numberPoint.x, numberPoint.y);
            ctx.rotate(-rotation * Math.PI);
            ctx.translate(-numberPoint.x, -numberPoint.y);

            ctx.strokeText(hour, numberPoint.x, numberPoint.y);
            ctx.fillText(hour, numberPoint.x, numberPoint.y);

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
            ctx.moveTo(endPoint.x, endPoint.y - 26);
            ctx.lineTo(endPoint.x, endPoint.y - 32);
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
            ctx.lineTo(endPoint.x, endPoint.y - 32);
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
        let sec = self.leadingZeros(dataini.getSeconds());
        let min = self.leadingZeros(dataini.getMinutes());
        let hour = self.leadingZeros(dataini.getHours());
        let str = `${hour}:${min}:${sec}`;

        let digitalid = elementid + "-digital";
        let olddiv = document.getElementById(digitalid);
        if (olddiv !== null) {
            olddiv.parentNode.removeChild(olddiv);
        }

        let div = document.createElement("div");
        div.setAttribute("id", digitalid);
        container.append(div);

        let digital = document.getElementById(digitalid);
        digital.innerHTML = str;
        digital.style.width = "100%";
        digital.style.textAlign = "center";
        digital.style.marginTop = "5px";
        digital.style.font = "16px Arial";
    };

    /**
     * Show Title
     * -----------
     * @param {string} title
     */
    function ShowTitle(txtTitle) {
        let titleid = elementid + "-title";
        let olddiv = document.getElementById(titleid);
        if (olddiv !== null) {
            olddiv.parentNode.removeChild(olddiv);
        }

        let div = document.createElement("div");
        div.setAttribute("id", titleid);
        container.prepend(div);

        let title = document.getElementById(titleid);
        title.innerHTML = txtTitle;
        title.style.width = "100%";
        title.style.textAlign = "center";
        title.style.marginBottom = "5px";
        title.style.fontSize = "16px";
    }

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

    /**
     * Setting Properties
     * ------------------
     * @param {object} params Setting available properties
     */
    function setParams(params) {
        if (params.size) {
            canvasSize = params.size;
        }
        if (params.date) {
            dataini = new Date(params.date);
        }
        if (params.showDigital) {
            showDigital = params.showDigital;
        }
        if (params.gradient) {
            this.colors.gradient = params.gradient;
        }
    }
}

AnalogClock.prototype.borderStyle = function (style) {
    this.canvas.style.border = style;
};

AnalogClock.prototype.backgroundColor = function (color) {
    this.canvas.style.backgroundColor = color;
    this.colors.gradient = color;
};

AnalogClock.prototype.borderRadius = function (radius) {
    this.canvas.style.borderRadius = radius;
};

AnalogClock.prototype.centerColor = function (color) {
    this.colors.center = color;
};

AnalogClock.prototype.showDigital = function (params = null, show = true) {
    showDigital = show;
    paramsDigital = params;
};

AnalogClock.prototype.setTime = function (timestring) {
    dataini = new Date(timestring);
};

window.onload = function () {
    if (window.jQuery) {
        (function ($) {

            $.fn.extend({
                AnalogClock: function (options = {}) {
                    options = $.extend({}, $.AnalogClock.defaults, options);

                    this.each(function () {
                        new $.AnalogClock(this, options);
                    });
                    return this;
                }
            });

            // element is the jquery element, options is the set of defaults + user options
            $.AnalogClock = function (element, options) {
                new AnalogClock(element.id, options);
            };

            // option defaults
            $.AnalogClock.defaults = {
                size: 160
            };

        })(jQuery);
    }
};