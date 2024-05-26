import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from "./src/pages/Home";
import Users from './src/pages/users';
import UserPage from './src/pages/users/[id]';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomePage} options={{ title: 'Login' }} />
                <Stack.Screen name='Users' component={Users} options={{ title: 'Lista de usuarios' }} />
                <Stack.Screen name='Users/create' component={UserPage} options={{ title: 'Criação/Edição' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};