## replot-map
replot-map is designed to help you visualize your data in a map layout on the fly.  

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-map
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015
modules, use as you would anything else.

```javascript
import Map from 'replot-map'
```

## API
replot-map is designed to easily create heat maps.
The only *required* input is properly formatted data.​
​
### Basic Usage
To use replot-map basic functionally, just provide properly
formatted data, name of the region of interest, and key names for specific locations
and weights.
​
``` javascript
render() {
    let citizenship = [
        {"name": "Alabama", "code": "AL", "citizenship": 97.8},
        {"name": "Alaska", "code": "AK", "citizenship": 96.7},
        {"name": "Arizona", "code": "AZ", "citizenship": 91.8}
    ]
​
    return(
        <Map data={citizenship}
            region="US"
            IDKey="code"
            weightKey="citizenship"
        />
    )
}
```

- `data` is the only required prop
- `region` defaults to `"US"`
- `IDKey` defaults to `"ID"`
- `weightKey` defaults to `"weight"`
​
### Dimensions
Every different map has unique default dimensions to allow for best aspect ratio.
You may specify alternate dimensions which will scale the heat map appropriately,
via the `width` and `height` props.

If only one is specified, the other will adjust appropriately to maintain
aspect ration. If both are provided, the map may skew to fit the dimensions.
​
#### Color
Colors may be specified through n different mechanisms. If none of the mechanisms
are provided, replot-map defaults to a white to black color gradient.

#### Displaying text
#### Tooltip
#### Initial Animation
​
​
​
