import React from 'react';
import {StyleSheet, View, Text, PanResponder, Dimensions, TouchableOpacity} from 'react-native';
import {CalcButtonLandscape, CalcButton, CalcDisplay} from './../components';

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
            orientation: "portrait",
        };

        //Initialize calculator...
        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        //Listening for orientation changes
        Dimensions.addEventListener("change", () => {
            const { width, height } = Dimensions.get("window");
            let orientation = (width > height) ? "landscape" : "portrait";
            this.setState({orientation: orientation});
        });

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                if (Math.round(gestureState.dx) < 50) {
                    this.onBackSpacePress();
                }
            },
        });

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
        } else if (operator == "a^x") {
            this.calc.addBinaryOperator(this.oc.ExponentialOperator);
            this.setState({display: this.calc.getMainDisplay() });
        }
    }

    //When in the input is one argument
    onUnaryOperatorPress = (operator) => {
        if (operator == "%") {
            this.calc.addUnaryOperator(this.oc.PercentOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "ln") {
            this.calc.addUnaryOperator(this.oc.NaturalLogOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "l10") {
            this.calc.addUnaryOperator(this.oc.LogBase10Operator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "pi") {
            this.calc.addUnaryOperator(this.oc.PiOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "e") {
            this.calc.addUnaryOperator(this.oc.EOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "p") {
            this.calc.addUnaryOperator(this.oc.SquareRootOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "x^2") {
            this.calc.addUnaryOperator(this.oc.XSquaredOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "x^3") {
            this.calc.addUnaryOperator(this.oc.XCubedOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "10^x") {
            this.calc.addUnaryOperator(this.oc.TenPowerOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } else if (operator == "x!") {
            this.calc.addUnaryOperator(this.oc.FactorialOperator);
            this.setState({display: this.calc.getMainDisplay() });
        } 
    }

    //When +/- is pressed
    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({display: this.calc.getMainDisplay() });

    }

    //On gesture swipe from left to right side on calcDisplay
    onBackSpacePress = () => {
        this.calc.backspace();
        this.setState({display: this.calc.getMainDisplay() });
    }

    //renderPortrait() { body } - this way is good too for write function
    renderPortrait = () => {
        return(
            <View style={{flex: 1}}>
                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalcDisplay display={this.state.display}></CalcDisplay>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <CalcButton onPress={this.onClearPress} title="C" color="white" backgroundColor="#5A6D76"></CalcButton>
                        <CalcButton onPress={this.onPlusMinusPress} title="+/-" color="white" backgroundColor="#5A6D76"></CalcButton>
                        <CalcButton onPress={() => {this.onUnaryOperatorPress("%")}} title="%" color="white" backgroundColor="#5A6D76"></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("/")}} title="/" style={styles.buttonOperatorsColor}></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("7")}} title="7" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("8")}} title="8" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("9")}} title="9" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("x")}} title="x" style={styles.buttonOperatorsColor}></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("4")}} title="4" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("5")}} title="5" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("6")}} title="6" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("-")}} title="-" style={styles.buttonOperatorsColor}></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("3")}} title="3" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("2")}} title="2" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress("1")}} title="1" style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={() => {this.onBinaryOperatorPress("+")}} title="+" style={styles.buttonOperatorsColor}></CalcButton>
                    </View>

                    <View style={styles.buttonRow}>
                        <CalcButton onPress={() => {this.onDigitPress("0")}} title="0" color="white" backgroundColor="#263238" style={{flex: 2}}></CalcButton>
                        <CalcButton onPress={() => {this.onDigitPress(".")}} title="." style={styles.buttonColors}></CalcButton>
                        <CalcButton onPress={this.onEqualsPress} title="=" style={styles.buttonOperatorsColor}></CalcButton>
                    </View>
                </View>
            </View>
        );
    }

    renderLandscape() {
        return(
            <View style={{flex: 1}}>
                <View style={styles.displayContainer} {...this.panResponder.panHandlers}>
                    <CalcDisplay display={this.state.display}></CalcDisplay>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("p")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>p</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("x!")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>x!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={this.onClearPress} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={this.onPlusMinusPress} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>+/-</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress(this.oc.PercentOperator)}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>%</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onBinaryOperatorPress("/")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#59503B"}]}>
                            <Text style={styles.landscapeButtonsText}>/</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        onPress={() => {this.onBinaryOperatorPress("a^x")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>a^x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("10^x")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>10^x</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("7")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("8")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>8</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("9")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>9</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onBinaryOperatorPress("x")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#59503B"}]}>
                            <Text style={styles.landscapeButtonsText}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("ln")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>ln</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("l10")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>log10</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("4")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("5")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("6")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>6</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onBinaryOperatorPress("-")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#59503B"}]}>
                            <Text style={styles.landscapeButtonsText}>-</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("e")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("x^2")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>x^2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("1")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("2")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("3")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onBinaryOperatorPress("+")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#59503B"}]}>
                            <Text style={styles.landscapeButtonsText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("pi")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>pi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onUnaryOperatorPress("x^3")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#5A6D76"}]}>
                            <Text style={styles.landscapeButtonsText}>x^3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress("0")}} 
                        style={[styles.landscapeButtonsContainer, {flex: 2,backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={() => {this.onDigitPress(".")}} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#263238"}]}>
                            <Text style={styles.landscapeButtonsText}>.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={this.onEqualsPress} 
                        style={[styles.landscapeButtonsContainer, {backgroundColor: "#59503B"}]}>
                            <Text style={styles.landscapeButtonsText}>=</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }


    render() {
        let view = (this.state.orientation == "portrait") ? this.renderPortrait() : this.renderLandscape();

        return(
            <View style={styles.container}>
                {view}
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
        paddingBottom: 10,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    displayContainer: {
        flex: 1,
        justifyContent: "flex-end",
    },
    landscapeButtonsContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center", 
        margin: 3,
        width: 90, height: 50,
        borderRadius: 40,
    },
    landscapeButtonsText: {
        fontSize: 30, 
        fontWeight:"bold",
        color: "white",
    },
    buttonColors: {
        color: "white",
        backgroundColor: "#263238",
    },
    buttonOperatorsColor: {
        color: "white",
        backgroundColor: "#59503B",
    },
});