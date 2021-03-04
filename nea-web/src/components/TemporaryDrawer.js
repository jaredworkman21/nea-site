import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BallotIcon from '@material-ui/icons/Ballot';
import {auth} from '../services/firebaseServices';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

class TemporaryDrawer extends Component {
  state = {
    left: false,
  }
  render() {

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, [anchor]: open });
  };


    const comp =  <Link to='/select-car'>
    <ListItem button >
            <ListItemIcon>{<CalendarTodayIcon style={{color: 'black'}} />}</ListItemIcon>
            <ListItemText primary={"AGENDA"}  style={{color: 'black'}} />
    </ListItem>
  </Link>
    const comp2 =  <Link to='/add-car'>
    <ListItem button  >
            <ListItemIcon>{<AddCircleIcon style={{color: 'black'}} />}</ListItemIcon>
            <ListItemText primary={"AGREGAR CARRO"}  style={{color: 'black'}} />
    </ListItem>
  </Link>

   
  
  

  const list = (anchor) => (
    <div
      className={"drawer-list"}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{float: 'right'}}
     > 
      <List >
          {comp}
          {/* <Link to='/account'>
            <ListItem button >
                    <ListItemIcon>{<AccountBoxIcon  style={{color: '#F9A700'}}/>}</ListItemIcon>
                    <ListItemText primary={"ACCOUNT"}  style={{color: '#696969'}} />
            </ListItem>
          </Link> */}
                    {comp2}

          <Link to='/'>
          <ListItem button  onClick = {() => {auth.signOut()}}>
                  <ListItemIcon>{<ExitToAppIcon style={{color: '#F9A700'}} />}</ListItemIcon>
                  <ListItemText primary={"SIGN OUT"}  style={{color: '#696969'}} />
          </ListItem>
          </Link>
      </List>        
    </div>
  );

  return (
    <div style={{marginTop: '10px', textAlign: 'left', marginLeft: '20px'}}>
      {['left', ].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><MenuIcon style={{fontSize: '35px', color:'#6199ea'}}/></div>
          <Drawer anchor={anchor} open={this.state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
      }
}

export default TemporaryDrawer;