import React, {FC} from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import {Link} from "react-router-dom";

interface Props {
    changeRoute: React.Dispatch<React.SetStateAction<string>>,
    logout: any
}

export const Navbar : FC<Props> = ({changeRoute, logout}) => {
    const newRouteFromHref = (event:React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        changeRoute(event.currentTarget.pathname);
    }

 return (
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container-fluid">
             <Link className="navbar-brand" to="/" >Wine Maker's Assistant</Link>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                     data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                     aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                         <Link className="nav-link active" aria-current="page" to="/"
                         >
                             General
                         </Link>
                     </li>
                     <li className="nav-item dropdown">
                         <a className="nav-link active dropdown-toggle" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false" href="/"
                         >
                             New Wine
                         </a>
                         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                             <li><Link className="dropdown-item" to="/start"
                             >
                                 From Existing
                             </Link></li>
                             <li><Link className="dropdown-item"
                                    to="/newkit"
                             >New Wine</Link></li>
                         </ul>
                     </li>
                     <li className="nav-item">
                         <Link className="nav-link active" aria-current="page" to="/"
                         >
                             Continue Wine
                         </Link>
                     </li>
                     <li className="nav-item">
                         <Link className="nav-link active" aria-current="page" to="/"
                         >
                             Wine Logs
                         </Link>
                     </li>
                     <li className="nav-item dropdown">
                         <Link className="nav-link active dropdown-toggle" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false" to="/"
                         >
                             Account Management
                         </Link>
                         <ul className="dropdown-menu">
                             <li className="dropdown-item">
                                 <a className="nav-link active btn-danger rounded-3" aria-current="page" href="/"
                                    onClick={logout}
                                 >
                                     Logout
                                 </a>
                             </li>
                         </ul>
                     </li>
                 </ul>
             </div>
         </div>
     </nav>
 );
};