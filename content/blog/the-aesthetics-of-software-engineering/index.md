---
title: Beautiful Code Matters
date: "2021-02-10T09:48:00Z"
description: "Beautiful Code Matters"
---

Software engineering is a craft, not a science. We aren't concerned with mere truth and theory. We build and maintain things. The huge number of choices we face in writing code mirrors the experience of writing a novel in English, or architecting a building in blueprint. Writing code that 'works' is necessary, The Agile manifesto suggests that the end goal as writing code that 'works', as Agile would suggest, this post argues that a sole focus on functionality at the expense of aesthetics has practical consequences. Forgetting aesthetics results in unmaintainable code and low morale. Aesthetic code is more rewarding to write, makes us more productive, promotes a culture of ownership, and avoids frustration and drudgery.

While the current movement in software engineering rightly concerned with designing beautiful experiences for the user, it would benefit greatly from the Steve Jobs ethic of making something beautiful within rather than just without. There are both subjective and practical reasons for writing aesthetic code.

## The value of aesthetics itself

After thousands of years of building wonders of the human imagination, architecture turned its back on beauty. From the 20th century onwards, the modernist movement dominated. Modernism is only concerned with function, that the buildings it constructs 'work'. This is in contrast with the order, symmetry, form, and human centredness embraced from classical to Rococo architecture. Modernism fails to appreciate that aesthetics are a human need too, rather than only shelter. Only beautiful buildings foster human wellbeing, stewardship of one's surroundings, and unify a community around a high standard of excellence to aspire to. When ugly buildings decay, there is not much to gain by maintaining them. No one wants to "own" an ugly building. They anchor the culture in a low standard of craftmanship. The tradgedy is that while the designers of modernist buildings come and go, the community is stuck with them for decades. I am not suggesting that we ornament our code in the style of Art Deco. In fact, in the realm of code that may be ugly. The point is that aesthetics matter, and have important follow on effects about the interaction of a person and their environment. Our subjective feeling of 

## What is beautiful code?

### Clarity, rather than Confusion

To someone reading the code, it must be easy to understand what it does. 

- _Optimise for readability rather than minimum lines of code_. Beautiful code does not try to solve a problem with the least amount of keystrokes and sneaky language tricks that make the author look smart. There is no reason to optimise for fewest lines of code itself - that should only be a consequence rather than a primary goal. You can still use cool functional programming techniques, but rather than nesting 

For example, the functional enthusiast might be tempted to turn this...

```js
function sumAgeOfActiveUsers(users) {
    let total = 0;
    for (let user of users) {
        if (user.active) {
            total += user.age;
        }
    }
    return total;
}
```

...into this. I've made this mistake in the past.

```js
function sumAgeOfActiveUsers(users) {
    return users.filter(user => user.active).map(user => user.age).reduce((total, age) => total + age, 0);
}
```

The first solution is fine, but if you really like functional programming, there is no harm in naming the intermediate values as variables. This is far easier to understand, as hints are given to the reader about what is going on, without any real difference in performance:

```js
function sumAgeOfActiveUsers(users) {
    const activeUsers = users.filter(user => user.active);
    const ages = activeUsers.map(user => user.age);
    return ages.reduce((total, age) => total + age, 0);
}
```

In fact, in more complex real world scenarios, the third approach might actually be superior to the first one, due to the next point:

- _Use immutable data_. Immutable data cannot be changed once it is created. Back when computer programs had to fit everything in 4kb of RAM, we could only change or _mutate_ existing values in memory. Except for ultra-performant systems, there is almost no need to use mutable data these days.  On the other end of the spectrum to immutable data is mutability hell, where data is initialised, then conditionally changed, iterated over, changed by code in other methods or files, and the poor reader is lost in an overwhelmingly tangled web of logic. To make a change is a nightmare - the first problem is understanding what to change, the next is to make sure that it doesn't break anything else. In these sorts of scenarios, its tempting to skip the most important step of figuring out what the hell it actually does. The cognitive complexity of understanding mutable-style code scales ~exponentially~ factorially at worst, since any mutation can react to previous mutations, resulting in a giant tree of possible values. This tree of possibilities is sometimes impossible to understand. On the other hand, writing code with immutable data is much simpler since the logic complexity scales linearly to the number of operations.

- _Composition and orthoganality, rather than coupling_. Problems should be untangled to identify all the subproblems that can be solved independently, and then the code should be composed of separate solutions to each of these subproblems. When solutions are coupled, a change in one place forces a ripple effect of changes elsewhere, they are harder to understand, and it is less easily reused and tested. Other than untangling specific problems, a general thing to do is to untangle hardcoded data from logic, for example:

Before:

```js
function calculateTaxPayable(income) {
    const tax = 0;
    if (income > 18200) {
        tax += Math.min(income - 18200, 45000) * 19 / 100;
    }
    if (income > 45000) {
        tax += Math.min(income - 45000, 12000) * 32.5 / 100;
    }
    if (income > 120000) {
        tax += Math.min(income - 120000, 180000) * 37 / 100;
    }
    if (income > 180000) {
        tax += (income - 180000) * 45 / 100;
    }
}
```

After:

```js
// Format: lowerBound, upperBound, percent
const taxBrackets = [
    [18201, 45000, 19],
    [45001, 120000, 32.5],
    [120001, 180000, 37],
    [180001, Infinity, 45]
];
function calculateTaxPayable(income) {
    const tax = 0;
    for (let [lowerBound, upperBound, percent] of taxBrackets) {
        if (income > lowerBound) {
            const incomeInRange = Math.min(income, upperBound) - lowerBound;
            tax += incomeInRange * percent / 100;
        }
    }
    return tax;
}
```

Changing the _after_ code is much easier.

- _Co-location of logic and data_. Related logic and data should be co-located or easily findable.

### Elegance, rather than Complication

Beautiful code is not wasteful or repetitive. The underlying algorithm is expressed naturally and not overcomplicated with unnecessary idioms. Like the composition point above, the whole solution is composed of reusable, smaller solutions

### Stylistic

Code should consistently follow standard style conventions for that language. This includes code layout, spacing, commenting. This makes it more familiar and reduces the cognitive load to a reader.

## 

Some software engineers just want their code to work. Their choice of tools doesn't matter - the most convenient technologies will do. They end


## The tension between the functional and the aesthetic


## OOP

OOP expresses code with ornamentation and waste. It isnt all about function. Most OOP code is merely procedural, organising code into procedures.

## JQuery

Jquery is brutalism. Thousands of lines of imperative code


## Sources

https://www.researchgate.net/publication/232443360_The_Aesthetics_of_Software_Code_A_Quantitative_Exploration
https://resources.wellcertified.com/articles/why-beautiful-spaces-make-us-healthier/
https://softwareengineering.stackexchange.com/a/207971
https://en.wikipedia.org/wiki/Orthogonality_(programming)
https://en.wikipedia.org/wiki/Coupling_(computer_programming)




The aesthetics of software engineering
Two types of people
Getting joy out of good code vs repugnance from bad code
Jquery brutalism 
Do we persue beauty for its own sake? For code, there are practical reasons to persue aeththetics. It’s more readable etc more maintainable 