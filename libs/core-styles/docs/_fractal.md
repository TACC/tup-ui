# TACC Core Styles - Tips for Fractal Component Library

## Debugging

### Preview Templates

To see values available in a preview template, adapt this template code:

```html
<dl>
  {{#each _target}}
  <dt>
    <strong><code>{{@key}}</code></strong>
  </dt>
  <dd><code>{{this}}</code></dd>
  {{/each}}
</dl>
```

### Console Logging

To output values (like objects) in the console, adapt this config code:

```js
const hbs = require('@frctl/handlebars')({
  helpers: {
    debug: function (optionalValue) {
      console.log('Current Context');
      console.log('====================');
      console.log(this);

      if (optionalValue) {
        console.log('Value');
        console.log('====================');
        console.log(optionalValue);
      }
    },
  },
});
fractal.components.engine(hbs);
```
