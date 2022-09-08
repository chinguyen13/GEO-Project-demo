import React from "react";
import ProjectForm from "../components/project_form.component";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const navigate = useNavigate();
  return(
    <Container maxWidth="md" style={{marginTop:"32px"}}>
      <Paper>
        <Button onClick={() => navigate("/")}>Back to list</Button>
        <ProjectForm />
      </Paper>
    </Container>
  );
}

export default EditPage;