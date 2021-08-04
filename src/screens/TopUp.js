import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {topUp} from '../redux/actions/topUp';
import {connect} from 'react-redux';

import PushNotification from 'react-native-push-notification';
import {authNotifToken} from '../redux/actions/auth';

class TopUp extends Component {
  state = {
    deductedBalance: 0,
  };

  // componentDidMount() {
  //   const {token, notifToken} = this.props.auth;
  //   this.props.authNotifToken(token, notifToken);
  // }

  OnTopUp = () => {
    const {token} = this.props.auth;
    const formData = {
      deductedBalance: this.state.deductedBalance,
    };
    this.props.topUp(formData, token).then(() => {
      if (this.props.auth.errMsg === '') {
        setTimeout(() => {
          PushNotification.localNotification({
            channelId: 'general-notif',
            title: 'OVO',
            message: 'Top Up Success',
          });
        }, 2000);
        ToastAndroid.showWithGravity(
          'Mobile Topup success',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
        return this.props.navigation.reset({
          routes: [{name: 'home'}],
        });
      } else {
        ToastAndroid.showWithGravity(
          `${this.props.auth.errMsg}`,
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    });
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.child}>
          <View style={styles.parent2}>
            <View style={styles.parent3}>
              <Text style={styles.h1}> Top Up </Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.h2}>Top Up ke</Text>
              <TouchableOpacity style={styles.row1}>
                <View style={styles.ovo}>
                  <Text style={styles.ovotext}>OVO</Text>
                </View>
                <View>
                  <Text style={styles.h3}>OVO Cash</Text>
                  <Text>
                    Balance Rp <Text>0</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.box2}>
            <Text style={styles.pilih}>Pilih Nominal Top Up</Text>
            <View style={styles.nominalRow}>
              <View style={styles.boxrp}>
                <Text>
                  Rp<Text>100.000</Text>
                </Text>
              </View>
              <View style={styles.boxrp}>
                <Text>
                  Rp<Text>100.000</Text>
                </Text>
              </View>
              <View style={styles.boxrp}>
                <Text>
                  Rp<Text>100.000</Text>
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.atau}>
                Atau masukkan nominal top up di sini
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Minimal Rp.10.000"
                backgroundColor="#EAEDED"
                value={this.state.deductedBalance}
                onChangeText={val => this.setState({deductedBalance: val})}
              />
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.OnTopUp()} style={styles.btn}>
            <Text style={styles.btnText}>Top Up Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  topUp: state.topUp,
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {topUp, authNotifToken};

export default connect(mapStateToProps, mapDispatchToProps)(TopUp);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  parent2: {
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
    fontSize: 17,
    fontWeight: 'bold',
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
  row1: {
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#EAEDED',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  h2: {
    fontWeight: 'bold',
    paddingBottom: 10,
    fontSize: 15,
  },
  h3: {
    fontWeight: 'bold',
  },
  box1: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  nominalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  box2: {
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  pilih: {
    fontWeight: 'bold',
  },
  boxrp: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#EAEDED',
    paddingHorizontal: 13,
    paddingVertical: 7,
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginBottom: 40,
  },
  atau: {
    color: '#7B7D7D',
  },
  child: {
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#49268c',
    marginHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    marginVertical: 15,
  },
});
