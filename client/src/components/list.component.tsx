import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditIcon from "@material-ui/icons/EditOutlined";
import Box from "@material-ui/core/Box";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Link } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from "react";
import ProjectDataService from "../services/project.service";
import {useForm} from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";

const Home = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    retrieveProjects();
  }, []);

  const retrieveProjects = () => {
    ProjectDataService.getAll()
    .then(response => {
      setProjects(response.data);
    }).catch(e => {
      console.log(e);
    })
  }

  const DeleteConfirmation = (code: number) => {
    confirmAlert({
      title: "Delete Confirm!",
      message: "Are you sure to delete this?\nThis data will be permanently deleted!",
      buttons: [
        {
          label: "Yes",
          onClick: () => {ProjectDataService.delete(code).then(res => {
            retrieveProjects()
          })}
        },
        {
          label: "No"
        }
      ]
    });
  };

  const searchStyles = {
    marginTop: "16px",
    padding:"0 0 10px 10px",
    backgroundColor: "white",
    border: '1px solid default',
    borderRadius: "5px",
    boxShadow: "0px 1px 2px 1px rgba(0,0,0,0.3)"
}

  const [type, setType] = React.useState('All');

  const onTypeChange: any = (event: ChangeEvent<HTMLSelectElement>) => {
      setType(event.target.value.toString());
  };

  const {register, handleSubmit} = useForm();

  const onSubmit = (data: any) => searchFilter(data);

  const searchFilter = (data: any) => {
    if(type != 'All' && data.name != '')
    {
      ProjectDataService.findByTypeAndName(data.name, type)
      .then(response => {
        setProjects(response.data);
      }).catch(e => {
        console.log(e);
      })
    }else if(data.name == '' || data.name == null)
    {
      if(type == "All")
      {
        retrieveProjects();
      }else
      {
        ProjectDataService.findByType(type)
        .then(response => {
          setProjects(response.data);
        }).catch(e => {
          console.log(e);
        })
      }
      
    }else
    {
      ProjectDataService.findByName(data.name)
      .then(response => {
        setProjects(response.data);
      }).catch(e => {
        console.log(e);
      })
    }
    
  }

  return(
    <div>
      <form style={searchStyles} onSubmit={handleSubmit(onSubmit)} >
        <p>Search Here</p>
        <Grid container alignItems='flex-start'>
            <Grid item xs={8}>
                <FormControl className='formControl' style={{width: "85%"}}>
                    <TextField id="standard-basic"  label="Project name" {...register("name", {maxLength: 100})}/>
                </FormControl>
            </Grid>

            <Grid item xs={4}>
                <FormControl className='formControl' style={{minWidth: 106}}>
                    <InputLabel>Type</InputLabel>
                    <Select name='type' onChange={onTypeChange} value={type} variant='standard'>
                        <option selected value='All'>All</option>
                        <option value='Type 1'>Type 1</option>
                        <option value='Type 2'>Type 2</option>
                        <option value='Type 3'>Type 3</option>
                    </Select>
                </FormControl>
            </Grid>
            
            <Grid item xs={12} style={{ marginTop: 16 }}>
                <Button variant="contained" color="primary" type="submit">
                    Search
                </Button>
            </Grid>
        </Grid>
      </form>
 
      <TableContainer component={Paper} style={{width: "100%", marginTop:"16px"}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects && projects.map((project) => (
              <TableRow key={project['code']}>
                <TableCell>{project['code']}</TableCell>
                <TableCell>{project['name']}</TableCell>
                <TableCell>{project['type']}</TableCell>
                <TableCell>{project['status'] === 0 ? "Disable" : "Enable"}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems='center' justifyContent='space-around' width='260px'>
                    <Link to={{pathname: `/project/${project['code']}`}}  state={project}><EditIcon/></Link>
                    <Link to={{pathname: ""}} onClick={() => DeleteConfirmation(project['code'])} ><DeleteIcon /></Link>                 
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Home;