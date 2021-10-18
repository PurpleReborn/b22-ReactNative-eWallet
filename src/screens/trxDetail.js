import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import {transaction} from '../redux/actions/trx';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';
// import {Input} from 'react-native-elements';
import PushNotification from 'react-native-push-notification';

// setTimeout(() => {
//   PushNotification.localNotification({
//     channelId: 'general-notif',
//     title: 'OVO',
//     message: 'Payment Success',
//   });
// }, 2000);

class trxDetail extends Component {
  state = {
    deductedBalance: 0,
    description: 'Beli Pulsa',
    trxFee: 1000,
    refNo: 0,
    amount: 0,
    items: [
      {id: '1', name: '5.000', value: '5000', selected: 'yes'},
      {id: '2', name: '10.000', value: '10000', selected: 'no'},
      {id: '3', name: '15.000', value: '15000', selected: 'no'},
      {id: '4', name: '20.000', value: '20000', selected: 'no'},
      {id: '5', name: '25.000', value: '25000', selected: 'yes'},
      {id: '6', name: '30.000', value: '30000', selected: 'no'},
      {id: '7', name: '50.000', value: '50000', selected: 'no'},
      {id: '8', name: '100.000', value: '100000', selected: 'no'},
    ],
    selectedId: '0',
  };

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

  OnTrx = () => {
    const {token} = this.props.auth;
    const formData = {
      deductedBalance: this.state.deductedBalance,
      description: this.state.description,
      trxFee: this.state.trxFee,
      refNo: this.state.refNo,
    };
    if (this.state.refNo >= 9) {
      if (this.state.deductedBalance >= 5000) {
        this.props.transaction(token, formData).then(() => {
          this.props.getUser(token);
        });
        this.props.navigation.navigate('home');
      } else {
        ToastAndroid.showWithGravity(
          'Minimum Pembayaran 5.000',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } else {
      ToastAndroid.showWithGravity(
        'Masukan nomor Ponsel dengan minimal 10 Angka',
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
              <Text style={styles.h1}> Pulsa dan Paket Data </Text>
            </View>
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.atau}>Nomor Ponsel</Text>
            <TextInput
              style={styles.input}
              placeholder="+62"
              keyboardType="number-pad"
              backgroundColor="#F2F3F4"
              value={this.state.refNo}
              onChangeText={val => this.setState({refNo: val})}
            />
          </View>
          <View style={styles.inputWrap3}>
            <Text style={styles.atau}>
              Nominal Pulsa :{' '}
              <Text style={styles.total}> {this.state.deductedBalance}</Text>
            </Text>
          </View>
          <View style={styles.box2}>
            <FlatList
              numColumns={2}
              data={this.state.items}
              // extraData={selectedAmountId}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.handleOnPress(item)}
                    style={
                      item.id === this.state.selectedId // <-- match id property
                        ? styles.boxrp2
                        : styles.boxrp
                    }>
                    <Text style={styles.rp}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.OnTrx()} style={styles.btn}>
            <Text style={styles.btnText}>Bayar Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction,
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {transaction, getUser};

export default connect(mapStateToProps, mapDispatchToProps)(trxDetail);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
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
    paddingVertical: 5,
    backgroundColor: '#F8F9F9',
    paddingHorizontal: 20,
  },
  nominalRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: '#F8F9F9',
    paddingHorizontal: 20,
  },
  nominalRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 15,
    backgroundColor: '#F8F9F9',
    paddingHorizontal: 20,
  },
  box2: {
    // marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pilih: {
    fontWeight: 'bold',
    color: '#7B7D7D',
    paddingHorizontal: 20,
  },
  boxrp: {
    borderRadius: 10,
    paddingHorizontal: 13,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 7,
    backgroundColor: '#fff',
    width: 155,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#EAEDED',
  },
  boxrp2: {
    borderRadius: 10,
    paddingHorizontal: 13,
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 7,
    backgroundColor: '#fff',
    width: 155,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#49268c',
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    marginBottom: 10,
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
  inputWrap: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  rp: {
    fontWeight: 'bold',
  },
  input3: {
    fontSize: 16,
    paddingVertical: 5,
  },
  inputWrap3: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  total: {
    color: 'black',
    fontSize: 16,
  },
});
