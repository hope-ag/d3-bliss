import './style.css';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { selectAll } from 'd3';

import jsonData from './assets/super-groups-formatted.json';
// Modules, constants and interfaces
import { BlissData } from './interfaces';
import { configureSimulation } from './node-generator';

// Selectors
const supergroups = document.querySelectorAll('.carousel-item');

// Global variables
var currentIndex = 0;
var iteration = 0;
// data
const dataArray = jsonData.children;
//@ts-ignore
const appData: BehaviorSubject<BlissData> = new BehaviorSubject(
  dataArray[currentIndex]
).pipe(
  shareReplay(),
  tap((data) => {})
);

function cleanUp() {
  if (iteration >= 1) {
    selectAll('g').remove();
  }
  iteration++;
}

let dataSub$ = appData.subscribe((data: BlissData) => {
  cleanUp();
  configureSimulation(data);
});

// Change SuperGroup dynamically
// @ts-ignore
supergroups.forEach((element: HTMLElement) => {
  // @ts-ignore
  const idx = +element.dataset.supergroup;
  element.addEventListener('click', () => {
    if (idx !== currentIndex) {
      cleanUp();
      // @ts-ignore
      appData.next(dataArray[idx]);
      currentIndex = idx;
    }
    console.log(idx);

    return;
  });
});
