// import { AntDesign } from "@expo/vector-icons";
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {human, material, systemWeights} from 'react-native-typography';
import {useDispatch, useSelector} from 'react-redux';
import {handleFetchBookById} from '../redux/sclies';
import Loader from './Loader';
const BookFlatList = ({data}) => {
  const dispatch = useDispatch();

  // const { loading } = useSelector((state) => state.bookStore);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const ViewBook = useCallback(bookUrl => {
    setLoading(true);
    dispatch(handleFetchBookById(bookUrl)).then(() => {
      setLoading(false);
      navigation.navigate('viewBook');
    });
  }, []);

  const renderItem = ({item}) => {
    const subTitle = item?.volumeInfo?.subtitle
      ? `${item.volumeInfo.subtitle}`
      : 'no sunbtitle';

    const thumbnail = item?.volumeInfo?.imageLinks?.thumbnail
      ? item?.volumeInfo?.imageLinks?.thumbnail?.split(':')[0] +
        's:' +
        item?.volumeInfo?.imageLinks?.thumbnail?.split(':')[1]
      : 'https://www.pngkey.com/png/detail/123-1232158_blank-book-clip-art-at-clker-small-book.png';

    const title = item.volumeInfo.title ? item.volumeInfo.title : 'item.title';

    const publishedDate = item.volumeInfo.publishedDate;

    const rating =
      item?.volumeInfo?.averageRating % 1 === 0
        ? item?.volumeInfo?.averageRating + '.0'
        : item?.volumeInfo?.averageRating;

    return (
      <Pressable onPress={() => ViewBook(item?.selfLink)}>
        <View style={styles.item}>
          <View style={{flex: 1, justifyContent: 'center', display: 'flex'}}>
            <View
              style={{
                padding: 15,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 1.2,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}>
                {thumbnail && (
                  <Image
                    source={{
                      uri: thumbnail,
                    }}
                    style={styles.stretch}
                  />
                )}
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 3,
                  marginLeft: 15,
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: 'bold', color: '#4D506C'}}>
                  {title}
                </Text>
                <Text style={{color: '#4D506C', marginVertical: 5}}>
                  {subTitle.length > 30
                    ? subTitle.slice(0, 30) + '...'
                    : subTitle}
                </Text>
                <Text style={{color: '#DE7773', marginTop: 5}}>
                  {rating ? rating + ' | ' + publishedDate : publishedDate}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'white',
                  flex: 0.5,
                  marginLeft: 15,
                  justifyContent: 'center',
                }}>
                {/* <AntDesign name="right" size={30} color="#b5aeae" /> */}
              </View>
            </View>
          </View>
        </View>
        {loading && <Loader loading={loading} />}
      </Pressable>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={item => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default BookFlatList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    height: 110,
  },
  item: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 10,
  },
  cardTitle: {
    ...human.title3,
    ...systemWeights.semibold,
  },
  cardText: {
    marginTop: 3,
    ...material.body1,
    ...systemWeights.semibold,
    color: 'black',
  },
  cardDate: {
    marginTop: 3,
    ...material.caption,
    ...systemWeights.regular,
    // color: "black",
  },
  buttonContent: {
    paddingTop: 2,
    // color: "#696868",
    fontSize: 12,
  },
});
