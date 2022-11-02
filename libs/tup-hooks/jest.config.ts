/* eslint-disable */
export default {
  displayName: 'tup-hooks',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/tup-hooks',
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
