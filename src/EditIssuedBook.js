import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "@mui/material";


export function EditIssuedBook() {
  const { bookId } = useParams();
  const [book,setBook]=useState(null);
  const getBook=()=>{
    fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/issuedBooks/${bookId}`,{
      method:"GET",
    }
    )
    .then((data)=>(data.json()))
    .then((data1)=>setBook(data1))
    .catch((error)=>console.log(error));
    }   
  useEffect(()=>getBook(),[]);

  return (book?<EditForm book={book}/>:"Loading...");
  }
  const bookValidationSchema = Yup.object({
    BookID: Yup.string().required('Required'),
    BookTitle: Yup.string().required('Required'),
    ISBN: Yup.number().required('Required'),
    Borrower: Yup.string().required('Required'),
    Issuer: Yup.string().required('Required'),
    Quantity: Yup.number().required('Required'),
    DateOfIssue: Yup.date().required('Required'),
    DateOfReturn: Yup.date().required('Required').min(
      Yup.ref('DateOfIssue'),
      "Return date can't be before Issue date"
    ),
    ReturnStatus: Yup.string().required('Required'),
  })

  function EditForm({book}){

  const navigate = useNavigate();

    const editBook =(bookDetails) => {
      fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/issuedBooks/${bookDetails.BookID}`,
      {
        method:"PUT",
        body: JSON.stringify(bookDetails),
        headers:{"Content-Type":"application/json"},
    }).then(()=>{navigate("/issuedBooks")}).catch((e)=>console.log("ERROR"));
    };

    const {handleBlur,handleChange,handleSubmit,values,errors,touched}=useFormik({
        initialValues :{
            BookID: book.id,
            BookTitle: book.BookTitle,
            ISBN: book.ISBN,
            Borrower: book.Borrower,
            Issuer: book.Issuer,
            Quantity: book.Quantity,
            DateOfIssue:book.DateOfIssue,
            DateOfReturn:book.DateOfReturn,
            ReturnStatus:book.ReturnStatus,
          },
      validationSchema:bookValidationSchema ,
      onSubmit:(bookDetails)=>{
        console.log("onSubmit",bookDetails);
        editBook(bookDetails);
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
         Edit Issue  Details
      </Typography>
        <TextField
        className="add-book-name"
        label="BookID"
        type="text"
        value={values.BookID} 
        name="BookID"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.BookID&&errors.BookID?true:false}
        helperText={touched.BookID&&errors.BookID?errors.BookID:""}
        />
        <TextField
        className="add-book-name"
        label="BookTitle"
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
        label="ISBN"
        value={values.ISBN} 
        name="ISBN"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.ISBN&&errors.ISBN?true:false}
        helperText={touched.ISBN&&errors.ISBN?errors.ISBN:""}
        />
       <TextField
       className="add-book-name"
       label="Borrower"
       type="text"
       value={values.Borrower} 
       name="Borrower"
       onChange={handleChange}
       onBlur={handleBlur}
       error={touched.Borrower&&errors.Borrower?true:false}
       helperText={touched.Borrower&&errors.Borrower?errors.Borrower:""}
       />
       <TextField
          className="add-book-name"
          label="Issuer"
          type="text"
          value={values.Issuer} 
          name="Issuer"
          onChange={handleChange}
           onBlur={handleBlur}
           error={touched.Issuer&&errors.Issuer?true:false}
           helperText= {touched.Issuer&&errors.Issuer?errors.Issuer:""}
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
         label="DateOfIssue"
         type="Date"
         value={values.DateOfIssue} 
         name="DateOfIssue"
         onChange={handleChange}
          onBlur={handleBlur}
          error={touched.DateOfIssue&&errors.DateOfIssue?true:false}
          helperText= {touched.DateOfIssue&&errors.DateOfIssue?errors.DateOfIssue:""}
       />
        <TextField
        className="add-book-name"
        label="DateOfReturn"
        type="Date"
        value={values.DateOfReturn} 
        name="DateOfReturn"
        onChange={handleChange}
            onBlur={handleBlur}
            error={touched.DateOfReturn&&errors.DateOfReturn?true:false}
            helperText= {touched.DateOfReturn&&errors.DateOfReturn?errors.DateOfReturn:""}
        />
      
        <TextField
        className="add-book-name"
        label="ReturnStatus: Returned or Not Returned"
        type="text"
        value={values.ReturnStatus} 
        name="ReturnStatus"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.ReturnStatus&&errors.ReturnStatus?true:false}
        helperText= {touched.ReturnStatus&&errors.ReturnStatus?errors.ReturnStatus:""}
        />
            <Button className="add-book-btn" 
          color="success"
        type="submit"
        variant="contained">Save</Button>
      </form> 
    </div>;
}
