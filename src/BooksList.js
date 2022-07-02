import React, { useContext, useEffect } from 'react'
import { Button, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function BooksList() {
  const [books, setBooks] = useState([]);
  const navigate=useNavigate();
  const getBooks=()=>{
    fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/viewbooks`,{
      method:"GET",
    }
    )
    .then((data)=>(data.json()))
    .then((data1)=>setBooks(data1))
    .catch((error)=>console.log(error));
    }  
    const deleteBook =(id) => {
      fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/viewbooks/${id}`,{
        method:"DELETE",
      }
        )
        .then(()=>getBooks())
        .catch((error)=>console.log(error));
  
      }

  useEffect(() => {
    getBooks()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">Book ID</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Author</TableCell>
            <TableCell align="center">ISBN-10</TableCell>
            <TableCell align="center">Language</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Issue / Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell align="center">{book.id}</TableCell>
              <TableCell align="center">{book.ShortTitle}</TableCell>
              <TableCell align="center">{book.Author}</TableCell>
              <TableCell align="center">{book.ISBN}</TableCell>
              <TableCell align="center">{book.Language}</TableCell>
              <TableCell align="center">{book.Quantity}</TableCell>
              <TableCell align="center">
                <Button
                color="success"
                  variant="contained"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                  onClick={()=>navigate(`/books/issue/${book.id}`)}
                >
                  Issue
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                  onClick={() => deleteBook(book.id)}
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
