document.addEventListener("DOMContentLoaded", function (event) {
  const clock = new AnalogClock("clock",
    {
      size: 160,
      title: "England",
      showDigital: true,
      //date: "2021-10-04T14:14:20.130Z",
    }
  );
  //const clock = new AnalogClock("clock");
  //clock.showDigital();
  //clock.setTime("2020-12-17T21:59:45");

  clock.borderStyle("1px solid rgb(1, 126, 59)");
  clock.backgroundColor("rgb(99 167 114)");
  //clock.borderRadius("100px");
  clock.centerColor("red");
  clock.colors.secondPointer = "rgb(34, 116, 71)";
  clock.colors.hourPointer = "rgb(34, 116, 71)";
  clock.colors.minutePointer = "rgb(34, 116, 71)";
  clock.colors.numbers = "rgb(188, 232, 208)";
  clock.colors.borders = "rgb(1, 126, 59)";
  clock.colors.ticks = "rgb(188, 232, 208)";
  clock.colors.bigTicks = "rgb(188, 232, 208)";


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
  var dt = new Date();
  dt.setHours(dt.getHours() - 1);
  const clock3 = new AnalogClock("clock3",
    {
      size: 160,
      title: "Azores",
      showDigital: true,
      date: dt.toISOString(),
    }
  );

  clock3.borderStyle("1px solid rgb(32, 135, 204)");
  clock3.backgroundColor("rgb(1, 76, 126)");
  clock3.centerColor("red");
  clock3.colors.secondPointer = "rgb(32, 135, 204)";
  clock3.colors.hourPointer = "rgb(32, 135, 204)";
  clock3.colors.minutePointer = "rgb(32, 135, 204)";
  clock3.colors.numbers = "rgb(188, 232, 208)";
  clock3.colors.borders = "rgb(32, 135, 204)";
  clock3.colors.ticks = "rgb(188, 232, 208)";
  clock3.colors.bigTicks = "rgb(188, 232, 208)";

  var dt = new Date();
  dt.setHours(dt.getHours() + 2.5);
  const clock4 = new AnalogClock("clock4",
    {
      size: 160,
      title: "Russia",
      showDigital: true,
      date: dt.toISOString(),
    }
  );
  clock4.borderStyle("1px solid rgb(204, 155, 32)");
  clock4.backgroundColor("rgb(204, 155, 32)");
  clock4.centerColor("red");
  clock4.colors.secondPointer = "rgb(237, 214, 156)";
  clock4.colors.hourPointer = "rgb(237, 214, 156)";
  clock4.colors.minutePointer = "rgb(237, 214, 156)";
  clock4.colors.numbers = "rgb(248, 225, 166)";
  clock4.colors.borders = "rgb(145, 117, 46)";
  clock4.colors.ticks = "rgb(218, 175, 68)";
  clock4.colors.bigTicks = "rgb(218, 175, 68)";
});
