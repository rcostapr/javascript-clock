# Javascript Analog Clock
![Analog Clock](https://github.com/rcostapr/javascript-clock/blob/master/img/Clock_Component_1.png?raw=true)

## Download

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/rcostapr/javascript-clock)

<a id="raw-url" href="https://github.com/rcostapr/javascript-clock/releases/download/javascript-jquery-analog-clock/analog-clock.min.js">Download Latest</a>

The MIT License [![DOWNLOAD: Latest](https://img.shields.io/badge/License-MIT-yellow.svg)]()

## 🔧 Install
```
npm i @rcostapr/analog-clock
```
## 💡 Javascript Usage
HTML
```html
<div id="clock4"></div>
<script src="analog-clock.min.js"></script>
```
SCRIPT - Show Clock with current time and default settings
``` javascript
AnalogClock("clock4");
```
OR show clock with custom time settings and custom time
``` javascript
const clock = new AnalogClock("clock");
  clock.setTime("2021-10-04T14:14:20.130Z");
  clock.borderStyle("1px solid rgb(1, 126, 59)");
  clock.backgroundColor("rgb(99 167 114)");
  clock.centerColor("red");
  clock.colors.secondPointer = "rgb(34, 116, 71)";
  clock.colors.hourPointer = "rgb(34, 116, 71)";
  clock.colors.minutePointer = "rgb(34, 116, 71)";
  clock.colors.numbers = "rgb(188, 232, 208)";
  clock.colors.borders = "rgb(1, 126, 59)";
  clock.colors.ticks = "rgb(188, 232, 208)";
  clock.colors.bigTicks = "rgb(188, 232, 208)";
```
OR show clock with +1 hour with title and digital clock
```javascript
var dt = new Date();
  dt.setHours(dt.getHours() + 1);
  const clock2 = new AnalogClock("clock2",
    {
      size: 160,
      title: "Spain",
      showDigital: true,
      date: dt.toISOString(),
    }
  );
```
## 💡 jQuery Usage
```javascript
$("#clock3").AnalogClock({ "title": "jQuery Element" });
```
## ⚖️ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
