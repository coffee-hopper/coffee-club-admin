import { MainLayout } from './components/layout/MainLayout'
import { AuthContainer } from './components/auth/AuthContainer'
import { QueryProvider } from './providers/QueryProvider'

function App() {
  return (
    <QueryProvider>
      <MainLayout>
        <h1 className="text-3xl font-bold mb-8">Google OAuth Test</h1>
        <AuthContainer />
      </MainLayout>
    </QueryProvider>
  )
}

export default App