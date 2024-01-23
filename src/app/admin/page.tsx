import { API_URL } from 'constants/api.constants'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { EnumTokens } from 'service/auth/auth.service'

import { TUser } from '@/utils/types'

export const metadata: Metadata = {
	title: 'Admin SSR',
}

const fetchUser = async () => {
	'use server'

	const cookie = cookies()
	const accessToken = cookie.get(EnumTokens.ACCESS_TOKEN)?.value

	return fetch(`${API_URL}/auth/users`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	}).then((res) => res.json() as Promise<TUser[]>)
}

export default async function AdminPage() {
	const users = await fetchUser()
	const list = users.map((user) => <div>{user.email}</div>)
	return <div>{list}</div>
}
