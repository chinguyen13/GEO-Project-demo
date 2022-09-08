import React from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Home from "../components/list.component";


const ListPage = () => {

  return(
    <Container maxWidth="md" style={{marginTop:"32px"}}>
      <Button
        variant="contained"
        color="primary"
        href="/add"
      >
        Add
      </Button>
      <div style={{marginTop:"32px"}}>
        <Home/>
      </div>
    </Container>
  )
}

export default ListPage;