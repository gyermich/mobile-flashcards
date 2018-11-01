import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'

class DeckDetail extends React.Component {
    state = {
        ready: true,
    }

    addCard = () => {
        const { deck } = this.props
        // this.props.navigation.dispatch(toAddQuiz(deck))
    }

    startQuiz = () => {
        const { deck } = this.props
        // this.props.navigation.dispatch(toQuiz(deck.questions))

        // clearNotification()
        //   .then(setNotification)
    }

    render() {
        const { ready } = this.state
        const { deck } = this.props
        return (
            <View>
            {
                ready
                ?
                <View>
                    <View>
                      <Text style={styles.header}>{deck.title}</Text>
                      <Text style={styles.deckTitle}>
                        {deck.questions.length} cards
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

function mapDispatchToProps (dispatch, { navigation }) {
    // TODO: mapDispatchToProps
}

export default connect(
  mapStateToProps,
)(DeckDetail)
