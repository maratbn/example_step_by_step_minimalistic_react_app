//  This file 'color_selector.jsx' is part of an example for building a multi-widget React
//  front-end app step by step as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/07/02/react-multi-widget/


import PropTypes from 'prop-types';
import React from 'react';


import Styles from './styles.es';


class ButtonForCounter extends React.Component {
  constructor(props) {
      super(props);

      this._onCountStart = () => {
          this._flagCount = true;

          const doCount = () => {
              if (!this._flagCount || this.props.isDisabled) {
                  return;
              }

              this.props.onCount();

              setTimeout(doCount, 25);
            };

          doCount();
        };

      this._onCountStop = () => {
          this._flagCount = false;
        };
    }

  render() {
      return (<button disabled={ this.props.isDisabled }
                      onMouseDown={ this._onCountStart }
                      onMouseUp={ this._onCountStop }
                      onMouseLeave={ this._onCountStop }
                      onTouchStart={ this._onCountStart }
                      onTouchEnd={ this._onCountStop }
                      onTouchCancel={ this._onCountStop }>{ this.props.caption }</button>);
    }
}

ButtonForCounter.propTypes = {
    caption:                    PropTypes.string.isRequired,
    isDisabled:                 PropTypes.bool,
    onCount:                    PropTypes.func.isRequired
  };

class ColorComponentEntry extends React.Component {
    render() {
        return (
            <div style={{ display: 'inline-block', margin: '1em' }}>
              { this.props.label }:
              <input type='text'
                     size='4'
                     maxLength='4'
                     style={{ textAlign: 'center' }}
                     value={ this.props.value }
                     onChange={ event => {
                          const strValueEntered = event.target.value;

                          //  Need to normalize the user input to a valid
                          //  value, which is 0 <= valid <= 255

                          //  Inputs of non-digits will be ignored.
                          if (!strValueEntered.match(/^\d*$/g)) {
                              return;
                          }

                          //  Value must be converted to an integer.
                          const convertValue = strValueToConvert => {
                              //  Blank / falsy input will be treated as 0.
                              if (!strValueToConvert) {
                                  return 0;
                              }

                              const valueConverted = parseInt(strValueToConvert);

                              //  If the integer is <= 255 then it is a valid
                              //  value and safe to return.
                              if (valueConverted <= 255) {
                                  return valueConverted;
                              }

                              //  Otherwise will remove the left-most digit
                              //  and try to convert again until the value
                              //  becomes <= 255
                              return convertValue(strValueToConvert.substr(1));
                            };

                          this.props.onChangeValue(convertValue(strValueEntered));
                        }} />
              <ButtonForCounter caption="&#9650;"
                                isDisabled={ this.props.value === 255 }
                                onCount={ () => {
                                    const valueNew = this.props.value + 1;

                                    if (valueNew > 255) {
                                        return;
                                    }

                                    this.props.onChangeValue(valueNew);
                                  }} />
              <ButtonForCounter caption="&#9660;"
                                isDisabled={ this.props.value === 0 }
                                onCount={ () => {
                                    const valueNew = this.props.value - 1;

                                    if (valueNew < 0) {
                                        return;
                                    }

                                    this.props.onChangeValue(valueNew);
                                  }} />
            </div>
          );
      }
}

ColorComponentEntry.propTypes = {
    label:                      PropTypes.string.isRequired,
    value:                      PropTypes.number.isRequired,
    onChangeValue:              PropTypes.func.isRequired
  };

class ColorSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: {
                r: 255,
                g: 255,
                b: 255
              }
          };
      }

    render() {
        const updateStateForColor = (component, value) => {
            const color = {
                ...this.state.color
              };

            color[component] = value;

            this.setState({
                ...this.state,
                color
              });
          };

        const { color } = this.state;

        const colorOpposite = {
            r: 255 - color.r,
            g: 255 - color.g,
            b: 255 - color.b
          };

        return (
            <div style={ Styles.common }>
              <div style={{ margin: '1em auto',
                            width: '70%',
                            height: '3em',
                            border: `solid 2px rgb(${colorOpposite.r},
                                                   ${colorOpposite.g},
                                                   ${colorOpposite.b})`,
                            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`}} />
              <div style={{ marginTop: '-1em'}}>
                <ColorComponentEntry label="R" value={ this.state.color.r } onChangeValue={
                    (value) => {
                        updateStateForColor('r', value);
                      }
                  } />
                <ColorComponentEntry label="G" value={ this.state.color.g } onChangeValue={
                    (value) => {
                        updateStateForColor('g', value);
                      }
                  } />
                <ColorComponentEntry label="B" value={ this.state.color.b } onChangeValue={
                    (value) => {
                        updateStateForColor('b', value);
                      }
                  } />
              </div>
            </div>
          );
      }
}

export default ColorSelector;
