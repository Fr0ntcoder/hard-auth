/* import { errorCatch, getContentType } from 'api/api.helper'
import { API_URL } from 'constants/api.constants'
import ky from 'ky-universal'
import { getAccessToken, removeFromStorage } from 'service/auth/auth.helper'
import { AuthService } from 'service/auth/auth.service'

export const kyClassic = ky.extend({
	prefixUrl: API_URL,
	headers: getContentType(),
	credentials,
})

export const kyWithAuth = kyClassic.extend({
	hooks: {
		beforeRequest: [
			(request) => {
				const accessToken = getAccessToken()
				if (accessToken) {
					request.headers.set('Authorization', `Bearer ${accessToken}`)
				}
			},
		],
		afterResponse: [
			async (request, options, response) => {
				if (!response.ok && response.status === 401) {
					const originalRequest = request
					try {
						await AuthService.getNewTokens()
						return ky(originalRequest)
					} catch (error) {
						if (errorCatch(error) === 'jwt expired') removeFromStorage()
						throw error
					}
				}
				return response
			},
		],
	},
}) */
