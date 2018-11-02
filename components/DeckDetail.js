import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import { getDeck } from '../utils/api'
import { fetchDeck } from '../actions'
import { toAddCard, toQuiz } from '../utils/helpers'

class DeckDetail extends React.Component {
    state = {
        ready: false,
        deck: null,
    }

    componentDidMount() {
    const { dispatch, deck } = this.props;
        this.props.fetchDeck(deck.title, deck)
        this.setState({
            deck: deck,
            ready: true,
        })
      }

    addCard = () => {
        const { deck } = this.state
        this.props.navigation.dispatch(toAddCard(deck))
    }

    startQuiz = () => {
        const { deck } = this.state
        this.props.navigation.dispatch(toQuiz(deck.questions))

        // clearNotification()
        //   .then(setNotification)
    }

    render() {
        const { ready, deck } = this.state
        return (
            <View>
            {
                ready
                ?
                <View>
                    <View>
                      <Text style={styles.header}>{deck.title}</Text>
                      <Text style={styles.deckTitle}>
                        {deck.questions ? deck.questions.length : 0} cards
                      </Text>

                      <TouchableOpacity style={styles.button} onPress={() => this.addCard()}>
                        <Text>Add Card</Text>
                      </TouchableOpacity>

                      <TouchableOpacity  style={styles.button} onPress={() => this.startQuiz()}>
                        <Text>Start Quiz</Text>
                      </TouchableOpacity>
                    </View>
                </View>
                : <Text>Loading...</Text>
            }
            </View>
        )
    }
}

const styles = StyleSheet.create ({
   header: {
        padding: 10,
        fontSize: 42,
        textAlign: 'center',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginTop:16,
    },
    deckTitle: {
        fontSize: 20,
        textAlign: 'center',
    },
})

function mapStateToProps (state, { navigation }) {
    const { deck } = navigation.state.params
    return {
        deck,
        state
    }
}

export default connect(mapStateToProps, { fetchDeck })(DeckDetail)
