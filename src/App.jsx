import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import DashLayout from "./components/dash/DashLayout"
import Login from "./features/auth/Login"
import Public from "./components/Public"
import DashWelcome from "./components/dash/DashWelcome"
import PreFetch from "./features/auth/PreFetch"
import PersistLogin from "./features/auth/PersistLogin"
import NotesList from "./features/notes/NotesList"
import UsersList from "./features/users/UsersList"
import NewUserForm from "./features/users/NewUserForm"
import EditUser from "./features/users/EditUser"
import NewNote from "./features/notes/NewNote"
import EditNote from "./features/notes/EditNote"
import RequireAuth from "./features/auth/RequireAuth"
import { ROLES } from "./config/roles"
import useTitle from "./hooks/useTitle"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route element={<PersistLogin />}>
            <Route
              element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
            >
              <Route element={<PreFetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<DashWelcome />} />

                  <Route
                    element={
                      <RequireAuth
                        allowedRoles={[ROLES.Admin, ROLES.Manager]}
                      />
                    }
                  >
                    <Route path="users">
                      <Route index element={<UsersList />} />
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path="notes">
                    <Route index element={<NotesList />} />
                    <Route path=":id" element={<EditNote />} />
                    <Route path="new" element={<NewNote />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
