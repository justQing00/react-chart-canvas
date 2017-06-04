import * as React from 'react';
import ToolTip from 'react-chart-tooltip';
import { RadialChartAdapt, getEventPosition } from 'react-chart-adapt';

export default class RadialBarChart extends React.Component {

  state = {
    info: null,
    eventPosition: null,
    width: null,
    height: null,
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', this.onMove);
    this.canvas.addEventListener('click', this.onClick);
    const { Chart } = this.props;
    this.chart = new Chart(this.props);
    this.adapt.resize();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.update(nextProps, this.ctx);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMove, false);
    this.canvas.removeEventListener('click', this.onClick, false);
  }

  onClick = (e) => {
    const { onClick } = this.props;
    const info = this.chart.update({ event: 'onClick', eventPosition: getEventPosition(e) }, this.ctx);
    if (onClick && info) onClick(e, info);
  }

  onMove = (e) => {
    const { onHover } = this.props;
    const eventPosition = getEventPosition(e);
    const info = this.chart.update({ event: 'onMove', eventPosition }, this.ctx);
    if (onHover && info) onHover(e, info);
    this.setState({ info, eventPosition });
  }

  resize = ({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight }, e) => {
    const { onResize } = this.props;
    const { width, height } = this.state;
    this.canvas.width = ratioWidth;
    this.canvas.height = ratioHeight;
    if (onResize) onResize({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight }, e);
    if (this.chart) this.chart.update(Object.assign({ ...this.props }, { width: ratioWidth, height: ratioHeight, ratio }), this.ctx);
    if (width !== clientWidth || height !== clientHeight) {
      this.setState({ width: clientWidth, height: clientHeight, info: null, eventPosition: null });
    }
  }

  render() {
    const { info, eventPosition, width, height } = this.state;
    const { tooltip, title, tooltipStyle } = this.props;
    return (
      <RadialChartAdapt
        ref={(adapt) => { this.adapt = adapt; }}
        onResize={this.resize}
        ctx={this.ctx}
      >
        <ToolTip
          width={width}
          height={height}
          tooltip={tooltip}
          title={title}
          info={info}
          tooltipStyle={tooltipStyle}
          {...eventPosition}
        />
        <canvas style={{ position: 'absolute', width, height }} ref={(canvas) => { this.canvas = canvas; }}/>
      </RadialChartAdapt>
    );
  }
}
