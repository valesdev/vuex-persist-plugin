const pkg = require('./package.json')
const fs = require('fs')
const rollup = require('rollup')
const terser = require('terser')
const buble = require('rollup-plugin-buble')

const banner =
  `/*!\n` +
  ` * ${pkg.name} v${pkg.version}\n` +
  ` * ${pkg.homepage}\n` +
  ` */`

rollup.rollup({
  input: 'src/index.js',
  external: [
    'vuex',
    'lodash.clonedeep'
  ],
  plugins: [
    buble()
  ]
})
  .then(bundle => {
    return bundle.generate({
      format: 'umd',
      name: 'vuexPersistPlugin',
      banner,
      sourcemap: true
    })
  })
  .then(({ output: [{ code }] }) => {
    const minified = banner + '\n' + terser.minify(code).code
    fs.writeFile(`dist/${pkg.name}.js`, code, err => { if (err) throw err })
    fs.writeFile(`dist/${pkg.name}.min.js`, minified, err => { if (err) throw err })
  })
