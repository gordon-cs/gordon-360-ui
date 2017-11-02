Gordon 360 User Interface
---------------------------------

# Getting Started
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Read the user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

To run the app for the first time, run the following commands:  
- `npm install`
- `npm start`

The app will open in a browser at http://localhost:3000.

## Editor Recommendations
[Visual Studio Code](https://code.visualstudio.com/) is the recommended editor for this project. This editor is a lightweight IDE that has excellent support for JavaScript and other web languages. It also has a built-in terminal, Git integration, a debugger, and a rich extension ecosystem.  

The following extensions are recommended for any editor used to develop this project, but the links provided are for the VS Code extensions:
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ensures that indentation style, line endings, and file endings are consistent across editors and operating systems
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) checks JavaScript syntax and style, reducing bugs and improving consistency across a development team

If you are using VS Code, you can use the following keyboard shortcuts to run the app:
- macOS: <kbd>⌘</kbd><kbd>⇧</kbd><kbd>B</kbd>
- Windows: <kbd>Ctrl</kbd>+<kbd>⇧</kbd>+<kbd>B</kbd>

VS Code users will also see a ruler at the 100 character mark, helping the developer to avoid linter warnings by keeping lines under 100 characters long.  

## Libraries
Links to the homepages of libraries used in this project, listed here for easy reference.
- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)
Provides easy routing, allowing transitions between views with back button support and URL management.
- [reactstrap](https://reactstrap.github.io/)
Bootstrap 4 implemented in React components. Though [React Bootstrap](https://react-bootstrap.github.io/) is more widely used and has a more mature API, it only supports Bootstrap 3. Bootstrap 4 brings significant improvements, so it is worthwhile to go with reactstrap, a younger library, to be able to take advantage of those improvements.
- [classnames](https://github.com/JedWatson/classnames)
A simple JavaScript utility for conditionally joining classNames together. See [Usage with React.js](https://github.com/JedWatson/classnames#usage-with-reactjs) for an explanation of why this library is useful with JSX.

# Development
## File Organization
The source files for the app are in `./src`. The other top-level folders are as follows:
- `.vscode` contains configuration for Visual Studio Code
- `build` contains the built application; not tracked by Git
- `node_modules` contains dependencies installed by `npm`; not tracked by Git
- `public` contains assets that should not be processed by Webpack. Only files inside `public` can be used from `public/index.html`.

The structure of the `src` directory is as follows:
```
├── components
│   └── ...
├── services
│   └── ...
├── views
│   └── ...
├── app.js
├── app.test.js
├── index.css
├── index.js
└── register-service-worker.js
```
### Components
```
components
├── Carousel
│   └── index.js
├── Header
│   ├── components
│   │   └── ...
│   ├── gordon-logo-horiz-black.svg
│   ├── header.css
│   └── index.js
└── ...
```
This folder contains components that, when used together, make up the views of the application. Each component should be small and focus on doing One Thing Well. Read about the [Atomic Design Methodology](http://atomicdesign.bradfrost.com/chapter-2/) for a useful perspective on writing small, reusable components and composing them into larger areas of functionality.

Each component must have a folder named in PascalCase (also known as upper camel case) containing a file called `index.js`. Using that filename allows the component to be imported by folder, instead of by file: `import MyComponent from './components/MyComponent` instead of `import MyComponent from './components/MyComponent/my-component`.

A component folder can contain any resources needed by the component, such as images and CSS files. If there is more than one image or CSS file, a subdirectory named `images` or `styles` can be created inside the component folder.

A component folder can contain its own `components` folder containing components that only apply to that component. This is a useful way to avoid polluting the top-level `./components` folder with single-use components. If a component in a nested component folder becomes useful to another component that is higher in the hierarchy than it is, that component should be moved up to the same level as that component. For example:
```
components
├── Carousel
│   └── index.js <-- wants to use ../Header/components/MyButton
└── Header
    ├── components
    │   └── MyButton
    └── index.js <-- uses ./components/MyButton
```
changes to
```
components
├── Carousel
│   └── index.js <-- uses ../MyButton
├── Header
│   └── index.js <-- uses ../MyButton
└── MyButton
```

**Components should never have one-word names.** This is to avoid naming collisions with external libraries and with future HTML elements. This application is using the convention of prefixing component names with `Gordon`, as in `GordonButton` or `GordonCarousel`. Note that folder and file names do not have to follow this convention (respectively, the two examples would be `./components/Button` and `./components/Carousel`); only the class names of the components and their imports have to follow it:
```JavaScript
// ./components/Button/index.js
class GordonButton extends Component {}

// ./views/Home/index.js
import GordonButton from '../components/Button';
```

### Services
This folder contains modules that provide reusable functionality to components across the application.

In general, **components should not handle anything other than displaying and interacting with data**. Any "heavy lifting" should be done in services or on the backend. For example, HTTP requests to the API, filtering a list of events, or parsing a date should take place in a service.

**Services should be framework-agnostic.** This app should be able to switch to Vue or Angular without changing any of the services.

### Views
```
views
├── Home
│   ├── components
│   │   └── ... 
│   ├── home.css
│   └── index.js
└── Login
    └── ...
```
This folder contains components that make up the discrete views of the application, for example "home," "login," and "edit activity." Each view uses the same folder structure as components in `./components`. Each view represents a route defined in `./app.js`. The route's path should be similar to the name of the component, such as `ActivityEdit` having a path of `/activity/:activityId/edit`. 

Similar to component folders, a view folder can have its own `components` folder containing components that only apply to that view. If a component in one of these folders ends up being useful to another view, it should move to `./components` to be shared by both views.

### Environment Variables
Environment-specific variables are located in the root directory of the project in the files `.env` and `.env.production`.  `.env` contains variables for local development and testing. `.env.production` contains overrides of those variables specific to the production environments (360 and 360Train).

To declare variables that should not be checked in to version control, create a file in the root directory called `.env.local`. This file will be ignored by git.

These files are loaded by the scripts that run the development server and build the application. Variables in these files are available globally in the app as `process.env.REACT_APP_VARIABLE_NAME` (assuming one of the `.env` files contains the line `REACT_APP_VARIABLE_NAME=some-value`).

Environment variables must be declared in all caps, must use snake case, and must begin with `REACT_APP_` (ex: `REACT_APP_API_URL` or `REACT_APP_PASSWORD`). Any environment variables that do not begin with `REACT_APP_` will be ignored.
