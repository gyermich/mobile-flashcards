import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchResults } from '../utils/api'


export default class Decks extends React.Component {
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
        return (
            <View>
            <Text>List of Decks</Text>
                {
                    ready && decks.length !== 0
                    ?
                    <View>
                        {decks
                        ? decks.map((deck) => (<Text key={deck.title}>{deck.title}</Text>))
                        : <Text>No decks created</Text>
                        }
                    </View>
                    : <Text>Loading...</Text>
                }
            </View>

        );
    }
}
