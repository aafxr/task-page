export const util = {}


util.type =  {
    isString: function(item) {
        return item === '' ? true : (item ? (typeof (item) == "string" || item instanceof String) : false);
    },
    isNotEmptyString: function(item) {
        return util.type.isString(item) ? item.length > 0 : false;
    },
    isBoolean: function(item) {
        return item === true || item === false;
    },
    isNumber: function(item) {
        return item === 0 ? true : (item ? (typeof (item) == "number" || item instanceof Number) : false);
    },
    isFunction: function(item) {
        return item === null ? false : (typeof (item) == "function" || item instanceof Function);
    },
    isElementNode: function(item) {
        return item && typeof (item) == "object" && "nodeType" in item && item.nodeType == 1 && item.tagName && item.tagName.toUpperCase() != 'SCRIPT' && item.tagName.toUpperCase() != 'STYLE' && item.tagName.toUpperCase() != 'LINK';
    },
    isDomNode: function(item) {
        return item && typeof (item) == "object" && "nodeType" in item;
    },
    isObject: function(item) {
        return item && (typeof (item) == "object" || item instanceof Object) ? true : false;
    },
    isArray: function(item) {
        return item && Object.prototype.toString.call(item) == "[object Array]";
    },
    isDate : function(item) {
        return item && Object.prototype.toString.call(item) == "[object Date]";
    }
}