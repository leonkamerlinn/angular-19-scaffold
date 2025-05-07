# Angular19Scaffold

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Key Technologies

This scaffold project utilizes several key technologies:

*   **Angular 19**: The core framework.
*   **Angular Material**: For UI components following Material Design.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **NgRx**: For state management.
*   **Transloco**: For internationalization (i18n).
*   **Server-Side Rendering (SSR)**: Enabled for improved performance and SEO.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

To run the application with Server-Side Rendering (SSR):

```bash
npm run serve:ssr:angular-19-scaffold
```
This will typically serve the application on a different port (e.g., `http://localhost:4000/`) or as specified in your SSR setup.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
