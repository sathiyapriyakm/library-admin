import React from "react";
import { TeacherMessage } from "./TeacherMessage";
import {useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


export function TeacherDetails() {

  const [teacherstList, setTeachersList] = useState([]);
  const navigate=useNavigate();
  const getTeachers=()=>{
  fetch("https://62aa7f0d371180affbd633f8.mockapi.io/teachers",{
    method:"GET",
  }
  )
  .then((data)=>(data.json()))
  .then((mvs)=>setTeachersList(mvs));
  }   
  useEffect(()=>getTeachers(),[]);
  const handleDelete=(deletionId)=>{
    fetch(`https://62aa7f0d371180affbd633f8.mockapi.io/teachers/${deletionId}`,{
    method:"DELETE",
  }).then(()=>getTeachers());
  }
  
  return <div className="teacher-list">
    {teacherstList.map((disp) => (<TeacherMessage 
    key={disp.id} 
    name={disp.name} 
    major={disp.major} 
    contact_number={disp.contact_number} 
    address={disp.address} 
    id={disp.id}
    deleteButton={<IconButton 
    aria-label="teacher-delete-button" 
    color="error" 
    onClick={()=>handleDelete(disp.id)}>
    <DeleteIcon />
  </IconButton>}
  editButton={<IconButton 
    aria-label="teacher-edit-button" 
    color="primary" 
    onClick={()=>navigate(`/teachers/edit/${disp.id}`)}
    >
    <EditIcon />
  </IconButton>}
      />))}
  </div>;
}
  