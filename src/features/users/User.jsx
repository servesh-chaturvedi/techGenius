import { useNavigate } from "react-router-dom"
import { useGetUsersQuery } from "./usersApiSlice"
import { memo } from "react"
import { StyledTableRow, StyledTableCell } from "../../components/CustomTable"
import { Button } from "@mui/material"
import { FiEdit } from "react-icons/fi"

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  })

  const navigate = useNavigate()

  if (!user) return null
  const handleEdit = () => navigate(`/dash/users/${userId}`)
  const userRolesString = user?.roles?.toString().replaceAll(",", ", ")

  return (
    <StyledTableRow>
      <StyledTableCell>{user.username}</StyledTableCell>
      <StyledTableCell>{userRolesString}</StyledTableCell>
      <StyledTableCell>
        <Button onClick={handleEdit}>
          <FiEdit size="1.1rem" />
        </Button>
      </StyledTableCell>
    </StyledTableRow>
  )
}
const memoizedUser = memo(User)

export default memoizedUser
