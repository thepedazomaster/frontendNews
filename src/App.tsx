import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/auth/authProvider";
import RootLayout from "./layouts/RootLayout";
import LoginScreen from "./screens/login/LoginScreen";
import TopNewsScreen from "./screens/topNews/TopNewsScreen";
import EverythingNewsScreen from "./screens/everithingNews/EverythingNewsScreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<RootLayout />}>
        <Route path="/topNews" element={<TopNewsScreen />} />
        <Route path="/generalNews" element={<EverythingNewsScreen />} />
        <Route path="/newsUser" element={<div>USER NEWS</div>} />
      </Route>
      <Route index path="/login" element={<LoginScreen />} />
    </Route>
  )
);
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
