# react-chart-canvas
react chart canvas base structure

### How to use
```javascript
import ReactChartCanvas from 'react-chart-canvas';
import Chart* from '**'

<ReactChartCanvas Chart={Chart** }/>

```
### RadialBarChart Props
```javascript
{
  onClick: (e, info), // default
  onHover: (e, info), // default
  onResize: ({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight }, e), // default
  title: '',
  isGradient: false,
  labelStyle: '#333',
  dataStyle: '#fff',
  tooltip: {  // default
    show: true,
    formatter: (info) => {
      return `占比: ${info.percent*100}%`;
    }
  },
  tooltipStyle: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    ...
  },
}
```

### Base Package

[react-chart-tooltip](https://github.com/justQing00/react-chart-tooltip)

[react-chart-adapt](https://github.com/justQing00/react-chart-adapt)


### How to Write chart

example: [react-radial-bar-chart](https://github.com/justQing00/react-radial-bar-chart)

```javascript
  class Chart* {

    constructor(props) {
      this.setValue(props);
    }

    setValue = (props = {}) => {
      ...
    }

    update = (props, ctx) => {
      ...
    }

    draw = (ctx) => {
      ...
    }
    ...
  }
```
