import {
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Box,
} from "@mui/material"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"

const ActionCard = ({ text, link }) => {
  return (
    <Card sx={{ maxWidth: 150 }} raised>
      <CardActionArea component={Link} to={link}>
        <CardContent>
          <Typography gutterBottom variant="body1" component="span">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

const DashWelcome = () => {
  useTitle("Dash - Home")
  const { username, isManager, isAdmin } = useAuth()

  const date = new Date()
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date)
  return (
    <>
      <Typography variant="body2" my={2}>
        {today}
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom mt={2}>
        Welcome {username}!
      </Typography>
      <Typography variant="h6" component="h3" gutterBottom mt={2}>
        Note Settings
      </Typography>

      <Box display="flex" gap={1}>
        <ActionCard text="View Notes" link="/dash/notes" />
        <ActionCard text="Add a Note" link="/dash/notes/new" />
      </Box>

      {(isManager || isAdmin) && (
        <>
          <Typography variant="h6" component="h3" gutterBottom mt={2}>
            User Settings
          </Typography>
          <Box display="flex" gap={1}>
            <ActionCard text="View Users" link="/dash/users" />
            <ActionCard text="Add a User" link="/dash/users/new" />
          </Box>
        </>
      )}
    </>
  )
}
export default DashWelcome
