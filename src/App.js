import React, { Component } from "react";
import Input from "./components/input";
import RandText from "./components/randText";
import axios from "axios";
import Button from "./components/button";
import Status from "./components/status";
import Timer from "./components/timer";

class App extends Component {
  state = {
    randText: [],
    renderCorrect: [],
    untouched: [],
    renderWrong: [],
    text: "",
    current: 0,
    wrong: 0,
    isInputDisabled: true,
    isButtonDisabled: false,
    gameStatus: {},
    startTime: 0,
    time: 0,
    timeoutId: null,
    gameTimerId: null,
    isGameOver: false
  };

  handleChange = event => {
    const text = event.target.value;
    const isValidText = !!text;
    this.setState({ text: isValidText ? text.trim() : "" });
  };

  isValidChar = (input, current) => input === current;

  fetchData = async () => {
    try {
      this.setState({ untouched: "Loading, Please wait..".split("") });
      const { data } = await axios.get("http://www.randomtext.me/api/");
      const randTextData = this.cleanMarkup(data.text_out);
      const randText = randTextData.split("");
      this.setState({ randText, untouched: randText });
    } catch (error) {
      const networkError = "Could not fetch data. Please try again.".split("");
      this.setState({
        untouched: networkError,
        gameStatus: { currentStatus: "Network Error. Please Reload" }
      });
    }
  };

  cleanMarkup = markup => {
    let cMarkup = markup.replace(/<[^>]*>?/gm, "");
    cMarkup = cMarkup.replace(/(\r\n|\n|\r)/gm, "");
    return cMarkup;
  };

  handleKeyDown = e => {
    const keyCode = e.keyCode;
    const key = e.key;
    const {
      renderCorrect,
      untouched,
      renderWrong,
      current,
      wrong,
      randText,
      text,
      startTime,
      gameTimerId
    } = this.state;
    if (current === randText.length - 1) {
      let diff = Math.abs(new Date(Date.now()) - new Date(startTime));
      const total = diff / 1000 / 60;
      let totalTime;
      if (total < 1)
        totalTime = { unit: "sec", value: Math.round(diff / 1000) };
      else totalTime = { unit: "min", value: total.toFixed(2) };
      let spaceCount = 0;
      for (let chr in randText) if (randText[chr] === " ") spaceCount += 1;
      const totalWords = spaceCount + 1;
      // console.log("Total Time: ", total);
      // console.log("Total Words: ", totalWords);
      const wpm = (totalWords / total).toFixed(2);
      this.setState({
        gameStatus: {
          wpmStr: "Your WPM: ",
          wpm: wpm,
          timeTakenStr: "Total time taken: ",
          totalTime: totalTime
        },
        text: "",
        isGameOver: true,
        isInputDisabled: true
      });
      clearInterval(gameTimerId);
    }
    if (keyCode === 8) {
      if (text === "") return;
      if (wrong > 0) {
        const newRenderRed = [...renderWrong];
        const last = newRenderRed.pop();
        const newuntouched = [last, ...untouched];
        this.setState(prevState => ({
          wrong: prevState.wrong - 1,
          renderWrong: newRenderRed,
          untouched: newuntouched
        }));
      } else if (wrong === 0 && current > 0) {
        const currentCount = current - 1;
        const newrenderCorrect = [...renderCorrect];
        const last = newrenderCorrect.pop();
        const newuntouched = [last, ...untouched];
        this.setState({
          current: currentCount,
          renderCorrect: newrenderCorrect,
          untouched: newuntouched
        });
      }
    } else if (this.isValidChar(key, randText[current])) {
      if (keyCode === 32) this.setState({ text: "" });
      const newrenderCorrect = [...renderCorrect, randText[current]];
      const newuntouched = untouched.slice(1);
      this.setState(prevState => ({
        renderCorrect: newrenderCorrect,
        untouched: newuntouched,
        current: prevState.current + 1
      }));
    } else if (!this.isValidChar(key, randText[current])) {
      if (keyCode === 16 || keyCode === 18 || keyCode === 20 || keyCode === 17)
        return;
      const wrongCount = wrong + 1;
      const newRenderRed = [...renderWrong, randText[current + wrongCount - 1]];
      let newuntouched = [...untouched];
      newuntouched = newuntouched.slice(1);
      this.setState({
        renderWrong: newRenderRed,
        wrong: wrongCount,
        untouched: newuntouched
      });
    }
  };

  handleClick = async () => {
    this.setState(prevState => ({
      gameStatus: { currentStatus: "Loading Content. Get Ready." },
      isButtonDisabled: !prevState.isButtonDisabled
    }));
    await this.fetchData();
    this.setState({ gameStatus: { currentStatus: "3" } });
    const timeoutId = setInterval(this.countDown, 1000);
    this.setState({ timeoutId });
  };

  countDown = () => {
    const { gameStatus, timeoutId } = this.state;
    if (parseInt(gameStatus.currentStatus) === 1) {
      this.setState({ gameStatus: { currentStatus: "The Race Has Begun" } });
      clearInterval(timeoutId);
      this.toggleStates();
      if (this.focusInput !== null) this.focusInput.focus();
    }
    if (parseInt(gameStatus.currentStatus) > 1)
      this.setState(prevState => ({
        gameStatus: { currentStatus: prevState.gameStatus.currentStatus - 1 }
      }));
  };

  toggleStates = () => {
    this.setState(prevState => ({
      isInputDisabled: !prevState.isInputDisabled,
      startTime: Date.now()
    }));
    this.gameTimer();
  };

  gameTimer = () => {
    const gameTimerId = setInterval(this.countUp, 1000);
    this.setState({ gameTimerId });
  };

  countUp = () => {
    this.setState(prevState => ({
      time: prevState.time + 1
    }));
  };

  componentDidMount() {
    const initMsg = "Click on Start to begin the race".split("");
    this.setState({ randText: initMsg, untouched: initMsg });
  }

  render() {
    const {
      text,
      renderCorrect,
      untouched,
      renderWrong,
      isButtonDisabled,
      isInputDisabled,
      gameStatus,
      time,
      isGameOver
    } = this.state;
    return (
      <div>
        <h1
          className="text-center"
          style={{ fontSize: "40px", fontWeight: "normal" }}
        >
          Type Racer
        </h1>
        <Timer time={time} isGameOver={isGameOver} />
        <hr />
        <RandText
          renderCorrect={renderCorrect}
          untouched={untouched}
          renderWrong={renderWrong}
        />
        <hr style={{ marginBottom: "50px" }} />
        <div className="text-center status">
          <Button
            onHandleClick={this.handleClick}
            isButtonDisabled={isButtonDisabled}
          />
          <Status
            className="statusHead"
            isGameOver={isGameOver}
            gameStatus={gameStatus}
          />
        </div>
        <div className="text-center">
          <Input
            onHandleChange={this.handleChange}
            onHandleKeyDown={this.handleKeyDown}
            isInputDisabled={isInputDisabled}
            text={text}
            onRef={ref => (this.focusInput = ref)}
          />
        </div>
      </div>
    );
  }
}

export default App;
