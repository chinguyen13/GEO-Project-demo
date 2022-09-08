import React, {ChangeEvent, useEffect, useState } from 'react';
import TextField  from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import ProjectDataService from "../services/project.service";

interface IFormInput{
  code: number;
  name: string;
  type: string;
  status: number;
}
const ProjectForm: React.FC = () =>{
  const project = useLocation().state as IFormInput;
  const navigate = useNavigate();

  const [data, setData] = useState({
    code: project != null ? project['code']: 0,
    name: project != null ? project['name']: '',
    type: project != null ? project['type']: 'Type 1',
    status: project != null ? project['status']: 0
  });
  
  const onCodeChange: any = (event: ChangeEvent<HTMLSelectElement>) => {
    setData(previousState => {
      return {...previousState, code: parseInt(event.target.value)}
    });
  }

  const onNameChange: any = (event: ChangeEvent<HTMLSelectElement>) => {
    setData(previousState => {
      return {...previousState, name:event.target.value.toString()}
    });
  }

  const onTypeChange: any = (event: ChangeEvent<HTMLSelectElement>) => {
    setData(previousState => {
      return {...previousState, type:event.target.value.toString()}
    });
  };

  const onStatusChange: any = (event: ChangeEvent<HTMLSelectElement>) => {
  setData(previousState => {
      return {...previousState, status: parseInt(event.target.value)}
  });
  };
  

  const {register, handleSubmit, formState: { errors }} = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = dataOnSubmit => {
    dataOnSubmit = data;
  const error_tag = document.getElementById("error") as HTMLElement
    if(project != null)
    {
      ProjectDataService.update(dataOnSubmit).then(response => {
        
        if(response.data['message'])
        {
          error_tag.innerHTML= response.data['message'];
        }else
        {
          navigate("/");
        }
      });
    }else
    {
      ProjectDataService.create(dataOnSubmit).then(response => {
        if(response.data['message'])
        {
          error_tag.innerHTML= response.data['message'];
        }else
        {
          navigate("/");
        };
      });
    };
  };

  return (
    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
      <b style={{color:"red", marginLeft:"8px"}} id="error"></b>
      <Grid container style={{width: "90%", margin: '0 auto'}} alignItems='center' alignContent='center' justifyContent='center' spacing={2}>
          <Grid item xs={3}>
              <FormControl className='formControl'  style={{width: "85%"}}>
                {project != null && (
                  <TextField inputProps={{ readOnly: true }} type="number" id="standard-basic"  label="Code" defaultValue={data.code} {...register("code", {required: true, valueAsNumber: true, onChange: onCodeChange})}/>
                )}
                {
                  project == null && (
                  <TextField type="number" id="standard-basic"  label="Code" {...register("code", {required: true, valueAsNumber: true, onChange: onCodeChange})}/>
                )}

                 {errors.code && <span>This field is required</span>}
              </FormControl>
          </Grid>

          <Grid item xs={9}>
              <FormControl className='formControl' style={{width: "100%"}}>
                  <TextField id="standard-basic" label="Project name"  defaultValue={data.name} {...register("name", {required: true, maxLength: 100, onChange: onNameChange})} />
                  {errors.name && <span>This field is required - name less than 100 characters</span>}
              </FormControl>
          </Grid>

          <Grid item xs={3}>
              <FormControl className='formControl' style={{width: "85%"}}>
                  <InputLabel>Type</InputLabel>
                  <Select name='type' onChange={onTypeChange} value={data.type} variant='standard'>
                      <option value='Type 1'>Type 1</option>
                      <option value='Type 2'>Type 2</option>
                      <option value='Type 3'>Type 3</option>
                  </Select>
              </FormControl>
          </Grid>
          
          <Grid item xs={9}>
          <InputLabel>Status</InputLabel>
            <RadioGroup name="status" value={data.status} style={{display: 'inline'}} onChange={onStatusChange}>
              <FormControlLabel value={0} control={<Radio />} label="Disable" />
              <FormControlLabel value={1} control={<Radio />} label="Enable" />
            </RadioGroup>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 16 }}>
              <Button variant="contained" color="primary" type="submit">
                  Add
              </Button>
          </Grid>
      </Grid>
    </form>
  )
}



export default ProjectForm;