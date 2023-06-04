import * as React from "react"
import { Typography, Box, Button } from "@mui/material"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { BiHome } from "react-icons/bi"

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      textAlign="center"
      mt={1}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

export default function DashFooter() {
  const { username, status } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate("/dash")

  let goHomeButton = null
  if (pathname !== "/dash") {
    goHomeButton = (
      <Button onClick={onGoHomeClicked} title="Go to dash">
        <BiHome size="1.5rem" />
      </Button>
    )
  }

  return (
    <>
      <Box
        component="footer"
        sx={{
          py: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="md">
          {goHomeButton}
          <Typography variant="body1">Current User: {username}</Typography>
          <Typography variant="body1">Status: {status}</Typography>
          <Copyright />
        </Container>
      </Box>
    </>
  )
}
