import { createStackNavigator } from 'react-navigation-stack'
import Home from '../screens/Home'
import Main from '../screens/Main'
import Events from '../screens/Events'
const AppNavigation = createStackNavigator(
  {
     Main:{screen:Main}
     
     ,
    Home: { screen: Home },
    Event:{screen:Events}
    //Login:{screen:Login}
  }
  , 
  
  
  {
    initialRouteName: 'Main',
  }
,
{
  headerMode: 'float',
  navigationOptions:({navigation}) => ({
    header: null,
  }),
}

)

export default AppNavigation
