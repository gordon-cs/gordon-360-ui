# Gordon 360 User Interface

This project is a rebuild of the frontend of Gordon 360 in React. [The current frontend](https://github.com/gordon-cs/Project-Bernard/) was built in EmberJS, but was deemed to slow and difficult to maintain.

Look at [`ROADMAP.md`](https://github.com/gordon-cs/gordon-360-ui/blob/master/ROADMAP.md) for progress on the rebuild.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Read the user guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

To run the app for the first time, run the following commands:

- `npm install`
- `npm start`

The app will open in a browser at [http://localhost:3000](http://localhost:3000).

### Editor Recommendations

[Visual Studio Code](https://code.visualstudio.com/) is the recommended editor for this project. This editor is a lightweight IDE that has excellent support for JavaScript and other web languages. It also has a built-in terminal, Git integration, a debugger, and a rich extension ecosystem.

The following extensions are recommended for any code editor used to develop this project, but the links provided are for the VS Code extensions. Many of the extensions listed below are linters, which check code syntax and style to ensure that everyone on the team writies code the same way.

- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ensures that indentation style, line endings, and file endings are consistent across editors and operating systems
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for JavaScript (`.js` files)
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) for Markdown (`.md` files)
- [Sass Lint](https://marketplace.visualstudio.com/items?itemName=glen-84.sass-lint) for Sass (`.scss` files)

If you are using VS Code, you can use the following keyboard shortcuts to run the app:

- macOS: <kbd>⌘</kbd><kbd>⇧</kbd><kbd>B</kbd>
- Windows: <kbd>Ctrl</kbd>+<kbd>⇧</kbd>+<kbd>B</kbd>

VS Code users will also see a ruler at the 100 character mark, helping the developer to avoid linter warnings by keeping lines under 100 characters long.

### Libraries

Links to the homepages of libraries used in this project, listed here for easy reference.

- [React Router](https://reacttraining.com/react-router/web/guides/philosophy)

  Provides easy routing, allowing transitions between views with back button support and URL management.

- [classnames](https://github.com/JedWatson/classnames)

  A simple JavaScript utility for conditionally joining classNames together. See [Usage with React.js](https://github.com/JedWatson/classnames#usage-with-reactjs) for an explanation of why this library is useful with JSX.

- [Material-UI](https://material-ui-next.com)

  Material-UI is a widely-used React implementation of Google's Material Design. It provides a comprehensive toolkit of interface components, along with a set of usability guidelines and best practices for using them.
  *Note*: this project currently uses `material-ui@next`, which is a beta version of the library. The library is approaching a 1.0.0 release, so the beta version is more similar to that release than the current stable version is.
