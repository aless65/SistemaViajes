import { MenuItem } from "../models/menu.model";

/**
 * finds all parents of selected menuitem
 * @param menuItems list of menus
 * @param menuItem selected menu
 * @returns list of all parent menus of menuitem
 */
const findAllParent = (menuItems: MenuItem[], menuItem: any): any => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

/**
 * finds menuitem
 * @param menuItems list of menus
 * @param menuItemKey key to be matched
 * @returns menuitem that has menuItemKey
 */
const findMenuItem = (menuItems: MenuItem[], menuItemKey: string): any => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};


/**
 * Changes the body attribute
 */
const changeBodyAttribute = (attribute: string, value?: string, action = 'set'): void => {
    switch (action) {
        case 'remove':
            if (document.body) {
                if (document.body.hasAttribute(attribute)) {
                    document.body.removeAttribute(attribute);
                }
            }
            break;
        default:
            if (document.body) document.body.setAttribute(attribute, value!);
            break;
    }
}

export { findAllParent, findMenuItem, changeBodyAttribute };
