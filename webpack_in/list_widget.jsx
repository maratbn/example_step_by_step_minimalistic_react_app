//  This file 'list_widget.jsx' is part of an example for building a multi-widget React front-end
//  app step by step as outlined in the tutorial blog at
//  http://maratbn.com/blogs/2018/07/02/react-multi-widget/


import PropTypes from 'prop-types';
import React from 'react';

import ButtonWidget from './button_widget.jsx';
import Styles from './styles.es';


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
            <div style={ Styles.common }>
              <div style={ Styles.content }>
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

export default ListWidget;
