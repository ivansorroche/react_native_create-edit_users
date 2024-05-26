import { Alert, Button, FlatList, TextInput, View } from "react-native";
import styles from "./styles";
import ListItem from "../../components/ListItem";
import React from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { userService } from "../../services/user.service";
import { User } from "../../models/user";

export default function Users() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [users, setUsers] = React.useState<User[]>([]);

    function createNewUser() {
        navigation.navigate('Users/create')
    }

    React.useEffect(()  => {
        fetchUsers();
    },[]);
    
    async function fetchUsers() {
        const result = await userService.getList();
        if (result) {
            setUsers(result);
        }
    }

    async function remove(id: any) {
        userService.delete(id).then(isSaved => {
            if (isSaved === null) Alert.alert('Algo deu errado')
            if (isSaved) fetchUsers()
        })
        
    }

    function edit(i: any) {
        navigation.navigate(`Users/create`, {id: i})
    }

    return (
    <View>
        <View style={styles.inputView}>
            <Button title="adicionar novo usuario" onPress={createNewUser} />
        </View>
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <>
                    <ListItem
                        title={item.name}/>
                    <Button title="Excluir" onPress={() => remove(item.id)} />
                    <Button title="Editar" onPress={() => edit(item)} />
                </>
            )
                
        }
        />
    </View>
)
}