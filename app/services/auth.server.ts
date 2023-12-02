import {MicrosoftStrategy} from 'remix-auth-microsoft'
import {Authenticator} from 'remix-auth'
import {sessionStorage} from '~/services/session.server'
import jwt from 'jsonwebtoken'
import type {User, UserRole} from '~/types/user'

export const authenticator = new Authenticator<User>(sessionStorage)

const microsoftStrategy = new MicrosoftStrategy(
  {
    clientId: process.env.MSAL_CLIENT_ID!,
    clientSecret: process.env.MSAL_CLIENT_SECRET!,
    redirectUri: process.env.MSAL_REDIRECT_URI!,
    tenantId: process.env.MSAL_TENANT_ID!,
  },
  async ({extraParams, profile}) => {
    const {roles} = jwt.decode(extraParams.id_token) as {roles: UserRole[]}

    return {id: profile.id, name: profile.displayName, roles}
  },
)

authenticator.use(microsoftStrategy)
