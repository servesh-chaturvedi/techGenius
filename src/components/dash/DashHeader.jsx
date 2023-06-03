import { Box, Button, Container, Typography, Link } from "@mui/material"
import { useEffect } from "react"
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom"

import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import useAuth from "../../hooks/useAuth"

const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
  const { isManager, isAdmin } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [isSuccess, navigate])

  const onNewNoteClick = () => navigate("/dash/notes/new")
  const onNewUserClick = () => navigate("/dash/users/new")
  const onNotesClick = () => navigate("/dash/notes")
  const onUsersClick = () => navigate("/dash/users")

  let newNoteButton = null
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = <Button onClick={onNewNoteClick}>+ Note</Button>
  }

  let newUserButton = null
  if (USERS_REGEX.test(pathname)) {
    newUserButton = <Button onClick={onNewUserClick}>+ User</Button>
  }

  let userButton = null
  if (isAdmin || isManager) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dash")) {
      userButton = <Button onClick={onUsersClick}>Users</Button>
    }
  }

  let notesButton = null
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dash")) {
    notesButton = <Button onClick={onNotesClick}>Notes</Button>
  }

  const logoutButton = (
    <Button variant="outlined" color="secondary" onClick={sendLogout}>
      Logout
    </Button>
  )

  let buttonContent
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>
  } else {
    buttonContent = (
      <Box sx={{ display: "flex", gap: 1 }}>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </Box>
    )
  }
  return (
    <>
      {isError && (
        <Typography variant="body1" color="error">
          {error?.data?.message ?? error.status}
        </Typography>
      )}
      <Box
        component="header"
        sx={{
          py: 3,
        }}
      >
        <Container
          maxWidth="md"
          component="nav"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="span">
            <Link
              component={RouterLink}
              to="/dash"
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              techGenius
            </Link>
          </Typography>
          {buttonContent}
        </Container>
      </Box>
    </>
  )
}
export default DashHeader
