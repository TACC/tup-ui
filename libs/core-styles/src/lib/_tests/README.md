# TACC Styles

Styles here compare test input CSS to expected output CSS.

_This allows developers to confirm whether CSS plugins are working._

## Usage

1. Add `/*! Some Unique Comment: */` above the test input CSS.
2. Import stylesheets (in `../_tests.css`) (if not already).
3. Build CSS (run `npm run build` from root).
4. Compare input CSS to actual output CSS (in `./dist/_tests.css`).

## Example

__Input:__

```css
/*! Custom Media Narrow: */
@custom-media --narrow-window (max-width: 30em);

@media (--narrow-window) {
  ._test {
    background-color: red;
  }
}
```

__Output__:

```css
/*! Custom Media Narrow: */@media (max-width:30em){._test{background-color:red}}
```
