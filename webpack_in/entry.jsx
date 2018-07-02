//  This file 'entry.jsx' is part of an example for building a multi-widget React front-end app
//  step by step as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/07/02/react-multi-widget/


console.log("JSX entry logic.");


import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';


const objStyleCommon = {
    margin:     '1em',
    border:     'solid 2px green',
    textAlign:  'center'
  };

const objStyleContent = {
    padding:    '1em'
  };


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

class HelloWidget extends React.Component {
    render() {
        return (
            <div style={{ ...objStyleCommon, ...objStyleContent }}>
              Hello!  I'm a React app!!
            </div>
          );
      }
}

class TextWidget extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "Some text here...."
          };
      }

    render() {
        return (
            <div style={ objStyleCommon }>
              <div style={ objStyleContent }>{ this.state.text }</div>
              <ButtonWidget caption="Change text..."
                            onClick={() => {
                                const strTextNew = prompt("Please enter text to display:",
                                                          this.state.text);
                                if (strTextNew === null) {
                                    return;
                                }

                                this.setState({...this.state, text: strTextNew});
                              }}/>
            </div>
          );
      }
}

class ListItem extends React.Component {
    render() {
        return (<li><input type='checkbox'
                           checked={ this.props.isChecked }
                           onChange={ this.props.onChangeChecked }/>{ this.props.caption }</li>);
      }
}

ListItem.propTypes = {
    caption:                    PropTypes.string.isRequired,
    isChecked:                  PropTypes.bool.isRequired,
    onChangeChecked:            PropTypes.func.isRequired
  };

class ListWidget extends React.Component {
    constructor(props) {
        super(props);

        this._mutateStateToAddItem = (state, strItemCaption) => ({
            ...state,
            items: [
                ...state.items,
                {
                    id:          state.total_added,
                    caption:     strItemCaption,
                    is_checked:  false
                  }
              ],
            total_added: state.total_added + 1
          });

        this._mutateStateToUpdateItemCaption = (state, id, strCaptionNew) => ({
            ...state,
            items: state.items.map(objItem => (
                objItem.id === id ? {
                                        ...objItem,
                                        caption: strCaptionNew
                                      }
                                  : objItem
              ))
          });

        this._mutateStateToUpdateItemChecked = (state, id, isChecked) => ({
            ...state,
            items: state.items.map(objItem => (
                objItem.id === id ? {
                                        ...objItem,
                                        is_checked: isChecked
                                      }
                                  : objItem
              ))
          });

        this._mutateStateToRemoveItemsChecked = state => ({
            ...state,
            items: state.items.filter(objItem => !objItem.is_checked)
          });

        const objStateEmpty = {
                                  items:        [],
                                  total_added:  0
                                };

        this.state = this._mutateStateToAddItem(
                          this._mutateStateToAddItem(
                              this._mutateStateToAddItem(
                                  objStateEmpty,
                                  "Item 1"),
                              "Item 2"),
                          "Item 3");
      }

    render() {
        const arrItemsSelected = this.state.items.filter(objItem => objItem.is_checked);

        const formatListOfNames = (arrNames) => arrNames.reduce(
            (strOutput, strName, index) => (
                `${strOutput}${index > 0  //  Will render either ' and' or ',' before 2nd item.
                                          //  Will render ', and' before the 3rd+ last item.
                                  ? (`${arrNames.length > 2 ? ',' : ""
                                        }${index === arrNames.length - 1 ? ' and' : ""}`
                                      )
                                  : ""} "${strName}"`
              ),
            "");

        return (
            <div style={ objStyleCommon }>
              <div style={ objStyleContent }>
                <ul style={{ display: 'inline-block', textAlign: 'left', listStyleType: 'none' }}>
                  { this.state.items.map((objItem, index) => (
                        <ListItem key={ objItem.id }
                                  caption={ objItem.caption }
                                  isChecked={ objItem.is_checked }
                                  onChangeChecked={ () => {
                                      this.setState(
                                          this._mutateStateToUpdateItemChecked(
                                              this.state,
                                              objItem.id,
                                              !objItem.is_checked));
                                    }}
                        />
                      )) }
                </ul>
              </div>
              <div>
                <ButtonWidget caption="Add new item..."
                              onClick={() => {
                                  const strItemNew = prompt("Please enter new item to add:",
                                                            "Item "
                                                                + (this.state.items.length + 1));
                                  if (strItemNew === null) {
                                      return;
                                  }

                                  this.setState(this._mutateStateToAddItem(this.state,
                                                                           strItemNew));
                                }}/>
                <ButtonWidget caption="Edit item..."
                              isDisabled={ arrItemsSelected.length !== 1 }
                              onClick={() => {
                                  const objItemEdit = arrItemsSelected[0];
                                  const strItemEdited = prompt("Please edit item:",
                                                               objItemEdit.caption);
                                  if (strItemEdited === null) {
                                      return;
                                  }

                                  this.setState(this._mutateStateToUpdateItemCaption(
                                                                                  this.state,
                                                                                  objItemEdit.id,
                                                                                  strItemEdited));
                                }}/>
                <ButtonWidget caption={ arrItemsSelected.length > 1 ? "Remove items..."
                                                                    : "Remove item..." }
                              isDisabled={ arrItemsSelected.length === 0 }
                              onClick={() => {
                                  const arrCaptions = arrItemsSelected
                                                                 .map(objItem => objItem.caption);
                                  const isConfirmed = confirm(
                                                          `Are you sure you want to remove item${
                                                              arrCaptions.length > 1 ? "s" : ""} ${
                                                                  formatListOfNames(arrCaptions)
                                                            }?`);
                                  if (isConfirmed === false) {
                                      return;
                                  }

                                  this.setState(this._mutateStateToRemoveItemsChecked(this.state));
                                }}/>
              </div>
            </div>
          );
      }
}

class ButtonForCounter extends React.Component {
  render() {
      return (<button onClick={ () => {
                          this.props.onCount();
                        }}>{ this.props.caption }</button>);
    }
}

ButtonForCounter.propTypes = {
    caption:                    PropTypes.string.isRequired,
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
                                onCount={ () => {
                                    const valueNew = this.props.value + 1;

                                    if (valueNew > 255) {
                                        return;
                                    }

                                    this.props.onChangeValue(valueNew);
                                  }} />
              <ButtonForCounter caption="&#9660;"
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
            <div style={ objStyleCommon }>
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


ReactDOM.render(
    <div>
      <HelloWidget />
      <TextWidget />
      <ListWidget />
      <ColorSelector />
    </div>,
    document.getElementById('react-app'));
