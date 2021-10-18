import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {connect} from 'react-redux';
import {
  historySender,
  historySender2,
  historyRecipient,
} from '../redux/actions/transfer';
import {Picker} from '@react-native-picker/picker';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      page: 1,
      itemSender: [],
      data: [],
      sort: '1',
    };
  }

  data = () => {
    const {token} = this.props.auth;
    const page = 1;
    const sort = this.state.sort;
    this.props.historySender(token, sort, page).then(() => {
      this.setState({data: this.props.transfers.dataSender});
      this.setState({page: 1});
    });
  };

  componentDidMount() {
    this.data();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort !== this.state.sort) {
      this.data();
    }
    console.log(prevState.sort);
    console.log(this.state.sort);
  }

  search = () => {
    const {token} = this.props.auth;
    const search = this.state.search;
    const sort = this.state.sort;
    const page = 1;
    this.props.historySender2(token, sort, search, page).then(() => {
      this.setState({itemSender: this.props.transfers.search});
      this.setState({page: 1});
    });
  };

  // loadMore = () => {
  //   const page = this.state.page;
  //   const {token} = this.props.auth;
  //   const search = this.state.search;
  //   if (this.state.page < this.props.transfers.pageInfo.totalPage) {
  //     this.setState(
  //       {
  //         page: this.state.page + 1,
  //       },
  //       () => {
  //         this.props.historySender(token, page, search);
  //         console.log(page);
  //       },
  //     );
  //   }
  // };

  dataSearch = () => {
    const {token} = this.props.auth;
    const search = this.state.search;
    const page = this.state.page;
    const sort = this.state.sort;
    if (search !== '') {
      this.props.historySender2(token, sort, search, page).then(() => {
        this.setState({
          itemSender: this.state.itemSender,
        });
      });
    } else {
      this.props.historySender(token, sort, page).then(() => {
        this.setState({
          data: this.state.data.concat(this.props.transfers.dataSender),
        });
      });
    }
  };

  loadMore = () => {
    const search = this.state.search;
    if (search !== '') {
      if (this.state.page < this.props.transfers.pageInfoSearch.totalPage) {
        this.setState(
          {
            page: this.state.page + 1,
          },
          () => {
            this.dataSearch();
          },
        );
      }
    } else {
      if (this.state.page < this.props.transfers.pageInfo.totalPage) {
        this.setState(
          {
            page: this.state.page + 1,
          },
          () => {
            this.dataSearch();
          },
        );
      }
    }
  };

  handleChange = val => {
    this.setState({
      search: val,
    });
  };

  render() {
    // console.log(this.state.page, 'page');
    return (
      <View style={styles.parent}>
        <View style={styles.parent3}>
          <Text style={styles.h1}> History </Text>
        </View>

        <View style={styles.search}>
          <Icon name="search" color="#000" size={20} />
          <TextInput
            onChangeText={this.handleChange}
            onSubmitEditing={() => this.search()}
            value={this.state.search}
            style={styles.searchText}
            placeholder="Search"
          />
        </View>
        <View style={styles.pickerWrap}>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerText}
            selectedValue={this.state.sort}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({sort: itemValue})
            }>
            <Picker.Item label="Terbaru" value="1" />
            <Picker.Item label="Terlama" value="2" />
          </Picker>
        </View>
        {this.state.search === '' ? (
          <FlatList
            // style={styles.flatList}
            vertical
            // scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <View style={styles.createdWrap}>
                  <Text style={styles.createdText}>
                    {item.createdAt.slice(0, 10)}
                  </Text>
                </View>
                <View style={styles.flatWrap}>
                  <View style={styles.flatItem}>
                    <Text style={styles.textName}>
                      Transfer to {item.userDetailRecipient.name}
                    </Text>
                  </View>
                  <View style={styles.flatItem}>
                    <Text style={styles.textBalance}>
                      {item.deductedBalance}
                    </Text>
                    <Text style={styles.outGoing}>{item.description}</Text>
                  </View>
                </View>
              </View>
            )}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
          />
        ) : (
          <FlatList
            // style={styles.flatList}
            vertical
            // scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={this.state.itemSender}
            renderItem={({item}) => (
              <View>
                <View style={styles.createdWrap}>
                  <Text style={styles.createdText}>
                    {item.createdAt.slice(0, 10)}
                    {/* {item.createdAt} */}
                  </Text>
                </View>
                <View style={styles.flatWrap}>
                  <View style={styles.flatItem}>
                    <Text style={styles.textName}>
                      Transfer to {item.userDetailRecipient.name}
                    </Text>
                  </View>
                  <View style={styles.flatItem}>
                    <Text style={styles.textBalance}>
                      {item.deductedBalance}
                    </Text>
                    <Text style={styles.outGoing}>{item.description}</Text>
                  </View>
                </View>
              </View>
            )}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transfers: state.transfers,
});

const mapDispatchToProps = {historySender, historySender2, historyRecipient};

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
  // box1: {
  //   paddingVertical: 20,
  // },
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
    width: '100%',
    flex: 1,
  },
  flatWrap: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D7DBDD',
    paddingHorizontal: 20,
  },
  textName: {
    fontWeight: 'bold',
  },
  outGoing: {
    color: 'gray',
  },
  createdWrap: {
    backgroundColor: '#D7DBDD',
    paddingHorizontal: 20,
    paddingVertical: 5,
    // height: 100,
  },
  createdText: {
    fontWeight: 'bold',
    color: 'gray',
  },
  search: {
    flexDirection: 'row',
    paddingLeft: 20,
    marginTop: 10,
    backgroundColor: '#D7DBDD',
    marginHorizontal: 50,
    height: 50,
    alignItems: 'center',
    borderRadius: 60,
  },
  searchText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#757473',
    paddingHorizontal: 16,
  },
  picker: {
    fontWeight: 'bold',
    width: 150,
  },
  pickerText: {
    fontWeight: 'bold',
  },
  pickerWrap: {
    alignItems: 'center',
  },
});
