# rv-management-frontend

Stating [![Build Status](https://travis-ci.org/ohtu2018-rv/rv-management-frontend.svg?branch=develop)](https://travis-ci.org/ohtu2018-rv/rv-management-frontend)

Production [![Build Status](https://travis-ci.org/ohtu2018-rv/rv-management-frontend.svg?branch=master)](https://travis-ci.org/ohtu2018-rv/rv-management-frontend)

## Introduction

This repository contains source code for the new RV management UI, coded during University course 'Software development project, Spring 2018'

Production URL for the application is https://rv-management.herokuapp.com, while staging can be found at https://rv-management-dev.herokuapp.com.

## How to get started

1. Clone the repo
2. Install Yarn (if not installed before)
3. `yarn install` to install project dependencies
4. Create a [.env](https://github.com/motdotla/dotenv) file and define in it the variable `REACT_APP_BACKEND_URL` that points to backend server's address
5. `yarn start` for starting the app, `yarn storybook` when developing modules or `yarn styleguide` when creating documentation.

## How to build

Run `yarn build` to build the project. This will create a production-optimized build to `build` folder.

## Documentation

For UI component documentation, please click [this link](http://htmlpreview.github.io/?https://github.com/ohtu2018-rv/rv-management-frontend/blob/develop/styleguide/index.html)

## Tech

This is a JavaScript application powered by React. React Redux is used to handle the app's state, with the help of redux-thunk for asynchronous actions. UI components do not use external styling rules, so every UI component you see in this project is styled from scratch.

Testing of UI components is made with Enzyme & Jest, and Redux store is mocked with redux-mock-store.

## Development

### UI component development

When developing UI components, use React Storybook. It allows the development of single UI components instead of adding a new component to the application and develop it 'live'.

### UI component testing & documentation

Write tests as new code is written to make sure that each UI component gets tested throughfully. New UI components shall also be documented on the fly, with the help of React Styleguide.

### ESLint & Stylelint

Code must pass linters in order to be commited. **When a commit is made, ESLint and Stylelint will make sure that styling guidelines are followed.** The commit will not go through, if even one error is detected.

#### Scripts

Use these scripts to help yourself in development.

* `yarn lint-js` lints JavaScript files.
* `yarn fix-js` lints and fixes potential code issues in JavaScript files.
* `yarn lint-css` lints SCSS files.
* `yarn fix-css` lints and fixes potential code issues in SCSS files.

**If you want to use npm, replace `yarn` command with `npm run-script`.**

### Git Flow

New features or fixes must have a branch. Pushing directly to develop or master is not allowed (though certain emergency cituations do not follow this rule) [See this link on how to use Git Flow.](DEVELOPMENT.md)

## Build pipeline

When code is pushed to GitHub and a pull request is made to either `develop` or `master` branch, Travis CI will run tests for the project and deploy it to Heroku, if all test have passed.

## License

This project is licensed with GNU GPL v2 license.
