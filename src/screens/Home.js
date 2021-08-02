import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import Icon4 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';

import {TouchableOpacity} from 'react-native';

class Home extends Component {
  componentDidMount() {
    const {token} = this.props.auth;
    this.props.getUser(token);
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.parent2}>
          <LinearGradient
            colors={['#49268c', '#5434a4', '#685ad5']}
            style={styles.header}>
            <View style={styles.row1}>
              <Text style={styles.h1}> OVO </Text>
            </View>
            <Text style={styles.ovocash}>OVO Cash</Text>
            <View style={styles.row2}>
              <Text style={styles.rp}>Rp</Text>
              <Text style={styles.saldo}>
                {this.props.user.details.balance}
              </Text>
            </View>
            <View style={styles.row3}>
              <Text style={styles.textpoint}>OVO Points</Text>
              <Text style={styles.point}>0</Text>
            </View>
          </LinearGradient>
          <View style={styles.shadowbox}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.props.navigation.navigate('topUp')}>
              <Icon2 style={styles.icon1} size={30} name="pluscircleo" />
              <Text style={styles.textCenter1}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.props.navigation.navigate('transfer')}>
              <Icon3
                style={styles.icon2}
                size={38}
                name="arrow-up-circle-outline"
              />
              <Text style={styles.textCenter2}>Transfer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => this.props.navigation.navigate('history')}>
              <Icon4 style={styles.icon3} size={38} name="history" />
              <Text style={styles.textCenter3}>History</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.trxWrap}>
            <TouchableOpacity style={styles.flashWrap}>
              <Icon3
                style={styles.flash}
                size={35}
                name="flash"
                color="#F1C40F"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('trxDetail')}
              style={styles.cellWrap}>
              <Icon5
                style={styles.cell}
                size={35}
                color="#3498DB"
                name="cellphone-arrow-down"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gameWrap}>
              <Icon3
                style={styles.game}
                size={35}
                color="#C8F557"
                name="game-controller"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tvWrap}>
              <Icon4
                style={styles.tv}
                size={35}
                color="#FF6252"
                name="live-tv"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Footer navigation={this.props.navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = {getUser};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  parent2: {
    flex: 1,
  },
  header: {
    height: 190,
    // backgroundColor: '#49268c',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  h1: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  h12: {
    marginTop: 30,
    marginRight: 20,
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ovocash: {
    color: '#fff',
    marginLeft: 15,
    marginBottom: 5,
  },
  row2: {
    flexDirection: 'row',
    marginLeft: 15,
    marginBottom: 10,
  },
  row3: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  saldo: {
    fontSize: 20,
    color: '#fff',
    marginLeft: 5,
  },
  textpoint: {
    color: '#fff',
    marginRight: 10,
  },
  point: {
    color: '#F39C12',
  },
  rp: {
    color: '#fff',
  },
  shadowbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    marginTop: -30,
    borderRadius: 20,
    height: 80,
    paddingHorizontal: 10,
  },
  icon: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
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
    marginHorizontal: 20,
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
  },
  rpWrap: {
    alignItems: 'center',
  },
  flashWrap: {
    backgroundColor: '#FEF5E7',
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  cellWrap: {
    backgroundColor: '#EBF5FB',
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  gameWrap: {
    backgroundColor: '#EBF9E0',
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  tvWrap: {
    backgroundColor: '#FDEDEC',
    alignItems: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    borderRadius: 50,
  },
  trxWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 30,
  },
});
