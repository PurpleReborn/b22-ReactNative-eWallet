import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon4 from 'react-native-vector-icons/dist/Feather';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon2 from 'react-native-vector-icons/dist/MaterialCommunityIcons';

export default class Transfer extends Component {
  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.child}>
          <View style={styles.parent2}>
            <View style={styles.parent3}>
              <Text style={styles.h1}> TRANSFER </Text>
            </View>
            <View style={styles.box1}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('transferOvo')}
                style={styles.row1}>
                <View style={styles.row2}>
                  <Icon name="send-to-mobile" color="#5DCDD2" size={25} />
                  <Text style={styles.h3}>Ke Sesama OXO</Text>
                </View>
                <Icon4 size={18} name="chevron-right" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.row1}>
                <View style={styles.row2}>
                  <Icon2 name="bank-outline" color="#5DCDD2" size={25} />
                  <Text style={styles.h3}>Ke Rekening Bank</Text>
                </View>
                <Icon2 size={18} name="chevron-right" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
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
    justifyContent: 'space-between',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#EAEDED',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  box1: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  child: {
    flex: 1,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  h3: {
    paddingLeft: 15,
  },
});
