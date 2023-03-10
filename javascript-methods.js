/*----------------------------------------------------------
JavaScript Prototype: Method
Every object in JavaScript has a built-in property called "prototype." 
The prototype constructor is used to add new methods (functions) and properties to a JavaScript object. 
- If a method is constructed, then it will be available for the object. 
- If a property is constructed, then the object will be given the property and its value, as default.

In this Assignment, we use the prototype constructor to add new methods to the Array() object.
----------------------------------------------------------*/

// PUSH //
Array.prototype.myPush = function(...args) {
    let args_index = 0;
    let length = this.length;

    for (let i = length; i < length + args.length; i++) {
        this[i] = args[args_index];
        args_index++;
    }
    return this.length;
};

// MAP //
Array.prototype.myMap = function(callbackFn) {
    let myMapArray = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] === undefined) continue;
        myMapArray[i] = callbackFn(this[i], i, this);
    };
    return myMapArray;
};

// FILTER //
Array.prototype.myFilter = function(callbackFn) {
    let myFilterArray = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this && callbackFn(this[i], i, this)) {
            myFilterArray.myPush(this[i]);
        };
    };
    return myFilterArray;
};

// SOME //
Array.prototype.mySome = function(callbackFn) {
    for (let i = 0; i < this.length; i++) {
        if (i in this && callbackFn(this[i], i, this)) {
            return true;
        }
    }
    return false;
};
// EVERY //
Array.prototype.myEvery = function(callbackFn) {
    for (let i = 0; i < this.length; i++) {
        if (i in this && !callbackFn(this[i], i, this)) {
            return false;
        }
    }
    return true;
};

// REDUCE //
Array.prototype.myReduce = function(callbackFn) {
    if (typeof callbackFn !== 'function') {
        throw new TypeError(callbackFn + ' is not a function');
    }

    let accumulator;

    if (arguments.length > 1) {
        accumulator = arguments[1];
        startIndex = 0;
    } else if (this.length > 0) {
        accumulator = this[0];
        startIndex = 1
    } else {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    for (let i = startIndex; i < this.length; i++) {
        if (i in this) {
            accumulator = callbackFn(accumulator, this[i], i, this);
        }
    }
    return accumulator;
};

// INCLUDES //
Array.prototype.myIncludes = function(searchElement) {
    let fromIndex;

    if (arguments.length > 1) {
        fromIndex = arguments[1];
    } else {
        fromIndex = 0;
    }

    if (fromIndex >= this.length) {
        return false;
    } else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex;
    } else if (fromIndex < -this.length) {
        fromIndex = 0;
    }

    for (let i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return true;
        }
    }
    return false;
};

// INDEXOF //
Array.prototype.myIndexOf = function(searchElement) {
    let fromIndex;

    if (arguments.length > 1) {
        fromIndex = arguments[1];
    } else {
        fromIndex = 0;
    }

    if (fromIndex >= this.length) {
        return -1;
    } else if (fromIndex < 0) {
        fromIndex = this.length + fromIndex;
    } else if (fromIndex < -this.length) {
        fromIndex = 0;
    }

    if (searchElement !== searchElement || searchElement === undefined)
        return -1;

    for (let i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement) {
            return i;
        }
    }
    return -1;
};

// LASTINDEXOF //
Array.prototype.myLastIndexOf = function(searchElement) {
    let fromIndex;

    if (arguments.length > 1) {
        fromIndex = arguments[1];
    } else {
        fromIndex = this.length - 1;
    }

    if (fromIndex < 0) {
        fromIndex = fromIndex + this.length
    } else if (fromIndex < -this.length) {
        return -1
    } else if (fromIndex >= this.length)
        fromIndex = this.length - 1

    if (searchElement !== searchElement || searchElement === undefined)
        return -1;

    for (let i = fromIndex; i != -1; i--) {
        if (this[i] === searchElement) {
            return i;
        }
    }
    return -1;
};

// KEYS //
Object.myKeys = function(object) {
    let keys = [];

    if (object === null)
        return keys;

    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            keys.myPush(key);
        }
    }
    return keys;
};

// VALUES //
Object.myValues = function(object) {
    let values = [];

    for (let keys in object)
        values.myPush(object[keys]);

    return values;
};