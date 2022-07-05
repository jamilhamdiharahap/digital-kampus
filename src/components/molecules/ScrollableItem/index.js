import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const ScrollableItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{paddingLeft: 16}}>
      <View style={{width: 150, height: 150}}>
        <Image
          source={{uri: props.img}}
          style={{
            flex: 1,
            height: undefined,
            width: undefined,
            resizeMode: 'cover',
            borderRadius: 10,
            marginTop: 12,
          }}
        />
      </View>
      <View style={{width: 150}}>
        <Text style={{marginTop: 12}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ScrollableItem;
