import React from 'react';
import {StyleSheet, View, Text, PanResponder, Dimensions} from 'react-native';
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
        // Dimensions.addEventListener("change", ({window: {width, height}}) => {
        //     if (width < height) {
        //         this.setState({orientation: "portrait"});
        //     } else {
        //         this.setState({orientation: "landscape"});
        //     }
        // });

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

    //On gesture swipe from left to right side on calcDisplay
    onBackSpacePress = () => {
        this.calc.backspace();
        this.setState({display: this.calc.getMainDisplay() });
    }

    // mountOrientation() {
    //     Dimensions.addEventListener("change", ({window: {width, height}}) => {
    //         if (width < height) {
    //             this.setState({orientation: "Portrait"});
    //         } else {
    //             this.setState({orientation: "landscape"});
    //         }
    //     });
    // }


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

    renderLandscape() {
        return(
        <View style={{flex: 1}}>
            <View style={{flex: 1, paddingTop: 20}}>
                <Text style={{color: "white" ,justifyContent: "center"}}>Landscape mode</Text>
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
});