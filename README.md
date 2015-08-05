# standard-tap

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]

[npm-image]: https://img.shields.io/npm/v/standard-tap.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/standard-tap
[travis-image]: https://img.shields.io/travis/flet/standard-tap.svg?style=flat-square
[travis-url]: https://travis-ci.org/flet/standard-tap

Format JavaScript Standard Style as TAP output.

## Install

```
npm install -g standard-tap
```

## Usage

Pipe "compact" text into `standard-tap` to get back TAP formatted results:
```bash
standard | standard-tap

standard --verbose | standard-tap
```

This works with any [standard-engine](https://github.com/flet/standard-engine)-based style command!
```bash
semistandard --verbose | standard-tap
doublestandard --verbose | standard-tap
```

Or, just run `standard-tap` directly and it will use `standard` and give you TAP output:
```bash
standard-tap
```

All [standard](https://standardjs.com) command line flags are supported when using it this way:
```bash
standard-tap --format --verbose test1.js test2.js
```

## Inspired by
- https://github.com/feross/snazzy
- https://github.com/sindresorhus/eslint-tap

## Contributing

Contributions welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

[ISC](LICENSE.md)
