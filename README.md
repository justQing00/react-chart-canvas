# react-chart-canvas
react chart canvas base structure

### How to use
```javascript
import ReactChartCanvas from 'react-chart-canvas';
import Chart from '**'

<ReactChartCanvas Chart={Chart}/>

```
### RadialBarChart Props
```javascript
{
  onClick: (e, ringInfo), // default
  onHover: (e, ringInfo), // default
  onHover: ({}), // default
  title: '',
  isGradient: false,
  labelStyle: '#333',
  dataStyle: '#fff',
  tooltip: {  // default
    show: true,
    formatter: (ringInfo) => {
      return `占比: ${ringInfo.percent*100}%`;
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
