import { Typography } from "@mui/material"
import { useGetUsersQuery } from "../users/usersApiSlice"
import NewNoteForm from "./NewNoteForm"
import useTitle from "../../hooks/useTitle"

const NewNote = () => {
  useTitle("Add new note")
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length) return <Typography variant="h6">Loading...</Typography>
  return <NewNoteForm users={users} />
}
export default NewNote
