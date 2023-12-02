# Remix + MSAL + Roles

The most time I spent figuring out how to setup user groups and roles in Azure AD (now Microsoft Entra).

For the Remix part I followed the examples below:

- https://github.com/sergiodxa/remix-auth
- https://github.com/juhanakristian/remix-auth-microsoft

Then added some code to extract the roles from the token:

```ts
const microsoftStrategy = new MicrosoftStrategy(
  {
    clientId: process.env.MSAL_CLIENT_ID!,
    clientSecret: process.env.MSAL_CLIENT_SECRET!,
    redirectUri: process.env.MSAL_REDIRECT_URI!,
    tenantId: process.env.MSAL_TENANT_ID!,
  },
  async ({extraParams, profile}) => {
    // 👇 Extract the roles from the token
    const {roles} = jwt.decode(extraParams.id_token) as {roles: UserRole[]}

    return {id: profile.id, name: profile.displayName, roles}
  },
)
```

## Development

Register your app in Azure AD and fill `.env` file

```sh
cp .env.example .env
```

Install dependencies

```sh
bun install
```

Start app

```sh
bun dev
```
