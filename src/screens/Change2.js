import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import {Input} from 'react-native-elements';
import {changePassword} from '../redux/actions/user';
import {connect, useSelector, useDispatch} from 'react-redux';

const Change2 = ({props, navigation}) => {
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const {token} = useSelector(state => state.auth);
  // console.log(token, 'chaneg');
  const formData = {
    password: password,
  };

  const onSubmit = () => {
    if (formData.password.length >= 8) {
      dispatch(changePassword(token, formData, navigation));
    } else {
      ToastAndroid.showWithGravity(
        'Password Must be length more than 8 Characters',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  return (
    <View style={styles.parent}>
      <View style={styles.parent2}>
        <View style={styles.parent3}>
          <Text style={styles.h1}>UBAH SECURITY CODE</Text>
        </View>
        <Text style={styles.h2}>Buat Security Code baru</Text>
        <Text style={styles.h3}>
          Security Code digunakan untuk masuk ke akun Anda dan bertransaksi
        </Text>
        <TouchableOpacity style={styles.btncode2}>
          <Input
            style={styles.input}
            secureTextEntry={true}
            keyboardType="number-pad"
            placeholder="Masukan Security Code"
            value={password}
            onChangeText={value => setPassword(value)}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSubmit} style={styles.btn2}>
          <Text style={styles.btnText2}>Oke</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = {changePassword};

export default connect(mapStateToProps, mapDispatchToProps)(Change2);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  parent2: {
    flex: 1,
    backgroundColor: '#fff',
  },
  parent3: {
    backgroundColor: '#49268c',
    height: 70,
    justifyContent: 'center',
    paddingLeft: 60,
  },
  h1: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  h2: {
    textAlign: 'center',
    marginTop: 40,
    fontWeight: 'bold',
    color: '#49268c',
    fontSize: 16,
  },
  h3: {
    textAlign: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    color: 'black',
  },
  btncode2: {
    marginHorizontal: 20,
    marginVertical: 30,
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
});
