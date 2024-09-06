# HR Tool

HR Tool is a web application designed to help organizations manage CVs and match them against job descriptions using various criteria. The application is built using modern web development technologies and patterns to ensure scalability, maintainability, and ease of use.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Libraries and Dependencies](#libraries-and-dependencies)
3. [Features](#features)
4. [Usage](#usage)
5. [Redux Thunks](#redux-thunks)
6. [Components](#components)
7. [Services](#services)
8. [Running the Project](#running-the-project)

## Project Structure

├── src
│ ├── actions
│ │ ├── cvActions.ts
│ │ ├── jobActions.ts
│ │ └── matchingActions.ts
│ ├── components
│ │ ├── Dashboard.tsx
│ │ ├── Login.tsx
│ │ ├── MatchTable.tsx
│ │ └── ProtectedRoute.tsx
│ ├── data
│ │ └── cvs.json
│ ├── reducers
│ │ ├── cvReducer.ts
│ │ ├── jobReducer.ts
│ │ └── matchingReducer.ts
│ ├── services
│ │ ├── CvService.ts
│ │ ├── JobService.ts
│ │ ├── MatchingService.ts
│ │ └── RestService.ts
│ ├── store.ts
│ ├── types.ts
│ ├── App.tsx
│ ├── authConfig.ts
│ ├── index.css
│ ├── index.tsx
│ └── AppWrapper.tsx
├── .eslintrc.js
├── package.json
└── README.md


## Libraries and Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **React-Redux**: Official React bindings for Redux.
- **Redux Toolkit**: The official, recommended way to write Redux logic.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **ag-Grid**: A fully-featured and highly customizable JavaScript data grid.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **MSAL React**: A Microsoft Authentication Library for React.

## Features

- **Drag and Drop CV Upload**: Users can drag and drop CVs to upload them.
- **Multi-file Upload**: Users can select multiple CVs from their file system.
- **Job Description Selection**: Users can select job descriptions from a predefined list.
- **CV Matching**: The application matches uploaded CVs against selected job descriptions.
- **Protected Routes**: Routes are protected and require authentication.
- **Login with Microsoft**: Users can log in using their Microsoft account.

## Usage

1. **Drag and Drop or Select CVs**: Users can either drag and drop CV files or select them using a file input.
2. **Select Job Description**: Users select a job description from a dropdown menu.
3. **Calculate Matching CVs**: Users click a button to calculate the matching CVs based on the selected job description.
4. **View Matching Profiles**: Matching profiles are displayed in an ag-Grid table.

## Redux Thunks

The Redux thunks are used to handle asynchronous operations for CVs, job descriptions, and matching results. They interact with services to fetch data from the backend API and dispatch actions to update the Redux store.

- **CV Actions**: Upload a CV, get a CV by ID, get a list of CVs.
- **Job Actions**: Upload a job description, get a job description by ID, get a list of job descriptions, create a new job description.
- **Matching Actions**: Match CVs to a job description.

## Components

### [Dashboard](./src/components/Dashboard.tsx)

The main component where users can upload CVs, select job descriptions, and view matching profiles. It includes drag-and-drop functionality for CV uploads and a dropdown menu for selecting job descriptions.

### [Login](./src/components/Login.tsx)

The login component uses MSAL React to handle authentication with Microsoft accounts.

### [MatchTable](./src/components/MatchTable.tsx)

Displays the matching profiles in a fully-featured data grid using ag-Grid.

### [ProtectedRoute](./src/components/ProtectedRoute.tsx)

A higher-order component that protects routes from being accessed without authentication.

## Services

### [CvService](./src/services/CvService.ts)

Handles all operations related to CVs, such as uploading a CV, getting a CV by ID, and getting a list of CVs.

### [JobService](./src/services/JobService.ts)

Handles all operations related to job descriptions, such as uploading a job description, getting a job description by ID, getting a list of job descriptions, and creating a new job description.

### [MatchingService](./src/services/MatchingService.ts)

Handles the matching of CVs to job descriptions and returns the matching results.

### [RestService](./src/services/RestService.ts)

A base service that uses Axios to perform HTTP requests.

## Running the Project

To run the project locally:

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Start the development server using `npm run dev`.
4. Open `http://localhost:3000` in your browser.

Make sure to configure your Azure AD credentials in the `authConfig.ts` file.

---

This `README.md` file provides a comprehensive overview of the project structure, libraries, features, usage, and instructions to run the project. The Markdown-compatible links make it easy to navigate the components and services directly on GitHub.



#

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
