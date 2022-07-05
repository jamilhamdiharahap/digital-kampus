import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {constant} from '../../../utils/constant/constant';

const NavBarIcon = props => {
  // Props
  const foto = props.img;
  const title = props.title;
  const active = props.active;
  const onPress = props.onPress;

  // Color
  const on = constant.warnaBackground;
  const textOff = '#545454';
  const bgOff = '#ebebeb';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: active ? 2 : 0,
        borderColor: on,
        backgroundColor: active ? bgOff : 'white',
      }}>
      <Image style={{height: 26, width: 26}} source={foto} />
      <Text
        style={{
          fontSize: 10,
          fontWeight: active ? 'bold' : null,
          color: active ? on : textOff,
          marginTop: 4,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default NavBarIcon;
