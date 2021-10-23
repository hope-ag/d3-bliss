import { BlissData } from './interfaces';
import './style.css';
import { BehaviorSubject, tap } from 'rxjs';
import { selectAll } from 'd3';

import { configureSimulation } from './node-generator';
import jsonData from './assets/super-groups-formatted.json';

// Set up Sizes

const dataArray = jsonData.children;
//@ts-ignore
const appData: BehaviorSubject<BlissData> = new BehaviorSubject(
  dataArray[0]
).pipe(
  tap((data) => {
    console.log(data);
  })
);

let iteration = 0;

let dataSub$ = appData.subscribe((data: BlissData) => {
  iteration < 1 && selectAll('g').remove();
  ++iteration;
  configureSimulation(data);
});

// {
//   data: dataArray[2].data,
//   children: dataArray[2].children.slice(0, dataArray[2].children.length / 6),
// }
