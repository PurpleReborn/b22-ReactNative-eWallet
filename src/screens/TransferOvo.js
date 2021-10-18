import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Input} from 'react-native-elements';

import {Formik} from 'formik';
import {connect} from 'react-redux';
import {transferByPhone} from '../redux/actions/transfer';
import {getUser} from '../redux/actions/user';
import {authNotifToken} from '../redux/actions/auth';

class TransferOvo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props.auth;
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.props.getUser(token);
    }
  }

  transfer = values => {
    const {token} = this.props.auth;
    const data = {
      phoneNumberRecipient: values.phoneNumberRecipient,
      deductedBalance: values.deductedBalance,
      description: values.description,
    };
    if (data.deductedBalance !== '') {
      this.props.transferByPhone(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });

        return this.props.navigation.reset({
          routes: [{name: 'home'}],
        });
      });
    } else {
      ToastAndroid.showWithGravity(
        'Masukan Nomor Ponsel dan Nominal',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <Formik
            initialValues={{
              phoneNumberRecipient: '',
              deductedBalance: '',
              description: '',
            }}
            onSubmit={values => this.transfer(values)}>
            {({handleChange, handleBlur, handleSubmit, errors, values}) => (
              <View style={styles.parent}>
                <View style={styles.parent2}>
                  <View style={styles.parent3}>
                    <Text style={styles.h1}> KE SESAMA OXO </Text>
                  </View>
                  <View style={styles.inputWrap}>
                    <Input
                      style={styles.input}
                      placeholderTextColor="#566573"
                      placeholder="Masukkan nomor ponsel"
                      keyboardType="number-pad"
                      onChangeText={handleChange('phoneNumberRecipient')}
                      onBlur={handleBlur('phoneNumberRecipient')}
                      value={values.phoneNumberRecipient}
                    />
                  </View>
                  <View style={styles.box1}>
                    <Text style={styles.h2}>Sumber Dana</Text>
                    <TouchableOpacity style={styles.row1}>
                      <View style={styles.ovo}>
                        <Text style={styles.ovotext}>OXO</Text>
                      </View>
                      <View>
                        <Text style={styles.h3}>OXO Cash</Text>
                        <Text>
                          Balance Rp{' '}
                          <Text>{this.props.user.details.balance}</Text>
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.boxRp}>
                    <Text style={styles.nominal}>Nominal Transfer</Text>
                    <TextInput
                      style={styles.input2}
                      placeholder="Rp0"
                      placeholderTextColor="#000"
                      type="number"
                      keyboardType="number-pad"
                      onChangeText={handleChange('deductedBalance')}
                      onBlur={handleBlur('deductedBalance')}
                      value={values.deductedBalance}
                    />
                  </View>
                  <View style={styles.inputWrap}>
                    <Input
                      style={styles.input}
                      placeholderTextColor="#566573"
                      placeholder="Pesan (opsional)"
                      onChangeText={handleChange('description')}
                      onBlur={handleBlur('description')}
                      value={values.description}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnText}>LANJUTKAN</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  transfers: state.transfers,
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {authNotifToken, transferByPhone, getUser};

export default connect(mapStateToProps, mapDispatchToProps)(TransferOvo);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  parent2: {
    flex: 1,
  },
  parent3: {
    backgroundColor: '#49268c',
    height: 70,
    justifyContent: 'center',
    paddingLeft: 60,
  },
  h1: {
    color: '#fff',
    fontSize: 17,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  },
  btn: {
    backgroundColor: '#78D5D9',
    marginHorizontal: 30,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
  },
  input2: {
    fontSize: 22,
    paddingVertical: 5,
    paddingBottom: 20,
  },
  inputWrap: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  box1: {
    paddingHorizontal: 30,
  },
  h2: {
    paddingBottom: 10,
    fontSize: 15,
    color: '#616A6B',
  },
  row1: {
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#EAEDED',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  ovo: {
    backgroundColor: '#49268c',
    color: '#fff',
    width: 40,
    height: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ovotext: {
    color: '#fff',
  },
  h3: {
    fontWeight: 'bold',
  },
  boxRp: {
    backgroundColor: '#E5E8E8',
    marginHorizontal: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 30,
  },
  nominal: {
    color: '#566573',
  },
});
