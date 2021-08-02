import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {getUser, updateProfile} from '../redux/actions/user';
import {launchImageLibrary} from 'react-native-image-picker';
import {BACKEND_URL} from '@env';
import {Formik} from 'formik';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      picture: 'null',
      pictureUri: '',
      isUpdate: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {token} = this.props.auth;
    if (prevState.isUpdate !== this.state.isUpdate) {
      this.props.getUser(token);
    }
  }

  onUpdate = values => {
    const token = this.props.auth;
    if (this.state.pictures === null) {
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      // console.log(data);
      this.props.updateProfile(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        ToastAndroid.showWithGravity(
          'Success update data!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
    } else {
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        picture: this.state.picture,
      };
      // console.log(data);
      this.props.updateProfile(token, data).then(() => {
        this.setState({
          isUpdate: !this.state.isUpdate,
        });
        ToastAndroid.showWithGravity(
          'Success update data!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      });
    }
  };

  // onUpdate = () => {
  //   const token = this.props.auth;
  //   const formData = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     phone: this.state.phone,
  //     picture: this.state.picture,
  //   };
  //   this.props.updateProfile(formData, token).then(() => {
  //     if (this.props.auth.errMsg === '') {
  //       ToastAndroid.showWithGravity(
  //         'Update Success',
  //         ToastAndroid.LONG,
  //         ToastAndroid.TOP,
  //       );
  //       return this.props.navigation.reset({
  //         index: 0,
  //         routes: [{name: 'profile'}],
  //       });
  //     } else {
  //       ToastAndroid.showWithGravity(
  //         `${this.props.auth.errMsg}`,
  //         ToastAndroid.LONG,
  //         ToastAndroid.TOP,
  //       );
  //     }
  //   });
  // };

  // onPick = () => {
  //   Alert.alert('Option', 'Choose your image', [
  //     {
  //       text: 'Cancel',
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Camera',
  //       onPress: () => this.selectLaunch(),
  //     },
  //     {
  //       text: 'Galery',
  //       onPress: () => this.selectPict(),
  //     },
  //   ]);
  // };

  // selectPict = e => {
  //   let options = {
  //     mediaType: 'photo',
  //     maxWidth: 150,
  //     maxHeight: 150,
  //   };
  //   launchImageLibrary(options, response => {
  //     if (!response.didCancel) {
  //       this.setState({picture: response.assets[0].uri});
  //     }
  //   });
  // };

  selectPict = e => {
    if (!e.didCancel) {
      this.setState({
        pictureUri: e.assets[0].uri,
        picture: e.assets[0],
      });
    }
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: `${this.props.user.details.name}`,
          email: `${this.props.user.details.email}`,
          phone: `${this.props.user.details.phone}`,
        }}
        onSubmit={values => this.onUpdate(values)}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View style={styles.parent}>
            <View style={styles.parent2}>
              <View style={styles.parent3}>
                <Text style={styles.h1}>EDIT PROFILE</Text>
              </View>
              <View style={styles.parent4}>
                {this.props.user.details.picture === null ? (
                  <Image
                    style={styles.image}
                    source={
                      this.state.pictureUri === ''
                        ? {
                            uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                          }
                        : {uri: this.state.pictureUri}
                    }
                  />
                ) : (
                  <Image
                    style={styles.image}
                    source={
                      this.state.pictureUri === ''
                        ? {
                            uri: `${BACKEND_URL}${this.props.user.details.picture}`,
                          }
                        : {
                            uri: this.state.pictureUri,
                          }
                    }
                  />
                )}
                <TouchableOpacity
                  onPress={() =>
                    launchImageLibrary({quality: 0.5}, this.selectPict)
                  }>
                  <Text style={styles.perbarui}>Perbarui Foto Profile</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.parent5}>
                <Text style={styles.namaLengkap}>Nama Lengkap</Text>
                <Input
                  style={styles.input}
                  placeholderTextColor="#566573"
                  placeholder={this.props.user.details.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <Text style={styles.namaLengkap}>Nomor Ponsel</Text>
                <Input
                  style={styles.input}
                  placeholderTextColor="#566573"
                  placeholder={this.props.user.details.phone}
                  value={values.phone}
                  keyboardType="numeric"
                  onChangeText={handleChange('phone')}
                />
                <Text style={styles.namaLengkap}>Email</Text>
                <Input
                  style={styles.input}
                  placeholderTextColor="#566573"
                  placeholder={this.props.user.details.email}
                  value={values.email}
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.simpan}>
              <Text style={styles.simpanText}>SIMPAN</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
});

const mapDispatchToProps = {getUser, updateProfile};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

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
  parent4: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingTop: 40,
    alignItems: 'center',
    paddingBottom: 30,
  },
  parent5: {
    paddingHorizontal: 30,
  },
  namaLengkap: {
    marginLeft: 10,
  },
  perbarui: {
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#3AE6EB',
  },
  simpanText: {
    textAlign: 'center',
    color: '#fff',
  },
  simpan: {
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
