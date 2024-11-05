import { StyleSheet, Text, View } from 'react-native';
import Todo from './src/Todo';
import { NavigationContainer } from '@react-navigation/native';
import SignUp from './screens/SignUp';
import LogIn from './screens/LogIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='SignUpScreen' component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name='LogInScreen' component={LogIn} options={{ headerShown: false }}/>
        <Stack.Screen name='ToDoScreen' component={Todo} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
