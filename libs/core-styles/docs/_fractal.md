# TACC Core Styles - Tips for Fractal Component Library

## Preview Templates

To see values available in a preview template, add this code to start:

```
<dl>
{{#each _target}}
  <dt><strong><code>{{@key}}</code></strong></dt>
  <dd><code>{{this}}</code></dd>
{{/each}}
</dl>
```
