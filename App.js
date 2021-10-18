import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';

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
import SignUp from './src/screens/SignUp';
import Change from './src/screens/Change';
import Change2 from './src/screens/Change2';

import Header from './src/components/Header';
import Splash from './src/screens/Splash';

const Stack = createStackNavigator();

const App = props => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {props.auth.token === null ? (
            <React.Fragment>
              <Stack.Screen
                component={Splash}
                name="splash"
                options={{
                  header: Header,
                  headerTransparent: true,
                }}
              />
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
                component={SignUp}
                name="signUp"
                options={{
                  header: Header,
                  headerTransparent: true,
                }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Stack.Screen
                component={Splash}
                name="splash"
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
              <Stack.Screen
                component={Change}
                name="change"
                options={{
                  header: Header,
                  headerTransparent: true,
                }}
              />
              <Stack.Screen
                component={Change2}
                name="change2"
                options={{
                  header: Header,
                  headerTransparent: true,
                }}
              />
            </React.Fragment>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(App);
