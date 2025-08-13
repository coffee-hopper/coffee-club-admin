import { MainLayout } from "./components/layout/MainLayout";
import AuthContainer from "./components/auth/AuthContainer";
import { QueryProvider } from "./providers/QueryProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <MainLayout>
          <AuthContainer />
        </MainLayout>
      </QueryProvider>
    </BrowserRouter>
  );
}

export default App;
