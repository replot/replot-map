## replot-map
​
replot-map is designed to help you visualize your data in a map layout on the fly.  
​
### Basic Usage
To use replot-map basic functionally, you need to provide properly 
formatted data, and the keys to the country, area, value.
​
``` javascript
render() {
    let citizenship = [
        {"country": "US", "name": "Alabama", "abbreviation": "AL", "citizenship": 97.8},
        {"country": "US", "name": "Alaska", "abbreviation": "AK", "citizenship": 96.7},
        {"country": "US", "name": "Arizona", "abbreviation": "AZ", "citizenship": 91.8}
    ]
​
    return(
        <Map data={this.state.data}
            countryKey="country"
            areaKey="abbreviation"
            valueKey="citizenship"
            colorLinear={["#0f0f33", "#ffffff"]}
        />
    )
}
```
​
### Dimensions
​
#### Color
#### Displaying text
#### Tooltip
#### Initial Animation
​
​
​
