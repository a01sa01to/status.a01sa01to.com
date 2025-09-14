import myConfig from '@a01sa01to/eslint-config'

export default [
  ...myConfig,
  {
    ignores: [
      '.yarn/*',
      '.pnp*',
      '**/build/*',
      '.react-router/*',
      'worker-configuration.d.ts',
    ],
  },
]
