import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { fetchResults } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { fetchDecks } from '../actions'

class DeckList extends React.Component {
    state = {
        decks: [],
        ready: false,
    }

    componentDidMount () {
       fetchResults()
        .then((decks) => {return this.props.fetchDecks(decks)})
        .then((decks) => this.setState({decks, ready: true}))
    }


    render() {
        const { ready } = this.state
        const { decks } = this.props

        const toDeck = (deck) => {
            return NavigationActions.navigate({
                routeName: 'DeckNavigator',
                action: NavigationActions.navigate({
                    routeName: 'DeckDetail',
                    params: { deck: deck },
                }),
            })
        }

        return (
            <View>
            <Text>List of Decks</Text>
                {
                    ready && decks.length !== 0
                    ?
                    <View>
                        {decks.map((deck) => (
                          <TouchableHighlight
                            key={deck.title}
                            onPress={() => this.props.navigation.dispatch(toDeck(deck))}
                          >
                            <View>
                              <Text>{deck.title}</Text>
                              {deck.questions.length
                                  ? (
                                    <Text>{deck.questions.length} Cards</Text>
                                  )
                                  : (
                                    <Text>No Cards</Text>
                                  )
                              }
                            </View>
                          </TouchableHighlight>
                        ))}
                    </View>
                    : <Text>Loading...</Text>
                }
            </View>

        );
    }
}

function mapStateToProps(state) {
  return { decks: state.decks !== undefined ? state.decks : [], state };
};

export default connect(mapStateToProps, {fetchDecks})(DeckList);
