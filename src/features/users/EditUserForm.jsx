import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Chip,
  FormControlLabel,
  Checkbox,
} from "@mui/material"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(user.roles)
  const [active, setActive] = useState(user.active)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("")
      setPassword("")
      setRoles([])
      navigate("/dash/users")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onUsernameChange = (e) => setUsername(e.target.value)
  const onPasswordChange = (e) => setPassword(e.target.value)
  const onRoleChange = (event, newValue) => {
    setRoles([
      "Employee",
      ...newValue.filter((option) => option !== "Employee"),
    ])
  }
  const onActiveChange = () => setActive((prev) => !prev)

  const onSaveUserClicked = async (e) => {
    e.preventDefault()
    if (password) {
      await updateUser({ id: user.id, username, password, roles, active })
    } else {
      await updateUser({ id: user.id, username, roles, active })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }
  const options = Object.values(ROLES)

  let canSave
  if (password) {
    canSave = roles.length && validUsername && validPassword && !isLoading
  } else {
    canSave = roles.length && validUsername && !isLoading
  }

  const errContent = (error?.data?.message || delError?.data?.message) ?? null

  return (
    <>
      <Container component="section" maxWidth="xs">
        <Typography variant="body1" color="error">
          {errContent}
        </Typography>
        <Box
          component="form"
          onSubmit={onSaveUserClicked}
          noValidate
          sx={{ marginBlock: 2 }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Edit User
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
            fullWidth
            helperText="4-12 chars incl. !@#$%"
            margin="dense"
            autoComplete="off"
            name="password"
            label="Password (optional)"
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
          <FormControlLabel
            control={
              <Checkbox
                checked={active}
                onChange={onActiveChange}
                color="primary"
              />
            }
            label="Active"
          />
          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={onDeleteUserClicked}
            >
              Delete
            </Button>
            <Button
              type="submit"
              disabled={!canSave}
              fullWidth
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  )
}
export default EditUserForm
