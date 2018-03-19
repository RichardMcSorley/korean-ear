import React from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import HomeIcon from 'material-ui/svg-icons/navigation/menu';

const styles= {

      }
      const renderBackButton =(props)=>{
        if(props.onBackButtonClick){
          return (<IconButton onClick={props.onBackButtonClick}><BackIcon /></IconButton>)
        }
        else return (<IconButton ><HomeIcon /></IconButton>)
      }
export default (props) => (
  <div className="header">
    <div className="header-wrap">
      <AppBar
        title={props.title}
        zDepth={3}
        iconElementLeft={renderBackButton(props)}
        iconElementRight={
          <IconMenu
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Help" />
          </IconMenu>}
      />
    {props.children}

    </div>

  </div>

);
