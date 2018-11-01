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
                      <Text>{deck.title}</Text>
                      <Text>
                        {deck.questions.length} cards
                      </Text>

                      <TouchableOpacity onPress={() => this.addCard()}>
                        <Text>Add Card</Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.start()}>
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
