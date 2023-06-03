import { useParams } from "react-router-dom"
import { useGetNotesQuery } from "./notesApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import EditNoteForm from "./EditNoteForm"
import { Typography } from "@mui/material"
import useTitle from "../../hooks/useTitle"

import useAuth from "../../hooks/useAuth"

const EditNote = () => {
  useTitle("Edit Note")
  const { id } = useParams()
  const { username, isAdmin, isManager } = useAuth()

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  })
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })
  if (!note || !users?.length)
    return <Typography variant="h6">Loading...</Typography>

  if (!isManager && !isAdmin) {
    console.log(username, isAdmin, isManager)
    if (note.username !== username) {
      return <Typography variant="h6">No access.</Typography>
    }
  }

  return <EditNoteForm note={note} users={users} />
}
export default EditNote
