import { axiosClassic, instance } from 'api/axios'
import { removeFromStorage, saveTokenStorage } from 'service/auth/auth.helper'
import { TAuthResponse, TFormData } from 'service/auth/auth.types'

import { TUser } from '@/utils/types'

export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken',
}

export const AuthService = {
	async main(type: 'login' | 'register', data: TFormData) {
		const response = await axiosClassic.post<TAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<TAuthResponse>(
			`/auth/login/access-token`
		)

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	},

	async logout() {
		const response = await axiosClassic.post<boolean>(`/auth/logout`)

		if (response.data) {
			removeFromStorage()
		}

		return response
	},

	async users() {
		return instance.get<TUser[]>(`/auth/users`)
	},
}
