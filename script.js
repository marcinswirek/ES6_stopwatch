class StopWatch {
  constructor(display) {
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  reset() {
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }

  pad0(value) {
    let result = value.toString();
    const resultLength = result.length;
    if (resultLength < 2) {
      result = 0 + result;
    }
    return result;
  }

  print() {
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(
      Math.floor(times.miliseconds)
    )}`;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.watch = setInterval(() => this.step(), 10);
    }
  }

  step() {
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;

    if (this.times.miliseconds >= 100) {
      this.times.seconds += 1;
      this.times.miliseconds = 0;
    }

    if (this.times.seconds >= 60) {
      this.times.minutes += 1;
      this.times.seconds = 0;
    }
  }

  results(times) {
    let elementLi = document.createElement("li");
    let resultsEl = document.querySelector(".results");
    if (
      this.times.minutes !== 0 ||
      this.times.seconds !== 0 ||
      this.times.miliseconds !== 0
    ) {
      elementLi.innerHTML = `${this.format(this.times)}`;
      resultsEl.appendChild(elementLi);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.watch);
    this.results(this.times);
    this.reset();
  }

  clearWatch() {
    this.print();
  }

  clearResults() {
    const parentUl = document.querySelector(".results");
    while (parentUl.firstChild) {
      parentUl.removeChild(parentUl.firstChild);
    }
  }
}

//create instance of stopWatch class

const stopWatch = new StopWatch(document.querySelector(".stopwatch"));

//Add event listeners

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => stopWatch.stop());

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => stopWatch.start());

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", () => stopWatch.clearWatch());

let clearResultButton = document.getElementById("clear-results");
clearResultButton.addEventListener("click", () => stopWatch.clearResults());
