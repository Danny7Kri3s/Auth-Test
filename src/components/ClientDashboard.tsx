import { useAuth } from '../context/Auth'

const ClientDashboard = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>ClientDashboard</h1>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  )
}

export default ClientDashboard
