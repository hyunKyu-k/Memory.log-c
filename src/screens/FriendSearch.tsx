import React, {useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import {SearchBar, ListItem, Overlay, Button} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import FriendList from '../screens/FriendList';

const Stack = createStackNavigator();

const FriendSearch = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const updateSearch = (search) => {
    setSearch(search);
  };

  const moveToFriendList = () => {
    navigation.navigate(FriendList);
  };

  const onPressFollowIcon = () => {
    return fetch('http://localhost:4000/follow/rfollow', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: search,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((follower) => {
        toggleOverlay();
        moveToFriendList();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onPressSearchIcon = () => {
    if (!search) {
      return;
    }
    return fetch('http://localhost:4000/user/userinfo', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: search,
      }),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res === null) {
          setList([]);
        } else {
          setList([]);
          setList((prevState) => [...prevState, res]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperView}>
        <Text style={styles.upperView__title}>친구 찾기</Text>
        <View style={styles.upperView__lower}>
          <SearchBar
            containerStyle={styles.upperView__lower__search}
            placeholder="친구의 e-mail을 입력해 주세요."
            onChangeText={updateSearch}
            value={search}
            lightTheme={true}
            platform="ios"
            cancelButtonTitle=""
            autoCapitalize="none"
          />
          <Button
            style={styles.upperView__lower__button}
            title="검색"
            type="solid"
            onPress={() => {
              onPressSearchIcon();
            }}
          />
        </View>
      </View>
      <View style={styles.midView} />
      <View style={styles.lowerView}>
        <Text style={styles.lowerView__title}>검색 결과</Text>
        <View>
          {list.map((ele, i) => (
            <ListItem
              key={i}
              leftAvatar={{
                source: {uri: 'https://picsum.photos/400/400'},
                size: 'large',
              }}
              containerStyle={styles.lowerView__friend}
              title={ele.username}
              titleStyle={styles.lowerView__friend__username}
              subtitle={ele.statusmessage}
              subtitleStyle={styles.lowerView__friend__subtitle}
              bottomDivider
              rightIcon={{
                name: 'ios-person-add-sharp',
                type: 'ionicon',
                onPress: toggleOverlay,
              }}
            />
          ))}
        </View>
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={styles.overlayStyle}>
          <View style={styles.overlayStyle__body}>
            <View style={styles.overlayStyle__upper}>
              <Text style={styles.overlayStyle__upper__text}>
                이 친구와 추억 공유를 {'\n'} 시작 하시겠습니까?
              </Text>
            </View>
            <View style={styles.overlayStyle__lower}>
              <Button
                containerStyle={styles.overlayStyle__lower__button}
                title="취소"
                type="outline"
                onPress={toggleOverlay}
              />
              <Button
                containerStyle={styles.overlayStyle__lower__button}
                title="확인"
                type="outline"
                onPress={onPressFollowIcon}
              />
            </View>
          </View>
        </Overlay>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperView: {
    flex: 2,
  },
  upperView__title: {
    fontSize: 30,
    marginTop: 20,
    marginLeft: 20,
  },
  upperView__lower: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  upperView__lower__search: {
    marginLeft: 35,
    marginRight: 50,
  },
  upperView__lower__button: {
    marginTop: 25,
    marginRight: 44,
    // backgroundColor: '#D3D3D3',
  },
  midView: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  lowerView: {
    flex: 8,
  },
  lowerView__title: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  lowerView__friend: {
    marginTop: 5,
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 20,
    marginRight: 20,
  },
  lowerView__friend__title: {
    fontSize: 20,
  },
  lowerView__friend__username: {
    position: 'absolute',
    fontSize: 30,
    bottom: 10,
  },
  lowerView__friend__subtitle: {
    position: 'absolute',
    fontSize: 18,
    bottom: -30,
  },
  overlayStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    height: 200,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  overlayStyle__body: {
    flex: 1,
  },
  overlayStyle__upper: {
    flex: 7,
  },
  overlayStyle__upper__text: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 25,
    lineHeight: 40,
    // textShadowColor: '#808080',
    // textShadowOffset: {width: 2, height: 2},
    // textShadowRadius: 4,
  },
  overlayStyle__lower: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  overlayStyle__lower__button: {
    width: 80,
    height: 50,
  },
});

export default FriendSearch;
