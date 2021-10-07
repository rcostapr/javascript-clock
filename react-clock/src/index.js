import React from 'react';
import ReactDom from 'react-dom';
import AnalogClock from './AnalogClock';

class App extends React.Component {
  render() {

    const params = {
      title: "England",
      showDigital: true,
    };

    const colors2 = {
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

    var dt2 = new Date();
    dt2.setHours(dt2.getHours() + 1);
    const params2 = {
      size: 160,
      title: "Spain",
      showDigital: true,
      date: dt2.toISOString(),
    };


    const colors3 = {
      center: "red",
      background: "rgb(1, 76, 126)",
      secondPointer: "rgb(32, 135, 204)",
      hourPointer: "rgb(32, 135, 204)",
      minutePointer: "rgb(32, 135, 204)",
      numbers: "rgb(188, 232, 208)",
      borders: "rgb(32, 135, 204)",
      ticks: "rgb(188, 232, 208)",
      bigTicks: "rgb(188, 232, 208)",
      borderStyle: "1px solid rgb(32, 135, 204)",
      fontStyle: "24px Arial",
    };

    var dt3 = new Date();
    dt3.setHours(dt3.getHours() - 1);
    const params3 = {
      size: 160,
      title: "Azores",
      showDigital: true,
      date: dt3.toISOString(),
    };


    const colors4 = {
      center: "red",
      background: "rgb(204, 155, 32)",
      secondPointer: "rgb(237, 214, 156)",
      hourPointer: "rgb(237, 214, 156)",
      minutePointer: "rgb(237, 214, 156)",
      numbers: "rgb(248, 225, 166)",
      borders: "rgb(145, 117, 46)",
      ticks: "rgb(218, 175, 68)",
      bigTicks: "rgb(218, 175, 68)",
      borderStyle: "1px solid rgb(204, 155, 32)",
    };

    var dt4 = new Date();
    dt4.setHours(dt4.getHours() + 2);
    dt4.setMinutes(dt4.getMinutes() + 30);
    const params4 = {
      size: 160,
      title: "Russia",
      showDigital: true,
      date: dt4.toISOString(),
    };

    const params5 = {
      title: "React Component",
    };


    return (
      <div>
        <h1 className="text-center">React Component Analog Clock</h1>
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <AnalogClock id="clock" params={params} />
          </div>
          <div className="col-sm-4 col-md-2">
            <AnalogClock id="clock2" colors={colors2} params={params2} />
          </div>
          <div className="col-sm-4 col-md-2">
            <AnalogClock id="clock3" colors={colors3} params={params3} />
          </div>
          <div className="col-sm-4 col-md-2">
            <AnalogClock id="clock4" colors={colors4} params={params4} />
          </div>
          <div className="col-sm-4 col-md-2">
            <AnalogClock id="clock5" params={params5} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));