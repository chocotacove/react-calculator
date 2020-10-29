import React from 'react';
import './App.css'

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ops = ["+", "-", "*", "/"];

class App extends React.Component {
  state = {
    lastPressed: undefined,
    calc: "0",
    operation: undefined
  };

  handleClick = (e) => {
    const {calc, lastPressed} = this.state;
    if (lastPressed === Infinity) {

    } else {
      if (calc.length >= 26) {
        document.getElementById('display').style.fontSize = "15px";
      } else if (calc.length >= 16) {
        document.getElementById('display').style.fontSize = "20px";
      } else {
        document.getElementById('display').style.fontSize = null;
      }
      const {innerText} = e.target;

      switch (innerText) {
        case "AC": {
          document.getElementById('display').style.fontSize = null;
          this.setState({
            calc: "0"
          });
          break;
        }

        case "=": {
          const evaluated = eval(calc);
          if (evaluated === Infinity | this.state.lastPressed === Infinity) {
            this.setState({
              lastPressed: Infinity,
              calc: 0
            })
          }
          if (String(evaluated).length >= 26) {
            document.getElementById('display').style.fontSize = "15px";
          } else if (String(evaluated).length >= 16) {
            document.getElementById('display').style.fontSize = "20px";
          } else {
            document.getElementById('display').style.fontSize = null;
          }
          this.setState({
            calc: evaluated,
            lastPressed: '=',
          });
          break;
        }
        case '.': {
          if (this.state.lastPressed === '=' | this.state.lastPressed === '.') {

          } else {
            const splitted = calc.split(/[\+\-\*\/]/);
            const last = splitted.slice(-1)[0];

            if (!last.includes('.')) {
              this.setState({
                calc: calc + '.',
                lastPressed: '.'
              })
            }
          }

          break;
        }
        default: {
          if (document.getElementById('display').innerText == 'Infinity') {
            this.setState({
              calc: "0"
            })
            break;
          } else {
            let e = undefined;
            if (ops.includes(innerText)) {
              if (ops.includes(lastPressed) && innerText !== "-") {
                const lastNumberIdx = calc
                  .split("")
                  .reverse()
                  .findIndex((char) => char !== " " && nums.includes(+char));
                e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
              } else {
                e = `${calc} ${innerText} `;
              }
            } else {
              e = calc === "0" ? innerText : calc + innerText;
            }

            this.setState({
              calc: e
            });
          }
        }
      }

      this.setState({
        lastPressed: innerText
      });
    };
  }

  render() {
    const {currentNumber, calc} = this.state;

    return (
      <div className="container">
        <div id="display" className="display">
          {calc}
        </div>

        <div className="btn-container">
          <button id="clear" onClick={this.handleClick} className="AC">
            AC
          </button>
          <button id="divide" onClick={this.handleClick}>
            /
          </button>
          <button id="multiply" onClick={this.handleClick}>
            *
          </button>
          <button id="seven" onClick={this.handleClick}>
            7
          </button>
          <button id="eight" onClick={this.handleClick}>
            8
          </button>
          <button id="nine" onClick={this.handleClick}>
            9
          </button>
          <button id="subtract" onClick={this.handleClick}>
            -
          </button>
          <button id="four" onClick={this.handleClick}>
            4
          </button>
          <button id="five" onClick={this.handleClick}>
            5
          </button>
          <button id="six" onClick={this.handleClick}>
            6
          </button>
          <button id="add" onClick={this.handleClick}>
            +
          </button>
          <button id="one" onClick={this.handleClick}>
            1
          </button>
          <button id="two" onClick={this.handleClick}>
            2
          </button>
          <button id="three" onClick={this.handleClick}>
            3
          </button>
          <button onClick={this.handleClick} className="equal" id="equals">
            =
          </button>
          <button id="zero" onClick={this.handleClick} className="zero">
            0
          </button>
          <button id="decimal" onClick={this.handleClick}>
            .
          </button>
        </div>
      </div>
    );
  }
}

export default App;
