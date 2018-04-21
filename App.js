import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { setLocalNotification } from './utils/helpers';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';

// Components
import HomeScreen from './components/HomeScreen';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

const AppNavigation = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue'
      },
      title: 'Decks'
    }
  },
  Deck: { screen: Deck },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      },
      title: 'Add New Deck'
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'green'
      },
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black'
      },
      title: 'QUIZ'
    }
  }
});

const store = createStore(reducer, devToolsEnhancer({ realtime: true }));

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigation />
        </View>
      </Provider>
    );
  }
}
