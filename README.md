<div align="center">

# easy-queryparams [![release version](https://img.shields.io/npm/v/easy-queryparams)](https://www.npmjs.com/package/easy-queryparams) 

[![weekly download count](https://img.shields.io/npm/dm/easy-queryparams)](https://npmcharts.com/compare/easy-queryparams?interval=30&minimal=true) ![primary language procentage](https://img.shields.io/github/languages/top/bartektelec/easy-queryparams) ![workflow build status](https://img.shields.io/github/workflow/status/bartektelec/easy-queryparams/Test%20on%20push) ![last commit badge](https://img.shields.io/github/last-commit/bartektelec/easy-queryparams)

</div>
This is a package that let's you easy convert an object to a querystring, or parse it the other way around. It's main difference from JS `URLSearchParams` is that it by default avoids params with nullish values.

The package exposes two methods: `stringify` and `parse`.

## Getting started
- Install this package
```bash
$npm install easy-queryparams
```
- Import the methods in your project
```ts
import * as qs from 'easy-querystring'
```

## Examples

### Stringify method

This method takes an object as a parameter and converts it to a string, omitting all nullish valued properties.

```ts
    import {stringify} from 'easy-queryparams';

    const filters = {
        minAge: 20,
        maxAge: 50,
        selected: [1,2,3,4],
        location: null
    }

    const queryString = stringify(filters);

    /*
    queryString = "minAge=20&maxAge=50&selected=1%2C2%2C3%2C4"
    */
```

### Parse method

This method takes a query string as a parameter and returns an object. All values that are separated with commas will be converted to an array, and all parsable numbers will return a number type.

```ts
    import {parse} from 'easy-queryparams';

    const queryString = "pickedNumbers=1%2C30%2Cabcd%2C50%2C200&location=New%20York";

    const filters = parse(queryString);

    /*
    filters = {
        pickedNumbers: [1, 30, 'abcd', 50, 200],
        location: 'New York'
    }
    */
```

## TypeScript Support

You can import the `.ts` files from `easy-queryparams/src`, however you will be forced to explicitly assert a type to your object when using the `parse` method, just like you would do with `JSON.parse`.

## Licence

[MIT](https://opensource.org/licenses/MIT)
