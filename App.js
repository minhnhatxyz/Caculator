import React, { Component } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

class BtnCal extends Component {
  render() {
    let val = this.props.val;
    return (
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title={val} onPress={() => { this.props.handler(val) }} color={val === 'c' ? 'red' : ''} />
      </View>
    );
  }
}

export default class Caculator extends Component {
  firstNum; secondNum; result; operator; end;
  constructor(props) {
    super(props);
    this.firstNum = 0;
    this.secondNum = 0;
    this.result = 0;
    this.operator = '';
    this.end = false;
    this.state = {
      display: ''
    };
    this.handler = this.handler.bind(this);
  }

  handler(btn) {
    let current = this.state.display;
    switch (btn) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.firstNum = parseInt(current) || 0;
        this.operator = btn;
        this.end = true;
        break;
      case '=':
        this.secondNum = parseInt(current) || 0;
        if (this.operator) switch (this.operator) {
          case '+':
            this.result = this.firstNum + this.secondNum;
            break;
          case '-':
            this.result = this.firstNum - this.secondNum;
            break;
          case '*':
            this.result = this.firstNum * this.secondNum;
            break;
          case '/':
            this.result = this.firstNum / this.secondNum;
            break;
          default:
            break;
        }
        else this.result = this.secondNum;
        this.setState({ display: this.result });
        this.operator = '';
        this.end = true;
        break;
      case 'c':
        this.setState({ display: '' });
        break;
      default:
        if (this.end) this.setState({ display: btn });
        else this.setState({ display: (current + btn) });
        this.end = false;
        break;
    }

  }

  render() {
    return (
      <View style={ styles.container}>
        <View>
          <Text style={styles.calcDisplay}>{this.state.display}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <BtnCal val='1' handler={this.handler} />
          <BtnCal val='2' handler={this.handler} />
          <BtnCal val='3' handler={this.handler} />
          <BtnCal val='/' handler={this.handler} />
          <View style={styles.flexBreak}></View>
          <BtnCal val='4' handler={this.handler} />
          <BtnCal val='5' handler={this.handler} />
          <BtnCal val='6' handler={this.handler} />
          <BtnCal val='*' handler={this.handler} />
          <View style={styles.flexBreak}></View>
          <BtnCal val='7' handler={this.handler} />
          <BtnCal val='8' handler={this.handler} />
          <BtnCal val='9' handler={this.handler} />
          <BtnCal val='-' handler={this.handler} />
          <View style={styles.flexBreak}></View>
          <BtnCal val='c' handler={this.handler} />
          <BtnCal val='0' handler={this.handler} />
          <BtnCal val='=' handler={this.handler} />
          <BtnCal val='+' handler={this.handler} style={{ backgroundColor: 'red' }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:20,
  },
  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent:'space-between'
  },
  buttonContainer: {
    width: 100,
    marginBottom:30,
  },
  button:{
    fontSize:30
  },
  flexBreak: {
    flexBasis: '100%',
    height: 0
  },
  calcDisplay: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign:'right',
    borderWidth:1,
    marginBottom:30,
    paddingRight:10
  },
  btnDel: {
    backgroundColor: 'red'
  }
})
