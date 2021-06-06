# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Philosophy:
I've treated this project as potential boilerplate for future development, as styling reassembles early 2000', fundaments are solid.
Maintainability and extendibility were main principles taken into account while proposing stack and component architecture.
Heavy use of typescript, heavy composition, custom base components were main architectural tools used to achieve the goal.
Linter rules are very strict by using additional sonar ruleset for quality.
Stack is quite bloated with tools considering size of the project, but as stated, I was aiming to create a fully fledged boilerplate rather than simply deliver the task.
No component framework used apart from material icons. 
No grid.

Features:
- Proto of custom theming with use of styled components
- Behavior driven by flags
- Local caching of previous searches for api utilization optimization
- Local caching of current results state (disabled by default)
- Custom base components:
	- Button
	- Icon (Material wrapper)
	- Input
	- List
	- Spinner (Material wrapper)
	- Label
  
For setup flags check Main Component

Missing:
- cache invalidation
- animations
- unit tests

Stack:
[redux-toolkit](https://redux-toolkit.js.org/) - Totally unnecessary, just to show off
[i18-next](https://react.i18next.com/) - because keeping your labels in one place is really good idea and adding an ability to easily translate them in the feature makes this one an easy choice
[material-icons](https://material-ui.com/components/material-icons/) - I needed Icons, easy replaceable
[lodash](https://lodash.com/) - always helpful
[iterare](https://github.com/felixfbecker/iterare#readme) - because Sets > Arrays
[tinycolor2](https://github.com/bgrins/TinyColor#readme) - color manipulation
[typescript](https://www.typescriptlang.org/)
[create-react-app](https://github.com/facebook/create-react-app) - It's good to know CRA limitations, most of them can be overcame without ejecting by use of tools as craco but some of them not. For now I feel quite comfortable with CRA.
[styled-components](https://styled-components.com/) - embrace the composition
