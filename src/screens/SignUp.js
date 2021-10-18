import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {authRegister} from '../redux/actions/auth';
import {Input} from 'react-native-elements';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [balance] = useState('0');
  const [name] = useState('Your Name');

  const dispatch = useDispatch();

  const formData = {
    email: email,
    password: password,
    phone: phone,
    balance: balance,
    name: name,
  };

  const onSubmit = () => {
    if (formData.email.length > 6) {
      if (formData.phone.length >= 10) {
        if (formData.password.length >= 8) {
          dispatch(authRegister(formData, navigation));
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
    } else {
      ToastAndroid.showWithGravity(
        'Email is required',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.parent2}>
        <Text style={styles.h1}> Sign Up </Text>
        <Text style={styles.h2}>Daftar dengan Mudah disini</Text>
        <TouchableOpacity style={styles.btncode2}>
          <Input
            style={styles.input}
            // keyboardType="email-address"
            placeholder="Masukan Email"
            value={email}
            onChangeText={value => setEmail(value)}
          />
        </TouchableOpacity>
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
      </View>
      <View style={styles.bottom}>
        <Text style={styles.textBottom}>
          Dengan masuk atau daftar,kamu udah setuju sama Ketentuan Layanan dan
          Kebijakan Privasi OXO
        </Text>
        <TouchableOpacity onPress={onSubmit} style={styles.btn2}>
          <Text style={styles.btnText2}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
    marginTop: 20,
    marginRight: 20,
  },
  btncode: {
    backgroundColor: '#EAEDED',
    borderBottomWidth: 0,
    marginTop: 20,
    marginRight: 20,
  },
  btncode2: {
    backgroundColor: '#EAEDED',
    borderBottomWidth: 0,
    marginTop: 40,
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
