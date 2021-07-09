import React from 'react';
import Header from "./Header";

const PageNotFound = (props)=>(
    <div>
        <Header/>
        <div id="main-content" className="container-fluid mx-auto justify-content-center">
            <div className="row">
                <div className="notfound-bg">
                    <div className="row">
                        <div className="col-lg-4 offset-lg-2">
                            <h1 className="not-found-error-header">Oops!</h1>
                            <p className="not-found-error-text">We can't seem to find the page you're looking for.</p>
                            <a href="#/" className="head-back">Head back to Homepage</a>
                        </div>
                        <div className="col-lg-4 offset-lg-2 oops-img">
                            <img src="assets/images/oops-img.png" alt="oops"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default PageNotFound;