const fs = require('fs');
const path = require('path');

const yaml = require('js-yaml');
const merge = require('merge-lite');

const baseConfigPath = path.resolve(__dirname, '.postcssrc.base.yml');
const baseConfigRead = fs.readFileSync(baseConfigPath, 'utf8');
const baseConfigJson = yaml.load(baseConfigRead);

module.exports = () => ({
  plugins: merge([baseConfigJson.plugins, {
    'postcss-import': {
      resolve: (input, basedir, importOptions) => {
        let newPath;
        let newInput;

        if (input.includes('@tacc/core-styles')) {
          newInput = input.replace(
            '@tacc/core-styles',
            'libs/core-styles'
          );
          newPath = path.resolve(importOptions.root, newInput);
        }

        console.log(newPath);

        return newPath;
      }
    }
  }])
})
