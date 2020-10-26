import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {CalcButton, CalcDisplay} from './../components';

require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");

export default class CalculatorScreen extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            display: "0",
        };

        //Initialize calculator...
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();
            
        // Calculate: 12 + 45 = 	
        // calc.addDigit("1");
        // calc.addDigit("2");
        // calc.addBinaryOperator(oc.AdditionOperator);
        // calc.addDigit("4");
        // calc.addDigit("5");
        // calc.equalsPressed();
        // alert(calc.getMainDisplay());	// 57
        // calc.clear();
    }

    //When digit is pressed
    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({ display: this.calc.getMainDisplay() });
    }

    onClearPress = () => {
        this.calc.clear();
        this.setState({display: this.calc.getMainDisplay() });
    }

    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({display: this.calc.getMainDisplay() });
    }

    //when some of the operator
    onBinaryOperatorPress = (operator) => {
        if (operator == "+") {
            this.calc.addBinaryOperator(this.oc.AdditionOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "-") {
            this.calc.addBinaryOperator(this.oc.SubtractionOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "x") {
            this.calc.addBinaryOperator(this.oc.MultiplicationOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "/") {
            this.calc.addBinaryOperator(this.oc.DivisionOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } 
    }

    //When % is pressed
    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({display: this.calc.getMainDisplay() });
    }

    //When +/- is pressed
    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({display: this.calc.getMainDisplay() });

    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.displayContainer}>
                    <CalcDisplay display={this.state.display}></CalcDisplay>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <CalcButton onPress={this.onClearPress} title="C" color="white" backgroundColor="#5A6D76"></CalcButton>
                        <CalcButton onPress={this.onPlusMinusPress} title="+/-" color="white" backgroundColor="#5A6D76"></CalcButton>
                        <CalcButton onPress={() => {this.onUnaryOperatorPress(this.oc.PercentOperator)}} title="%" color="white" backgroundColor="#5A6D76"></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("/")}} title="/" color="white" backgroundColor="#59503B"></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("7")}} title="7" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("8")}} title="8" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("9")}} title="9" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("x")}} title="x" color="white" backgroundColor="#59503B"></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("4")}} title="4" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("5")}} title="5" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("6")}} title="6" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("-")}} title="-" color="white" backgroundColor="#59503B"></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("3")}} title="3" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("2")}} title="2" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("1")}} title="1" color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("+")}} title="+" color="white" backgroundColor="#59503B"></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("0")}} title="0" color="white" backgroundColor="#263238" style={{flex: 2}}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress(".")}} title="." color="white" backgroundColor="#263238"></CalcButton>
                        <CalcButton onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#59503B"></CalcButton>
                    </View>
                </View>
            </View>
        );
    }
}

// #5A6D76 grey
// #5A6D76 - dark blue grey
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    buttonContainer: {
        paddingBottom: 20,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    displayContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
});