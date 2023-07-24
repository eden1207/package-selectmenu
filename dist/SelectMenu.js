import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import './Styles/SelectMenu.css';

/**
 * Function of the component used to display the Select Menu.
 */
export default function SelectMenu({
  options,
  setData,
  btnListWidthValue,
  listWidthValue,
  isDisableValue
}) {
  const isDisable = isDisableValue || false;
  const SelectMenuID = uuidv4();
  const ids = {
    element: SelectMenuID,
    button: SelectMenuID + "-button",
    menu: SelectMenuID + "-menu"
  };

  /**
   * isOpen: open/close the select menu
   * indexMenuItemSelected: index of the list item selected
   * indexMenuItemFocused: index of the list item focused (to change his class on mousse enter/leave)
   */
  const [isOpen, setIsOpen] = useState(false);
  const [indexMenuItemSelected, setIndexMenuItemSelected] = useState(0);
  const [indexMenuItemFocused, setIndexMenuItemFocused] = useState(0);

  /**
   * Function to control the select menu keydown events
   */
  function detectKeydown(event) {
    const keyCode = {
      BACKSPACE: 'Backspace',
      COMMA: ',',
      DELETE: 'Delete',
      DOWN: 'ArrowDown',
      END: 'End',
      ENTER: 'Enter',
      ESCAPE: 'Escape',
      HOME: 'Home',
      LEFT: 'ArrowLeft',
      PAGE_DOWN: 'PageDown',
      PAGE_UP: 'PageUp',
      PERIOD: '.',
      RIGHT: 'ArrowRight',
      SPACE: ' ',
      TAB: 'Tab',
      UP: 'ArrowUp'
    };
    let preventDefault = true;
    switch (event.key) {
      case keyCode.TAB:
      case keyCode.ESCAPE:
        if (event.target.id === ids.button) {
          if (isOpen === false) {
            return;
          }
          setIsOpen(false);
        }
        preventDefault = false;
        break;
      case keyCode.ENTER:
        if (event.target.id === ids.button && isOpen === true) {
          setIndexMenuItemSelected(indexMenuItemFocused);
          setData(options[indexMenuItemSelected].abbreviation);
          setIsOpen(false);
        }
        break;
      case keyCode.UP:
        if (event.target.id === ids.button) {
          if (event.altKey) {
            setIsOpen(false);
          } else {
            if (indexMenuItemFocused !== 0) {
              setIndexMenuItemFocused(indexMenuItemFocused - 1);
              if (isOpen === false) {
                setIndexMenuItemSelected(indexMenuItemFocused - 1);
                setData(options[indexMenuItemFocused - 1].abbreviation);
              }
            }
          }
        }
        break;
      case keyCode.DOWN:
        if (event.target.id === ids.button) {
          if (event.altKey) {
            setIsOpen(false);
          } else {
            if (indexMenuItemFocused !== options.length - 1) {
              setIndexMenuItemFocused(indexMenuItemFocused + 1);
              if (isOpen === false) {
                setIndexMenuItemSelected(indexMenuItemFocused + 1);
                setData(options[indexMenuItemFocused + 1].abbreviation);
              }
            }
          }
        }
        break;
      case keyCode.SPACE:
        if (event.target.id === ids.button) {
          if (isOpen === true) {
            setIndexMenuItemSelected(indexMenuItemFocused);
            setData(options[indexMenuItemSelected].abbreviation);
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }
        break;
      case keyCode.LEFT:
        if (event.target.id === ids.button && indexMenuItemFocused !== 0) {
          setIndexMenuItemFocused(indexMenuItemFocused - 1);
          if (isOpen === false) {
            setIndexMenuItemSelected(indexMenuItemFocused - 1);
            setData(options[indexMenuItemFocused - 1].abbreviation);
          }
        }
        break;
      case keyCode.RIGHT:
        if (event.target.id === ids.button && indexMenuItemFocused !== options.length - 1) {
          setIndexMenuItemFocused(indexMenuItemFocused + 1);
          if (isOpen === false) {
            setIndexMenuItemSelected(indexMenuItemFocused + 1);
            setData(options[indexMenuItemFocused + 1].abbreviation);
          }
        }
        break;
      case keyCode.HOME:
      case keyCode.PAGE_UP:
        setIndexMenuItemFocused(0);
        if (isOpen === false) {
          setIndexMenuItemSelected(0);
          setData(options[0].abbreviation);
        }
        break;
      case keyCode.END:
      case keyCode.PAGE_DOWN:
        setIndexMenuItemFocused(options.length - 1);
        if (isOpen === false) {
          setIndexMenuItemSelected(options.length - 1);
          setData(options[options.length - 1].abbreviation);
        }
        break;
      default:
        preventDefault = false;
    }
    if (preventDefault) {
      event.preventDefault();
    }
  }

  /**
   * Values associated to the select menu class depending on the menu configuration
   */
  const drawButtonClass = isOpen ? "ui-selectmenu-button-open ui-corner-top" : "ui-selectmenu-button-closed ui-corner-all";
  const uiSelectmenuOpen = isOpen ? " ui-selectmenu-open" : "";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("select", {
    name: "list",
    id: SelectMenuID,
    style: {
      display: 'none'
    }
  }, options.map((option, index) => /*#__PURE__*/React.createElement("option", {
    key: `${option.name}-${index}`,
    value: option.abbreviation
  }, option.name))), /*#__PURE__*/React.createElement("span", {
    id: ids.button,
    className: "ui-selectmenu-button ui-button ui-widget " + drawButtonClass,
    style: {
      width: btnListWidthValue || 224
    },
    tabIndex: 0 // makes the element focusable (0) or not (-1) for sequential focus navigation
    ,
    role: "combobox",
    "aria-expanded": isOpen // Indicate if the menu is open or closed
    ,
    "aria-controls": ids.element + 'list' // Indicate that this element controles the element which has the same id
    ,
    "aria-autocomplete": "list" // indicates whether inputting text could trigger display of one or more predictions
    ,
    "aria-owns": ids.menu // defines a relationship between parent and its child elements
    ,
    "aria-haspopup": true // indicates the availability
    ,
    "aria-activedescendant": options[indexMenuItemFocused].name.toLowerCase() + "-" + indexMenuItemFocused // identifies the currently active element when focus is on a composite
    ,
    "aria-labelledby": options[indexMenuItemSelected].name.toLowerCase() + "-" + indexMenuItemSelected // identifies the element id selected
    ,
    "aria-disabled": isDisable // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
    ,
    onClick: e => {
      if (isDisable) {
        e.preventDefault();
      } else {
        setIsOpen(!isOpen);
      }
    },
    onKeyDown: e => {
      if (isDisable) {
        e.preventDefault();
      } else {
        detectKeydown(e);
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ui-selectmenu-icon ui-icon ui-icon-triangle-1-s"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ui-selectmenu-text"
  }, options[indexMenuItemSelected].name)), /*#__PURE__*/React.createElement("div", {
    className: "ui-selectmenu-menu ui-front" + uiSelectmenuOpen
  }, /*#__PURE__*/React.createElement("ul", {
    id: ids.menu,
    className: "ui-menu ui-corner-bottom ui-widget ui-widget-content",
    style: {
      width: listWidthValue || 256
    },
    tabIndex: 0 // makes the element focusable (0) or not (-1) for sequential focus navigation
    ,
    role: "listbox",
    "aria-hidden": !isOpen // indicates whether the element is exposed to an accessibility API
    ,
    "aria-labelledby": ids.button // identifies the element id selected
    ,
    "aria-activedescendant": options[indexMenuItemFocused].name.toLowerCase() + "-" + indexMenuItemFocused // identifies the currently active element when focus is on a composite
    ,
    "aria-disabled": false // state indicates that the element is perceivable but disabled, so it is not editable or otherwise operable
  }, isOpen ? options.map((listElement, index) => {
    const uiStateActiveClass = index === indexMenuItemFocused ? "ui-state-active" : "";
    return /*#__PURE__*/React.createElement("li", {
      key: options[index].name.toLowerCase() + "-" + index,
      className: "ui-menu-item"
    }, /*#__PURE__*/React.createElement("div", {
      id: options[index].name.toLowerCase() + "-" + index,
      className: 'ui-menu-item-wrapper ' + uiStateActiveClass,
      tabIndex: -1 // makes the element focusable (0) or not (-1) for sequential focus navigation
      ,
      role: "option",
      "aria-selected": false // indicates the current "selected" state of various widgets
      ,
      onMouseEnter: () => {
        setIndexMenuItemFocused(index);
      },
      onClick: () => {
        setIndexMenuItemSelected(index);
        setData(listElement.abbreviation);
        setIsOpen(false);
      }
    }, listElement.name));
  }) : options.map((listElement, index) => /*#__PURE__*/React.createElement("li", {
    key: options[index].name.toLowerCase() + "-" + index,
    className: "ui-menu-item"
  }, /*#__PURE__*/React.createElement("div", {
    id: options[index].name.toLowerCase() + "-" + index,
    className: "ui-menu-item-wrapper",
    tabIndex: -1 // makes the element focusable (0) or not (-1) for sequential focus navigation
    ,
    role: "option",
    "aria-selected": false // indicates the current "selected" state of various widgets
  }, listElement.name))))));
}
SelectMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  setData: PropTypes.func,
  btnListWidthValue: PropTypes.number,
  listWidthValue: PropTypes.number,
  isDisable: PropTypes.bool
};