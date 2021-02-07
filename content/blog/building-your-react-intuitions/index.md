---
title: Building Your React Intuitions
date: "2021-02-07"
description: "Mental model of React for beginners"
---

This is how I recommend approaching React for the first time. We'll work from the ground up, where your understanding accumulated at each step will be usable, rather than only being usable after reading the whole article. This is a practical article to bootstrap you quickly rather than an in-depth theoretical explanation. As such we will skip some best practices which you should learn afterwards.

We'll start from a static HTML file and incrementally bring it to life with React:

```html
<html>
    <body>
        <h1>Peter's Todo List</h1>
        <ul>
            <li>Write code</li>
            <li>Log timesheet</li>
            <li>Go for a walk</li>
        </ul>
    </body>
</html>
```

## 1. React renders a HTML tree to the DOM

Give React a representation of a HTML element tree and a DOM node to render to, and it will render the former to the latter. We can neatly write HTML in JavaScript using JSX syntax.

First, we will set up a couple of things:
1. Add scripts for React, ReactDOM, and Babel (this is a quick way to get started but not suitable for production)
2. Decide what part of the app we want React to manage. Here, it is the header and list. Let's nest those in two container elements, to form a 'plug':

```html{3-5,8-9,16-17}
<html>
    <head>
        <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    </head>
    <body>
        <div id="root"> <!-- Outer container to remain here -->
            <div>       <!-- Inner container to be rendered by React -->
                <h1>Peter's Todo List</h1>
                <ul>
                    <li>Write code</li>
                    <li>Log timesheet</li>
                    <li>Go for a walk</li>
                </ul>
            <div>
        </div>
    </body>
</html>
```

There must be one outer and one inner container, because the HTML element tree that React renders must have one top-level node, and it can only be rendered as the child of one DOM node.

Now we'll move the inner container to our JSX code so React can render it into the outer container:

```html{5-12}
<body>
    <div id="root"></div>
    <script type="text/babel">
        ReactDOM.render(
            <div>
                <h1>Peter's Todo List</h1>
                <ul>
                    <li>Write code</li>
                    <li>Log timesheet</li>
                    <li>Go for a walk</li>
                </ul>
            </div>,
            document.getElementById('root') // Refers to our outer container
        );
    </script>
</body>
```

By this step, you'll be able to use React to render any static HTML to the DOM using JavaScript.

## 2. 'HTML' as data

JSX elements are basically syntactic sugar for creating JavaScript objects. The syntax is slightly different from HTML to avoid JavaScript keywords (like `class`, which becomes `className`). To illustrate:

```jsx
const element = <h1 className="welcome">Hello world</h1>;
```

is almost equivalent to:

```js
const element = {
  type: 'h1',
  props: {
    className: 'welcome',
    children: 'Hello world'
  }
};
```

**This lets you treat HTML as data**, which is very powerful. It lets you do anything with JSX elements that you can with JavaScript values, such as return them from a function, return them from a ternary expression, store them in a variable, map an array of strings to an array of JSX elements, etc. 

```jsx
const element = isAfternoon 
    ? <h1 className="welcome">Good afternoon</h1> 
    : <h1 className="welcome">Good morning</h1>;

const days = ['Monday', 'Tuesday', 'Wednesday'];
const dayElements = days.map(day => <li>{day}</li>)
```

However, **do not** modify a JSX element once you create it, eg:

```jsx
// BAD
const element = <h1 className="welcome">Good morning</h1>;
if (isAfternoon) {
    element.props.children = 'Good afternoon';
}
```

At the end of this step, you should realise that you can tell React what to render by giving it different values depending on your logic, using plain JavaScript.

## 3. React as a Template Engine

Imagine React like a server side templating technology like PHP or Jinja, but using plain JavaScript rather than any special HTML markup. The important part is understanding that data flows from code to HTML, and on a smaller scale, from parents to children. This is called `unidirectional data flow`, and is one of the things that makes React projects very simple and differs from alternatives like Angular and Vue.

