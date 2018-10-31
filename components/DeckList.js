import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { fetchResults } from '../utils/api'
import { NavigationActions } from 'react-navigation'

export default class DeckList extends React.Component {
    state = {
        decks: [],
        ready: false,
    }

    componentDidMount () {
      const { dispatch } = this.props
       fetchResults()
        // .then((entries) => dispatch(receiveEntries(entries)))
        // .then(({ entries }) => {
        //   if (!entries[timeToString()]) {
        //     dispatch(addEntry({
        //       [timeToString()]: getDailyReminderValue()
        //     }))
        //   }
        // })
        .then((decks) => this.setState({decks, ready: true}))
    }


    render() {
        const { ready, decks } = this.state

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
