import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { tintColor, white, goBack } from '../utils/helpers'

class Quiz extends Component {
    state = {
      counter: 0,
      correct: 0,
      showAnswer: false
    }

  handleCorrect = () => {
      const {counter, correct} = this.state
      this.setState({
        counter: counter + 1,
        correct: correct + 1,
        showAnswer: false
      })
  }

  handleIncorrect = () => {
      this.setState({
        counter: this.state.counter + 1,
        showAnswer: false
      })
  }

  toggleAnswer = () => {
    const { showAnswer } = this.state;

    this.setState({
      showAnswer: !showAnswer,
    })
  }

  reset = () => {
    this.setState({
      counter: 0,
      correct: 0,
      showAnswer: false
    })
  }


  renderScore() {
    const { questions } = this.props
    const { correct } = this.state
    const questionsCount = questions.length

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          Correct Answers
        </Text>
        <Text style={styles.header}>
          {correct} of {questionsCount}
        </Text>

        <TouchableOpacity
          style={styles.button} onPress={() => this.reset()}
        >
          <Text style={styles.buttonText}>
            Restart Quiz
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.dispatch(goBack())}
        >
          <Text style={styles.buttonText}>
            Back to Deck
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { questions } = this.props
    const { counter, showAnswer } = this.state
    const questionsCount = questions.length
    let incorrect = questionsCount - this.state.correct

    if (counter > questionsCount - 1) {
      return this.renderScore()
    }

    const card = questions[counter]

    return (
      <View style={styles.container}>
        <Text>{counter + 1}/{questionsCount}</Text>

        <View>
          <Text style={styles.header}>
            {
              showAnswer
              ? card['answer']
              : card['question']
            }
          </Text>

          <TouchableOpacity
            onPress={() => this.toggleAnswer()}
            style={[styles.button, { backgroundColor: '#DDDDDD' }]}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>
              {
                showAnswer
                ? 'Back to Question'
                : 'Show Answer'
              }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => this.handleCorrect()}
          >
            <Text style={styles.buttonText}>
              Correct
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => this.handleIncorrect()}
            >
            <Text style={styles.buttonText}>
              Incorrect
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    header: {
        padding: 10,
        fontSize: 35,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: tintColor,
        padding: 10,
        marginTop:16,
    },
    container: {
        padding: 10,
    },
    inputText: {
        fontSize: 20,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: white,
    },
})

function mapStateToProps(state, options) {
  const { questions } = options.navigation.state.params;
  return { state, questions };
};

export default connect(mapStateToProps)(Quiz);