You can write any kind of JavaScript expression in JSX inside `{}`, which lets you insert strings or numbers, map arrays of data to arrays of elements, and make elements conditional using ternary statements. 

With this simple feature you can build UI of any complexity while keeping it simple with plain JavaScript.

Lets templatise our static JSX elements with some expressions.

```jsx
const name = 'Peter';
const tasks = ['Write code', 'Log timesheet', 'Go for a walk'];
ReactDOM.render(
    <div>
        <h1>{name}'s Todo List</h1>
        <ul>
            {tasks.map(task => <li>{task}</li>)}
        </ul>
    </div>, 
    document.getElementById('root')
);
```

Note that using `tasks.map(...)` is much neater than an imperative way of creating the task list:

```jsx{4-7,12}
// BAD
const name = 'Peter';
const tasks = ['Write code', 'Log timesheet', 'Go for a walk'];
const taskElements = [];
for (const task of tasks) {
    taskElements.push(<li>{task}</li>);
}
ReactDOM.render(
    <div>
        <h1>{name}'s Todo List</h1>
        <ul>
            {taskElements}
        </ul>
    </div>, 
    document.getElementById('root')
);
```

By the end of this step, you should realise that React is able to do anything that template engines can do, using plain JavaScript and curly braces.

## 4. Compose UI with Function Components

Next, realise that since we are rendering one big data structure, you can break up the template into a collection of reusable components. Note that every component is a function of attributes, which React puts into an object called `props`. The function gets called every time a render is needed. Lets move `TodoApp` and `Title` into a separate component:

```jsx{3-4,8,16}
const name = 'Peter';
const tasks = ['Write code', 'Log timesheet', 'Go for a walk'];
const Title = (props) => <h1>{props.name}'s Todo List</h1>;
const TodoApp = (props) => {
    // We could also declare our data here
    return (
        <div>
            <Title name={props.name}>
            <ul>
                {props.tasks.map(task => <li>{task}</li>)}
            </ul>
        </div>
    );
};
ReactDOM.render(
    <TodoApp name={name} tasks={tasks}/>, 
    document.getElementById('root')
);
```

We create a function which returns the element rather than just a variable holding the element so that:
- A new JSX element is created every time the component is used
- We can treat the function as a JSX element, and pass data to it through attributes

Note that custom components must start with a capital letter so the JSX compiler can distinguish between HTML elements and custom elements.

## 5. Interaction - Manage state and side effects declaratively, not imperatively

React lets you write components in the form of `(data) => UI`. So when an event occurs, the question is not how to make the UI change - it is how to make the data change.

Even though JSX elements are JavaScript objects, do not try to modify them once they are created. Avoiding that will also make your project very simple, maintainable, and understandable. The strongest contrast is with jQuery, which is a library for selecting and changing existing elements. In React-land, the UI is a function of 'state'. State means the current state of the data. Change the data, and the UI changes as a result. Don't change the UI directly.

First, lets be clear about these concepts with some examples:

- **UI**: `div`, `button`, `"Hello World"`, `TodoApp`, `Title`
- **State**: the text in `input`, the array `tasks`, the value of `name`
- **Side effects**: something that changes or does something outside the scope of its function, such as doing an API call

You might normally manage state by declaring a variable or class member, and updating it directly:

```jsx
// WRONG approach
let state = ['Red'];
function Component(){
    // ...
        <button onClick={() => state.push('Green')}>
            Insert green
        </button>;
    // ...
}
```

Instead, you use a 'hook' called `useState` to provide the current state and a setter function.

```jsx
// Correct approach
function Component(){
    const [state, setState] = useState(['Red']);
    // ...
    // .concat() does not affect the value of 'state'
    // Instead, it creates a new value
        <button onClick={() => setState(state.concat('Green'))}>
            Insert green
        </button>
    // ...
}
```

Generally,

```js
const [currentState, setState] = useState(initialState);
```

