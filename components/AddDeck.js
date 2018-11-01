import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeckTitle } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import { tintColor, white, toDeck } from '../utils/helpers'

class AddDeck extends Component {
    state = {
        title: '',
    }


  submit = () => {
    const { title } = this.state
    this.setState(() => ({ title: '' }))

    this.props.addDeck({ title })
    this.props.navigation.dispatch(toDeck(title))

    saveDeckTitle(title)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput style={styles.inputText} onChangeText={(title) => this.setState({ title })} value={this.state.title} />
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

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, { addDeck })(AddDeck)
