import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar as ReactStatusBar } from 'react-native';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { tintColor, white } from './utils/helpers'
import { setLocalNotification } from './utils/notifications'


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
      activeTintColor: tintColor,
      style: {
        height: 56,
        backgroundColor: white,
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
  headerTintColor: tintColor,
  headerStyle: {
    backgroundColor: white,
  },
};

const DeckNavigator = createStackNavigator(
  {
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions,
    },
    NewQuestion: {
      screen: NewQuestion,
      navigationOptions,
    },
    Quiz: {
      screen: Quiz,
      navigationOptions,
    },
  }, {
    headerMode: 'none',
  })


const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      title: 'Go back',
      header: null,
    }),
  },
  DeckNavigator: {
    screen: DeckNavigator,
    navigationOptions: ({ navigation }) => ({
      navigationOptions
    }),
  },
});


export default class App extends React.Component {
    componentDidMount() {
      setLocalNotification()
    }

    render() {
      return (
        <Provider store={createStore(reducer)} >
            <View style={styles.container}>
              <StatusBar backgroundColor={tintColor} barStyle="light-content" />
              <MainNavigator />
            </View>
          </Provider>
      );
    }
}


const styles = StyleSheet.create ({
   container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
   }
});

