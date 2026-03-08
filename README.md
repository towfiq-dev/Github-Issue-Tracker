# JavaScript Essentials: Q&A

### 1. What is the difference between var, let, and const?
* **var**: Function-scoped and can be re-declared or updated. It is hoisted to the top of its scope.
* **let**: Block-scoped (only available within `{}`). It can be updated but not re-declared in the same scope.
* **const**: Also block-scoped. It cannot be updated or re-declared; it is used for variables that should remain constant.

### 2. What is the spread operator (...)?
The spread operator allows you to quickly copy all or part of an existing array or object into another array or object. It "spreads" the elements or properties, making it useful for merging data or passing array elements as individual arguments to a function.
* **Example**: 
* const arr1 = [1,2,3];
* const arr2 = [...arr1, 4,5];
* console.log(arr2)

### 3. What is the difference between map(), filter(), and forEach()?
* **forEach()**: Iterates over an array to perform an action for each element. It does not return a new array.
* **map()**: Iterates through an array and returns a **new** array containing the results of a function applied to every element.
* **filter()**: Checks every element against a condition and returns a **new** array containing only the elements that pass that condition.

### 4. What is an arrow function?
An arrow function is a compact way to write functions in JavaScript. It uses the `=>` syntax and does not have its own `this` context, which makes it very useful for short, one-line operations or callback functions.
* **Example**: 
* const add = (a,b) => a + b;
* console.log(add(2, 3));

### 5. What are template literals?
Template literals are strings enclosed in backticks (`` ` ``) instead of quotes. They allow for easy multi-line strings and "string interpolation," where you can embed variables or expressions directly into the string using `${expression}`.
* **Example**:
* const firstName = 'Towfiqul';
* const lastName = 'Islam';
* console.log(`${firstName} ${lastName}`)