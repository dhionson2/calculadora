import React, { Component } from "react";
import "./Calculator.css";
import Button from "../componentes/Button";
import Display from "../componentes/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    const { current, operation: currentOperation, values } = this.state;
    const equals = operation === "=";

    const updatedValues = [...values];
    try {
      updatedValues[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
    } catch (e) {
      updatedValues[0] = values[0];
    }

    updatedValues[1] = 0;

    this.setState({
      displayValue: updatedValues[0].toString(),
      operation: equals ? null : operation,
      current: equals ? 0 : 1,
      clearDisplay: !equals,
      values: updatedValues,
    });
  }

  addDigit(n) {
    const { displayValue, clearDisplay, current, values } = this.state;

    if (n === "." && displayValue.includes(".")) {
      return;
    }

    const newDisplayValue = clearDisplay ? "" : displayValue;
    const updatedDisplayValue = newDisplayValue + n;
    this.setState({ displayValue: updatedDisplayValue, clearDisplay: false });

    if (n !== ".") {
      const newValue = parseFloat(updatedDisplayValue);
      const updatedValues = [...values];
      updatedValues[current] = newValue;
      this.setState({ values: updatedValues });
    }
  }

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <Display value={displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
