import { appData, dataArray, stateController } from './state';
import './style.css';
import 'bootstrap';
import { selectAll } from 'd3';

// Modules, constants and interfaces
import { BlissData } from './interfaces';
import { configureSimulation } from './node-generator';

// Selectors
const supergroups = document.querySelectorAll('.carousel-item');

// Global variables
var currentIndex = 0;
var iteration = 0;
let isNodeUntouched = true;

export function cleanUp() {
  if (iteration >= 1) {
    selectAll('g').remove();
  }
  iteration++;
}

stateController.subscribe((data) => {
  isNodeUntouched = data.pristene;
  currentIndex = data.currentIndex;
});

// @ts-ignore
appData.subscribe((data: BlissData) => {
  cleanUp();
  configureSimulation(data);
});

// Change SuperGroup dynamically
// @ts-ignore
supergroups.forEach((element: HTMLElement) => {
  // @ts-ignore
  const idx = +element.dataset.supergroup;
  element.addEventListener('click', () => {
    if (idx !== currentIndex || !isNodeUntouched) {
      console.log(isNodeUntouched);
      cleanUp();
      // @ts-ignore
      appData.next(dataArray[idx]);
      currentIndex = idx;
      // @ts-ignore
      stateController.next({ pristene: true, currentIndex });
    }

    return;
  });
});
