import { Typography } from "@mui/material"
import { useGetNotesQuery } from "./notesApiSlice"
import useAuth from "../../hooks/useAuth"
import CustomTable from "../../components/CustomTable"
import Note from "./Note"
import useTitle from "../../hooks/useTitle"

const NotesList = () => {
  useTitle("View all notes")
  const { username, isManager, isAdmin } = useAuth()

  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery("notesList", {
    pollingInterval: 20000,
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
    const { ids, entities } = notes
    let filteredIds
    if (isManager || isAdmin) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(
        (noteId) => entities[noteId].username === username
      )
    }

    const headerRows = [
      "Status",
      "Created",
      "Updated",
      "Title",
      "Owner",
      "Edit",
    ]

    const rowContent =
      filteredIds.length === 0
        ? null
        : filteredIds.map((noteId) => <Note key={noteId} noteId={noteId} />)

    content = <CustomTable headers={headerRows}>{rowContent}</CustomTable>
  }

  return content
}
export default NotesList
