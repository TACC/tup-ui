# TACC: Core-Components

This library was generated with [Nx](https://nx.dev).

Reusable components for TACC WMA Workspace Portals & Websites

## Table of Contents

- [Related Repositories](#related-repositories)
- [Project Architecture](#project-architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Developing](#developing)
- [Contributing](#contributing)
- [Testing](#testing)

## Related Repositories

- [Core Styles], the shared UI pattern code for TACC WMA CMS Websites

## Project Architecture

| directory | contents                     |
| --------- | ---------------------------- |
| `src/lib` | components, tests, [stories] |

## Prerequisites

- [Node.js]

## Getting Started

> **Important**
> To develop a new or existing custom CMS website for a TACC client, do **not** clone this repository. Instead, read [Develop a Custom Project]. To develop on the Core CMS (upon which our other CMS are built) continute reading.

Set up a new local CMS instance.

0. [Clone this Repository.](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
1. Enter the Repository Clone:

   ```sh
   cd tup-ui
   ```

2. Install Dependencies:

   ```sh
   npm install
   ```

3. Install Dependencies:

   ```sh
   npm install
   ```

## Developing

The components are [React components](https://react.dev/learn) that should be [written in TypeScript](https://react.dev/learn/typescript#typescript-with-react-components).

| command         | task               | service                       |
| --------------- | ------------------ | ----------------------------- |
| `npm test`      | execute unit tests | [Vitest](https://vitest.dev/) |
| `npm run build` | build components   | [Vite](https://vitejs.dev/)   |

## Contributing

### to the Demo

| task | reference |
| - | - |
| add/edit component | https://storybook.js.org/docs/writing-stories |
| change interaction | https://storybook.js.org/docs/essentials/controls |

## Testing

### Unit Tests

Run `nx test core-components` to execute the unit tests via [Vitest](https://vitest.dev/).

### End-to-End Tests

Perform manually by installing and testing the components in a separate respository. See [different approaches to testing your own packages](https://dev.to/one-beyond/different-approaches-to-testing-your-own-packages-1kdg).

<!-- Link Aliases -->

[core styles]: https://github.com/TACC/Core-Styles
[node.js]: https://nodejs.org/
[stories]: https://storybook.js.org/docs/get-started/whats-a-story
