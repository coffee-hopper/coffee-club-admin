import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGoogleLogin = () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/google`;
    console.log('Redirecting to:', url);
    window.location.href = url;
}

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userParam = params.get('user')
    const errorParam = params.get('error')

    if (userParam) {
      const user = JSON.parse(decodeURIComponent(userParam))
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    if (errorParam) {
      setError(decodeURIComponent(errorParam))
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <div className="App">
      <h1>Google OAuth Test</h1>
      
      {error && (
        <div style={{ color: 'red', margin: '20px' }}>
          Error: {error}
        </div>
      )}

      {user ? (
        <div>
          <h2>Welcome, {user.email}!</h2>
          <pre style={{ textAlign: 'left' }}>
            {JSON.stringify(user, null, 2)}
          </pre>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>
          Login with Google
        </button>
      )}
    </div>
  )
}

export default App