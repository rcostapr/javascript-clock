import React, { useRef, useEffect } from 'react';

const Canvas = props => {

    const canvasRef = useRef(null);
    const _width = 320; // Base Build Size px

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        var dataini = new Date();// Component Start Date - Default Current Time
        var canvasSize = 160; // Component default width

        // Canvas Setting
        const canvas = canvasRef.current;
        canvas.style.margin = "auto";
        canvas.style.backgroundColor = "rgb(76 0 0)";
        canvas.style.borderRadius = _width * 0.5 + "px";
        canvas.style.display = "block";

        if (props.colors) {
            if (props.colors.background) {
                canvas.style.backgroundColor = props.colors.background;
            }
        }

        if (props.params) {

            if (props.params.date) {
                dataini = new Date(props.params.date);
            }

            if (props.params.size) {
                canvasSize = props.params.size;
            }
        }

        canvas.width = canvasSize;
        canvas.height = canvasSize;


        // Build Clock
        const interval = setInterval(() => {
            // Create Temp Context
            var tmpcanvas = document.createElement("canvas");
            var mctx = tmpcanvas.getContext("2d");
            tmpcanvas.width = _width;
            tmpcanvas.height = _width;

            // Build Canvas
            build(props, _width, dataini, mctx);

            // Get Main Context
            var ctx = canvas.getContext("2d");
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Update Main Context
            ctx.drawImage(
                tmpcanvas,
                0,
                0,
                tmpcanvas.width,
                tmpcanvas.height,
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Set current time
            dataini.setTime(dataini.getTime() + 1000);
            //
        }, 1000);

        // Implement componentWillUnmount,
        // return a function from here, and React will call
        // it prior to unmounting.
        return () => clearInterval(interval);
    }, [props]);

    // lifecycle
    return <canvas ref={canvasRef} {...props} />;
};

const build = (props, _width, dataini, ctx) => {

    // Clock Radius
    const clockRadius = _width * 0.5;
    // Center Point
    const centerPoint = {
        x: clockRadius,
        y: clockRadius,
    };
    // Pointers lenght
    const endPoint = {
        x: centerPoint.x,
        y: centerPoint.y - clockRadius * 0.72,
    };
    // Numbers Position
    const numberPoint = {
        x: centerPoint.x,
        y: centerPoint.y - clockRadius * 0.77,
    };

    // Component Colors
    var colors = {};
    colors.center = "rgb(225 12 12)";
    colors.secondPointer = "rgb(221 195 195)";
    colors.minutePointer = "#fffddd";
    colors.hourPointer = "#fffddd";
    colors.ticks = "white";
    colors.bigTicks = "white";
    colors.numbers = "white";
    colors.gradient = "rgb(200 0 0)";
    colors.borders = "rgb(76 0 0)";
    // Clock Font Style
    colors.fontStyle = "24px Arial";

    if (props.colors) {
        colors = props.colors;
        if (!colors.gradient) {
            colors.gradient = colors.background;
        }
        if (!colors.fontStyle) {
            colors.fontStyle = "24px Arial";
        }
    }

    // Draw Border
    drawBorder(colors, centerPoint, clockRadius, ctx);

    // Draw Numbers
    drawNumbers(colors, centerPoint, numberPoint, ctx);

    // Draw Ticks
    drawTicks(colors, centerPoint, endPoint, ctx);
    drawBigTicks(colors, centerPoint, endPoint, ctx);

    let sec = dataini.getSeconds();
    let min = dataini.getMinutes();
    let hour = dataini.getHours();

    // Hour Pointer
    let incHour = 2 / 12;
    let incMin = incHour * (min / 60);
    drawHour(colors, centerPoint, endPoint, ctx, hour * incHour + incMin);

    // Draw Minutes Pointer
    drawMinutes(colors, centerPoint, endPoint, ctx, (min * 2) / 60);

    // Draw Seconds Pointer
    drawSeconds(colors, centerPoint, endPoint, ctx, sec * (2 / 60));

    // Draw Center
    drawCenter(colors, centerPoint, ctx);
};


/**
 * Draw Hour Pointer
 * -----------
 * @param {context} ctx
 * @param {float} rotation
 */
var drawHour = function (colors, centerPoint, endPoint, ctx, rotation) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = colors.hourPointer;
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
var drawMinutes = function (colors, centerPoint, endPoint, ctx, rotation) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = colors.minutePointer;
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
var drawSeconds = function (colors, centerPoint, endPoint, ctx, rotation) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.strokeStyle = colors.secondPointer;
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
var drawBorder = function (colors, centerPoint, clockRadius, ctx) {
    var gradient = ctx.createRadialGradient(
        centerPoint.x,
        centerPoint.y,
        clockRadius * 0.05,
        centerPoint.x,
        centerPoint.y,
        clockRadius
    );
    gradient.addColorStop(0, colors.gradient);
    gradient.addColorStop(1, colors.borders);

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
    ctx.strokeStyle = colors.borders;
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
var drawNumbers = function (colors, centerPoint, numberPoint, ctx) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.numbers;
    ctx.fillStyle = colors.numbers;
    ctx.font = colors.fontStyle;

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
var drawTicks = function (colors, centerPoint, endPoint, ctx) {
    let inc = 2 / 60;
    let rotation = inc * 0;

    for (let tick = 1; tick < 61; tick++) {
        rotation = inc * tick;
        ctx.beginPath();
        ctx.strokeStyle = colors.ticks;
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
var drawBigTicks = function (colors, centerPoint, endPoint, ctx) {
    let inc = 2 / 12;
    let rotation = inc * 0;

    for (let tick = 1; tick < 61; tick++) {
        rotation = inc * tick;
        ctx.beginPath();
        ctx.strokeStyle = colors.bigTicks;
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
var drawCenter = function (colors, centerPoint, ctx) {
    ctx.beginPath();
    ctx.arc(centerPoint.x, centerPoint.y, 2, 0, 2 * Math.PI);
    ctx.strokeStyle = colors.center;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
    // reset transforms
    ctx.setTransform(1, 0, 0, 1, 0, 0);
};
export default Canvas;