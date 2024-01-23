'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getAccessToken } from 'service/auth/auth.helper'
import { AuthService } from 'service/auth/auth.service'

import CardItem from '@/components/СardItem'

import styles from './Home.module.scss'

export function Home() {
	const { push } = useRouter()

	useEffect(() => {
		const token = getAccessToken()
		if (!token) push('/login')
	}, [])

	const { data, isLoading } = useQuery({
		queryKey: ['users'],
		queryFn: () => AuthService.users(),
	})

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => AuthService.logout(),
		onSuccess() {
			push('/login')
		},
	})

	const list = data?.data.map((item) => <CardItem item={item} key={item.id} />)

	return (
		<div className={styles.wrap}>
			<h2 className={styles.title}>Главная</h2>
			{isLoading ? 'Идет загрузка' : <div className={styles.list}>{list}</div>}
			<button onClick={() => mutateLogout()}>Выйти</button>
		</div>
	)
}
