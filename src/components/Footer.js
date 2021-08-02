import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon5 from 'react-native-vector-icons/dist/Foundation';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.bottomrow}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.props.navigation.navigate('home')}>
          <Icon5 color="gray" style={styles.home} name="home" size={28} />
          <Text style={styles.textbottom}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Icon3 color="gray" style={styles.coupon} name="pricetag" size={25} />
          <Text style={styles.textbottom}>Deals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemCenter}>
          <Icon3
            style={styles.scanIcon}
            color="#5434a4"
            name="scan-circle"
            size={50}
          />
          <Text style={styles.textbottom}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <View style={styles.rp2}>
            <Text style={styles.rptext}>Rp</Text>
          </View>
          <Text style={styles.textbottom}>Finance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => this.props.navigation.navigate('profile')}>
          <Icon
            color="gray"
            style={styles.user}
            name="user-circle-o"
            size={28}
          />
          <Text style={styles.textbottom}>Profile</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
  },
  icon1: {
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 5,
    color: '#49268c',
    fontWeight: 'bold',
  },
  icon2: {
    textAlign: 'center',
    color: '#49268c',
    fontWeight: 'bold',
  },
  icon3: {
    textAlign: 'center',
    color: '#49268c',
  },
  textCenter1: {
    color: '#49268c',
  },
  textCenter2: {
    color: '#49268c',
  },
  textCenter3: {
    color: '#49268c',
  },
  bottomrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingTop: 5,
  },
  textbottom: {
    textAlign: 'center',
    color: 'gray',
  },
  rp2: {
    backgroundColor: 'gray',
    borderRadius: 20,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  home: {
    textAlign: 'center',
  },
  coupon: {
    textAlign: 'center',
  },
  user: {
    textAlign: 'center',
  },
  rptext: {
    textAlign: 'center',
    color: '#fff',
  },
  scan: {
    marginTop: -25,
    justifyContent: 'center',
  },
  rpWrap: {
    alignItems: 'center',
  },
  scanIcon: {
    alignItems: 'center',
    textAlign: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  itemCenter: {
    flex: 1,
    marginTop: -25,
    alignItems: 'center',
  },
});
