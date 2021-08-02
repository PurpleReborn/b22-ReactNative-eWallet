import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  // ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/dist/Feather';
import Icon5 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Footer from '../components/Footer';
import {connect} from 'react-redux';
import {getUser} from '../redux/actions/user';
import {authLogout} from '../redux/actions/auth';
import {BACKEND_URL} from '@env';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: false,
    };
  }
  componentDidMount() {
    const {token} = this.props.auth;
    this.props.getUser(token).then(() => {
      this.setState({
        picture: this.props.user.details.picture,
        name: this.props.user.details.name,
        balance: this.props.user.details.balance,
        phone: this.props.user.details.phone,
      });
    });
  }

  // onLogout = () => {
  //   const token = this.props.auth;
  //   this.props.authLogout(token).then(() => {
  //     this.setState({
  //       isUpdate: !this.state.isUpdate,
  //     });
  //     ToastAndroid.showWithGravity(
  //       'Success update data!',
  //       ToastAndroid.LONG,
  //       ToastAndroid.TOP,
  //     );
  //   });
  // };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.child}>
          <View style={styles.parent1}>
            <Text style={styles.h1}>Profile </Text>
            <TouchableOpacity style={styles.box1}>
              {this.props.user.details.picture !== null ? (
                <Image
                  style={styles.img}
                  source={{
                    uri: `${BACKEND_URL}${this.props.user.details.picture}`,
                  }}
                />
              ) : (
                <Icon color="#D7DBDD" name="user-circle" size={40} />
              )}
              {/* <Icon color="#D7DBDD" name="user-circle" size={40} /> */}
              <View style={styles.right}>
                <Text style={styles.name}>{this.props.user.details.name}</Text>
                <Text style={styles.number}>
                  {this.props.user.details.phone}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.box2}>
              <View style={styles.box2row}>
                <Icon2
                  style={styles.iconovo}
                  color="#909497"
                  size={30}
                  name="dot-circle-o"
                />
                <Text style={styles.ovoPremier}>OVO Premier</Text>
              </View>
              <View>
                <Text>Lihat Detail</Text>
              </View>
            </View>
          </View>
          <View style={styles.box3}>
            <Text style={styles.ovoid}>OVO ID</Text>
            <View style={styles.box3row}>
              <View style={styles.qrwrap}>
                <Icon3 size={25} name="qrcode-scan" />
                <Text style={styles.box3text}>QR Code</Text>
              </View>
              <View style={styles.qrwrap}>
                <Icon3 size={25} name="barcode-scan" />
                <Text style={styles.box3text}>Loyalty</Text>
              </View>
            </View>
          </View>
          <View style={styles.box4}>
            <Text style={styles.akun}>Akun</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('editProfile')}
              style={styles.box4row}>
              <View style={styles.box4row2}>
                <Icon size={15} name="user-edit" />
                <Text style={styles.box4text}>Ubah Profile</Text>
              </View>
              <Icon4 size={18} name="chevron-right" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box4row}>
              <View style={styles.box4row2}>
                <Icon2 size={15} name="credit-card-alt" />
                <Text style={styles.box4text}>My Cards</Text>
              </View>
              <Icon4 size={18} name="chevron-right" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.box4row}>
              <View style={styles.box4row2}>
                <Icon5 size={20} name="mixer" />
                <Text style={styles.box4text}>Kode Promo</Text>
              </View>
              <Icon4 size={18} name="chevron-right" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.authLogout} style={styles.box4row}>
              <View style={styles.box4row2}>
                <Icon5 size={25} name="logout" />
                <Text style={styles.box4text}>Log out</Text>
              </View>
              <Icon4 size={18} name="chevron-right" />
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

const mapDispatchToProps = {getUser, authLogout};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  child: {
    flex: 1,
  },
  box1: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#D7DBDD',
    marginHorizontal: 30,
    paddingBottom: 10,
  },
  h1: {
    fontSize: 20,
    fontWeight: '700',
    paddingTop: 70,
    paddingLeft: 30,
    paddingBottom: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  right: {
    paddingLeft: 20,
  },
  box2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 10,
  },
  box2row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ovoPremier: {
    paddingLeft: 15,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  parent1: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  box3: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  box3row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 25,
    borderRadius: 10,
  },
  ovoid: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  qrwrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#D7DBDD',
  },
  box3text: {
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  box4row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 35,
  },
  box4row2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box4: {
    marginTop: 10,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  akun: {
    paddingVertical: 25,
    fontWeight: 'bold',
  },
  box4text: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  number: {
    color: 'gray',
  },
  img: {
    width: 50,
    height: 50,
  },
});
