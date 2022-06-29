import {useNavigate} from "react-router-dom";
export function SideBarDashboard() {
  const navigate=useNavigate();
  return (
    <>
      <li className="nav-item active">
        <a onClick={()=>navigate("/")}className="nav-link" >
          <i className="fas fa-fw fa-book-open"></i>
          <span>View Books</span></a>
      </li>
    </>
  );
}
