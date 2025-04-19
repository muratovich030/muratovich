import { createContext, useState } from "react"
import { Route } from "react-router-dom"
import LoginPage from "./pages/login/ui"
import RegisterPage from "./pages/register/ui"
import { BrowserRouter, Navigate, Routes } from "react-router"

export interface IUserTokenContext {
  token: string | null,
  setToken: (token: string) => void
}

const defaultValueContext = { setToken: () => { }, token: null }
export const UserTokenContext = createContext<IUserTokenContext>(defaultValueContext)

const App = () => {
  const [token, setToken] = useState<null | string>(null);

  return (
    <UserTokenContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage /> } />
        <Route path="/register" element={<RegisterPage /> } />
        <Route path="/*" element={<Navigate to="/login"/> }/>
      </Routes>
      </BrowserRouter>
    </UserTokenContext.Provider>
  )
}

export default App