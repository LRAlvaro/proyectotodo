import { NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home";
import AddTodo from './screens/AddTodo'
import { Store }  from './redux/store';
import { Provider }  from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={Store}> 
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name= "Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Add"
            component={AddTodo}
            options={{presentation: "modal"}}
          />
        </Stack.Navigator>

      </NavigationContainer> 
    </Provider> 
  );
}

