import {
  forceSimulation,
  forceLink,
  hierarchy,
  drag,
  forceManyBody,
  forceY,
  forceX,
} from 'd3';

import { svg } from './constants';
//@ts-ignore
export function configureSimulation(data: BlissData) {
  const root = hierarchy(data);
  const links = root.links();
  const nodes = root.descendants();
  console.log(links, nodes);
  var i = 100000;
  //@ts-ignore
  const simulation = forceSimulation(nodes)
    .force(
      'link',
      //@ts-ignore
      forceLink(links)
        //@ts-ignore
        .id((d) => d.data.id || ++i)
        .distance(50)
        .strength(1)
    )
    .force('charge', forceManyBody().strength(-80))
    // .force('collision', forceCollide(8).strength(1))
    // .force('center', forceCenter(width / 2, height / 2));
    .force('x', forceX())
    .force('y', forceY());

  // Create Links
  const link = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(links)
    .join('line');

  // Create Nodes
  const node = svg
    .append('g')
    .selectAll('circle')
    .data(nodes)
    .join('circle')
    .attr('class', (d) =>
      !d.parent ? 'main-node' : d.children ? 'parents' : 'children'
    )
    .attr('r', (d) => (d.children ? 15 : 10))
    .on('click', (e, d) => console.log(d))
    .call(
      //@ts-ignore
      drag().on('start', dragstarted).on('drag', dragged).on('end', dragended)
    );

  node.append('title').text((d) => d.data.name || d.data.data.name);

  simulation.on('tick', () => {
    link
      //@ts-ignore
      .attr('x1', (d) => d.source.x)
      //@ts-ignore
      .attr('y1', (d) => d.source.y)
      //@ts-ignore
      .attr('x2', (d) => d.target.x)
      //@ts-ignore
      .attr('y2', (d) => d.target.y);
    //@ts-ignore
    node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
  });

  // Drag Events
  //@ts-ignore
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  //@ts-ignore
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  //@ts-ignore
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}
