import {useNavigate} from "react-router-dom";
import { useState } from "react";

export function SideBarComp() {
  const [show,setShow]= useState(false);
  const navigate=useNavigate();

  return (<>
    <li className="nav-item">
      <a onClick={() => setShow(!show)} className={show ? "nav-link collapsed" : "nav-link"}  data-toggle="collapse" data-target="#collapseTwo"
        aria-expanded={show ? "false" : "true"} aria-controls="collapseTwo">
        <i className="fas fa-book-reader"></i>
        <span>Book Maintainance</span>
      </a>
      <div id="collapseTwo" className={show ? "collapse show" : "collapse"} aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Manage Books</h6>
          <a onClick={()=>navigate("/BooksList")} className="collapse-item" >Books List</a>
          <a onClick={()=>navigate("/Add-Books")} className="collapse-item" >Add Books</a>
          <a onClick={()=>navigate("/issuedBooks")} className="collapse-item" >Issued Books List</a>
        </div>
      </div>
    </li>
  </>);
}
