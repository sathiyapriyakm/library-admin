import { Mail } from "./Mail";
import { Profile } from "./Profile";
import { TopBarNotification } from "./TopBarNotification";

export function Topbar() {
  return (
        <>
         <nav className="navbar navbar-expand navbar-light  topbar mb-4 static-top shadow" style={{backgroundColor:"#5f27cd"}}>

 <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
    <i className="fa fa-bars"></i>
</button>

<ul className="navbar-nav ml-auto">
  <TopBarNotification/>
    <Mail/>
<Profile/>

</ul>

</nav>
        </>

    );
}


