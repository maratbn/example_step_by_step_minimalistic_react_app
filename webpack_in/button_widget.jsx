//  This file 'button_widget.jsx' is part of an example for building a multi-widget React front-end
//  app step by step as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/07/02/react-multi-widget/


import PropTypes from 'prop-types';
import React from 'react';


class ButtonWidget extends React.Component {
    render() {
        return (
            <button style={{ margin: '1em'}}
                    disabled={ this.props.isDisabled }
                    onClick={ this.props.onClick }>{ this.props.caption }</button>
          );
      }
}

ButtonWidget.propTypes = {
    caption:                    PropTypes.string.isRequired,
    isDisabled:                 PropTypes.bool,
    onClick:                    PropTypes.func
  };


export default ButtonWidget;
