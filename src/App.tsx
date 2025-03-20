import { MainLayout } from "./components/layout/MainLayout";
import { AuthContainer } from "./components/auth/AuthContainer";
import { QueryProvider } from "./providers/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <MainLayout>
        <AuthContainer />
      </MainLayout>
    </QueryProvider>
  );
}

export default App;
