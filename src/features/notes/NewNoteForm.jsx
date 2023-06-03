import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material"

const NewNoteForm = ({ users }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [userId, setUserId] = useState(users[0].id)

  useEffect(() => {
    if (isSuccess) {
      setTitle("")
      setText("")
      setUserId("")
      navigate("/dash/notes")
    }
  }, [isSuccess, navigate])

  const onTitleChange = (e) => setTitle(e.target.value)
  const onTextChange = (e) => setText(e.target.value)
  const onUserIdChange = (e, newValue) => {
    setUserId(newValue.id)
  }

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ user: userId, title, desc: text })
    }
  }

  const errContent = error?.data?.message ?? null

  return (
    <>
      <Container component="section" maxWidth="xs">
        <Typography variant="body1" color="error">
          {errContent}
        </Typography>
        <Box
          component="form"
          onSubmit={onSaveNoteClicked}
          noValidate
          sx={{ marginBlock: 2 }}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            New Note
          </Typography>

          <TextField
            autoFocus
            required
            fullWidth
            margin="dense"
            autoComplete="off"
            id="note-title"
            label="Note Title"
            name="note-title"
            value={title}
            onChange={onTitleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            autoComplete="off"
            name="note-text"
            label="Note Text"
            id="note-text"
            value={text}
            onChange={onTextChange}
          />
          <Autocomplete
            id="owner"
            onChange={onUserIdChange}
            options={users}
            value={users.find((user) => user.id === userId)}
            getOptionLabel={(user) => user.username}
            renderInput={(params) => (
              <TextField {...params} label="Assign to" margin="dense" />
            )}
          />

          <Button
            type="submit"
            disabled={!canSave}
            fullWidth
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
export default NewNoteForm
