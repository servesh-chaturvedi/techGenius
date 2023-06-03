import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"
import useTitle from "../../hooks/useTitle"
import { Typography } from "@mui/material"

const EditUser = () => {
  useTitle("Edit User")

  const { id } = useParams()

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  if (!user) return <Typography variant="h6">Loading...</Typography>

  const content = <EditUserForm user={user} />

  return content
}
export default EditUser
