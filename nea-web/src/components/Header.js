import React from "react";
import {Button} from '@material-ui/core';
import hamburger from '../assets/imgs/hamburger_menu.png';
import logo from '../assets/imgs/logo_black.png';
import {Link, withRouter} from 'react-router-dom';
import notifications from '../assets/imgs/notifications.png';
import TemporaryDrawer from './TemporaryDrawer';

class Header extends React.Component  {

    render(){
        return (
            <div className="row" style={{borderBottom: '1px solid black'}}>
                <div className="col-3 col-md-3" >
                    <TemporaryDrawer/>
                </div>
                <div className="col-6 col-md-6" style={{textAlign: 'center'}}>
                    <img 
                        style={{  height: 50 }}
                        src={logo}
                    />
                </div>
                <div className="col-3 col-md-3" style={{textAlign: 'right'}}>
                    <Button
                        style={{alignSelf: 'stretch', height: 30}}
                        onClick={() => this.props.history.push("/notifications")}
                        >
                            <div >
                            <img 
                            style={{ width: 30, height: 30, marginRight: 20, marginTop: 20}}
                            src={notifications}                    />
                            </div>
                        
                    </Button>
                </div>
            </div>
        );
    }
  }
export default withRouter(Header);
  