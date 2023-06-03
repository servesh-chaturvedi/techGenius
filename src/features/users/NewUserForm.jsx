import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"

import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
  useTitle("Add new user")
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess) {
      setUsername("")
      setPassword("")
      setRoles([])
      navigate("/dash/users")
    }
  }, [isSuccess, navigate])

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onRoleChange = (event, newValue) => {
    setRoles([
      "Employee",
      ...newValue.filter((option) => option !== "Employee"),
    ])
  }

  const canSave = roles.length && validUsername && validPassword && !isLoading

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewUser({ username, password, roles })
    }
  }

  const options = Object.values(ROLES)

  return (
    <>
      <Container component="section" maxWidth="xs">
        <Typography variant="body1" color="error">
          {error?.data?.message ?? error?.status}
        </Typography>
        <Box
          component="form"
          onSubmit={onSaveUserClicked}
          noValidate
          sx={{ marginBlock: 2 }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            New User
          </Typography>

          <TextField
            autoFocus
            required
            fullWidth
            error={!validUsername}
            helperText="3-20 letters"
            margin="dense"
            autoComplete="off"
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={onUsernameChange}
          />
          <TextField
            required
            fullWidth
            error={!validPassword}
            helperText="4-12 chars incl. !@#$%"
            margin="dense"
            autoComplete="off"
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          />
          <Autocomplete
            multiple
            id="roles"
            value={roles}
            onChange={onRoleChange}
            options={options}
            getOptionLabel={(option) => option}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  disabled={option === "Employee"}
                />
              ))
            }
            style={{ width: 450 }}
            renderInput={(params) => (
              <TextField {...params} label="Roles" margin="dense" />
            )}
          />
          <Button
            disabled={!canSave}
            fullWidth
            type="submit"
            variant="contained"
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Container>
    </>
  )
}
export default NewUserForm
