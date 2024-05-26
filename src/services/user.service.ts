import axios, { AxiosResponse } from 'axios'

import { authRepository } from './auth.repository'
import { User } from '../models/user'

class UserService {

    private readonly api = axios.create({ baseURL: 'http://192.168.0.10:3030/users' })

    private async getHeaders() {
        const logged = await authRepository.getLoggedUser()
        const token = logged ? logged.token : ''
        return {
            'Authorization': `Bearer ${token}`
        }
    }

    private isOk(response: AxiosResponse) {
        return response.status >= 200 && response.status < 300
    }

    private getData(response: AxiosResponse) {
        if (this.isOk(response)) {
            return response.data
        } else {
            if (response.status === 401 || response.status === 403) return null
            
            if (response.status === 400) {
                throw new Error('Usuário já existe!')
            } else {
                throw new Error(response.statusText, { cause: response.status })
            }
        }
    }

    public async getList() {
        const response = await this.api.get('', {
            headers: await this.getHeaders()
        })
        const data = this.getData(response)
        if (data) {
            return data as User[]
        } else {
            return null
        }
    }

    public async get(id: number) {
        const response = await this.api.get(`${id}`, {
            headers: await this.getHeaders()
        })
        const data = this.getData(response)
        if (data) {
            return data as User
        } else {
            return null
        }
    }

    public async create(user: User) {
        const response = await this.api.post('', user, {
            headers: await this.getHeaders()
        })

        const data = this.getData(response)
        if (data) {
            const saved: User = data
            return (saved && saved.id) ? true : false
        } else {
            return null
        }
    }

    public async update(id: number, name: string) {
        const response = await this.api.put(`${id}`, { name }, {
             headers: await this.getHeaders()
        })

        const data = this.getData(response)
        if (data) {
            return !!data
        } else {
            return null
        }
    }

    public async delete(id: number) {
        const response = await this.api.delete(`${id}`, {
            headers: await this.getHeaders()
        })

        if (this.isOk(response)) {
            return true
        } else {
            if (response.status === 401 || response.status === 403) return null
            
            if (response.status === 400) {
                throw new Error('Usuário já existe!')
            } else {
                throw new Error(response.statusText, { cause: response.status })
            }
        }
    }
}

export const userService = new UserService()