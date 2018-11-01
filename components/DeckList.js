import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { fetchResults } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions'
import { toDeck } from '../utils/helpers'

class DeckList extends React.Component {
    state = {
        ready: false,
    }

    componentDidMount () {
       fetchResults()
        .then((decks) => {return this.props.fetchDecks(decks)})
        .then((decks) => this.setState({ ready: true }))
    }

    render() {
        const { ready } = this.state
        const { decks } = this.props

        return (
            <View>
            <Text style={styles.header}>Available Decks:</Text>
                {
                    ready && decks.length !== 0
                    ?
                    <View >
                        {decks.map((deck) => (
                          <TouchableOpacity
                            style={styles.button}
                            key={deck.title}
                            onPress={() => this.props.navigation.dispatch(toDeck(deck.title))}
                          >
                            <View>
                              <Text style={styles.deckTitle}>{deck.title}</Text>
                              {deck.questions.length
                                  ? (
                                    <Text style={styles.deckCards}>{deck.questions.length} Cards</Text>
                                  )
                                  : (
                                    <Text style={styles.deckCards}>No Cards</Text>
                                  )
                              }
                            </View>
                          </TouchableOpacity>
                        ))}
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
    deckCards: {
        fontSize: 10,
        textAlign: 'center',
    }
})

function mapStateToProps(state) {
    return {
        decks: Object.values(state) || [],
        state
    }
}

export default connect(mapStateToProps, {fetchDecks})(DeckList)
