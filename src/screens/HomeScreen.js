import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import img1 from '../images/ovo1.png';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <Text style={styles.h1}>OVO</Text>
        <Image style={styles.img1} source={img1} />
        <View>
          <Text style={styles.h2}>Solusi Cerdas Finansial</Text>
          <Text style={styles.h3}>
            Nikmati berbagai layanan finansial dan kemudahan pembayaran dalam
            genggaman
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('picker')}
          style={styles.btn}>
          <Text style={styles.btnText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#49268c',
  },
  h1: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  img1: {
    width: '100%',
    height: 460,
  },
  h2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 30,
  },
  h3: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    paddingTop: 5,
  },
  btn: {
    backgroundColor: 'white',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnText: {
    color: '#49268c',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
