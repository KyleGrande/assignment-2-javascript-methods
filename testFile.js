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

test_map = function() {
    console.log("---Testing MAP---")

    console.log("--Test 1--")
    let arrayTest1 = [1, 2, , 4, 5];

    console.log('-map-\n', arrayTest1.map(x => x * 2));
    console.log('-myMap-\n', arrayTest1.myMap(x => x * 2));

    console.log("--Test 2--")
    let arrayTest2 = [5, 4, , 2, 1];

    console.log("-map-");
    arrayTest2.map((x, i, arrayTest2) => console.log(x, i, arrayTest2));
    console.log("-myMap-");
    arrayTest2.myMap((x, i, arrayTest2) => console.log(x, i, arrayTest2));

    console.log('--Test 3--')
    let numbers = [1, 4, 9];

    console.log("-map-\n", numbers.map((num) => Math.sqrt(num)));
    console.log('-myMap-\n', numbers.myMap((num) => Math.sqrt(num)));

    console.log('--Test 4--')
    let kvArray = [
        { key: 1, value: 10 },
        { key: 2, value: 20 },
        { key: 3, value: 30 },
    ];

    console.log("-map-\n", kvArray.map(({ key, value }) => ({
        [key]: value
    })));
    console.log("-myMap-\n", kvArray.myMap(({ key, value }) => ({
        [key]: value
    })));

    console.log('--Test 5--')
    let arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
    };
    console.log("-map-\n", Array.prototype.map.call(arrayLike, (x) => x ** 2));
    console.log("-myMap-\n", Array.prototype.myMap.call(arrayLike, (x) => x ** 2));

    console.log('--Test 6--')
    console.log("-map-\n", ["1.1", "2.2e2", "3e300"].map((str) => parseInt(str)));
    console.log("-myMap-\n", ["1.1", "2.2e2", "3e300"].myMap((str) => parseInt(str)));


}

