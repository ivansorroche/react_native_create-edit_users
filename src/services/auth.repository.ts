
import { User } from '../models/user'
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthRepository {

    private readonly storeKey = 'LOGGED_USER'

    public async getLoggedUser() {
        const json =  await AsyncStorage.getItem(this.storeKey)

        if (json) {
            return  JSON.parse(json) as User
        }
        return null
    }

    public setLoggedUser(user: User) {
        AsyncStorage.setItem(this.storeKey, JSON.stringify(user))
    }

    public removeLoggedUser() {
        AsyncStorage.removeItem(this.storeKey)
    }

}

export const authRepository = new AuthRepository()