import {CardDashboard} from "./CardDashboard"
import {useState,useEffect} from 'react';
export function Dashboard(){
    const [numOfTeacher,setNumOfTeacher]=useState(null);
    const [numOfStudent,setNumOfStudent]=useState(null);
   
    const getTeachers=()=>{
        fetch("https://62aa7f0d371180affbd633f8.mockapi.io/teachers",{
          method:"GET",
        }
        )
        .then((data)=>(data.json()))
        .then((mvs)=> {setNumOfTeacher(mvs.length)}
        );
        }   
        const getStudents=()=>{
            fetch(`https://62aa7f0d371180affbd633f8.mockapi.io/students/`,{
              method:"GET",
            }
            )
            .then((data)=>(data.json()))
            .then((mv)=>setNumOfStudent(mv.length));
            }   
        useEffect(()=>{getTeachers();getStudents()},[]);
    return(
<>
<div className="d-sm-flex align-items-center  mb-4">
<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

</div>
<div className="row">
<CardDashboard detail="Total number of students" value={numOfStudent} iprop="fas fa-book-reader fa-2x text-gray-300"/>
 <CardDashboard detail="Total number of teachers" value={numOfTeacher} iprop="fas fa-chalkboard-teacher fa-2x text-gray-300"/>  
</div>

</>
);
}