You can use as many state hooks in a function as you need.

When the state changes, React schedules a rerender, and the component function and its children are called again, but the `state` variables will reflect the updated values.

Hooks like useState might have the appearance of magic, and you might wonder if they are just some dodgy ad-hoc trick. But they actually have a firm foundation in principle. In the functional programming world, they are called 'algebraic effects'. They are well understood and you can do some really cool and useful things with them, but that is getting beyond the scope of this post. Lets return to our code.

First, set up a couple of elements to allow the user to add to the list:

```jsx{12-13}
const name = 'Peter';
const tasks = ['Write code', 'Log timesheet', 'Go for a walk'];
const Title = (props) => <h1>{props.name}'s Todo List</h1>;
const TodoApp = (props) => {
    return (
        <div>
            <Title name={props.name}>
            <ul>
                {props.tasks.map(task => <li>{task}</li>)}
            </ul>
            New todo: 
            <input type="text"/>
            <button>Add</button>
        </div>
    );
};
ReactDOM.render(
    <TodoApp name={name} tasks={tasks}/>, 
    document.getElementById('root')
);
```

Lets use two state hooks to manage the state of the tasks and the input value:

```jsx{4-5,15-16,18}
const name = 'Peter';
const Title = (props) => <h1>{props.name}'s Todo List</h1>;
const TodoApp = (props) => {
    const [tasks, setTasks] = useState(['Write code', 'Log timesheet', 'Go for a walk']);
    const [inputText, setInputText] = useState('');
    return (
        <div>
            <Title name={props.name}>
            <ul>
                {tasks.map(task => <li>{task}</li>)}
            </ul>
            New todo: 
            <input 
                type="text" 
                value={inputText} 
                onChange={e => setInputText(e.target.value)}
            />
            <button onClick={() => setTasks(tasks.concat(inputText))}>
                Add
            </button>
        </div>
    );
};
ReactDOM.render(
    <TodoApp name={name}/>, 
    document.getElementById('root')
);
```

And there you go, you now have a React todo app.

*Side effects*

How can you do things like do an API call? Lets say that we need to do one to get the user's name. If we wrote the fetch code within the component function, it will be called every time the component is rendered, but we only want it to be called once. We can use a hook called `useEffect` - pass it a function, and it will call it only on the first render.

Lets use another state hook to store the value of `name`, which we can update when the effect is performed and the API response is received.

```jsx{5-9,12,29}
const Title = (props) => <h1>{props.name}'s Todo List</h1>;
const TodoApp = (props) => {
    const [tasks, setTasks] = useState(['Write code', 'Log timesheet', 'Go for a walk']);
    const [inputText, setInputText] = useState('');
    const [name, setName] = useState('(Name is loading...)');
    useEffect(() => {
        axios.get(`https://peterwooden.com/users/${props.id}`)
            .then(user => setName(user.name));
    });
    return (
        <div>
            <Title name={name}>
            <ul>
                {tasks.map(task => <li>{task}</li>)}
            </ul>
            New todo: 
            <input 
                type="text" 
                value={inputText} 
                onChange={e => setInputText(e.target.value)}
            />
            <button onClick={() => setTasks(tasks.concat(inputText))}>
                Add
            </button>
        </div>
    );
};
ReactDOM.render(
    <TodoApp id={31}/>, 
    document.getElementById('root')
);
```

You can also use `useEffect` to perform a task when a component is being removed from the screen, or when any particular values you want to track are changed. See the [documentation](https://reactjs.org/docs/hooks-effect.html).

## Summary

React lets you template HTML and infuse it with interactivity. If you come from the OOP world, you need to avoid thinking in terms of changing state directly, and instead think in terms of declaring data and functions. The features of React lead to very simple and maintainable code, and learning the right approaches pays big dividends.

The next thing to do after reading this article is to learn how to properly [create a React app](https://reactjs.org/docs/create-a-new-react-app.html).