import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {NativeBaseProvider} from 'native-base';

import HomeScreen from './src/screens/HomeScreen';
import MasukAtauDaftar from './src/screens/MasukAtauDaftar';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import EditProfile from './src/screens/EditProfile';
import TopUp from './src/screens/TopUp';
import Transfer from './src/screens/Transfer';
import History from './src/screens/History';
import TransferOvo from './src/screens/TransferOvo';
import trxDetail from './src/screens/trxDetail';

import Header from './src/components/Header';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class MainStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          component={HomeScreen}
          name="welcome"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={MasukAtauDaftar}
          name="picker"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Home}
          name="home"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Profile}
          name="profile"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={EditProfile}
          name="editProfile"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={TopUp}
          name="topUp"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={Transfer}
          name="transfer"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={History}
          name="history"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={TransferOvo}
          name="transferOvo"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          component={trxDetail}
          name="trxDetail"
          options={{
            header: Header,
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    );
  }
}

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator>
          <React.Fragment>
            <Drawer.Screen
              options={{title: 'Main'}}
              name="root"
              component={MainStack}
            />
          </React.Fragment>
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
