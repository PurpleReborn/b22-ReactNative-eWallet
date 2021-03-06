import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {getUser, updateProfile} from '../redux/actions/user';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BACKEND_URL} from '@env';
import {Formik} from 'formik';
// const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

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
    if (prevState.isUpdate !== this.state.isUpdate) {
      const {token} = this.props.auth;
      this.props.getUser(token);
    }
    console.log(prevState.isUpdate);
    console.log(this.state.isUpdate);
  }

  componentDidMount() {
    const {token} = this.props.auth;
    this.props.getUser(token);
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
      if (data.name !== '' && data.phone !== '' && data.email !== '') {
        this.props.updateProfile(token, data).then(() => {
          this.setState({
            isUpdate: !this.state.isUpdate,
          });
        });
        ToastAndroid.showWithGravity(
          'Success update data!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Form tidak boleh kosong',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
    } else {
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        picture: this.state.picture,
      };
      // console.log(data);
      if (data.name !== '' && data.phone !== '' && data.email !== '') {
        this.props.updateProfile(token, data).then(() => {
          this.setState({
            isUpdate: !this.state.isUpdate,
          });
        });
        ToastAndroid.showWithGravity(
          'Success update data!',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Form tidak boleh kosong',
          ToastAndroid.LONG,
          ToastAndroid.TOP,
        );
      }
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

  onPick = () => {
    Alert.alert('Select Picture', 'Please choose a picture', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Gallery',
        onPress: () => launchImageLibrary({quality: 1}, this.selectPicture),
      },
      {
        text: 'Camera',
        onPress: () => launchCamera({quality: 1}, this.selectPicture),
      },
    ]);
  };

  selectPicture = e => {
    if (!e.didCancel) {
      const maxSize = 1024 * 1024 * 2;
      if (e.assets[0].fileSize < maxSize) {
        if (
          e.assets[0].type === 'image/jpeg' ||
          e.assets[0].type === 'image/jpg' ||
          e.assets[0].type === 'image/png'
        ) {
          this.setState({
            pictureUri: e.assets[0].uri,
            picture: e.assets[0],
          });
        } else {
          ToastAndroid.showWithGravity(
            'Not a picture',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      } else {
        ToastAndroid.showWithGravity(
          'file To Large',
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        this.setState({
          pictureUri: '',
          picture: null,
        });
      }
    }
  };

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
  //   if (!e.didCancel) {
  //     this.setState({
  //       pictureUri: e.assets[0].uri,
  //       picture: e.assets[0],
  //     });
  //   }
  // };

  // selectPict = e => {
  //   // let options = {
  //   //   mediaType: 'photo',
  //   //   maxWidth: 150,
  //   //   maxHeight: 150,
  //   // };
  //   launchImageLibrary({}, response => {
  //     if (!response.didCancel) {
  //       const maxSize = 1024 * 1024 * 2;
  //       if (response.assets[0].fileSize < maxSize) {
  //         this.setState({
  //           // picture: response.assets[0],
  //           picture: response.assets[0].uri,
  //         });
  //       } else {
  //         ToastAndroid.showWithGravity(
  //           'Picture max size 2MB',
  //           ToastAndroid.LONG,
  //           ToastAndroid.TOP,
  //         );
  //       }
  //     }
  //   });
  // };

  // selectLaunch = e => {
  //   let options = {
  //     mediaType: 'photo',
  //     maxWidth: 150,
  //     maxHeight: 150,
  //   };
  //   launchCamera(options, response => {
  //     if (!response.didCancel) {
  //       this.setState({
  //         // picture: response.assets[0],
  //         picture: response.assets[0].uri,
  //       });
  //     }
  //   });
  // };

  render() {
    return (
      <KeyboardAvoidingView
        contentContainerStyle={styles.avoid}
        style={styles.avoid}
        behavior="position">
        <ScrollView style={styles.avoid} contentContainerStyle={styles.scroll}>
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
                    {/* {this.props.user.details.picture !== '' ? (
                      <Image
                        style={styles.image}
                        source={{
                          uri: `${BACKEND_URL}${this.props.user.details.picture}`,
                        }}
                      />
                    ) : (
                      <Image
                        style={styles.image}
                        source={{
                          uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                        }}
                      />
                    )} */}

                    {this.props.user.details.picture !== null && (
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
                    {this.props.user.details.picture === null && (
                      <Image
                        style={styles.image}
                        source={
                          this.state.pictureUri === ''
                            ? {
                                uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
                              }
                            : {
                                uri: this.state.pictureUri,
                              }
                        }
                      />
                    )}

                    <TouchableOpacity onPress={this.onPick}>
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
        </ScrollView>
      </KeyboardAvoidingView>
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
    // backgroundColor: '#fff',
  },
  // avoid: {
  //   backgroundColor: '#fff',
  // },
  // scroll: {
  //   backgroundColor: 'white',
  // },
  parent2: {
    flex: 1,
    // backgroundColor: '#fff',
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
    color: '#49268c',
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
    marginTop: 20,
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
