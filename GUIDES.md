# Guides

## Code Style

This project uses [Prettier](https://prettier.io/), an "opinionated code formatter," to automatically format JavaScript, JSON, Sass, and Markdown files according to a common style.

The advantage of using a code formatter is consistency between developers. Using ESLint with a strict style guide is one approach to consistency, but it still requires developer effort to fix code according to the ESLint rules. Prettier takes care of this without any effort from the developers.

Prettier is used as a pre commit hook in this repository. This means that it will automatically format any staged code before it is committed. It can also be used as an [extension for your editor](https://prettier.io/docs/en/editors.html). This repository includes a setup for VS Code: when the extension is installed, files will be formatted automatically every time they are saved.

ESLint and Stylelint are used in conjunction with Prettier to catch syntax errors, but not to check code style - that is taken care of solely by Prettier.

## Dependencies

### Installing Dependencies

If you are adding a dependency to the project, you must use either `--save` or `--save-dev` with `npm install`. This will save the dependency and its current version to `package.json`, which means it will be installed automatically when `npm install` is run.

- If you are installing a dependency that will be used in development, such as a build tool, linter, or documentation tool, use `npm install --save-dev nameOfPackage`. This will save the dependency to the `devDependencies` property of `package.json`.
- If you are installing a production dependency, such as a charting library, a date formatting library, or a utility like Lodash, use `npm install --save nameOfPackage`. This will save the dependency to the `dependencies` property of `package.json`.

To remove a dependency, use `npm rm nameOfPackage`.

### Updating Dependencies

To see which depencies are out of date, run `npm outdated`.

To update all depedencies to their latest allowed versions (as specified by the semver range in `package.json`), run `npm update --save --dev`. This command will save the latest versions of all production and development dependencies to `package.json` as the new minimum version. Read more about `npm update` [here](https://docs.npmjs.com/cli/update).

### Semantic Versioning

[Semantic versioning](https://semver.org/) is a method of versioning software. From their website:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
> - MAJOR version when you make incompatible API changes,
> - MINOR version when you add functionality in a backwards-compatible manner, and
> - PATCH version when you make backwards-compatible bug fixes.
>
> Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

npm uses semantic versioning ranges to specify a range of acceptable versions. For example, `^2.1.3` means "any minor or patch release with the major version `2`". In other words, where `x` represents a version number that can change, this range means `2.x.x`.

## File Organization

The source files for the app are in `./src`. The other top-level folders are as follows:

- `.vscode` contains configuration for Visual Studio Code
- `build` contains the built application; not tracked by Git
- `node_modules` contains dependencies installed by `npm`; not tracked by Git
- `public` contains assets that should not be processed by Webpack. Only files inside `public` can be used from `public/index.html`.

The structure of the `src` directory is as follows:

```plain
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

```plain
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

```plain
components
├── Carousel
│   └── index.js <-- wants to use ../Header/components/MyButton
└── Header
    ├── components
    │   └── MyButton
    └── index.js <-- uses ./components/MyButton
```

changes to

```plain
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

```plain
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

## Environment Variables

Environment-specific variables are located in the root directory of the project in the files `.env` and `.env.production`. `.env` contains variables for local development and testing. `.env.production` contains overrides of those variables specific to the production environments (360 and 360Train).

To declare variables that should not be checked in to version control, create a file in the root directory called `.env.local`. This file will be ignored by git.

These files are loaded by the scripts that run the development server and build the application. Variables in these files are available globally in the app as `process.env.REACT_APP_VARIABLE_NAME` (assuming one of the `.env` files contains the line `REACT_APP_VARIABLE_NAME=some-value`).

Environment variables must be declared in all caps, must use snake case, and must begin with `REACT_APP_` (ex: `REACT_APP_API_URL` or `REACT_APP_PASSWORD`). Any environment variables that do not begin with `REACT_APP_` will be ignored.

## Deployment

The deployment script `./scripts/deploy.sh` requires several environment variables to be defined in the Travis CI environment. These variables are documented at the top of the deployment script.

The script deploys to either staging or production based on the branch it is running from. The `develop` branch deploys to staging, while the `master` branch deploys to production.

`develop` is the default branch on the repository, so all branches should be based on it and should merge back into it. Changes merged into `develop` will automatically deploy to the staging environment.

### Deploying to Production

1. On the [repository's home page on GitHub](https://github.com/gordon-cs/gordon-360-ui), click "New pull request."
1. Change the "base" branch of the pull request to `master`. The "compare" branch should be set to `develop` by default.
1. Enter a title starting with "RELEASE:" (optional, but useful for quickly finding releases in the Git history) and containing a brief summary of the changes that the release brings.
1. Add reviewers. The pull request must be approved before it can be merged.
1. Click "Create pull request."
1. When the pull request is approved, merge it. This will trigger a build that will automatically deploy `master` to production.
