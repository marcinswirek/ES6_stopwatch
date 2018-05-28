"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StopWatch = function () {
  function StopWatch(display) {
    _classCallCheck(this, StopWatch);

    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
  }

  _createClass(StopWatch, [{
    key: "reset",
    value: function reset() {
      this.times = {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      };
    }
  }, {
    key: "pad0",
    value: function pad0(value) {
      var result = value.toString();
      var resultLength = result.length;
      if (resultLength < 2) {
        result = 0 + result;
      }
      return result;
    }
  }, {
    key: "print",
    value: function print() {
      this.display.innerText = this.format(this.times);
    }
  }, {
    key: "format",
    value: function format(times) {
      return this.pad0(times.minutes) + ":" + this.pad0(times.seconds) + ":" + this.pad0(Math.floor(times.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      if (!this.running) {
        this.running = true;
        this.watch = setInterval(function () {
          return _this.step();
        }, 10);
      }
    }
  }, {
    key: "step",
    value: function step() {
      if (!this.running) return;
      this.calculate();
      this.print();
    }
  }, {
    key: "calculate",
    value: function calculate() {
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
  }, {
    key: "results",
    value: function results(times) {
      var elementLi = document.createElement("li");
      var resultsEl = document.querySelector(".results");
      if (this.times.minutes !== 0 || this.times.seconds !== 0 || this.times.miliseconds !== 0) {
        elementLi.innerHTML = "" + this.format(this.times);
        resultsEl.appendChild(elementLi);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.running = false;
      clearInterval(this.watch);
      this.results(this.times);
      this.reset();
    }
  }, {
    key: "clearWatch",
    value: function clearWatch() {
      this.print();
    }
  }, {
    key: "clearResults",
    value: function clearResults() {
      var parentUl = document.querySelector(".results");
      while (parentUl.firstChild) {
        parentUl.removeChild(parentUl.firstChild);
      }
    }
  }]);

  return StopWatch;
}();

//create instance of stopWatch class

var stopWatch = new StopWatch(document.querySelector(".stopwatch"));

//Add event listeners

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function () {
  return stopWatch.stop();
});

var startButton = document.getElementById("start");
startButton.addEventListener("click", function () {
  return stopWatch.start();
});

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function () {
  return stopWatch.clearWatch();
});

var clearResultButton = document.getElementById("clear-results");
clearResultButton.addEventListener("click", function () {
  return stopWatch.clearResults();
});
