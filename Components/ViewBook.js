import React, {useCallback} from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import * as WebBrowser from "expo-web-browser";
import {htmlToText} from 'html-to-text';
import {heightPercentageToDP as hp2dp} from 'react-native-responsive-screen';
import {human, material, systemWeights} from 'react-native-typography';
import {useSelector} from 'react-redux';
import imageBackground from '../assets/imageBackground2.png';

const ViewBook = () => {
  const {singleBook} = useSelector(state => state.bookStore);

  const {saleInfo} = singleBook;

  const navigation = useNavigation();
  const imageCover = singleBook?.volumeInfo?.imageLinks
    ? singleBook?.volumeInfo?.imageLinks?.large
      ? singleBook?.volumeInfo?.imageLinks?.large?.split(':')[0] +
        's:' +
        singleBook?.volumeInfo?.imageLinks?.large?.split(':')[1]
      : singleBook?.volumeInfo?.imageLinks?.smallThumbnail?.split(':')[0] +
        's:' +
        singleBook?.volumeInfo?.imageLinks?.smallThumbnail?.split(':')[1]
    : 'https://www.pngkey.com/png/detail/123-1232158_blank-book-clip-art-at-clker-small-book.png';

  const title = singleBook?.volumeInfo?.title;
  const subTitle = singleBook?.volumeInfo?.subtitle;

  const handleClick = async linkUrl => {
    Linking.openURL(linkUrl);
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        title: singleBook?.volumeInfo?.title,
      });
    }, []),
  );
  return (
    <ImageBackground
      source={imageBackground}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
      <SafeAreaView>
        <View
          style={{
            padding: 18,
            marginBottom: 20,
          }}>
          <View style={{display: 'flex'}}>
            <View
              style={{
                marginTop: hp2dp(2),
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  flex: 1.8,
                }}>
                {imageCover && (
                  <Image
                    source={{
                      uri: imageCover,
                    }}
                    style={styles.stretch}
                  />
                )}
              </View>
              <View
                style={{
                  flex: 3,
                  marginLeft: 15,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 5,

                    color: '#DDDDE2',
                  }}>
                  {title}
                </Text>

                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 10,
                    marginVertical: 5,
                  }}>
                  {subTitle
                    ? subTitle?.length > 140
                      ? subTitle?.slice(0, 120) + '...'
                      : subTitle
                    : 'NA'}
                </Text>

                {saleInfo?.listPrice?.amount ? (
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginTop: 5,
                      color: 'white',
                      fontSize: 10,
                    }}>
                    {saleInfo?.listPrice?.amount +
                      ' ' +
                      saleInfo?.listPrice?.currencyCode}
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginTop: 1,
                      color: 'white',
                      fontSize: 10,
                    }}>
                    {saleInfo?.saleability}
                  </Text>
                )}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 10,
                    paddingBottom: 10,
                  }}>
                  {singleBook?.accessInfo?.webReaderLink && (
                    <View
                      style={{
                        marginRight: 15,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          handleClick(singleBook?.accessInfo?.webReaderLink)
                        }
                        style={{
                          backgroundColor: '#DE7773',
                          paddingHorizontal: 15,
                          paddingVertical: 5,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 14,
                          }}>
                          Web Reader
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        handleClick(singleBook?.volumeInfo?.infoLink)
                      }
                      style={{
                        backgroundColor: '#DE7773',
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 14,
                        }}>
                        Grab Now
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          style={{
            paddingHorizontal: 24,
            paddingBottom: 15,
            height: hp2dp(54),
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                marginTop: 10,
              }}>
              {'About The Book'}
            </Text>
            <Text
              style={{
                marginVertical: 10,
              }}>
              {singleBook?.volumeInfo?.description
                ? htmlToText(singleBook?.volumeInfo?.description)
                : 'Nothing to show...'}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ViewBook;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stretch: {
    height: hp2dp(25),
  },
  item: {
    backgroundColor: 'white',
    // marginVertical: 8,
    // borderRadius: 10,
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
