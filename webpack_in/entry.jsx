//  This file 'entry.jsx' is part of an example for building a multi-widget React front-end app
//  step by step as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/07/02/react-multi-widget/


console.log("JSX entry logic.");


import React from 'react';
import ReactDOM from 'react-dom';


class HelloWidget extends React.Component {
    render() {
        return (<div>Hello!  I'm a React app!!</div>);
      }
}

ReactDOM.render(<HelloWidget />, document.getElementById('react-app'));
