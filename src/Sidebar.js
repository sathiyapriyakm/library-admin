
import { SideBarComp } from "./SideBarComp";
import { SideBarDashboard } from "./SideBarDashboard";
import { SideBarUtil } from "./SideBarUtil";

export function Sidebar() {
  return (
    <>
      <ul className="navbar-nav  sidebar sidebar-dark accordion" id="accordionSidebar" style={{backgroundColor:"#5f27cd"}}>

        <a className="sidebar-brand d-flex align-items-center justify-content-center" >
          <div className="sidebar-brand-icon rotate-n-15">
          <i class="fas fa-book"></i>
          </div>
          <div className="sidebar-brand-text mx-3">LIBRARY ADMIN </div>
        </a>

        <hr className="sidebar-divider my-0" />
        <SideBarDashboard/>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">
          Manage Books
        </div>

       <SideBarComp />

        {/* <SideBarUtil /> */}

        <hr className="sidebar-divider" />     
      </ul>

    </>
  );
}


