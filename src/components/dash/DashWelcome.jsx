import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@mui/material"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import useTitle from "../../hooks/useTitle"

const ActionCard = () => {
  return (
    <Card sx={{ maxWidth: 150 }}>
      <CardActionArea>
        <CardMedia component="img" height="100" image="" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
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
      <Typography variant="body1">
        <Link to="/dash/notes">View Notes</Link>
      </Typography>
      <Typography variant="body1">
        <Link to="/dash/notes/new">Add a Note</Link>
      </Typography>
      {(isManager || isAdmin) && (
        <Typography variant="body1">
          <Link to="/dash/users">View Users</Link>
        </Typography>
      )}
      {(isManager || isAdmin) && (
        <Typography variant="body1">
          <Link to="/dash/users/new">Add a User</Link>
        </Typography>
      )}
    </>
  )
}
export default DashWelcome
