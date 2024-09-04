import { useAuth } from '../context/Auth'

const AdminDasboard = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>AdminDasboard</h1>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  )
}

export default AdminDasboard
