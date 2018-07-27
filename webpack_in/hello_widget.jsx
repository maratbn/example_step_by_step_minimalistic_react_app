//  This file 'hello_widget.jsx' is part of an example for building a multi-widget React front-end
//  app step by step as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/07/02/react-multi-widget/


import React from 'react';
import Styles from './styles.es';


class HelloWidget extends React.Component {
    render() {
        return (
            <div style={{ ...Styles.common, ...Styles.content }}>
              Hello!  I'm a React app!!
            </div>
          );
      }
}

export default HelloWidget;
