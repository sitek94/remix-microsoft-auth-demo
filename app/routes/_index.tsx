import type {MetaFunction, LoaderFunctionArgs} from '@remix-run/node'
import {useLoaderData} from '@remix-run/react'
import {authenticator} from '~/services/auth.server'

export const meta: MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'},
  ]
}

export const loader = async ({request}: LoaderFunctionArgs) => {
  const user = await authenticator.authenticate('microsoft', request, {
    failureRedirect: '/login',
  })

  return {user}
}

export default function Route() {
  const {user} = useLoaderData<typeof loader>()

  return (
    <div>
      <nav>
        <form action="/logout" method="post">
          <button>Logout</button>
        </form>
      </nav>
      <hr />
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
