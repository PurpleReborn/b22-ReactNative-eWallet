import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({navigation, scene}) => {
  return (
    <View style={HeaderStyles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name={
            scene.route.name === 'picker' ||
            scene.route.name === 'editProfile' ||
            scene.route.name === 'topUp' ||
            scene.route.name === 'transfer' ||
            scene.route.name === 'history' ||
            scene.route.name === 'transferOvo' ||
            scene.route.name === 'trxDetail'
              ? 'chevron-left'
              : ''
          }
          size={15}
          color={
            scene.route.name === 'editProfile' ||
            scene.route.name === 'topUp' ||
            scene.route.name === 'transfer' ||
            scene.route.name === 'history' ||
            scene.route.name === 'transferOvo' ||
            scene.route.name === 'trxDetail'
              ? '#fff'
              : '#000'
          }
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon
          name={
            scene.route.name === 'home' || scene.route.name === 'profile'
              ? 'bell'
              : ''
          }
          size={20}
          color={scene.route.name === 'profile' ? 'gray' : 'white'}
          // color={scene.route.name === 'detail3' ? '#fff' : '#000'}
        />
      </TouchableOpacity>
    </View>
  );
};

const HeaderStyles = StyleSheet.create({
  header: {
    // backgroundColor: '#6A4029',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default Header;
