import myConfig from '@a01sa01to/eslint-config'

export default [...myConfig, { ignores: ['.yarn/*', '.pnp*', '**/build/*'] }]
