import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar as ReactStatusBar } from 'react-native';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'


const tintColor = '#2f95dc'
const white = '#fff'

function StatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <ReactStatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator(
  {
    Decks: DeckList,
    AddDeck: AddDeck,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;

        if (routeName === 'Decks' ) {
          return <FontAwesome name="bars" size={30} color={tintColor} />
        }

        if ( routeName === 'AddDeck' ) {
          return <FontAwesome name="plus-square" size={30} color={tintColor} />
        }
      },
    }),
    tabBarOptions: {
      showIcon: true,
      activeTintColor: Platform.OS === 'ios' ? tintColor : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : tintColor,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  }
);

const navigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: tintColor,
  },
};

const DeckNavigator = createStackNavigator(
  {
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions,
    },
    // TODO:
    // NewQuestion: {
    //   screen: NewQuestion,
    //   navigationOptions,
    // },
    // Quiz: {
    //   screen: Quiz,
    //   navigationOptions,
    // },
  }, {
    headerMode: 'none',
  });


const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckNavigator: {
    screen: DeckNavigator,
    navigationOptions: ({ navigation }) => ({
      navigationOptions
    }),
  },
});


export default class App extends React.Component {
    render() {
      return (
        <Provider store={createStore(reducer)} >
            <View style={{ flex: 1 }}>
              <StatusBar backgroundColor={tintColor} barStyle="light-content" />
              <MainNavigator />
            </View>
          </Provider>
      );
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tintColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
