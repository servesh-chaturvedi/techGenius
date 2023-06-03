import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"
import { Outlet } from "react-router-dom"
import { Container, Box, Typography } from "@mui/material"

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <Box component="main">
        <Container maxWidth="md">
          <Typography variant="h4" component="h1">
            Dashboard
          </Typography>
          <hr />
          <Outlet />
        </Container>
      </Box>
      <DashFooter />
    </>
  )
}
export default DashLayout
