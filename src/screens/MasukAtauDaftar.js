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
import {useState} from 'react';
import {useDispatch} from 'react-redux';

const MasukAtauDaftar = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const formData = {
    phone: phone,
    password: password,
  };

  const onLogin = () => {
    if (formData.phone.length >= 10) {
      if (formData.password.length >= 8) {
        dispatch(authLogin(formData, navigation));
      } else {
        ToastAndroid.showWithGravity(
          'Password Must be length more than 8 Characters',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Phone number Must be length more than 10 number',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

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
            value={phone}
            onChangeText={value => setPhone(value)}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btncode}>
          <Input
            style={styles.input}
            keyboardType="number-pad"
            placeholder="Masukan Security Code"
            secureTextEntry={true}
            value={password}
            onChangeText={value => setPassword(value)}
          />
        </TouchableOpacity>
        <View style={styles.belum}>
          <Text style={styles.belumText}>Belum punya akun?</Text>
        </View>

        <TouchableOpacity
          style={styles.masuk}
          onPress={() => navigation.navigate('signUp')}>
          <Text style={styles.masukText}>Daftar disini</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.textBottom}>
          Dengan masuk atau daftar,kamu udah setuju sama Ketentuan Layanan dan
          Kebijakan Privasi OXO
        </Text>
        <TouchableOpacity onPress={onLogin} style={styles.btn2}>
          <Text style={styles.btnText2}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  // masuk: {
  // marginHorizontal: 10,
  // justifyContent: 'flex-end',
  // flexDirection: 'row',
  // },
  belum: {
    // marginHorizontal: 10,
    // justifyContent: 'flex-end',
    // flexDirection: 'row',
    marginTop: 10,
  },
  belumText: {
    fontSize: 15,
  },
  masukText: {
    color: '#49268c',
    fontSize: 15,
  },
});
