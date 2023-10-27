/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import {
  Button,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
// import {fetchPostsRequest} from './redux/action';

function App(): JSX.Element {
  const [inputValue, setInputValue] = useState([]);
  const [displayValue, setDisplayValue] = useState('');
  const [editdata, setEditData] = useState(null);
  const inputRef = useRef();
  // const dispatch = useDispatch();
  // const posts = useSelector((state: any) => state.posts.posts);

  // useEffect(() => {
  //   dispatch(fetchPostsRequest());
  // }, [dispatch]);

  const handleData = () => {
    console.log('helloooooooo');
    let inputValueFromRef = inputRef?.current?.value;

    setInputValue([...inputValue, inputValueFromRef]);

    console.log('inputValue', inputRef?.current?.value);
  };
  const deleteData = item => {
    let copydata = [...inputValue];
    console.log('item>>>', item);
    console.log('delete called');
  };
  const editData = () => {
    console.log('edit data called');
  };

  const renderItem = ({item}) => {
    console.log('item>>', item);
    return (
      <View style={{flexDirection: 'row', marginLeft: 30}}>
        <Text style={{fontSize: 14, color: 'black'}}>{item}</Text>
        <Pressable
          style={{marginLeft: 40}}
          onPress={() => {
            let copydata = [...inputValue];
            let index = copydata.findIndex(val => item === val);
            setEditData(index);
          }}>
          <Text style={{fontSize: 18, color: 'black'}}>edit</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            let copydata = [...inputValue];

            let index = copydata.findIndex(val => item === val);
            console.log('index', index);
            copydata.splice(index, 1);
            setInputValue(copydata);
          }}
          style={{marginLeft: 40}}>
          <Text style={{fontSize: 18, color: 'black'}}>Delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          marginTop: 20,
        }}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            paddingLeft: 10,
            paddingRight: 10,
            width: '80%',
            color: 'black', // Set text color
            backgroundColor: 'white', // Set background color
          }}
          placeholder="input"
          ref={inputRef}
          onChangeText={text => {
            inputRef.current.value = text;
          }}
        />
      </View>

      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          let copyData = [...inputValue];
          if (editdata == null) {
            copyData.push(inputRef?.current?.value);
            setInputValue(copyData);
          } else {
            copyData[editdata] = inputRef?.current?.value;
            setInputValue(copyData);
            setEditData(null);
          }
        }}>
        <View style={{height: 60, width: 90, marginTop: 90}}>
          <Button
            onPress={() => {
              let copyData = [...inputValue];
              if (editdata == null) {
                copyData.push(inputRef?.current?.value);
                setInputValue(copyData);
              } else {
                copyData[editdata] = inputRef?.current?.value;
                setInputValue(copyData);
                setEditData(null);
              }
            }}
            title="Add"
          />
        </View>
      </TouchableWithoutFeedback>
      <View>
        <FlatList data={inputValue} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}

export default App;
