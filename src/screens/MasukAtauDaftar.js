import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {authLogin} from '../redux/actions/auth';

class MasukAtauDaftar extends Component {
  state = {
    phone: '',
    password: '',
  };

  onLogin = () => {
    const {phone, password} = this.state;
    this.props.authLogin(phone, password).then(() => {
      if (this.props.auth.errMsg === '') {
        ToastAndroid.showWithGravity(
          'Login success',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        return this.props.navigation.navigate('home');
      } else {
        ToastAndroid.showWithGravity(
          `${this.props.auth.errMsg}`,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
      }
    });
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parent2}>
          <Text style={styles.h1}> Masuk atau Daftar </Text>
          <Text style={styles.h2}>
            Masuk atau daftar cuma butuh nomor HP aja.
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Input
              style={styles.input}
              keyboardType="number-pad"
              placeholder="+62"
              value={this.state.phone}
              onChangeText={val => this.setState({phone: val})}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btncode}>
            <Input
              style={styles.input}
              keyboardType="number-pad"
              placeholder="Masukan Security Code"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={val => this.setState({password: val})}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.textBottom}>
            Dengan masuk atau daftar,kamu udah setuju sama Ketentuan Layanan dan
            Kebijakan Privasi OVO
          </Text>
          <TouchableOpacity onPress={this.onLogin} style={styles.btn2}>
            <Text style={styles.btnText2}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {authLogin};

export default connect(mapStateToProps, mapDispatchToProps)(MasukAtauDaftar);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  parent2: {
    marginLeft: 20,
    flex: 1,
  },
  h1: {
    marginTop: 80,
    fontWeight: 'bold',
    fontSize: 24,
  },
  h2: {
    fontSize: 15,
    paddingLeft: 7,
  },
  btn: {
    backgroundColor: '#EAEDED',
    borderBottomWidth: 0,
    marginTop: 40,
    marginRight: 20,
  },
  btncode: {
    backgroundColor: '#EAEDED',
    borderBottomWidth: 0,
    marginTop: 20,
    marginRight: 20,
  },
  btn2: {
    backgroundColor: '#49268c',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  btnText2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBottom: {
    marginHorizontal: 20,
    marginVertical: 20,
    lineHeight: 20,
  },
  bottom: {
    elevation: 24,
  },
});
