import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon4 from 'react-native-vector-icons/dist/Feather';

import {connect} from 'react-redux';
import {historySender, historyRecipient} from '../redux/actions/transfer';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      pageSender: 1,
      pageRecipient: 1,
      historySender: [],
      historyRecipient: [],
    };
  }

  componentDidMount() {
    const {token} = this.props.auth;
    this.props.historySender(token, this.state.pageSender).then(() => {
      this.setState({
        historySender: this.props.transfers.dataSender,
      });
    });
    this.props.historyRecipient(token, this.state.pageRecipient).then(() => {
      this.setState({
        historyRecipient: this.props.transfers.dataRecipient,
      });
    });
  }

  loadMoreSender = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        pageSender: this.state.pageSender + 1,
      },
      () => {
        this.props.historySender(token, this.state.pageSender).then(() => {
          if (this.props.transfers.msgSender !== 'User Not Found') {
            this.setState({
              historySender: this.state.historySender.concat(
                this.props.transfers.dataSender,
              ),
            });
          }
        });
      },
    );
  };

  loadMoreRecipient = () => {
    const {token} = this.props.auth;
    this.setState(
      {
        pageRecipient: this.state.pageRecipient + 1,
      },
      () => {
        this.props
          .historyRecipient(token, this.state.pageRecipient)
          .then(() => {
            if (this.props.transfers.msgRecipient !== 'User Not Found') {
              this.setState({
                historyRecipient: this.state.historyRecipient.concat(
                  this.props.transfers.dataRecipient,
                ),
              });
            }
          });
      },
    );
  };

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.child}>
          <View style={styles.parent2}>
            <View style={styles.parent3}>
              <Text style={styles.h1}> History </Text>
            </View>
            <View style={styles.box1}>
              <TouchableOpacity
                onPress={() => this.setState({status: 'Sending'})}
                style={styles.row1}>
                <View style={styles.row2}>
                  <Text style={styles.tujuan}>Transfer</Text>
                  <Text style={styles.h3}>Ke Sesama OVO</Text>
                </View>
                <Icon4 size={18} name="chevron-right" />
              </TouchableOpacity>

              {this.state.status === 'Sending' && (
                <FlatList
                  style={styles.flatList}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  data={this.state.historySender}
                  renderItem={({item}) => (
                    <View style={styles.flatWrap}>
                      <View style={styles.flatItem}>
                        <Text style={styles.textName}>
                          Transfer to {item.userDetailRecipient.name}
                        </Text>
                        <Text style={styles.textDesc}>{item.description}</Text>
                      </View>
                      <View style={styles.flatItem}>
                        <Text style={styles.textBalance}>
                          {item.deductedBalance}
                        </Text>
                      </View>
                    </View>
                  )}
                  onEndReached={this.loadMoreSender}
                  onEndReachedThreshold={0}
                />
              )}

              <TouchableOpacity
                onPress={() => this.setState({status: 'Receive'})}
                style={styles.row1}>
                <View style={styles.row2}>
                  <Text style={styles.tujuan}>Receive</Text>
                  <Text style={styles.h3}>Ke Sesama OVO</Text>
                </View>
                <Icon4 size={18} name="chevron-right" />
              </TouchableOpacity>

              {this.state.status === 'Receive' && (
                <FlatList
                  style={styles.flatList}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id}
                  data={this.state.historyRecipient}
                  renderItem={({item}) => (
                    <View style={styles.flatWrap}>
                      <View style={styles.flatItem}>
                        <Text style={styles.textName}>
                          Recipient from {item.userDetailSender.name}
                        </Text>
                        <Text style={styles.textDesc}>{item.description}</Text>
                      </View>
                      <View style={styles.flatItem}>
                        <Text style={styles.textBalance}>
                          {item.deductedBalance}
                        </Text>
                      </View>
                    </View>
                  )}
                  onEndReached={this.loadMoreRecipientr}
                  onEndReachedThreshold={0}
                  // ListFooterComponent={
                  //   this.props.transfers.msgReceiver !== 'User Not Found' &&
                  //   footerComponent
                  // }
                  // ListFooterComponentStyle={styles.footer}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transfers: state.transfers,
});

const mapDispatchToProps = {historySender, historyRecipient};

export default connect(mapStateToProps, mapDispatchToProps)(History);

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
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAEDED',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box1: {
    paddingVertical: 20,
  },
  child: {
    flex: 1,
  },
  row2: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  h3: {
    color: '#909497',
  },
  flatList: {
    paddingHorizontal: 20,
  },
  flatWrap: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D7DBDD',
  },
});
