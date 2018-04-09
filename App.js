import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import devToolsEnhancer from 'remote-redux-devtools';

// Components
import HomeScreen from './components/HomeScreen';
import CardDisplay from './components/CardDisplay';
import Deck from './components/Deck';
import FlashCard from './components/FlashCard';
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
  Card: {
    screen: FlashCard,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'green'
      }
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
