import { Alert, Button, TextInput, View } from "react-native";
import styles from "./styles";
import React from "react";
import { User } from "../../models/user";
import { userService } from "../../services/user.service";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function UserPage({route}: any) {
    const navigation = useNavigation<NavigationProp<any>>();

    const [user, setUser] = React.useState<User>({
        name:'', username: '', password: ''
    })

    function save() {
        if (!user.name || user.name.trim() === '') {
            alert('Nome é obrigatório!')
            return
        }

        if (user.id) {
            userService.update(user.id!, user.name).then(isSaved => {
                if (isSaved) {
                    navigation.navigate('Users')
                } else {
                    Alert.alert('Algo deu errado')
                }
            }).catch(error => {
                alert(error.message)
            })

        } else {
            if (!user.username || user.username.trim() === '') {
                alert('Login é obrigatório!')
                return
            }
            if (!user.password || user.password.trim() === '') {
                alert('Senha é obrigatório!')
                return
            }

            userService.create(user).then(isSaved => {
                if (isSaved) {
                    navigation.navigate('Users')
                } else {
                    navigation.navigate('Users')
                }
            }).catch(error => {
                alert(error.message + 'AQUI 2')
            })
        }
    }

    React.useEffect(() => {

        if (route?.params?.id?.id) {
            userService.get(Number(route?.params?.id?.id)).then(saved => {
                if (saved) setUser(saved)
            })
        }
    },[])

    return (
        <View>
        <View style={styles.inputView}>
            <TextInput style={styles.input} value={user.name} onChangeText={(value) => setUser({...user, name: value})} placeholder="Nome"/>
            <TextInput style={styles.input} editable={route?.params?.id?.id ? false : true} value={user.username} onChangeText={(value) => setUser({...user, username: value})} placeholder="Nome de usuario"/>
            {!route?.params?.id?.id && 
                <TextInput style={styles.input} value={user.password} onChangeText={(value) => setUser({...user, password: value})} placeholder="Senha"/>
            }
            <Button title={route?.params?.id?.id ? "Salvar Edição" : "adicionar novo usuario"} onPress={save} />
        </View>
    </View>
    )
}
