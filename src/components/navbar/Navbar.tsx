import React, {FC} from 'react';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

interface Props {

}

export const Navbar : FC<Props> = () => {
 return (
     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container-fluid">
             <a className="navbar-brand" href="/">Wine Maker's Assistant</a>
             <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                     data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                     aria-expanded="false" aria-label="Toggle navigation">
                 <span className="navbar-toggler-icon"></span>
             </button>
             <div className="collapse navbar-collapse" id="navbarSupportedContent">
                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                     <li className="nav-item">
                         <a className="nav-link active" aria-current="page" href="/">General</a>
                     </li>
                     <li className="nav-item dropdown">
                         <a className="nav-link active dropdown-toggle" href="/" id="navbarDropdown" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                             New Wine
                         </a>
                         <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                             <li><a className="dropdown-item" href="/">From Existing</a></li>
                             <li><a className="dropdown-item" href="/">New Wine</a></li>
                         </ul>
                     </li>
                     <li className="nav-item">
                         <a className="nav-link active" aria-current="page" href="/">Continue Wine</a>
                     </li>
                     <li className="nav-item">
                         <a className="nav-link active" aria-current="page" href="/">Wine Logs</a>
                     </li>
                 </ul>
             </div>
         </div>
     </nav>
 );
};