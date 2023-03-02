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
    let args = index = 0;
    let length = this.length;
    for (let i = length; i < length + args.length; i++) {
        this[i] = args[index];
        index++;
    }
};

// MAP //
Array.prototype.myMap = function(callbackFn) {
    let myMapArray = [];
    for (let i = 0; i < this.length; i++) {
        if (this[i] === undefined) continue;
        myMapArray[i] = callbackFn(this[i], i, this);
    };
};

// FILTER //
Array.prototype.myFilter = function(callbackFn) {
    let myFilterArray = [];
    for (let i = 0; i < this.length; i++) {
        if (i in this && callbackFn(this[i], i, this)) {
            myFilterArray.push(this[i]);
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
    // Place your code here.
};

// KEYS //
Object.myKeys = function(object) {
    // Place your code here.
};

// VALUES //
Object.myValues = function(object) {
    // Place your code here.
};