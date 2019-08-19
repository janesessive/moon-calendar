import React, { Component } from 'react';

import { Route } from 'react-router-dom';
import './Layout.css';
import UserForm from '../UserForm/UserForm';
import TransitInfo from '../TransitInfo/TransitInfo';




class Layout extends Component {
    render() {
         return(
            <div className="Layout">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Info</a></li>
                            <li><a href="/transit">Transit Information</a></li>
                        </ul>
                    </nav>
                </header>
                <div>
                <Route path="/" exact component={UserForm}/>
                <Route path="/transit" component={TransitInfo}/>
                </div>
        </div>
        );
  }
    
    }


export default Layout;