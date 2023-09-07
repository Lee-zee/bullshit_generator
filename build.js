import {build} from 'esbuild'

const buildOptions = {
    entryPoints: ['./broswer/index.js'],
    outfile: './dist/index.js',
    bundle: true,
    globalName: 'bullshitGenerator',
    minify: true
}

build(buildOptions)
