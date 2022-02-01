# easy-queryparams

This is a package that let's you easy convert an object to a querystring, or parse it the other way around. It's main difference from JS `URLSearchParams` is that it by default avoids params with nullish values.

The package exposes two methods: `stringify` and `parse`.

## Examples

### Stringify method

This method takes an object as a parameter and converts it to a string, omitting all nullish valued properties.

```ts
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
    const queryString = "pickedNumbers=1%2C30%2Cabcd%2C50%2C200&location=New%20York";

    const filters = parse(queryString);

    /*
    filters = {
        pickedNumbers: [1, 30,'abcd, 50, 200],
        location: 'New York'
    }
    */
```
