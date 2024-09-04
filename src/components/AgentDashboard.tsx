import { useAuth } from '../context/Auth';

const AgentDashboard = () => {
  const auth = useAuth();
  return (
    <div>
      <h1>AgentDashboard</h1>
      <button onClick={() => auth.logout()}>Logout</button>
    </div>
  )
}

export default AgentDashboard
