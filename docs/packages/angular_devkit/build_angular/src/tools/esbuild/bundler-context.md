# BundlerContext Documentation

The `BundlerContext` is part of a module focused on handling the creation and updating of bundles using esbuild. `BundlerContext` is designed to support incremental and non-incremental builds, managing cache, and watching file changes efficiently. The primary purpose is to improve the build performance and provide developers with a set of robust and reusable functions that streamline the build process.

Following is a detailed documentation of the various aspects and components of the `BundlerContext`:

## Dependencies

This module requires external dependencies to function properly:

1. `esbuild`: A fast JavaScript bundler and minifier.
2. `node:assert`: Node.js module to perform assertions.
3. `node:path`: Node.js module for handling and transforming file paths.

You need to have these installed in your environment to use the `BundlerContext` module. Generally, they can be installed via npm:

```
npm install esbuild assert path
```

Note: The actual import statements import from `'esbuild'` and `'node:assert'` & `'node:path'`. Ensure that these packages are available in your project's `node_modules` directory.

## Class Documentation

### BundlerContext

```plaintext
BundlerContext(workspaceRoot: string, incremental: boolean, options: BuildOptions | BundlerOptionsFactory, initialFilter?: (initial: Readonly<InitialFileRecord>) => boolean)
```

#### Description

The `BundlerContext` class is designed to manage the build lifecycle of an esbuild bundle creation process. It allows combining multiple build results into a single result, handling caching of load results, watching files for changes, invalidating caches, and disposing resources when done.

#### Fields

- `#esbuildContext`: An optional `BuildContext` that holds the esbuild incremental build context if available.
- `#esbuildOptions`: An options object for esbuild builds containing, among other options, `metafile: true` and `write: false`.
- `#esbuildResult`: A cached bundle result to be re-used in incremental builds.
- `#optionsFactory`: A factory function used to generate build options, potentially with a cache.
- `#shouldCacheResult`: Indicates whether results should be cached, which depends on the `incremental` flag.
- `#loadCache`: Holds a `MemoryLoadResultCache` instance if the bundler operates in incremental mode.
- `watchFiles`: A `Set` of file paths that should be watched for changes which could impact the build result.

#### Methods

- `bundleAll(contexts: Iterable<BundlerContext>, changedFiles?: Iterable<string>): Promise<BundleContextResult>`: Bundles all provided contexts and returns a single combined result.
- `bundle(): Promise<BundleContextResult>`: Executes the build function and returns a normalized result, caching it if necessary.
- `invalidate(files: Iterable<string>): boolean`: Checks if any of the provided file paths should invalidate the cached result.
- `dispose(): Promise<void>`: Disposes of any incremental build resources.

#### Usage

The class is typically used within build tooling scripts or build processes defined in project tooling where esbuild is used as the bundler. It abstractly handles the build process including managing caching and incremental rebuilds.

In a development environment, instances would generally be created with the `incremental` option set to `true` to allow for faster rebuilds when files change. In a production or CI environment, `incremental` might be set to `false` for a full build.

### Helper functions

- `isEsBuildFailure(value: unknown): boolean`: Utility function to check if a given value is an esbuild `BuildFailure` error object.
- `isInternalAngularFile(file: string): boolean`: A function used within `BundlerContext` to determine if a file path corresponds to an internal Angular file.

### Types

Several TypeScript types are exported for use within the build process:

- `BundleContextResult`: Represents the result of a bundler context execution, including errors, warnings, and files.
- `InitialFileRecord`: Describes an initial file which includes whether it is an entrypoint and whether it is meant to be processed for the server side or browser.
- `BuildOutputFileType`: Enumerates the types of files produced in a build.
- `BuildOutputFile`: Interface representing an output file from a build with an associated type.
- `BundlerOptionsFactory<T extends BuildOptions = BuildOptions>`: A factory function type that produces a set of build options.

#### Text-Based Flow Diagram

```plaintext
BundlerContext
               └── construct (workspaceRoot, incremental, options, initialFilter)
                   ├── initialize caching and options factories
                   │
                   └── bundleAll (static method)
                   │   ├── calls bundle on each context
                   │   └── combines results into a single result set
                   │
                   └── bundle
                       ├── return cached result if exists
                       └── perform build and update cache
                           ├── handle errors and warnings
                           └── collect and return result data
```

To use an instance of `BundlerContext`, the consumer initializes it with a root directory and build options. They may then either call `bundle` to perform a single build or use `bundleAll` to combine multiple builds. The latter approach would be used in scenarios where multiple discrete parts of an application need to be built.

---

### Conclusion

This documentation gives a comprehensive overview of the `BundlerContext` class and its usage in handling esbuild bundling. By abstracting esbuild build options, caching, and result management, `BundlerContext` allows for more complex build scenarios and optimization techniques to be implemented with less boilerplate and more reusability.