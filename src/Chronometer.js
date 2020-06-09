import React from 'react';

class Chronometer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_time: new Date()
    }

    this.startTimer = this.startTimer.bind(this);
    this.addZero = this.addZero.bind(this);
    this.intervalTimer = this.intervalTimer.bind(this);
  }

  intervalTimer() {
    this.setState({current_time: Date.now()});
  }

  startTimer() {
    setInterval(this.intervalTimer, 1000);
  }

  addZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  componentDidMount() {
    if (this.props.run) {
      this.startTimer();
    }
    else {
      clearInterval(this.intervalTimer);
    }
  }

  componentWillUnmount() {
    this.props.setChronometerTimer(this.intervalTimer);
  }

  render() {
    const diff = new Date(this.state.current_time - this.props.startedAt);
    const seconds = diff ? diff.getSeconds() : 0;
    const minutes = diff ? diff.getMinutes() : 0;
    const hours = parseInt(Math.abs(this.state.current_time - this.props.startedAt)/36e5);

    return (
      <section className="Chrono">
        <h4>
          {hours > 0 ? `${this.addZero(hours)}:` : ''}
          {this.addZero(minutes)}:
          {this.addZero(seconds)}
        </h4>
      </section>
    )
  }
}

export default Chronometer;