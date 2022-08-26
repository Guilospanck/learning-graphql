import * as jwt from 'jsonwebtoken'

export const APP_SECRET = 'POTATO'

export interface AuthTokenPayload {
  userId: number
}

export function decodeAuthHeader(authHeader: string): AuthTokenPayload {
  const token = authHeader.split('Bearer ')[1]

  if (!token) { throw new Error("No token found") }

  return jwt.verify(token, APP_SECRET) as AuthTokenPayload
}

