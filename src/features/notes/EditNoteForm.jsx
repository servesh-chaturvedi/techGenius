import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material"

const EditNoteForm = ({ note, users }) => {
  const { isManager, isAdmin } = useAuth()

  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation()

  const [
    deleteNote,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteNoteMutation()

  const navigate = useNavigate()

  const [title, setTitle] = useState(note.title)
  const [text, setText] = useState(note.desc)
  const [completed, setCompleted] = useState(note.completed)
  const [userId, setUserId] = useState(note.user)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("")
      setText("")
      setUserId("")
      navigate("/dash/notes")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onTitleChange = (e) => setTitle(e.target.value)
  const onTextChange = (e) => setText(e.target.value)
  const onCompletedChange = () => setCompleted((prev) => !prev)
  const onUserIdChange = (e, newValue) => {
    setUserId(newValue.id)
  }

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await updateNote({
        id: note.id,
        user: userId,
        title,
        desc: text,
        completed,
      })
    }
  }

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id })
  }

  const created = new Date(note.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })
  const updated = new Date(note.updatedAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  })

  let deleteBtn = null

  if (isManager || isAdmin)
    deleteBtn = (
      <Button
        fullWidth
        variant="outlined"
        color="error"
        onClick={onDeleteNoteClicked}
      >
        Delete
      </Button>
    )

  const errContent = (error?.data?.message || delerror?.data?.message) ?? null

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
            Edit Note #{note.ticket}
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
              <TextField {...params} label="Owner" margin="dense" />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={completed}
                onChange={onCompletedChange}
                color="primary"
              />
            }
            label="Task Completed"
          />
          <Typography variant="body2" gutterBottom>
            Created on: {created}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Updated: {updated}
          </Typography>

          <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
            {deleteBtn}
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
export default EditNoteForm
