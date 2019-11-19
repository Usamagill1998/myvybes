import React from 'react'
import { Image } from 'react-native-elements'
import {View} from 'react-native'

const AppLogo = () => (
  
  <Image
  resizeMode={'contain'}
    source={require('../assets/mv_logo.png')}

    style={{ width: 290, height: 100}}
  />
)


export default AppLogo
