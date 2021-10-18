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
import {getUser} from '../redux/actions/user';

import {authNotifToken} from '../redux/actions/auth';

class TopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deductedBalance: '0',
      items: [
        {id: '1', name: '10.000', value: '10000', selected: 'yes'},
        {id: '2', name: '50.000', value: '50000', selected: 'no'},
        {id: '3', name: '100.000', value: '100000', selected: 'no'},
      ],
      selectedId: '0',
    };
  }

  // componentDidMount() {
  //   const {token, notifToken} = this.props.auth;
  //   this.props.authNotifToken(token, notifToken);
  // }
  handleOnPress = item => {
    this.setState(
      {
        deductedBalance: item.value,
        selectedId: item.id,
      },
      () => {
        console.log(this.state.deductedBalance);
      },
    );
  };

  OnTopUp = () => {
    const {token} = this.props.auth;
    const formData = {
      deductedBalance: this.state.deductedBalance,
    };
    if (this.state.deductedBalance >= 10000) {
      this.props.topUp(formData, token).then(() => {
        this.props.getUser(token);
      });
      this.props.navigation.navigate('home');
    } else {
      ToastAndroid.showWithGravity(
        'Minimum TopUp 10.000',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
    }
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
                  <Text style={styles.ovotext}>OXO</Text>
                </View>
                <View>
                  <Text style={styles.h3}>OXO Cash</Text>
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
              {this.state.items.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => this.handleOnPress(item)}
                    // style={styles.boxrp}
                    style={
                      item.id === this.state.selectedId // <-- match id property
                        ? styles.boxrp2
                        : styles.boxrp
                    }>
                    <Text>
                      Rp
                      <Text>{item.name}</Text>
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {/* <TouchableOpacity
                onPress={e => this.setState({deductedBalance: '10000'})}
                style={styles.boxrp}>
                <Text>
                  Rp<Text>10.000</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={e => this.setState({deductedBalance: '50000'})}
                style={styles.boxrp}>
                <Text>
                  Rp<Text>50.000</Text>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={e => this.setState({deductedBalance: '100000'})}
                style={styles.boxrp}>
                <Text>
                  Rp<Text>100.000</Text>
                </Text>
              </TouchableOpacity> */}
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

const mapDispatchToProps = {topUp, authNotifToken, getUser};

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
  boxrp2: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#49268c',
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
  textBox: {
    color: 'red',
  },
  textBoxSelected: {
    color: 'blue',
  },
});
