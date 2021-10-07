# Javascript Analog Clock
![Analog Clock](https://github.com/rcostapr/javascript-clock/blob/master/img/Clock_Component_1.png?raw=true)

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Downloads](https://img.shields.io/github/downloads/rcostapr/javascript-clock/total.svg)
![Stars](https://img.shields.io/github/stars/rcostapr/javascript-clock.svg)
![Watchers](https://img.shields.io/github/watchers/rcostapr/javascript-clock.svg)
## Download

[![Analog Clock](https://github.com/rcostapr/javascript-clock/blob/master/img/release.png?raw=true)](https://github.com/rcostapr/javascript-clock/releases/latest)

 	
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
SCRIPT PAGE - Show Clock with current time and default settings
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

## 💡 React Component
```javascript
import AnalogClock from '@rcostapr/analog-clock';
....
<AnalogClock id="clock" />
```

### Example index.js
```javascript
import React from 'react';
import ReactDom from 'react-dom';
import AnalogClock from '@rcostapr/analog-clock';

class App extends React.Component {
  render() {
    const colors = {
      center: "red",
      background: "rgb(99 167 114)",
      secondPointer: "rgb(34, 116, 71)",
      hourPointer: "rgb(34, 116, 71)",
      minutePointer: "rgb(34, 116, 71)",
      numbers: "rgb(188, 232, 208)",
      borders: "rgb(1, 126, 59)",
      ticks: "rgb(188, 232, 208)",
      bigTicks: "rgb(188, 232, 208)",
      borderStyle: "1px solid rgb(1, 126, 59)",
      fontStyle: "24px Arial",
    };

    var dt = new Date();
    dt.setHours(dt.getHours() + 1);
    const params = {
      size: 200,
      title: "Analog Clock",
      showDigital: true,
      date: dt.toISOString(),
    };

     return (
      <div>
        <h1 className="text-center">React Component Analog Clock</h1>
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <AnalogClock id="clock" colors={colors} params={params} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
```
## ⚖️ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
