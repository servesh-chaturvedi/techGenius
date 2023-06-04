import { useNavigate } from "react-router-dom"
import { useGetNotesQuery } from "./notesApiSlice"
import { memo } from "react"
import { StyledTableRow, StyledTableCell } from "../../components/CustomTable"
import { Button, Typography } from "@mui/material"
import { FiEdit } from "react-icons/fi"

const Note = ({ noteId }) => {
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[noteId],
    }),
  })

  const navigate = useNavigate()

  if (!note) return null

  const created = new Date(note.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const updated = new Date(note.updatedAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

  const handleEdit = () => navigate(`/dash/notes/${noteId}`)

  return (
    <StyledTableRow>
      <StyledTableCell>
        {note.completed ? (
          <Typography variant="body2" color="lightgreen">
            Completed
          </Typography>
        ) : (
          <Typography variant="body2" color="gold">
            Open
          </Typography>
        )}
      </StyledTableCell>
      <StyledTableCell>{created}</StyledTableCell>
      <StyledTableCell>{updated}</StyledTableCell>
      <StyledTableCell>{note.title}</StyledTableCell>
      <StyledTableCell>{note.username}</StyledTableCell>
      <StyledTableCell>
        <Button onClick={handleEdit}>
          <FiEdit size="1.1rem" />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}

const memoizedNote = memo(Note)

export default memoizedNote
