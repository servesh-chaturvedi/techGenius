import useTitle from "../hooks/useTitle"
import { useNavigate, useLocation } from "react-router-dom"
import { Container, Button, Typography } from "@mui/material"

const NotFound = () => {
  useTitle("404 - Not Found")
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = pathname.includes("/dash")
    ? () => navigate("/dash")
    : () => navigate("/")

  return (
    <>
      <Container component="main" maxWidth="xs">
        <img src="/assets/Lost.webp" alt="Two people and a magnifying glass" />
        <Typography component="h1" variant="h4" gutterBottom>
          404 - Page not found
        </Typography>
        <Typography component="p" variant="h6" gutterBottom>
          Sorry, the requested page does not exist
        </Typography>
        <Button fullWidth variant="outlined" onClick={onGoHomeClicked}>
          Go home
        </Button>
      </Container>
    </>
  )
}
export default NotFound
