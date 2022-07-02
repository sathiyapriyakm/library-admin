import React from "react";
import { useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button';
import { useState } from "react";
import {useNavigate} from "react-router-dom"


export function IssuedBooks() {
  const [issuedBooks,setIssuedBooks]=useState([]);
  const navigate=useNavigate();
  const getIssuedBooks=()=>{
    fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/issuedBooks`)
    .then((data)=>(data.json()))
    .then((data1)=>setIssuedBooks(data1))
    .catch((error)=>console.log(error));
    } 
    const deleteIssuedBooks  =(bookId)=>{
      fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/issuedBooks/${bookId}`,{
        method:"DELETE",
      }
        )
        .then(()=>getIssuedBooks())
        .catch((error)=>console.log(error));

    }

    useEffect(() => {
      getIssuedBooks()
    }, [])
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Issue ID</TableCell>
              <TableCell align="center">Book ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Borrower Name</TableCell>
              <TableCell align="center">Issuer Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Date Of Issue</TableCell>
              <TableCell align="center">Date Of Return</TableCell>
              <TableCell align="center">Return Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issuedBooks.map((book) => (
              <TableRow key={book.id}>
                <TableCell align="center">{book.id}</TableCell>
                <TableCell align="center">{book.BookID}</TableCell>
                <TableCell align="center">{book.BookTitle}</TableCell>
                <TableCell align="center">{book.Borrower}</TableCell>
                <TableCell align="center">{book.Issuer}</TableCell>
                <TableCell align="center">{book.Quantity}</TableCell>
                <TableCell align="center">
                  {book.DateOfIssue}
                </TableCell>
                <TableCell align="center">
                  {book.DateOfReturn}
                </TableCell>
                <TableCell align="center">{book.ReturnStatus}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="warning"
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    onClick={()=>navigate(`/books/issue/edit/${book.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ marginRight: 1, marginBottom: 1 }}
                    onClick={(e) => deleteIssuedBooks(book.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
