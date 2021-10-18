import React, {Component} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Icon3 from 'react-native-vector-icons/dist/Ionicons';
import Icon4 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';

import {TouchableOpacity} from 'react-native';
import {authNotifToken} from '../redux/actions/auth';

class Home extends Component {
  componentDidMount() {
    const {token} = this.props.auth;
    const {notifToken} = this.props.auth;
    this.props.authNotifToken(token, notifToken);
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
              <Text style={styles.h1}> OXO </Text>
            </View>
            <Text style={styles.ovocash}>OXO Cash</Text>
            <View style={styles.row2}>
              <Text style={styles.rp}>Rp</Text>
              <Text style={styles.saldo}>
                {this.props.user.details.balance}
              </Text>
            </View>
            <View style={styles.row3}>
              <Text style={styles.textpoint}>OXO Points</Text>
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
          <View style={styles.trxWrap}>
            <TouchableOpacity style={styles.flashWrap}>
              <Icon5
                style={styles.flash}
                size={35}
                name="shield-check"
                color="#F1C40F"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('trxDetail')}
              style={styles.cellWrap}>
              <Icon3
                style={styles.cell}
                size={35}
                color="#3498DB"
                name="bar-chart-sharp"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.gameWrap}>
              <Icon3
                style={styles.game}
                size={35}
                color="#C8F557"
                name="md-umbrella"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tvWrap}>
              <Icon2
                style={styles.tv}
                size={35}
                color="#FF6252"
                name="appstore1"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoWrap}>
            <View style={styles.infoWrap2}>
              <Text style={styles.infoText}>Info dan Promo Spesial</Text>
              <Text style={styles.infoText2}>Lihat Semua</Text>
            </View>
            <View style={styles.contentWrap}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}>
                <View style={styles.content} />
                <View style={styles.content} />
                {/* <Text style={styles.test2}>1</Text>
                <Text>1</Text>
                <Text>1</Text> */}
              </ScrollView>
            </View>
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

const mapDispatchToProps = {getUser, authNotifToken};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
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
    marginBottom: 20,
  },
  infoWrap: {
    borderTopWidth: 8,
    borderColor: '#ECF0F1',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoText2: {
    color: '#3AE6EB',
  },
  infoWrap2: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  content: {
    height: 150,
    width: 320,
    backgroundColor: '#685ad5',
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 10,
  },
  contentWrap: {
    height: 150,
    flexDirection: 'row',
  },
  test2: {
    paddingRight: 400,
  },
});
