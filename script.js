function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}const ProgressBar = ({
  width,
  height,
  stroke,
  strokeDasharray,
  strokeWidth,
  fill }) =>
{
  const widthHalf = width / 2;
  const circleDefaultProps = {
    r: widthHalf - strokeWidth,
    cx: widthHalf,
    cy: widthHalf,
    style: { transition: "all 0.3s" },
    strokeDashoffset: "0" };

  return /*#__PURE__*/(
    React.createElement("svg", {
      width: width,
      height: height,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      viewBox: `0 0 ${width} ${height}` }, /*#__PURE__*/

    React.createElement("circle", _extends({},
    circleDefaultProps, {
      fill: fill[0],
      stroke: stroke[0],
      strokeWidth: strokeWidth,
      strokeDasharray: `${strokeDasharray[0]} ${strokeDasharray[2]}` })), /*#__PURE__*/

    React.createElement("circle", _extends({},
    circleDefaultProps, {
      fill: fill[1],
      stroke: stroke[1],
      strokeWidth: strokeWidth > 10 ? strokeWidth - 7 : strokeWidth,
      strokeDasharray: `${strokeDasharray[1]} ${strokeDasharray[2]}` }))));



};

const statusArr = ["stopped", "counting", "pause", "break"];
const Button = ({ onStartStop, status, onReset }) => {
  const stoppedOrPaused = status === statusArr[0] || status === statusArr[2];
  const playPause = stoppedOrPaused ? "play" : "pause";
  const startPause = stoppedOrPaused ? "Start" : "Pause";
  return /*#__PURE__*/(
    React.createElement("div", { className: "button-div" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop", onClick: onStartStop }, /*#__PURE__*/
    React.createElement("i", { className: `btnIcon far fa-${playPause}-circle fa-2x` }), /*#__PURE__*/
    React.createElement("div", { className: "btnText" }, startPause)), /*#__PURE__*/

    React.createElement("button", { id: "reset", onClick: onReset }, /*#__PURE__*/
    React.createElement("i", { className: "btnIcon fas fa-redo-alt fa-2x" }), /*#__PURE__*/
    React.createElement("div", { className: "btnText" }, "Reset"))));



};

