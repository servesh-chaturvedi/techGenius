import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import useTitle from "../../hooks/useTitle"
import { BiHome } from "react-icons/bi"
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material/"

export default function Login() {
  useTitle("Employee Login")

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("")
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    setErrMsg("")
  }, [username, password])

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist((prev) => !prev)

  const setManagerCreds = () => {
    setUsername("MikeScott")
    setPassword("Mike123")
  }
  const setEmpCreds = () => {
    setUsername("JimHalpert")
    setPassword("Jim123")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername("")
      setPassword("")
      navigate("/dash")
    } catch (err) {
      if (!err.status) {
        setErrMsg("No response from server")
      } else if (err.status === 400) {
        setErrMsg("Missing username or Password")
      } else if (err.status === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg(err?.data?.message ?? err.status)
      }
    }
  }

  if (isLoading) return <Typography variant="h4">Loading...</Typography>

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />

          <Typography component="h1" variant="h5" gutterBottom>
            Sign in
          </Typography>
          <Typography variant="body1" color="error">
            {errMsg}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={handleUserInput}
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={handlePwdInput}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="persist"
                  checked={persist}
                  onChange={handleToggle}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={setManagerCreds}
            >
              Set Manager credentials
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={setEmpCreds}
            >
              Set Employee credentials
            </Button>
          </Box>
        </Box>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="md">
          <Button onClick={() => navigate("/")}>
            <BiHome size="1.5rem" title="Go Home" />
          </Button>
        </Container>
      </Box>
    </>
  )
}
