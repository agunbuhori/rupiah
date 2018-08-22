import React from 'react';
import { render } from 'react-dom';

import './style.css';
import { parseFractions } from './functions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nominal: "",
      fractionResult: [],
      leftFraction: 0,
      status: 0,
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.getFractions.bind(this));
  }

  inputNominal(event) {
    this.setState({nominal: event.target.value})
  }

  getFractions(event) {
    if (event.which === 13 && this.state.nominal != '') {
      var fractionParser = parseFractions(this.state.nominal);
      if (fractionParser.status === 'success') {
        this.setState({
          status: 1,
          fractionResult: fractionParser.data.countedFraction,
          leftFraction: fractionParser.data.leftFraction
        });
      } else if (fractionParser.status === 'failed') {
        this.setState({
          status: 2
        });
      }
    } else {
      this.setState({status: 0});
    }
  }

  getResultView() {
    // if nominal input is valid
    if (this.state.status === 1)
      return (
        <div className="denominationResult">
          <div className="row">
            
            {/* Loop parsed result */}
            {this.state.fractionResult.map((fraction, index) => {
              return (
                <div className="fractionGrid" key={index}>
                  <div className="fractionItem">
                    <div className="fractionAmount">
                      <h1>{fraction.count}</h1>
                      <span>fraction</span>
                    </div>
                    <div className="fractionNominal"><h1>Rp{fraction.nominal}</h1></div>
                  </div>
                </div>
              );
            })}  

          </div>
            
          <div className="leftFraction">
            <h1>{this.state.leftFraction > 0 ? "Rp"+this.state.leftFraction + " no available fraction" : "There is no nominal remainder"}</h1>
          </div>

        </div>
      );
      // if nominal input is invalid
    else if (this.state.status === 2)
      return (
        <div className="invalidNominal">
          You enter the wrong nominal format, Examples of valid inputs with their canonical equivalents 18.215 (18215), Rp17500 (17500), Rp17.500,00 (17500), Rp 120.325 (120325), 005.000 (5000), 001000 (1000)
        </div>
      );
  }

  render() {
    return (
      <div className="container">
        <div className="wrapper">
          <img className="logo" src="./tokopedia.svg" width="200px"/>

          {/* Input here */}
          <input className="inputNominal" onChange={this.inputNominal.bind(this)} placeholder="Input nominal here"/>

          {this.getResultView()}
        </div>

        <p className="footerText">
          Copyrights &copy; 2018 - Agun Buhori | Impressive Developer - <a href="https://agun.buhori.com" target="_blank">https://agun.buhori.com</a>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));