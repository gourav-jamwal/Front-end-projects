class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Break: 5,
      Session: 25,
      Clock: "",
      OnOff: false,
      currentTimer: "Session"
    };

    this.DecrementBreak = this.DecrementBreak.bind(this);
    this.IncrementBreak = this.IncrementBreak.bind(this);

    this.DecrementSession = this.DecrementSession.bind(this);
    this.IncrementSession = this.IncrementSession.bind(this);

    this.PutOnAndOff = this.PutOnAndOff.bind(this);
    this.reset = this.reset.bind(this);
    this.convertToTime = this.convertToTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  convertToTime = (count) => {
    let minutes = Math.floor(count / 60);
    let seconds = count % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  };
  PutOnAndOff() {
    if (this.state.OnOff == false) {
      this.setState((state) => ({
        OnOff: true
      }));
    } else {
      this.setState((state) => ({
        OnOff: false
      }));
    }
  }

  reset() {
    this.setState({
      Break: 5,
      Session: 25,
      Clock: "",
      OnOff: false,
      currentTimer: "Session"
    });
  }

  DecrementBreak() {
    if (this.state.Break > 1) {
      this.setState((state) => ({
        Break: (state.Break -= 1)
      }));
    } else {
    }
  }
  IncrementBreak() {
    if (this.state.Break < 60) {
      this.setState((state) => ({
        Break: (state.Break += 1)
      }));
    } else {
    }
  }

  DecrementSession() {
    if (this.state.Session > 1 && this.state.Clock == "") {
      this.setState((state) => ({
        Session: (state.Session -= 1)
      }));
    } else if (this.state.Session > 1 && this.state.Clock != "") {
      this.setState((state) => ({
        Session: (state.Session -= 1),
        Clock: (state.Clock -= 60)
      }));
    }
  }
  IncrementSession() {
    if (this.state.Session < 60 && this.state.Clock == "") {
      this.setState((state) => ({
        Session: (state.Session += 1)
      }));
    } else if (this.state.Session < 60 && this.state.Clock != "") {
      this.setState((state) => ({
        Session: (state.Session += 1),
        Clock: (state.Clock += 60)
      }));
    }
  }
  startTimer() {
    if (this.state.OnOff && this.state.Clock > 0) {
      this.Clock = setInterval(this.countDown, 1000);
    }
  }
  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.Clock - 1;
    this.setState({
      Clock: seconds
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.Clock);
      this.setState({
        currentTimer: "Break"
      });
    }
  }

  render() {
    this.state.Clock === ""
      ? (this.state.Clock = this.state.Session * 60)
      : this.state.Clock;

    return (
      <div id="Layer">
        <div id="text">
          <h1 id="break-label">Break Length</h1>
          <div id="breakB">
            <button
              class="breakButton"
              id="break-increment"
              onClick={this.IncrementBreak}
            >
              <div id="buttonText">
                <i class="	fas fa-arrow-up"></i> Increment
              </div>
            </button>

            <h1 class="NumberText" id="break-length">
              {this.state.Break}
            </h1>

            <button
              class="breakButton"
              id="break-decrement"
              onClick={this.DecrementBreak}
            >
              <div id="buttonText">
                Decrement <i class="	fas fa-arrow-down"></i>
              </div>
            </button>
          </div>

          <h1 id="session-label">Session Length</h1>
          <div id="sessionB">
            <button
              class="sessionButton"
              id="session-increment"
              onClick={this.IncrementSession}
            >
              <i class="	fas fa-arrow-up"></i> Increment
            </button>

            <h1 class="NumberText" id="session-length">
              {this.state.Session}
            </h1>

            <button
              class="sessionButton"
              id="session-decrement"
              onClick={this.DecrementSession}
            >
              Decrement
              <i class="	fas fa-arrow-down"></i>
            </button>
          </div>
        </div>
        <h1 id="timer-label">{this.state.currentTimer}</h1>
        <div id="container">
          <div id="timer-border"></div>
          <h1 id="time-left">{this.convertToTime(this.state.Clock)}</h1>
        </div>
        <button id="start_stop" onClick={this.PutOnAndOff}>
          {this.state.OnOff == false ? (
            <i id="OnOffT" class="fas fa-play"></i>
          ) : (
            <i id="OnOffT" class="fas fa-pause"></i>
          )}
        </button>
        <button id="reset" onClick={this.reset}>
          <i class="fas fa-redo"></i>
        </button>
      </div>
    );
  }
}
let node = document.getElementById("root");
ReactDOM.render(<Clock />, node);
