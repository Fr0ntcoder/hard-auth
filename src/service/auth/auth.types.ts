import type { TUser } from '@/utils/types'

export type TAuthResponse = {
	accessToken: string
	user: TUser
}

export type TFormData = {
	email: string
	password: string
}
