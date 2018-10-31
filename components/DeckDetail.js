import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

class DeckDetail extends React.Component {
  render() {
    const { deck } = this.props
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>TODO: quiz</Text>
        <Text>TODO: stats</Text>
      </View>
    );
  }
}

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
   return {
    deck,
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
    // TODO: mapDispatchToProps
}

export default connect(
  mapStateToProps,
)(DeckDetail)
