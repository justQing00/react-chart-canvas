import * as React from 'react';
import ToolTip from 'react-chart-tooltip';
import elementResizeEvent from 'element-resize-event';
import { getEventPosition, getPixelRatio } from './config';

const { unbind } = elementResizeEvent;

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
    elementResizeEvent(this.canvasBox, () => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(this.dispatchResize, 100);
    });
    const { Chart } = this.props;
    this.chart = new Chart(this.props);
    this.dispatchResize();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.update(nextProps, this.ctx);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMove, false);
    this.canvas.removeEventListener('click', this.onClick, false);
    unbind(this.canvasBox);
    if (this.timer) clearTimeout(this.timer);
    if (this.drewTimer) clearTimeout(this.drewTimer);
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

  dispatchResize = () => {
    const ratio = getPixelRatio(this.ctx);
    const $parentNode = this.canvasBox.parentNode;
    const clientWidth = $parentNode.clientWidth;
    const clientHeight = $parentNode.clientHeight;
    const ratioWidth = clientWidth * ratio;
    const ratioHeight = clientHeight * ratio;
    if (this.width && this.height) {
      const doneValue = [clientWidth, clientHeight, ratioWidth, ratioHeight];
      if (this.drewTimer) clearTimeout(this.drewTimer);

      const startDrew = () => {
        const currentValue = [this.width, this.height, this.canvas.width, this.canvas.height];
        if (!_.isEqual(doneValue, currentValue)) {
          const values = currentValue.map((val, ind) => {
            const dis = (doneValue[ind] - val) / 3;
            return val + (dis > 0 ? Math.ceil(dis) : Math.floor(dis));
          });
          const [w, h, rw, rh] = values;
          this.resize({ ratio, clientWidth: w, clientHeight: h, ratioWidth: rw, ratioHeight: rh });
          this.drewTimer = setTimeout(startDrew, 25);
        }
      };
      startDrew();
    } else {
      this.resize({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight });
    }
  }

  resize = ({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight }) => {
    const { onResize } = this.props;
    const { width, height } = this.state;
    this.canvas.width = ratioWidth;
    this.canvas.height = ratioHeight;
    // setState异步，用this存储上次的值
    this.width = clientWidth;
    this.height = clientHeight;
    if (onResize) onResize({ ratio, clientWidth, clientHeight, ratioWidth, ratioHeight });
    if (this.chart) this.chart.update(Object.assign({ ...this.props }, { width: ratioWidth, height: ratioHeight, ratio }), this.ctx);
    if (width !== clientWidth || height !== clientHeight) {
      this.setState({ width: clientWidth, height: clientHeight, info: null, eventPosition: null });
    }
  }

  render() {
    const { info, eventPosition, width, height } = this.state;
    const { tooltip, title, tooltipStyle } = this.props;
    return (
      <div
        ref={(canvasBox) => { this.canvasBox = canvasBox; }}
        style={{ position: 'relative', width: '100%', height: '100%' }}
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
      </div>
    );
  }
}
