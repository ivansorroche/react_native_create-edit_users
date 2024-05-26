import React from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import styles from './styles';
import { authService } from '../../services/auth.service';

export default function HomePage() {

    const navigation = useNavigation<NavigationProp<any>>();
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function login() {
        const isLogged = await authService.login(username, password)
        if (isLogged) {
            navigation.navigate('Users')
        } else {
            Alert.alert('Usuário/senha inválido(a)' + isLogged)
        }
    }


    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Usuario"

      />
        <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry
        />
        <Button title="entrar" onPress={login} />
        </View>

        
    );
}
