import { Typography } from "@mui/material"
import { useGetUsersQuery } from "./usersApiSlice"
import CustomTable from "../../components/CustomTable"
import User from "./User"
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
  useTitle("View all users")
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content
  if (isLoading) content = <Typography variant="h4">Loading...</Typography>
  if (isError) {
    content = (
      <>
        <Typography variant="h5" color="error">
          Error: {error?.data?.message ?? error.status}
        </Typography>
      </>
    )
  }
  if (isSuccess) {
    const headerRows = ["Username", "Roles", "Edit"]

    const { ids } = users
    const rowContent =
      ids?.length && ids.map((userId) => <User key={userId} userId={userId} />)
    content = <CustomTable headers={headerRows}>{rowContent}</CustomTable>
  }

  return content
}
export default UsersList
