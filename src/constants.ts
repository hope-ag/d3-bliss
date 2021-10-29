import { select } from 'd3-selection';

export const margins = {
  left: 12,
  right: 12,
  top: 12,
  bottom: 12,
};
export const height = window.innerHeight;
export const width = window.innerWidth;
//
//
export const svg = select('#canvas')
  // .attr('height', height).attr('width', width);
  //@ts-ignore
  .attr('viewBox', [-width / 2, -height / 2, width, height]);

export const colors = {
  blue: '#0a66c2aa',
  LightBlue: '#4edde7',
  red: '#e55c7f',
};
