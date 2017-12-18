# replot-map: Map charts for react
Intelligent and customizable map chart components for react.

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-map
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015
modules, use as you would anything else.

```javascript
import {Map} from 'replot-map'
```

## API
replot-map is designed to create beautiful map charts right out of the box.
The only *required* inputs are properly formatted data and svg paths of your map.

### Basic Usage
In the simplest case, just supply data and svg paths (as Javascript arrays) and specify the
keys for IDs and weights of data and IDs and titles of paths:

``` javascript
render() {
    let populations = [
        {"code": "US-AL", "population": 4853875},
        {"code": "US-AK", "population": 737709},
        {"code": "US-AZ", "population": 6817565},
        ...
    ]
    
    let paths = [
    	{"ID":"US-AK", "name":"Alaska", "d":"M456.18,...,731.03z"},
        {"ID":"US-AL", "name":"Alabama", "d":"M955.38,...,481.61z"},
        {"ID":"US-AZ", "name":"Arizona", "d":"M533.89,...,320.29z"},
        ...
    ]
    
    return(
        <Map data={populations}
            IDKey="code"
            weightKey="population"
            paths={paths}
            pathIDKey="ID"
            pathTitleKey="name"
        />
    )
}
```

- `data` and `paths` are the only required props
- `IDKey` defaults to `"ID"`
- `weightKey` defaults to `"weight"`
- `pathIDKey` defaults to `"id"`
- `pathTitleKey` defaults to `"title"`

![ScreenshotDefaultUSA](img/default.png)

You can also import our complimentary svg map paths:

``` javascript
import {Map, USA} from 'replot-map'
```
``` javascript
render() {
    let populations = [
        {"code": "US-AL", "population": 4853875},
        {"code": "US-AK", "population": 737709},
        {"code": "US-AZ", "population": 6817565},
        ...
    ]
    
    return(
        <Map data={populations}
            IDKey="code"
            weightKey="population"
            paths={USA}
        />
    )
}
```

If you're using our complimentary map paths, do not specify `pathIDKey` or `pathTitleKey`.

Our complimentary map paths currently support 243 countries and regions. See [the list of all supported countries/regions](#supported-countries-and-regions).

### Dimensions
Dimensions may be specified by passing in `width` prop with a number, in the unit of pixels.

```javascript
render() {
  return(
    <Map data={populations} paths={USA} width={600} />
  )
}
```

- `width` defaults to `800`

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {
  return(
    <Map data={populations} paths={USA} width="60%" />
  )
}
```

 Default (800px)            | width={600}               | width="60%"              
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultWidth](img/width_default.png) | ![ScreenshotWidth600px](img/width_600px.png) | ![ScreenshotWidth60%](img/width_60percent.png)

Height dimension will be adjusted automatically to best match the width, fitting the entirity of map without skewing the original aspect ratio.

### Zoom
You may zoom into a specific area of map by passing in `zoomID` and `zoomScale` props. The Map will be centered on the area specified by `zoomID`, scaled up by `zoomScale`. Original dimensions of the Map will be preserved.

```javascript
render() {
  return(
    <Map data={populations} paths={USA} zoomID="US-TX" zoomScale={2} />
  )
}
```

- `zoomID` defaults to `null`
- `zoomScale` defaults to `1`

If `zoomScale` is passed in, but `zoomID` is not, the Map will be scaled up from its top left corner by `zoomScale`.

 Default                   |zoomID={null} zoomScale={2}|zoomID="US-TX" zoomScale={2}         
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefault](img/default.png) | ![ScreenshotZoomIDNullScale2](img/zoom_scale_2_ID_null.png) | ![ScreenshotZoomIDTexasScale2](img/zoom_scale_2_ID_US-TX.png)

### Color
Colors may be specified by passing in `colorRangeLow` and `colorRangeHigh` props. The Map is colored with the gradient in the range of `colorRangeLow` to `colorRangeHigh`, from the smallest to the largest weight. 

```javascript
render() {
  return(
    <Map data={populations} paths={USA} colorRangeLow="#ffffff" colorRangeHigh="#ff4c4c" />
  )
}
```

- `colorRangeLow` defaults to `"#ffffff"`
- `colorRangeHigh` defaults to `"#225588"`

 Default                   |colorRangeLow="#ffffff" colorRangeHigh="#ff4c4c"         
:-------------------------:|:-------------------------:
![ScreenshotDefault](img/default.png) | ![ScreenshotColorHighFF4C4CLowFFFFFF](img/color_high_FF4C4C_low_ffffff.png)

#### Scale
Users can control the scale of the Map coloring, linear or logarithmic.

- `scale` defaults to `"lin"` for linear scale, can be `"log"` for logarithmic scale:

```javascript
render() {
  return(
    <Map data={populations} paths={USA} scale="log" colorRangeLow="#ffffff" colorRangeHigh="#225588" />
  )
}
```

 Default (scale="lin")     | scale="log"     
:-------------------------:|:-------------------------:
![ScreenshotDefault](img/default.png) | ![ScreenshotScaleLog](img/scale_log.png)

### Tooltip
Tooltips can display more specific information about a data series.

```javascript
render() {
  return(
    <Map data={populations} paths={USA} tooltip={true} tooltipColor="light" />
  )
}
```

- `tooltip` defaults to `true`, `false` turns the tooltip off
- `tooltipColor` defaults to `light`, it can be set to `light` or `dark`
- `tooltipContents` defaults to data associated with the location (title, weight)

Default (tooltipColor="light")|tooltipColor="dark"|tooltip={false}   
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultTooltip](img/tooltip_light.png) | ![ScreenshotTooltipDark](img/tooltip_dark.png) | ![ScreenshotTooltipOff](img/tooltip_off.png)

#### User-provided Tooltip Function
Users can customize what is displayed inside the tooltip with a function. Expected arguments to the function are the title of the location and the data for the specific location hovered over. The function should return JSX.

```javascript
fillTooltip(title, data){
  return(
    <div>      
      <span>The name of this location is {title}</span>
      <span>The data for this location looks like {data.toString()}</span>
    </div>
  )
}

render() {
  return(
    <Map data={populations} paths={USA} tooltipContents={this.fillTooltip} />
  )
}
```

TODO: INSERT AN IMAGE HERE (default, new tooltip)

## Supported Countries and Regions

TODO: ADD A LIST OF ALL COUNTRIES/REGIONS
