import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { addCard, addDeck } from '../actions'
import { saveDeckTitle, addCardToDeck } from '../utils/api'
import { tintColor, white, goBack } from '../utils/helpers'


class NewQuestion extends Component {

  state = {
      question: '',
      answer: ''
  }

  submit = () => {
    const { question, answer } = this.state
    const { deck, addCard } = this.props

    addCard({ question, answer, deck })
    addCardToDeck({ question, answer, deck })
    .then(() => {
      this.setState(() => ({ question: '', answer: '' }))
      this.props.navigation.dispatch(goBack())
    })
    .catch((error) => {
      alert('Something went wrong. Please try again.')
      console.log('Error while trying to add a card: ', error)
    })

  }

  render() {
    return (
      <View style={styles.container}>

        <Text>Enter your question</Text>
        <TextInput style={styles.inputText} onChangeText={(question) => this.setState({ question })} value={this.state.question} />

        <Text>Enter the answer</Text>
        <TextInput style={styles.inputText} onChangeText={(answer) => this.setState({ answer })} value={this.state.answer} />

        <TouchableOpacity style={styles.button} onPress={this.submit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
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
  const { deck } = options.navigation.state.params
  return { deck, state }
}

export default connect(mapStateToProps, { addCard })(NewQuestion)
