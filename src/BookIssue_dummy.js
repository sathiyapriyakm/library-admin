// import * as React from 'react'
import {
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  MenuItem,
} from '@mui/material'

import { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";

import { Formik,Form, Field } from 'formik'
import * as Yup from 'yup'

import { TextField } from 'formik-mui'

import { DatePicker } from 'formik-mui-lab'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export const returnStatuses = [
  {
    value: 'Returned',
    label: 'Returned',
  },
  {
    value: 'Not Returned',
    label: 'Not Returned',
  },
]


export const BookIssue_dummy = () => {
  
  const { bookId } = useParams();
  const [issueBook,setIssueBook]=useState(null);
  const getBooks=()=>{
    fetch(`https://61ea3e657bc0550017bc6651.mockapi.io/viewbooks/${bookId}`,{
      method:"GET",
    }
    )
    .then((data)=>(data.json()))
    .then((data1)=>setIssueBook(data1))
    .catch((error)=>console.log(error));
    }    
  useEffect(()=>getBooks(),[]);

  return (issueBook?<EditForm_dummy issueBook={issueBook}/>:"Loading...");
  }
function EditForm_dummy({issueBook}){


  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  
      const updateIssuedBook =(updatedValue) => {
        
        fetch(`'https://61ea3e657bc0550017bc6651.mockapi.io/issuedBooks`,
        {
          method:"POST",
          body: JSON.stringify(updatedValue),
          headers:{"Content-Type":"application/json"},
      }).then(()=>{navigate("/books/issuedBooks")}).catch((e)=>console.log("ERROR"));
      };

      const bookValidationSchema = Yup.object({
        BookID: Yup.string().required('Required'),
        BookTitle: Yup.string().required('Required').min(10),
        ISBN: Yup.number().required('Required').min(10),
        Borrower: Yup.string().required('Required'),
        Issuer: Yup.string().required('Required'),
        Quantity: Yup.number().required('Required'),
        DateOfIssue: Yup.date().required('Required'),
        DateOfReturn: Yup.date().required('Required'),
        ReturnStatus: Yup.string().required('Required'),
      })

      const initialValues ={
        BookID: issueBook.id,
        BookTitle: issueBook.BookTitle,
        ISBN: issueBook.ISBN,
        Borrower: '',
        Issuer: '',
        Quantity: '',
        DateOfIssue: '',
        DateOfReturn: '',
        ReturnStatus: '',
      };
    
      
     const clearedValues={
     BookID:'',
     BookTitle: '',
     ISBN:'',
     Borrower:'',
     Issuer:'',
     Quantity: '',
     DateOfIssue: '',
     DateOfReturn: '',
     ReturnStatus: '',
   };
  
  const navigate = useNavigate()

  return (
    <div>
      <Formik
      initialValues={initialValues}
      validationSchema={bookValidationSchema}
      onSubmit={(values,{ setSubmitting,resetForm }) => {
        console.log("onSubmit",values);
          updateIssuedBook(values);
          setSubmitting(false) ;
          resetForm({ values: clearedValues });
          }  }     
     >
      {({ handleBlur,handleChange,handleSubmit,values,errors,touched, submitForm, isSubmitting, resetForm }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Form  onSubmit={handleSubmit}>
            <Grid
              item
              container
              spacing={2}
              xs={12}
              alignItems="center"
              justify="center"
            >
              <Container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={12} sm={12} md={7} lg={7} mt={4}>
                  <Paper elevation={5}>
                    <Grid item xs={12} pt={2}>
                      <Typography variant="h4" sx={{textAlign: 'center',
      }}>Issue A Book</Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="BookID"
                          type="text"
                          label="Book ID"
                           value={values.BookID} 
                           onChange={handleChange}
                           onBlur={handleBlur}
                           error={touched.BookID&&errors.BookID?true:false}
                           helperText={touched.BookID&&errors.BookID?errors.BookID:""}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        sx={{ margin: 2 }}
                      >
                        <Field
                          component={TextField}
                          name="BookTitle"
                          type="text"
                          label="Book Title"
                          value={values.BookTitle} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.BookTitle&&errors.BookTitle?true:false}
                          helperText={touched.BookTitle&&errors.BookTitle?errors.BookTitle:""}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                        <Field
                          component={TextField}
                          name="ISBN"
                          type="number"
                          label="ISBN"
                          value={values.ISBN} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.ISBN&&errors.ISBN?true:false}
                          helperText={touched.ISBN&&errors.ISBN?errors.ISBN:""}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                        <Field
                          component={TextField}
                          name="Borrower"
                          type="text"
                          label="Borrower Name"
                          value={values.Borrower} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.Borrower&&errors.Borrower?true:false}
                          helperText={touched.Borrower&&errors.Borrower?errors.Borrower:""}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                        <Field
                          component={TextField}
                          name="Issuer"
                          type="text"
                          label="Issuer Name"
                          value={values.Issuer} 
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.Issuer&&errors.Issuer?true:false}
                          helperText={touched.Issuer&&errors.Issuer?errors.Issuer:""}
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                        <Field
                          component={TextField}
                          name="Quantity"
                          type="number"
                          label="Quantity Issued"
                          value={values.Quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.Quantity&&errors.Quantity?true:false}
                          helperText={touched.Quantity&&errors.Quantity?errors.Quantity:""}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                      {/* <Col>
                        <DatePicker
                        name="DateOfIssue"
                        label="Date Of Issue"
                        value={issueDate}
                        textField={{
                          variant: 'outlined',
                          fullWidth: true,
                        }}
                          selected={issueDate}
                          onChange={date => setIssueDate(date)}
                          format="MM/dd/yyyy"
                          onBlur={handleBlur}
                          error={touched.DateOfIssue&&errors.DateOfIssue?true:false}
                          helperText={touched.DateOfIssue&&errors.DateOfIssue?errors.DateOfIssue:""}
                        />
                      </Col> */}
                        <Field
                          component={DatePicker}
                          name="DateOfIssue"
                          label="Date Of Issue"
                          value={issueDate}
                          textField={{
                            variant: 'outlined',
                            fullWidth: true,
                          }}
                           selected={issueDate.toString()}
                          format="MM/dd/yyyy"
                          onChange={(date) => {setIssueDate(date);
                            values.DateOfIssue=issueDate.toString()}}
                        // selected={(values.DateOfIssue && new Date(values.DateOfIssue)) || null}
                        //  onChange={(val) => {setFieldValue(values.DateOfIssue, val);}}

                          onBlur={handleBlur}
                          error={touched.DateOfIssue&&errors.DateOfIssue?true:false}
                          helperText={touched.DateOfIssue&&errors.DateOfIssue?errors.DateOfIssue:""}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                        {/* <Col>
                      <DatePicker
                      name="DateOfIssue"
                      label="Date Of Issue"
                      value={returnDate}
                      textField={{
                        variant: 'outlined',
                        fullWidth: true,
                      }}
                        selected={returnDate}
                        onChange={date => setReturnDate(date)}
                        format="MM/dd/yyyy"
                        onBlur={handleBlur}
                        error={touched.DateOfIssue&&errors.DateOfIssue?true:false}
                        helperText={touched.DateOfIssue&&errors.DateOfIssue?errors.DateOfIssue:""}
                      />
                    </Col> */}
                        <Field
                          component={DatePicker}
                          name="DateOfReturn"
                          label="Date Of Return"
                          value={returnDate}
                          textField={{
                            variant: 'outlined',
                            fullWidth: true,
                          }}
                          format="MM/dd/yyyy"
                          selected={returnDate.toString()}
                          onChange={(date) => {setReturnDate(date);
                            values.DateOfReturn=returnDate.toString()}}
                          onBlur={handleBlur}
                          error={touched.DateOfReturn&&errors.DateOfReturn?true:false}
                          helperText={touched.DateOfReturn&&errors.DateOfReturn?errors.DateOfReturn:""}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 0, sm: 0 },
                        }}
                      >
                        <Field
                          component={TextField}
                          type="text"
                          name="ReturnStatus"
                          label="Book Issue Status"
                          select
                          variant="outlined"
                          value={values.ReturnStatus}
                          margin="normal"
                          fullWidth
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.ReturnStatus&&errors.ReturnStatus?true:false}
                          helperText={touched.ReturnStatus&&errors.ReturnStatus?errors.ReturnStatus:""}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        >
                          {returnStatuses.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      alignItems="center"
                      justify="center"
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      sx={{
                        display: { sm: 'flex' },
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 2,
                        marginRight: 2,
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        ml={2}
                        mr={2}
                        sx={{
                          marginBottom: { xs: 2, sm: 2 },
                          marginTop: { xs: 2, sm: 2 },
                          paddingBottom: { xs: 2, sm: 2 },
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={isSubmitting}
                          onClick={submitForm}
                          sx={{height:50,borderRadius:2}}
                        >Issue Book
                        </Button>
                        {/* <ColorButton
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={isSubmitting}
                          onClick={submitForm}
                        ></ColorButton> */}
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Container>
            </Grid>
          </Form>
       </LocalizationProvider>
        )}
      </Formik>
      </div>
  )
}


