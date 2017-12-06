import React from "react";

const styles={
          container:{
            height: 'calc(100vh - 64px)',
          //  background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(assets/images/bg_1.jpg)',
            backgroundSize: 'cover',
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            padding: '32px',
            paddingTop: '16px',
            overflow: 'scroll'
          }
}

export default (props) => (
      <div style={styles.container}>
        {props.children}
      </div>
);
