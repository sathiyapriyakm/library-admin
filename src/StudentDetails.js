import React from "react";
import { Message } from "./Message";
import {useState,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";


export function StudentDetails() {

  const [studentList, setStudentList] = useState([]);
  const navigate=useNavigate();
  const getStudents=()=>{
  fetch("https://62aa7f0d371180affbd633f8.mockapi.io/students",{
    method:"GET",
  }
  )
  .then((data)=>(data.json()))
  .then((mvs)=>setStudentList(mvs));
  }   
  useEffect(()=>getStudents(),[]);
  const handleDelete=(deletionId)=>{
    fetch(`https://62aa7f0d371180affbd633f8.mockapi.io/students/${deletionId}`,{
    method:"DELETE",
  }).then(()=>getStudents());
  }
  
  return <div className="student-list">
    {studentList.map((disp) => (<Message 
    key={disp.id} 
    name={disp.name} 
    standard={disp.standard} 
    contact_number={disp.contact_number} 
    address={disp.address} 
    id={disp.id}
    deleteButton={<IconButton 
    aria-label="student-delete-button" 
    color="error" 
    onClick={()=>handleDelete(disp.id)}>
    <DeleteIcon />
  </IconButton>}
  editButton={<IconButton 
    aria-label="student-edit-button" 
    color="primary" 
    onClick={()=>navigate(`/students/edit/${disp.id}`)}
    >
    <EditIcon />
  </IconButton>}
      />))}
  </div>;
}
  