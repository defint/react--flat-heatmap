import React from 'react';
import DatGui, { DatColor, DatNumber, DatBoolean } from 'react-dat-gui';
import '../node_modules/react-dat-gui/build/react-dat-gui.css';

class Heatmap extends React.Component {
  state = {
    heatmapHeight: 35,
    heatmapWidth: 350,
    pointerPercent: 0.33,
    hasArrow: true,
    pointerLineWidth: 0.5,
    pointerWidth: 10,
    pointerHeight: 5,
    colorStart: 'lime',
    colorMiddle: 'orange',
    colorEnd: 'red',
    colorPointer: 'black',
  };

  update = data => this.setState(old => ({ ...old, ...data }));

  render() {
    const {
      heatmapHeight,
      heatmapWidth,
      pointerPercent,
      pointerLineWidth,
      pointerWidth,
      pointerHeight,
      colorStart,
      colorMiddle,
      colorEnd,
      colorPointer,
      hasArrow,
    } = this.state;

    const pointerXBase = pointerWidth / 2 + pointerPercent * heatmapWidth;

    const polygonArrow = hasArrow
      ? `
      ${pointerXBase - pointerWidth / 2},${heatmapHeight + pointerHeight} 
      ${pointerXBase + pointerWidth / 2},${heatmapHeight + pointerHeight} `
      : '';

    const polygon = `
      ${polygonArrow}
      ${pointerXBase + pointerLineWidth},${heatmapHeight} 
      ${pointerXBase + pointerLineWidth},0 
      ${pointerXBase - pointerLineWidth},0 
      ${pointerXBase - pointerLineWidth},${heatmapHeight}
    `;

    return (
      <React.Fragment>
        <svg
          width={heatmapWidth + pointerWidth}
          height={heatmapHeight + pointerHeight}
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="5%" stopColor={colorStart} />
              <stop offset="50%" stopColor={colorMiddle} />
              <stop offset="95%" stopColor={colorEnd} />
            </linearGradient>
          </defs>

          <rect
            fill="url(#gradient)"
            x={pointerWidth / 2}
            width={heatmapWidth}
            height={heatmapHeight}
          />
          <polygon points={polygon} style={{ fill: colorPointer }} />
        </svg>
        <DatGui data={this.state} onUpdate={this.update}>
          <DatNumber
            path="heatmapHeight"
            label="Heatmap height"
            min={5}
            max={50}
            step={1}
          />
          <DatNumber
            path="heatmapWidth"
            label="Heatmap width"
            min={50}
            max={1600}
            step={1}
          />
          <DatNumber
            path="pointerPercent"
            label="Percent"
            min={0}
            max={1}
            step={0.01}
          />
          <DatBoolean path="hasArrow" label="Arrow show" />
          <DatNumber
            path="pointerLineWidth"
            label="Line width"
            min={0.01}
            max={10}
            step={0.01}
          />
          <DatNumber
            path="pointerHeight"
            label="Pointer height"
            min={1}
            max={50}
            step={1}
          />
          <DatNumber
            path="pointerWidth"
            label="Pointer width"
            min={1}
            max={50}
            step={1}
          />
          <DatColor path="colorStart" label="Color start" />
          <DatColor path="colorMiddle" label="Color middle" />
          <DatColor path="colorEnd" label="Color end" />
          <DatColor path="colorPointer" label="Color pointer" />
        </DatGui>
      </React.Fragment>
    );
  }
}

export default Heatmap;
