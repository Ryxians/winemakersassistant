import './signin.css'
import React, {FC} from 'react';
import wineglass from './glass-with-wine.svg';

interface Props {

}

// I used the bootstrap sign-in example
// Aug 1, 2021
export const BootStrapLogin: FC<Props> = () => {
    return (
        <div className="hotbod text-center">
            <div className="form-signin">
                <form>
                    <img className="mb-4" src={wineglass} alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Wine Maker's Assistant</h1>

                    <div className="form-floating pb-1">
                        <input type="text" className="form-control" id="floatingInput" placeholder="username"/>
                        <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </div>
            <div className="fixed-bottom text-muted">
                <span>Icons made by </span>
                <a href="https://www.freepik.com"
                   title="Freepik">Freepik</a>
                <span> from </span>
                <a href="https://www.flaticon.com/"
                   title="Flaticon">www.flaticon.com</a>
            </div>
        </div>
    );
};