test_filter = function() {
    console.log("---Testing FILTER---");

    console.log("--Test 1--");
    let nums = [0, 1, 2, 3, 4, 5];
    console.log('-filter-\n', nums.filter(x => x % 2 == 0));
    console.log('-myFilter-\n', nums.myFilter(x => x % 2 == 0));

    console.log("--Test 2--")
    let words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

    console.log('-filter-\n', words.filter(word => word.length > 6));
    console.log('-myFilter-\n', words.myFilter(word => word.length > 6));

    console.log("--Test 3--");
    let array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    function isPrime(num) {
        for (let i = 2; num > i; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return num > 1;
    }

    console.log('-filter-\n', array.filter(isPrime));
    console.log('-myFilter-\n', array.myFilter(isPrime));

    console.log("--Test 4--");
    console.log("-filter-\n", [1, , undefined].filter((x) => x === undefined));
    console.log([1, , undefined].filter((x) => x !== 2));
    console.log("-myFilter-\n", [1, , undefined].myFilter((x) => x === undefined));
    console.log([1, , undefined].myFilter((x) => x !== 2));
    console.log("--Test 5--");
    let arrayLike = {
        length: 3,
        0: "a",
        1: "b",
        2: "c",
    };
    console.log("-filter-\n", Array.prototype.filter.call(arrayLike, (x) => x <= "b"));
    console.log("-myFilter-\n", Array.prototype.myFilter.call(arrayLike, (x) => x <= "b"));
}

test_some = function() {
    console.log("---Testing FILTER---");
    console.log("--Test 1--");
    let array = [1, 1, 3, 7, 5];
    let array2 = [1, 2, 3, 4, 5];
    let even = (element) => element % 2 === 0;
    console.log('-some-\n', array.some(even));
    console.log(array2.some(even));
    console.log('-mySome-\n', array.mySome(even));
    console.log(array2.mySome(even));

    console.log("--Test 2--");
    let fruits = ["apple", "banana", "mango", "guava"];

    function checkAvailability(arr, val) {
        console.log("-some-\n", arr.some((arrVal) => val === arrVal));
        console.log('-mySome-\n', arr.mySome((arrVal) => val === arrVal));
    }

    checkAvailability(fruits, "kela"); // false
    checkAvailability(fruits, "banana"); // true

    console.log("--Test 3--");
    console.log("-some-")
    console.log([1, , 3].some((x) => x === undefined)); // false
    console.log([1, , 1].some((x) => x !== 1)); // false
    console.log([1, undefined, 1].some((x) => x !== 1)); // true
    console.log("-mySome-")
    console.log([1, , 3].mySome((x) => x === undefined)); // false
    console.log([1, , 1].mySome((x) => x !== 1)); // false
    console.log([1, undefined, 1].mySome((x) => x !== 1)); // true

    console.log("--Test 4--");
    let arrayLike = {
        length: 3,
        0: "a",
        1: "b",
        2: "c",
    };
    console.log("-some-")
    console.log(Array.prototype.some.call(arrayLike, (x) => typeof x === "number"));
    console.log("-mySome-")
    console.log(Array.prototype.mySome.call(arrayLike, (x) => typeof x === "number"));
}
test_every = function() {
    let isBelowThreshold = (currentValue) => currentValue < 40;
    let isAboveThreshold = (currentValue) => currentValue > 40;

    let array1 = [1, 30, 39, 29, 10, 13];
    let array2 = [44, 49, 42, 49, 41, 45];
    console.log("--Test 1--");
    console.log('-every-');
    console.log(array1.every(isBelowThreshold));
    console.log(array1.every(isAboveThreshold));

    console.log(array2.every(isBelowThreshold));
    console.log(array2.every(isAboveThreshold));
    console.log('-myEvery-')
    console.log(array1.myEvery(isBelowThreshold));
    console.log(array1.myEvery(isAboveThreshold));

    console.log(array2.myEvery(isBelowThreshold));
    console.log(array2.myEvery(isAboveThreshold));

    console.log("--Test 2--");
    console.log("-every-")
    let isSubset = (array1, array2) =>
        array2.every((element) => array1.includes(element));

    console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
    console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false
    console.log("-myEvery-")
    let isSubset2 = (array1, array2) =>
        array2.myEvery((element) => array1.includes(element));

    console.log(isSubset2([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
    console.log(isSubset2([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false

    console.log("--Test 3--");
    console.log("-every-")
    console.log([1, , 3].every((x) => x !== undefined)); // true
    console.log([2, , 2].every((x) => x === 2)); // true
    console.log([1, , 3].every((x) => x === 3)); // false
    console.log("-myEvery-")
    console.log([1, , 3].myEvery((x) => x !== undefined)); // true
    console.log([2, , 2].myEvery((x) => x === 2)); // true
    console.log([1, , 3].myEvery((x) => x === 3)); // false
    console.log("--Test 4--");
    let arrayLike = {
        length: 3,
        0: "a",
        1: "b",
        2: "c",
    };
    console.log("-every-")
    console.log(
        Array.prototype.every.call(arrayLike, (x) => typeof x === "string"),
    ); // true
    console.log("-myEvery-")
    console.log(Array.prototype.myEvery.call(arrayLike, (x) => typeof x === "string")); // true
}
test_reduce = function() {
    console.log("---Testing REDUCE---");
    console.log("--Test 1--");
    let initialValue = 10;
    let array1 = [1, 2, 3, 4];


    let sumWithInitial = array1.reduce(
        (accumulator, currentValue) => accumulator * currentValue, initialValue
    );
    console.log("-reduce-");
    console.log(sumWithInitial);

    let mysumWithInitial = array1.myReduce(
        (accumulator, currentValue) => accumulator * currentValue,
        initialValue
    );
    console.log("-myReduce-");
    console.log(mysumWithInitial);

    console.log("--Test 2--");
    let getMax = (a, b) => Math.max(a, b);


    console.log([1, 100].reduce(getMax, 50)); // 100

    console.log([50].reduce(getMax, 10)); // 50 make it log to console

    console.log([1, 100].reduce(getMax)); // 100

    //[50].reduce(getMax); log to console
    console.log([50].reduce(getMax)); // 50
    //[].reduce(getMax, 1); // 1
    console.log([].reduce(getMax, 1));

    //console.log([].reduce(getMax)); // TypeError

    console.log("-myReduce-");
    console.log([1, 100].myReduce(getMax, 50)); // 100
    console.log([50].myReduce(getMax, 10)); // 50 make it log to console
    console.log([1, 100].myReduce(getMax)); // 100
    console.log([50].myReduce(getMax)); // 50
    console.log([].myReduce(getMax, 1)); // 1
    //console.log([].myReduce(getMax)); // TypeError

    console.log("--Test 3--");
    console.log("-reduce-");
    console.log([1, 2, , 4].reduce((a, b) => a + b)); // 7
    console.log([1, 2, undefined, 4].reduce((a, b) => a + b)); // NaN
    console.log([1, 2, , 4].reduce((a, b) => a + b, 10)); // 17

    console.log("-myReduce-");
    console.log([1, 2, , 4].myReduce((a, b) => a + b)); // 7
    console.log([1, 2, undefined, 4].myReduce((a, b) => a + b)); // NaN
    console.log([1, 2, , 4].myReduce((a, b) => a + b, 10)); // 17

    console.log("--Test 4--");
    let arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
    };
    console.log("-reduce-");
    console.log(Array.prototype.reduce.call(arrayLike, (x, y) => x + y));
    // 9
    console.log(Array.prototype.reduce.call(arrayLike, (x, y) => x + y, 1));
    // 10
    console.log("-myReduce-");
    console.log(Array.prototype.myReduce.call(arrayLike, (x, y) => x + y));
    // 9
    console.log(Array.prototype.myReduce.call(arrayLike, (x, y) => x + y, 1));
    // 10
}

test_includes = function() {
        console.log("---Testing INCLUDES---");
        console.log("--Test 1--");
        console.log("-includes-");
        let array1 = [1, 2, 3];
        let pets = ['cat', 'dog', 'bat'];
        console.log(array1.includes(2));
        console.log(pets.includes('cat'));
        console.log(pets.includes('at'));
        console.log(pets.includes('cat', -4));

        console.log("-myIncludes-");
        console.log(array1.myIncludes(2));
        console.log(pets.myIncludes('cat'));
        console.log(pets.myIncludes('at'));
        console.log(pets.myIncludes('cat', -4));

        console.log("--Test 2--");
        console.log("-includes-");
        let arr = ["a", "b", "c"];

        console.log(arr.includes("a", -100)); // true
        console.log(arr.includes("b", -100)); // true
        console.log(arr.includes("c", -100)); // true
        console.log(arr.includes("a", -2)); // false
        console.log(arr.includes("b", -2)); // true

        console.log("-myIncludes-");
        console.log(arr.myIncludes("a", -100)); // true
        console.log(arr.myIncludes("b", -100)); // true
        console.log(arr.myIncludes("c", -100)); // true
        console.log(arr.myIncludes("a", -2)); // false
        console.log(arr.myIncludes("b", -2)); // true

        console.log("--Test 3--");
        console.log("-includes-");
        console.log([1, , 3].includes(undefined)); // true

        console.log("-myIncludes-");
        console.log([1, , 3].myIncludes(undefined)); // true

        console.log("--Test 4--");
        console.log("-includes-");
        let arrayLike = {
            length: 3,
            0: 2,
            1: 3,
            2: 4,
        };
        console.log(Array.prototype.includes.call(arrayLike, 2));
        console.log(Array.prototype.includes.call(arrayLike, 1));

        console.log("-myIncludes-");
        console.log(Array.prototype.myIncludes.call(arrayLike, 2));
        console.log(Array.prototype.myIncludes.call(arrayLike, 1));

    }
    //create a function that compares the built in method indexOf to myIndexOf
test_indexOf = function() {
    console.log("---Testing INDEXOF---");
    console.log("--Test 1--");
    console.log("-indexOf-");
    let beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
    console.log(beasts.indexOf('bison'));
    console.log(beasts.indexOf('bison', 2));
    console.log(beasts.indexOf('giraffe'));

    console.log("-myIndexOf-");
    console.log(beasts.myIndexOf('bison'));
    console.log(beasts.myIndexOf('bison', 2));
    console.log(beasts.myIndexOf('giraffe'));

    console.log("--Test 2--");
    console.log("-indexOf-");
    let array = [NaN];
    console.log(array.indexOf(NaN)); // -1

    console.log("-myIndexOf-");
    console.log(array.myIndexOf(NaN)); // -1

    console.log("--Test 3--");
    console.log("-indexOf-");
    console.log([1, , 3].indexOf(undefined)); // -1

    console.log("-myIndexOf-");
    console.log([1, , 3].myIndexOf(undefined)); // -1

    console.log("--Test 4--");
    let arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
    };
    console.log("-indexOf-");
    console.log(Array.prototype.indexOf.call(arrayLike, 2));
    console.log(Array.prototype.indexOf.call(arrayLike, 5));

    console.log("-myIndexOf-");
    console.log(Array.prototype.myIndexOf.call(arrayLike, 2));
    console.log(Array.prototype.myIndexOf.call(arrayLike, 5));


}

test_lastIndexOf = function() {
    console.log("---Testing LASTINDEXOF---");
    console.log("--Test 1--");
    console.log("-lastIndexOf-");
    let numbers = [2, 5, 9, 2];
    console.log(numbers.lastIndexOf(2)); // 3
    console.log(numbers.lastIndexOf(7)); // -1
    console.log(numbers.lastIndexOf(2, 3)); // 3
    console.log(numbers.lastIndexOf(2, 2)); // 0
    console.log(numbers.lastIndexOf(2, -2)); // 0
    console.log(numbers.lastIndexOf(2, -1)); // 3


    console.log("-myLastIndexOf-");
    console.log(numbers.myLastIndexOf(2)); // 3
    console.log(numbers.myLastIndexOf(7)); // -1
    console.log(numbers.myLastIndexOf(2, 3)); // 3
    console.log(numbers.myLastIndexOf(2, 2)); // 0
    console.log(numbers.myLastIndexOf(2, -2)); // 0
    console.log(numbers.myLastIndexOf(2, -1)); // 3

    console.log("--Test 2--");
    console.log("-lastIndexOf-");
    let array = [NaN];
    console.log(array.lastIndexOf(NaN)); // -1

    console.log("-myLastIndexOf-");
    console.log(array.myLastIndexOf(NaN)); // -1

    console.log("--Test 3--");
    console.log("-lastIndexOf-");
    console.log([1, , 3].lastIndexOf(undefined)); // -1

    console.log("-myLastIndexOf-");
    console.log([1, , 3].myLastIndexOf(undefined)); // -1

    console.log("--Test 4--");

    console.log("-lastIndexOf-");
    let arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 2,
    };
    console.log(Array.prototype.lastIndexOf.call(arrayLike, 2));
    // 2
    console.log(Array.prototype.lastIndexOf.call(arrayLike, 5));
    // -1

    console.log("-myLastIndexOf-");
    console.log(Array.prototype.myLastIndexOf.call(arrayLike, 2));
    console.log(Array.prototype.myLastIndexOf.call(arrayLike, 5));

}
test_keys = function() {

    const object1 = {
        a: 'somestring',
        b: 42,
        c: false
    };
    console.log('---TESTING KEYS---')
    console.log('--Test 1--');
    console.log('-keys-');
    console.log(Object.keys(object1));
    // Expected output: Array ["a", "b", "c"]
    console.log('-myKeys-');

    console.log(Object.myKeys(object1));
    // Expected output: Array ["a", "b", "c"]

    console.log('--Test 2--');
    // Simple array
    const arr = ["a", "b", "c"];
    console.log('-keys-');
    console.log(Object.keys(arr)); // ['0', '1', '2']
    console.log('-myKeys-');
    console.log(Object.myKeys(arr)); // ['0', '1', '2']

    // Array-like object
    console.log('--Test 3--');
    const obj = { 0: "a", 1: "b", 2: "c" };
    console.log('-keys-');
    console.log(Object.keys(obj)); // ['0', '1', '2']
    console.log('-myKeys-');
    console.log(Object.myKeys(obj)); // ['0', '1', '2']


    // Array-like object with random key ordering
    console.log('--Test 4--');
    const anObj = { 100: "a", 2: "b", 7: "c" };
    console.log('-keys-');
    console.log(Object.keys(anObj)); // ['2', '7', '100']
    console.log('-myKeys-');
    console.log(Object.myKeys(anObj)); // ['2', '7', '100']


    // getFoo is a non-enumerable property
    const myObj = Object.create({}, {
        getFoo: {
            value() {
                return this.foo;
            },
        },
    }, );
    myObj.foo = 1;
    console.log('--Test 5--');
    console.log('-keys-');
    console.log(Object.keys(myObj)); // ['foo']
    console.log('-myKeys-');
    console.log(Object.myKeys(myObj)); // ['foo']

    console.log('--Test 6--');
    console.log('-keys-');
    // Strings have indices as enumerable own properties
    console.log(Object.keys("foo")); // ['0', '1', '2']

    // Other primitives have no own properties
    console.log(Object.keys(100)); // []
    console.log('-myKeys-');
    // Strings have indices as enumerable own properties
    console.log(Object.myKeys("foo")); // ['0', '1', '2']

    // Other primitives have no own properties
    console.log(Object.myKeys(100)); // []

}



test_values = function() {
    const object1 = {
        a: 'somestring',
        b: 42,
        c: false
    };

    console.log('---TESTING VALUES---')
    console.log('--Test 1--');
    console.log('-values-');
    console.log(Object.values(object1));
    // Expected output: Array ["somestring", 42, false]
    console.log('-myValues-');
    console.log(Object.myValues(object1));
    // Expected output: Array ["somestring", 42, false]

    console.log('--Test 2--');
    const obj = { foo: "bar", baz: 42 };

    console.log('-values-');
    console.log(Object.values(obj)); // ['bar', 42]
    console.log('-myValues-');
    console.log(Object.myValues(obj)); // ['bar', 42]

    console.log('--Test 3--');
    // Array-like object
    const arrayLikeObj1 = { 0: "a", 1: "b", 2: "c" };

    console.log('-values-');
    console.log(Object.values(arrayLikeObj1)); // ['a', 'b', 'c']
    console.log('-myValues-');
    console.log(Object.myValues(arrayLikeObj1)); // ['a', 'b', 'c']

    console.log('--Test 4--');
    // Array-like object with random key ordering
    // When using numeric keys, the values are returned in the keys' numerical order
    const arrayLikeObj2 = { 100: "a", 2: "b", 7: "c" };
    console.log('-values-');
    console.log(Object.values(arrayLikeObj2)); // ['b', 'c', 'a']
    console.log('-myValues-');
    console.log(Object.myValues(arrayLikeObj2)); // ['b', 'c', 'a']

    console.log('--Test 5--');
    // getFoo is a non-enumerable property
    const myObj = Object.create({}, {
        getFoo: {
            value() {
                return this.foo;
            },
        },
    }, );
    myObj.foo = "bar";
    console.log('-values-');
    console.log(Object.values(myObj)); // ['bar']
    console.log('-myValues-');
    console.log(Object.myValues(myObj)); // ['bar']

    console.log('--Test 6--');
    // Strings have indices as enumerable own properties
    console.log('-values-');
    console.log(Object.values("foo")); // ['f', 'o', 'o']

    // Other primitives have no own properties
    console.log(Object.values(100)); // []
    console.log('-myValues-');
    // Strings have indices as enumerable own properties
    console.log(Object.myValues("foo")); // ['f', 'o', 'o']

    // Other primitives have no own properties
    console.log(Object.myValues(100)); // []
};

test_map();
test_filter();
test_some();
test_every();
test_reduce();
test_includes();
test_indexOf();
test_lastIndexOf();
test_keys();
test_values();