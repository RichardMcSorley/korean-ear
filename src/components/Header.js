import React from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import BookIcon from 'material-ui/svg-icons/action/book';

const styles= {

    contentWrapper: {
          padding: '16px',
          margin: '16px',
          paddingTop: '64px'
        },
      }
export default (props) => (
  <div>
    <AppBar
      title="Korean Ear"
      zDepth={3}
      className="page-header"
      iconElementLeft={<IconButton><BookIcon /></IconButton>}
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
    <div style={styles.contentWrapper}>
      {props.children}
    </div>

  </div>

);