const TimerLengthControl = ({
  titleId,
  title,
  incrementId,
  onIncrement,
  lengthId,
  length,
  decrementId,
  onDecrement,
  onChange,
  inputName,
  img,
  imgAlt }) =>
{
  const handleFocus = event => event.target.select();

  const progress = 174 / 60 * length;

  return /*#__PURE__*/(
    React.createElement("div", { className: "timer-control" }, /*#__PURE__*/
    React.createElement(ProgressBar, {
      width: "90",
      height: "90",
      stroke: ["black", "#eb7d4b"],
      strokeDasharray: ["174", progress, "250"],
      strokeWidth: 5,
      fill: ["white", "transparent"] }), /*#__PURE__*/

    React.createElement("div", { className: "timer-control-img" }, /*#__PURE__*/
    React.createElement("img", { src: img, width: "48", height: "48", alt: imgAlt })), /*#__PURE__*/


    React.createElement("div", { id: titleId, className: "timer-control-label" },
    title), /*#__PURE__*/


    React.createElement("button", { id: decrementId, onClick: onDecrement }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-minus-circle fa-2x" })), /*#__PURE__*/


    React.createElement("div", { className: "timer-control-length" }, /*#__PURE__*/
    React.createElement("input", {
      id: lengthId,
      type: "number",
      className: "timer-length-num input-number\u2013noSpinners",
      value: length,
      name: inputName,
      onChange: onChange,
      onFocus: handleFocus }), "\xA0min."), /*#__PURE__*/




    React.createElement("button", { id: incrementId, onClick: onIncrement }, /*#__PURE__*/
    React.createElement("i", { className: "fa fa-plus-circle fa-2x" })), /*#__PURE__*/

    React.createElement("input", {
      type: "range",
      className: "range-control",
      name: "points",
      min: "0",
      max: "60",
      step: "1",
      value: length,
      onChange: onChange,
      name: inputName })));



};

const timerTypeArr = ["sess", "break"];
const imageArr = [
"https://image.flaticon.com/icons/png/512/11/11296.png",
"https://image.flaticon.com/icons/png/512/10/10527.png",
"https://i.imgur.com/zBBilgP.png",
"https://i.imgur.com/RIaWCMj.png"];


let permited = false;
class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleLengthChange",





























































































    (count, type) => {
      const { status, timerType } = this.state;

      let typeState = `${type}Length`;

      let notMin = this.state[typeState] > 1;
      let notMax = this.state[typeState] < 60;
      let maxMinCheck = count < 0 ? notMin : notMax;

      let notCountingNotBreak =
      status !== statusArr[1] && status !== statusArr[3];

      if (maxMinCheck && notCountingNotBreak) {
        this.changeState(typeState, count);
        timerType === type && this.changeState("timer", count * 60);
      }
    });_defineProperty(this, "countdown",







































    null);this.state = { sessLength: 25, breakLength: 5, timer: 25 * 60, status: statusArr[0], // stopped
      timerType: timerTypeArr[0], // sess
      imageUrl: [imageArr[0], imageArr[1]], isPinching: false };this.breakIncrement = this.breakIncrement.bind(this);this.breakDecrement = this.breakDecrement.bind(this);this.sessIncrement = this.sessIncrement.bind(this);this.sessDecrement = this.sessDecrement.bind(this);this.inputchange = this.inputchange.bind(this);this.startStop = this.startStop.bind(this);this.initState = this.initState.bind(this);}askNotificationPermission() {function checkNotificationPromise() {try {Notification.requestPermission().then();} catch (e) {return false;}return true;} // Let's check if the browser supports notifications
    if (!("Notification" in window)) {console.log("This browser does not support notifications.");} else {if (checkNotificationPromise()) {Notification.requestPermission().then(permission => {permited = permission === "granted";});} else {Notification.requestPermission(function (permission) {permited = permission === "granted";});}}}componentDidMount() {this.askNotificationPermission();}showNotification() {const { timerType, imageUrl } = this.state; // timerTypeArr = ["sess", "break"]
    const data = { [timerTypeArr[1]]: { title: "Get Back To  Work", bodyText: "Sweat drips today is builds foundation of success tomorrow. So, keep it up", imgUrl: imageUrl[0] }, [timerTypeArr[0]]: { title: "Take a little break", bodyText: "Good works! Now take a little break to refresh your mind. Break will boost your productivity", imgUrl: imageUrl[1] } };const { title, bodyText, imgUrl } = data[timerType];var options = { body: bodyText, icon: imgUrl, dir: "ltr" };if (permited) {// If it's okay let's create a notification
      var notification = new Notification(title, options);setTimeout(() => {notification.close();}, 10000);}}changeState(stateName, val) {this.setState(prevState => ({ [stateName]: prevState[stateName] + val }));} // timerTypeArr = ["sess", "break"]
  sessIncrement(event) {this.handleLengthChange(1, timerTypeArr[0]);}breakIncrement(event) {this.handleLengthChange(1, timerTypeArr[1]);}sessDecrement(event) {this.handleLengthChange(-1, timerTypeArr[0]);}breakDecrement(event) {this.handleLengthChange(-1, timerTypeArr[1]);}inputchange(event) {const { status, timerType } = this.state;let notCountingNotBreak = status !== statusArr[1] && status !== statusArr[3];let { name, value } = event.target;value = Number(value);if (value < 1) {value = 1;} else if (value > 60) {value = 60;}if (notCountingNotBreak) {this.setState({ [`${name}Length`]: value });timerType === name && this.setState({ timer: value * 60 });}}startStop() {// if status = stop or pause
    const startOrStop = this.state.status === statusArr[0] || this.state.status === statusArr[2];if (startOrStop) {this.setState({
        status: statusArr[1] // counting
      },
      () => {
        this.countdown = setInterval(() => {
          if (this.state.timer === 0) {
            this.audioBeep.play();
            this.showNotification();
            clearInterval(this.countdown);
            this.toggleTimer();
          }
          this.changeState("timer", -1);
        }, 1000);
      });

    }
    // if status = counting
    else if (this.state.status === statusArr[1]) {
        this.setState(
        {
          status: statusArr[2] // pause
        },
        () => {
          clearInterval(this.countdown);
        });

      }
  }

  toggleTimer() {
    // if timerType = session
    if (this.state.timerType === timerTypeArr[0]) {
      this.setState(
      {
        status: statusArr[0], // stopped
        timer: this.state.breakLength * 60 + 1,
        timerType: timerTypeArr[1] // break
      },
      () => {
        this.startStop();
      });

    }
    // if timerType = beak
    else if (this.state.timerType === timerTypeArr[1]) {
        this.setState(
        {
          status: statusArr[0], // stopped
          timer: this.state.sessLength * 60 + 1,
          timerType: timerTypeArr[0] // sess
        },
        () => {
          this.startStop();
        });

      }
  }

  initState() {
    clearInterval(this.countdown);
    this.setState({
      sessLength: 25,
      breakLength: 5,
      timer: 25 * 60,
      status: statusArr[0], // stopped
      timerType: timerTypeArr[0] // sess
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  render() {
    let {
      breakLength,
      sessLength,
      status,
      timer,
      timerType,
      imageUrl } =
    this.state;

    const isSession = timerType == timerTypeArr[0];

    timerType = isSession ? "Session" : "Break";

    let minute = parseInt(timer / 60);
    minute = minute.toString().padStart(2, "0");

    let sec = timer % 60;
    sec = sec.toString().padStart(2, "0");

    const initTimer = isSession ? sessLength * 60 : breakLength * 60;

    const progress = 607 / initTimer * (initTimer - timer);

    const strokeColor = isSession ? "#30bae7" : "#00c853";

    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("div", { className: "app-card" }, /*#__PURE__*/
      React.createElement("div", { className: "timer-counter" }, /*#__PURE__*/
      React.createElement("div", { className: "main-title" }, "Pomodoro ", /*#__PURE__*/
      React.createElement("br", null), "Clock"), /*#__PURE__*/



      React.createElement(ProgressBar, {
        width: "300",
        height: "300",
        stroke: ["rgb(238, 238, 238)", strokeColor],
        strokeDasharray: ["607", progress, "880"],
        strokeWidth: 20,
        fill: ["transparent", "transparent"] }), /*#__PURE__*/

      React.createElement("div", { className: "timer" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, timerType), /*#__PURE__*/
      React.createElement("div", { id: "time-left" },
      minute, ":", sec), /*#__PURE__*/


      React.createElement(Button, {
        onStartStop: this.startStop,
        status: status,
        onReset: this.initState }), /*#__PURE__*/


      React.createElement("audio", {
        id: "beep",
        preload: "auto",
        ref: audio => {
          this.audioBeep = audio;
        },
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }))), /*#__PURE__*/




      React.createElement("div", { className: "timer-control-holder" }, /*#__PURE__*/
      React.createElement(TimerLengthControl, {
        titleId: "session-label",
        title: "Session Length",
        incrementId: "session-increment",
        onIncrement: this.sessIncrement,
        lengthId: "session-length",
        length: sessLength,
        decrementId: "session-decrement",
        onDecrement: this.sessDecrement,
        onChange: this.inputchange,
        inputName: timerTypeArr[0],
        img: imageUrl[0],
        imgAlt: "S" }), /*#__PURE__*/


      React.createElement(TimerLengthControl, {
        titleId: "break-label",
        title: "Break Length",
        incrementId: "break-increment",
        onIncrement: this.breakIncrement,
        lengthId: "break-length",
        length: breakLength,
        decrementId: "break-decrement",
        onDecrement: this.breakDecrement,
        onChange: this.inputchange,
        inputName: timerTypeArr[1],
        img: imageUrl[1],
        imgAlt: "B" }))), /*#__PURE__*/



      React.createElement("footer", null, /*#__PURE__*/
      React.createElement("p", null, "Created with\xA0", /*#__PURE__*/

      React.createElement("i", { className: "fa fa-heart", style: { color: "#FF5252" } }), "\xA0& whole lot of work by\xA0", /*#__PURE__*/

      React.createElement("a", { href: "https://github.com/Asraf2asif" }, "Asif")))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));