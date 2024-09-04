import { AuthProvider } from "./context/Auth"
import Router from "./Router"

function App() {

  return (
    <>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </>
  )
}

export default App
