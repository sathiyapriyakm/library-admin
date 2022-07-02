import './App.css';
import {Sidebar} from "./Sidebar"
import {Topbar} from "./Topbar"
import {Dashboard} from "./Dashboard"
import Footer from "./Footer"
import React from "react";
import { Routes,Route,Navigate} from "react-router-dom";
import { AddBooks} from './AddBooks';
import { Login } from './Login';
import { ForgetPassword } from './ForgetPassword';
import { Register } from './Register';
import { NotFound } from './NotFound';
import { BookIssue } from './BookIssue';
import { IssuedBooks } from './IssuedBooks';
import { BooksList } from './BooksList';
import { EditIssuedBook } from './EditIssuedBook';

function App() {
  return (
      <>
      <div id="wrapper">
          <Routes>

          <Route path="/Login" element={<Login/>}/>
          <Route path="/Forgot-Password" element={<ForgetPassword/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/" element={<MainBoard flow=""/>}/>
          <Route path="/404-Page" element={<MainBoard flow="404-Page"/>}/>
          <Route path="*" element={<Navigate replace to="/404-Page"/>}/>
          <Route path="/Dashboard" element={<Navigate replace to="/"/>}/>
          <Route path="/books/issue/:bookId" element={<MainBoard flow="BookIssue"/>}/>
          <Route path="/books/issue/edit/:bookId" element={<MainBoard flow="EditIssuedBook"/>}/>
          <Route path="/issuedBooks" element={<MainBoard flow="IssuedBooks"/>}/>
          <Route path="/BooksList" element={<MainBoard flow="BooksList"/>}/>
          <Route path="/Add-Books" element={<MainBoard flow="AddBooks"/>}/>
          </Routes>
      </div>
 </>
  );
}

export default App; 

function MainBoard({flow}){
    return (
        <>
             <div id="wrapper" style={{width:"100%"}}>
          <Sidebar/>
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar/>
            <div className="container-fluid">
            <section className="routes-container">
               { 
               {
                   "":<Dashboard/>,
                   "AddBooks":<AddBooks/>,
                   "404-Page":<NotFound/>,
                   "BookIssue":<BookIssue/>,
                   "IssuedBooks":<IssuedBooks/>,
                   "EditIssuedBook":<EditIssuedBook/>,
                   "BooksList":<BooksList/>,
               }[flow]
               }
            </section>  
            </div>
          </div>
          <Footer/>
          </div>    
      </div></>
    );
}


