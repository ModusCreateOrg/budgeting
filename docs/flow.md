# Flow

#### Resources

- [Official Documentation](https://flow.org/en/docs/)
- [Setup React with Flow](https://flow.org/en/docs/react/)
- [Flow type cheat sheet](https://www.saltycrane.com/flow-type-cheat-sheet/latest/)

## Introduction

Flow is a static type checker that helps you write code with fewer bugs. Flow allows you to incrementally add types 
to your JavaScript code to perform type-checking.

You need to tell Flow which files to type-check, for this you add a `// @flow` comment at the top of the file.

Once you’ve declared a file to check, you can use the Flow syntax in that file to define types.

## CLI Commands

- `yarn run flow` will type-check the project based on the `.flowconfig` file.
- `yarn run update-types` updates the **Library Definitions**. 

Library definitions (AKA "libdefs") are files that inform flow of the type signature of third-party packages.
They are `.js` files placed in the `flow-typed` directory.

[flow-typed](https://github.com/flowtype/flow-typed/blob/master/README.md) is used to install pre-existing libdefs,
it is analogous to TypeScript's DefinitelyTyped.

## Flow syntax

### Primitives

You can add types for Javascript primitives, as well as Array, Object and other constructs:

```javascript
const isLogged: boolean = false;

const userId: number = 1234;

const userName: string = 'Mark';

const data: null = null;

const undefined: void = null;

const arrayOfNumbers: Array<number> = [1, 2, 3];

const userData: { name: string, id: number } = {
  name: 'Mark',
  number: 1234,
}

const sum = (a: number, b: number): number => {
  return a + b;
}
```

### Type Alias

One of the most useful features is **type aliasing**. They allow you to use existing types to create new types:

```javascript
type Transaction = {
  id: number,
  description: string,
  value: number,
};
```

### Generics

**Generics** allow you to abstract over types:

```javascript
type GenericObject<T> = { key: T };

const numberObject: GenericObject<number> = { key: 1234 };
const stringObject: GenericObject<string> = { key: "text" };
```

### Maybe

A question mark is used to represent **Maybe types**, they represent a potentially `null` or `undefined` value:

```javascript
const stringOrNull: ?string = null;
```

There are other useful type definitions like Union Types and Utility Types, you can find them in the 
[documentation](https://flow.org/en/docs/types/).

## React Integration

Flow has very good support for React. This sections explains some common patterns to type React code.

### React Components

The `React.Component` class takes two type arguments, `Props` and `State`. You can use them as replacement of
`PropTypes`, which was the recommended way to type check React components.

```javascript
type Props = {
  foo: number,
};

type State = {
  bar: number,
};

class MyComponent extends React.Component<Props, State> {
  state = {
    bar: 42,
  };
 
  render() {
    return this.props.foo + this.state.bar;
  }
}
```

If the component doesn't have state, you can just pass `<Props>`.

Flow includes utility types which can be useful to type complex React pattern. The most important ones are:
- `React.Node`, represents any value that can be rendered by React. It can be a string, number, boolean, null, 
  or React element.
- `React.ComponentType<Props>`, is the type of any class component or stateless function component. This is useful as
  an input type for Higher Order Functions.
- `React.Element<Type>`, is the type of a React element.

**Note:** React must be imported as a namespace (`import * as React from 'react'`), this way you get access to React's 
utility types.

Stateless functional components are typed like regular functions:

```javascript
type Props = {
  bar: string,
};

function MyComponent(props: Props) {
  return <div>{props.bar}</div>;
}
```

### Redux state

Typing **Redux state** works like typing any other object in Flow:

```javascript
type State = {
  users: Array<{
    id: string
    name: string,
  }>,
  activeUserID: string,
  // ...
};
```

Redux state is meant to be immutable: you should creating a new state object instead of changing properties on it. You
can enforce it with Flow by making every property "read-only" using "covariant" properties like this:

```javascript
type State = {
  +users: Array<{
    +id: string
    +name: string,
  }>,
  +activeUserID: string,
  // ...
};
```

### Redux actions

You can use disjoint unions to type all actions supported by a reducer:

```javascript
type FooAction = { type: "FOO", foo: number };
type BarAction = { type: "BAR", bar: boolean };

type Action =
  | FooAction
  | BarAction;
```

This way you can use the individual action types to type action creators, and the general `Action` type to type the 
reducer.

### Redux reducers

Reducers take and receive the state and actions we have previously defined:

```javascript
function reducer(state: State, action: Action): State {
  // ...
}
```

Check the [documentation](https://flow.org/en/docs/react/) for more detailed information.
