import React, { Component } from "react";
import Input from "./components/input";
import RandText from "./components/randText";
import axios from "axios";
import Button from "./components/button";
import Status from "./components/status";
import Timer from "./components/timer";
import { async } from "q";

class App extends Component {
  state = {
    randText: [
      "C",
      "l",
      "i",
      "c",
      "k",
      " ",
      "o",
      "n",
      " ",
      "s",
      "t",
      "a",
      "r",
      "t",
      " ",
      "b",
      "u",
      "t",
      "t",
      "o",
      "n",
      " ",
      "t",
      "o",
      " ",
      "b",
      "e",
      "g",
      "i",
      "n",
      " ",
      "r",
      "a",
      "c",
      "e"
    ],
    splitA: [],
    splitB: [
      "C",
      "l",
      "i",
      "c",
      "k",
      " ",
      "o",
      "n",
      " ",
      "s",
      "t",
      "a",
      "r",
      "t",
      " ",
      "b",
      "u",
      "t",
      "t",
      "o",
      "n",
      " ",
      "t",
      "o",
      " ",
      "b",
      "e",
      "g",
      "i",
      "n",
      " ",
      "r",
      "a",
      "c",
      "e"
    ],
    splitC: [],
    text: "",
    current: 0,
    wrong: 0,
    isInputDisabled: true,
    isButtonDisabled: false,
    semiStatus: "",
    gameStatus: "",
    start: 0,
    time: { min: 0, sec: 0 },
    timeoutId: undefined,
    gameTimerId: undefined,
    isGameOver: false
  };

  handleChange = event => {
    const text = event.target.value;
    const isValidText = !!text;
    this.setState({ text: isValidText ? text.trim() : "" });
  };

  isValidChar = (input, current) => {
    return input === current ? true : false;
  };

  // async componentDidMount() {
  //   try {
  //     const { data } = await axios.get("http://www.randomtext.me/api/");
  //     const randTextData = this.cleanMarkup(data.text_out);
  //     const randText = randTextData.split("");
  //     this.setState({ randText, splitB: randText, isDataFetched: true });
  //   } catch (error) {
  //     const networkError = "Could not fetch data. Please try again.".split("");
  //     console.log(error);
  //     this.setState({
  //       splitB: networkError,
  //       gameStatus: "Network Error. Please Reload"
  //     });
  //   }
  // }

  fetchData = async () => {
    try {
      this.setState({ splitB: "Loading, Please wait..".split("") });
      const { data } = await axios.get("http://www.randomtext.me/api/");
      const randTextData = this.cleanMarkup(data.text_out);
      const randText = randTextData.split("");
      this.setState({ randText, splitB: randText });
      return true;
    } catch (error) {
      const networkError = "Could not fetch data. Please try again.".split("");
      console.log(error);
      this.setState({
        splitB: networkError,
        gameStatus: "Network Error. Please Reload"
      });
      return false;
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
      splitA,
      splitB,
      splitC,
      current,
      wrong,
      randText,
      text,
      start,
      gameTimerId
    } = this.state;
    if (current === randText.length - 1) {
      let diff = Math.abs(new Date(Date.now()) - new Date(start));
      const total = diff / 1000 / 60;
      let totalTime;
      console.log(total);
      if (total < 1) {
        totalTime = { unit: "sec", value: Math.round(diff / 1000) };
        console.log("Less");
      } else {
        totalTime = { unit: "min", value: total.toFixed(2) };
        console.log("Greater");
      }
      let spaceCount = 0;
      for (let chr in randText) if (chr === " ") spaceCount += 1;
      const totalWords = spaceCount + 1;
      const wpm = (totalWords / total).toFixed(2);
      this.setState({
        semiStatus: "Game Over",
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
      console.log(wpm);
    }
    if (keyCode === 8) {
      if (text === "") return;
      if (wrong > 0) {
        const newSplitC = [...splitC];
        const last = newSplitC.pop();
        const newSplitB = [last, ...splitB];
        this.setState(prevState => ({
          wrong: prevState.wrong - 1,
          splitC: newSplitC,
          splitB: newSplitB
        }));
      } else if (wrong === 0 && current > 0) {
        const currentCount = current - 1;
        const newSplitA = [...splitA];
        const last = newSplitA.pop();
        const newSplitB = [last, ...splitB];
        this.setState({
          current: currentCount,
          splitA: newSplitA,
          splitB: newSplitB
        });
      }
    } else if (this.isValidChar(key, randText[current])) {
      if (keyCode === 32) this.setState({ text: "" });
      console.log(this.state.time);
      const newsplitA = [...splitA, randText[current]];
      const newSplitB = splitB.slice(1);
      this.setState(prevState => ({
        splitA: newsplitA,
        splitB: newSplitB,
        current: prevState.current + 1
      }));
    } else if (!this.isValidChar(key, randText[current])) {
      if (keyCode === 16 || keyCode === 18 || keyCode === 20) return;
      const wrongCount = wrong + 1;
      const newSplitC = [...splitC, randText[current + wrongCount - 1]];
      let newSplitB = [...splitB];
      newSplitB = newSplitB.slice(1);
      this.setState({
        splitC: newSplitC,
        wrong: wrongCount,
        splitB: newSplitB
      });
    }
  };

  handleClick = async () => {
    this.setState(prevState => ({
      gameStatus: "Loading Content. Get Ready.",
      isButtonDisabled: !prevState.isButtonDisabled
    }));
    const isDataFetched = await this.fetchData();
    if (isDataFetched) {
      console.log(isDataFetched);
      this.setState({ gameStatus: "3" });
      const timeoutId = setInterval(this.countDown, 1000);
      this.setState({ timeoutId });
    }
  };

  countDown = () => {
    const { gameStatus, timeoutId } = this.state;
    if (gameStatus === 1) {
      this.setState({ gameStatus: "The Race Has Begun" });
      clearInterval(timeoutId);
      this.toggleStates();
      if (this.focusInput !== null) this.focusInput.focus();
    }
    if (gameStatus > 1)
      this.setState(prevState => ({ gameStatus: prevState.gameStatus - 1 }));
  };

  toggleStates = () => {
    this.setState(prevState => ({
      isInputDisabled: !prevState.isInputDisabled,
      start: Date.now()
    }));
    this.gameTimer();
  };

  gameTimer = () => {
    const gameTimerId = setInterval(this.countUp, 1000);
    this.setState({ gameTimerId });
  };

  countUp = () => {
    const { time } = this.state;
    if (time.sec === 59)
      this.setState(prevState => ({
        time: { min: prevState.time.min + 1, sec: 0 }
      }));
    else
      this.setState(prevState => ({
        time: { min: prevState.time.min, sec: prevState.time.sec + 1 }
      }));
  };

  render() {
    const {
      text,
      splitA,
      splitB,
      splitC,
      isButtonDisabled,
      isInputDisabled,
      gameStatus,
      time,
      isGameOver,
      semiStatus
    } = this.state;
    return (
      <div>
        <h1
          className="centertext"
          style={{ fontSize: "40px", fontWeight: "normal" }}
        >
          Type Racer
        </h1>
        <Timer time={time} isGameOver={isGameOver} />
        <hr />
        <RandText splitA={splitA} splitB={splitB} splitC={splitC} />
        <hr style={{ marginBottom: "50px" }} />
        <div className="centertext status">
          <Button
            onHandleClick={this.handleClick}
            isButtonDisabled={isButtonDisabled}
          />
          <Status
            className="statusHead"
            isGameOver={isGameOver}
            gameStatus={gameStatus}
            semiStatus={semiStatus}
          />
        </div>
        <div className="centertext">
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
