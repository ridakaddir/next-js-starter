import { auth } from '@/lib/auth'
import Customers from 'features/customers/Customers'

export default async function Page() {
  // const session = await auth()
  // if (!session) return <div>Not authenticated</div>
  return <Customers />
}
