import { Box, Container, Toolbar } from "@mui/material";

const toolbarHeight = 40
export default function UserTeams() {
  return <Box sx={{ minHeight: '100vh' }}>
    <Toolbar sx={{ minHeight: toolbarHeight }} variant="dense">
      
    </Toolbar>
    <Container sx={{
      minHeight: `calc(100vh - ${toolbarHeight}px)`,
      display: 'grid',
      placeItems: 'center',
      alignItems: 'center',
    }}>

    </Container>
  </Box>;
}