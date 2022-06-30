import { Typography, Container, Grid, Paper, Box, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'


export const Dashboard = () => {
  const navigate=useNavigate();

  const [books, setBooks] = useState([]);
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
    <>
      <Typography variant="h4" pb={2}
      sx={{
        textAlign: 'center',
      }}>
        Available Books
      </Typography>
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid key={book.id} item xs={12} sm={12} md={12}>
              <Paper elevation={3} sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    width: '20%',
                    height: '100%',
                    display: { xs: 'none', md: 'flex' },
                  }}
                >
                  <Card
                    sx={{
                      maxWidth: '100%',
                      marginRight: '10px',
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                      }}
                      image={book.ImageUrl}
                      alt="Paella dish"
                    />
                  </Card>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '80%',
                    margin: { xs: '10px 10px', md: '10px 10px' },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        textAlign: 'start',
                      }}
                    >
                      {book.BookTitle}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        textAlign: 'start',
                      }}
                    >
                      by {book.Author}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: 'start',
                      }}
                    >
                      Book ID: {book.id}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: 'start',
                      }}
                    >
                      ISBN-10: {book.ISBN}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: 'start',
                      }}
                    >
                      Language: {book.Language}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        textAlign: 'start',
                      }}
                    >
                      Quantity: {book.Quantity}
                    </Typography>
                  </Box>
                  <Box>
                    <Stack
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingBottom: '10px',
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ marginRight: '10px' }}
                      onClick={()=>navigate(`/books/issue/${book.id}`)}
                      >
                        Issue
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={(e) => deleteBook(book.id)}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

