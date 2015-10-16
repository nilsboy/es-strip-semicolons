# es-strip-semicolons [![Build Status](https://travis-ci.org/nilsboy/es-strip-semicolons.svg?branch=master)](https://travis-ci.org/nilsboy/es-strip-semicolons)

> Strip unnecessary semicolons from Ecmascript code.

## CLI

```sh
Usage,
  $ es-strip-semicolons <input file> > <output file>,
  $ cat <input file> | es-strip-semicolons > <output file>,
,
Examples,
  $ es-strip-semicolons src/app.js > dist/app.js,
  $ cat src/app.js | es-strip-semicolons > dist/app.js
```

## esformatter

```json
{
   "plugins" : [
   ],
   "pipe" : {
      "after" : [
         "es-strip-semicolons"
      ]
   }
}

```

## License

ISC © [Nils Boysen]
