import {
  Typography,
  Button,
  
} from '@mui/material'

import React from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";

import TextField from '@mui/material/TextField'
import { useNavigate } from 'react-router-dom'


export function AddBooks() {
  
  const navigate=useNavigate();

  const addBook =(newBook) => {
    fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/viewbooks`,{
    method: "POST",
    body: JSON.stringify(newBook),
    headers: {
      "Content-Type" : "application/json",
    },
  }).then(() => navigate("/BooksList"));
  };
  const initialValues = {
    BookTitle: '',
    Author: '',
    ISBN: '',
    Language: '',
    Quantity: '',
    ImageUrl: '',
    ShortTitle: '',
  }
  const bookValidationSchema = Yup.object({
    BookTitle: Yup.string().required('Required'),
    Author: Yup.string().required('Required'),
    ISBN: Yup.number().required('Required'),
    Language: Yup.string().required('Required'),
    Quantity: Yup.number().required('Required'),
    ImageUrl: Yup.string().required('Required'),
    ShortTitle: Yup.string().required('Required'),
  })
  
  const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
    initialValues:initialValues,
    validationSchema:bookValidationSchema ,
    onSubmit:(newBook)=>{
      console.log("onSubmit",newBook);
      addBook(newBook);
    },
  });
  
  return <div
  className="add-book-spec">
  <form  
  onSubmit={handleSubmit}
  className="add-book-form" >
    <Typography variant="h4" pb={2}
  sx={{
    textAlign: 'center',
  }}>
   Book Details
  </Typography>
    
    <TextField
    className="add-book-name"
    label="Book Title"
    type="text"
    value={values.BookTitle} 
    name="BookTitle"
    onChange={handleChange}
    onBlur={handleBlur}
    error={touched.BookTitle&&errors.BookTitle?true:false}
    helperText={touched.BookTitle&&errors.BookTitle?errors.BookTitle:""}
    />
    <TextField
    className="add-book-name"
    label="Author"
    value={values.Author} 
    name="Author"
    onChange={handleChange}
    onBlur={handleBlur}
    error={touched.Author&&errors.Author?true:false}
    helperText={touched.Author&&errors.Author?errors.Author:""}
    />
   <TextField
   className="add-book-name"
   label="ISBN"
   type="number"
   value={values.ISBN} 
   name="ISBN"
   onChange={handleChange}
   onBlur={handleBlur}
   error={touched.ISBN&&errors.ISBN?true:false}
   helperText={touched.ISBN&&errors.ISBN?errors.ISBN:""}
   />
   <TextField
      className="add-book-name"
      label="Language"
      type="text"
      value={values.Language} 
      name="Language"
      onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Language&&errors.Language?true:false}
       helperText= {touched.Language&&errors.Language?errors.Language:""}
    />
    <TextField
      className="add-book-name"
      label="Quantity"
      type="number"
      value={values.Quantity} 
      name="Quantity"
      onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Quantity&&errors.Quantity?true:false}
       helperText= {touched.Quantity&&errors.Quantity?errors.Quantity:""}
    />
    <TextField
      className="add-book-name"
      label="Image Url"
      type="text"
      value={values.ImageUrl} 
      name="ImageUrl"
      onChange={handleChange}
       onBlur={handleBlur}
       error={touched.ImageUrl&&errors.ImageUrl?true:false}
       helperText= {touched.ImageUrl&&errors.ImageUrl?errors.ImageUrl:""}
    />
    <TextField
      className="add-book-name"
      label="Short Title"
      type="text"
      value={values.ShortTitle} 
      name="ShortTitle"
      onChange={handleChange}
       onBlur={handleBlur}
       error={touched.ShortTitle&&errors.ShortTitle?true:false}
       helperText= {touched.ShortTitle&&errors.ShortTitle?errors.ShortTitle:""}
    />
     <Button className="add-book-btn" 
      color="primary"
    type="submit"
    variant="contained">Add Book</Button>
  </form> 
</div>;
}

