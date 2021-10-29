import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import jsonData from './assets/super-groups-formatted.json';
// data
export const dataArray = jsonData.children;
let currentIndex = 0;

//
// Singletons
export const appData = new BehaviorSubject(dataArray[currentIndex]).pipe(
  shareReplay()
);

export const stateController = new BehaviorSubject({
  pristene: true,
  currentIndex: 0,
}).pipe(
  tap((data) => console.log(data)),
  shareReplay()
);
