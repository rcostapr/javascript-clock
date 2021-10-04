document.addEventListener("DOMContentLoaded", function (event) {
  const clock = new BuildClock("clock");
  clock.setSize(500);
  clock.showDigital();
  //clock.setTime("2020-12-17T21:59:45");
  clock.borderStyle("1px solid rgb(74 50 50)");
  clock.backgroundColor("rgb(99 167 114)");
  clock.borderRadius("100px");
  clock.centerColor("blue");
  clock.colors.secondPointer = "blue";
});
