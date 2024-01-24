# `execute-build.ts` Documentation

This documentation provides an overview and details for the `execute-build.ts` module which is part of the Angular CLI's build process. Specifically, it contains the main build execution function for compiling and bundling an Angular application as well as helper utilities to facilitate this process.

## `executeBuild` Function

The `executeBuild` function is the central part of this module, orchestrating the build process of an Angular application. It accepts normalized build options, the builder context, and an optional rebuild state for when the build process is executed in watch mode.

### Process Flow

1. Initialize start time and destructure options.
2. Retrieve supported browsers and transform them to ESBuild targets.
3. If i18n is enabled, load active translations.
4. Either reuse the rebuild state or create new bundle contexts for various build aspects such as the application code, polyfills, global styles, and server code.
5. Execute the bundling process for all contexts.
6. Log any errors or warnings from the bundling process.
7. Early return if bundling errors are detected.
8. Copy asset files to the output location if defined.
9. Extract and write licenses if the `extractLicenses` option is enabled.
10. Analyze the output for any bundle budget issues.
11. Estimate transfer sizes if applicable.
12. Either perform i18n translation inlining or execute additional post-bundle steps.
13. Log final build statistics.
14. Record the overall build time and print it to the console.
15. Generate and store build statistics if the `stats` option is enabled.

### Function Signature

```typescript
export async function executeBuild(
  options: NormalizedApplicationBuildOptions,
  context: BuilderContext,
  rebuildState?: RebuildState,
): Promise<ExecutionResult>
```

This function performs numerous tasks, from initializing build contexts to performing budget checks and inline translation processes. It utilizes several utilities and helper functions to manage tasks like logging, asset copying, license extraction, and post-bundle operations.

## Helper Functions

- `printWarningsAndErrorsToConsole`: Utility function that logs warnings and errors to the console using the provided builder context.

### Function Signature

```typescript
function printWarningsAndErrorsToConsole(
  context: BuilderContext,
  warnings: string[],
  errors: string[],
): void
```

## Dependencies

This module has several dependencies that are essential for its operation:

- `@angular-devkit/architect`: Provides types and interfaces for interacting with the Architect API.
- Various utilities from `../../tools/esbuild/*`: Offer assistance in creating bundle options, extracting licenses, and checking for CommonJS modules.
- `../../utils/*`: Include helpers for copy assets, getting supported browsers, and analyzing bundle budgets.
- `./execute-post-bundle`: Contains a function for executing post-bundle operations.
- `./i18n`: Methods for inlining internationalization assets.
- `./options`: Provides normalized application build options needed during the build.

To install these dependencies (assuming they're not bundled with the Angular CLI), you would typically use npm or yarn. However, since these dependencies are part of the Angular CLI's internal tooling, they will not need to be installed separately by the end-user.

```bash
npm install @angular-devkit/architect
# or
yarn add @angular-devkit/architect
```

Please note these commands are just examples; the actual dependencies would be managed within the Angular CLI project itself and wouldn't require manual installation in a typical setup.