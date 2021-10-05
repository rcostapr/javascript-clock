document.addEventListener("DOMContentLoaded", function (event) {
  const clock = new BuildClock(
    {
      clockid: "clock",
      size: 160,
      title: "Portugal",
      showDigital: true,
      //date: "2021-10-04T14:14:20.130Z",
    }
  );
  var dt = new Date();
  dt.setHours(dt.getHours() + 1);
  const clock2 = new BuildClock(
    {
      clockid: "clock2",
      size: 160,
      title: "Espanha",
      showDigital: true,
      date: dt.toISOString(),
    }
  );
  var dt = new Date();
  dt.setHours(dt.getHours() - 1);
  const clock3 = new BuildClock(
    {
      clockid: "clock3",
      size: 160,
      title: "Açores",
      showDigital: true,
      date: dt.toISOString(),
    }
  );
  //const clock = new BuildClock("clock");
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
});
