import {
  DragHandler
} from './dragHandler.js';

const sliderKnob = document.querySelector('#time-slider');
const sliderBase = document.querySelector('#slider-base');
const sliderKnobHandler = new DragHandler(sliderKnob, sliderBase, {
  handleX: true,
  handleY: false
});

// Elements
const venus = document.querySelector('#venus');
const venusOrbit = document.querySelector('#venus-orbit');
const distanceTraveledEl = document.querySelector('#distance-traveled');
const earthDaysEl = document.querySelector('#earth-days');
const solarDaysEl = document.querySelector('#solar-days');
const siderealDaysEl = document.querySelector('#sidereal-days');

// Venus Info
const orbitCircumMiles = 421000000;
const venusOrbitDays = 217;
const venusRotationDays = 243;
const venusSolarDay = 116;
const sliderDegrees = 360;


function getSliderPercent() {
  const knobWidth = sliderKnob.clientWidth;
  const baseWidth = sliderBase.clientWidth;
  const knobMax = baseWidth - knobWidth;
  const knobLeft = sliderKnob.style.left;
  const knobPosition = parseInt(knobLeft.slice(0, knobLeft.length - 2));
  const percent = (knobPosition / knobMax);

  console.log(`${knobPosition} / ${knobMax}`)
  return percent.toFixed(2);
}

function getDegreesFromPercent(percent) {
  return sliderDegrees * percent;
}

function updateSolarChart(orbitDegrees) {

  let distanceTraveled = ((orbitDegrees / sliderDegrees * orbitCircumMiles) * (sliderDegrees / 360)).toFixed(0);
  distanceTraveledEl.innerText = distanceTraveled + " miles traveled";
  
  let earthDaysPassed = ((orbitDegrees / sliderDegrees * (venusOrbitDays * sliderDegrees / 360))).toFixed(0);
  earthDaysEl.innerText = earthDaysPassed + " Earth days passed";

  let siderealDaysPassed = (earthDaysPassed / venusRotationDays).toFixed(1);
  siderealDaysEl.innerText = siderealDaysPassed + " sidereal days passed";

  let solarDaysPassed = (earthDaysPassed / venusSolarDay).toFixed(1);
  solarDaysEl.innerText = solarDaysPassed + " solar days passed";

  let venusRotationDeg = (earthDaysPassed / venusRotationDays) * 360; 
  venus.style.transform = `rotateZ(${orbitDegrees + venusRotationDeg}deg)`;
  venusOrbit.style.transform = `rotateZ(-${orbitDegrees}deg)`;


}

window.addEventListener('mousemove', (e) => {
  mousemoveEvent();
});
window.addEventListener('touchmove', (e) => {
  // e.preventDefault();
  mousemoveEvent();
}, {passive: false});

function mousemoveEvent() {
  if (sliderKnobHandler.isDragEl) {
    let percent = getSliderPercent();
    let degrees = getDegreesFromPercent(percent);
    updateSolarChart(degrees);
  }
}
