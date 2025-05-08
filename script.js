'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const forms = document.querySelectorAll('.form');
const dialogSteps = document.querySelectorAll('.dialog__container');
const workoutChoiceForm = document.querySelector('.workout-choice-form');
const containerWorkouts = document.querySelector('.workouts');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('.dialog__close-btn');
const hamburgerButton = document.querySelector('.hamburger-btn');

function formatDate(date) {
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDate();

  return `${months[month + 1]} ${day}, ${year}`;
}

class Workout {
  constructor(id, location, duration, type, date) {
    this.id = id;
    this.location = location;
    this.duration = duration;
    this.type = type;
    this.date = date;
    this._setDescription();
  }
  _setDescription() {
    this.description = `${
      this.type[0].toUpperCase() + this.type.slice(1)
    } on ${formatDate(this.date)}`;
  }
}

class Running extends Workout {
  constructor(id, location, duration, date, distance, speed) {
    super(id, location, duration, 'running', date);
    this.distance = distance;
    this.speed = speed;
  }
}

class Cycling extends Workout {
  constructor(id, location, duration, date, distance, speed) {
    super(id, location, duration, 'cycling', date);
    this.distance = distance;
    this.speed = speed;
  }
}

class WeightLifting extends Workout {
  constructor(id, location, duration, date, totalExercise, intensity) {
    super(id, location, duration, 'weightlifting', date);
    this.totalExercise = totalExercise;
    this.intensity = intensity;
  }
}

class Yoga extends Workout {
  constructor(id, location, duration, date, totalExercise, intensity) {
    super(id, location, duration, 'yoga', date);
    this.totalExercise = totalExercise;
    this.intensity = intensity;
  }
}

class WorkoutList {
  constructor(list = []) {
    this.list = list;
  }
  load() {
    const listString = localStorage.getItem('list');
    if (listString === null) return;
    try {
      const parsedList = JSON.parse(listString);
      parsedList.forEach(workoutItem => {
        switch (workoutItem.type) {
          case 'running': {
            const runningItem = new Running(
              workoutItem.id,
              workoutItem.location,
              workoutItem.duration,
              new Date(workoutItem.date),
              workoutItem.distance,
              workoutItem.speed
            );
            this.add(runningItem);
            break;
          }
          case 'cycling': {
            const cyclingItem = new Cycling(
              workoutItem.id,
              workoutItem.location,
              workoutItem.duration,
              new Date(workoutItem.date),
              workoutItem.distance,
              workoutItem.speed
            );
            this.add(cyclingItem);
            break;
          }
          case 'weightlifting': {
            const weightliftingItem = new WeightLifting(
              workoutItem.id,
              workoutItem.location,
              workoutItem.duration,
              new Date(workoutItem.date),
              workoutItem.totalExercise,
              workoutItem.intensity
            );
            this.add(weightliftingItem);
            break;
          }
          case 'yoga': {
            const yogaItem = new Yoga(
              workoutItem.id,
              workoutItem.location,
              workoutItem.duration,
              new Date(workoutItem.date),
              workoutItem.totalExercise,
              workoutItem.intensity
            );
            this.add(yogaItem);
            break;
          }
        }
      });
    } catch (error) {
      console.error('Error parsing the list', error);
    }
  }
  save() {
    localStorage.setItem('list', JSON.stringify(this.list));
  }
  add(item) {
    this.list.push(item);
    this.save();
  }
  remove(id) {
    this.list = this.list.filter(item => item.id !== id);
    this.save();
  }

  render() {
    containerWorkouts.innerHTML = '';
    this.list.forEach(workout => {
      let html;
      switch (workout.type) {
        case 'cycling':
        case 'running':
          html = `
            <li class="workout workout--${workout.type}" data-id="${
            workout.id
          }">
              <button class="btn workout__delete-btn">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  class="lucide lucide-trash2-icon lucide-trash-2"
                >
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/>
                  <line x1="14" x2="14" y1="11" y2="17"/>
                </svg>
              </button>
              <h2 class="workout__title"><span class="workout__title-type">${
                workout.description
              }</h2>
              <div class="workout__details">
                <span class="workout__icon">${
                  workout.type === 'cycling' ? '🚴🏻‍♂️' : '🏃🏻‍♂️'
                }</span>
                <span class="workout__value">${workout.distance}</span>
                <span class="workout__unit">km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed}</span>
                <span class="workout__unit">km/min</span>
              </div>
            </li>`;
          break;
        case 'weightlifting':
        case 'yoga':
          html = `
            <li class="workout workout--${workout.type}" data-id="${
            workout.id
          }">
              <button class="btn workout__delete-btn">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  class="lucide lucide-trash2-icon lucide-trash-2"
                >
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/>
                  <line x1="14" x2="14" y1="11" y2="17"/>
                </svg>
              </button>
              <h2 class="workout__title"><span class="workout__title-type">${
                workout.description
              }</h2>
              <div class="workout__details">
                <span class="workout__icon">${
                  workout.type === 'weightlifting' ? '🏋🏻‍♂️' : '🧘🏻‍♂️'
                }</span>
                <span class="workout__value">${
                  workout.intensity[0].toUpperCase() + workout.intensity.slice(1)
                }</span>
                <span class="workout__unit">intensity</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">⏱</span>
                <span class="workout__value">${workout.duration}</span>
                <span class="workout__unit">min</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">✅</span>
                <span class="workout__value">${workout.totalExercise}</span>
                <span class="workout__unit">exercises</span>
              </div>
            </li>`;
          break;
      }
      containerWorkouts.insertAdjacentHTML('beforeend', html);
    });
  }
}

class App {
  #map;
  #mapZoomLevel = 13;
  #markerLayer;
  #mapEvent;
  #selectedWorkout;
  workout = new WorkoutList();

  constructor() {
    this._init();
    this.workout.load();
    this.workout.render();
  }

  _init() {
    this._getPosition();
    workoutChoiceForm.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      this.#selectedWorkout = formData.get('workout');
      this._showModalForm();
    });
    closeButton.addEventListener('click', () => {
      this._closeModal();
    });
    forms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newId = this.workout.list.at(-1)
          ? this.workout.list.at(-1).id + 1
          : 1;
        const location = this.#mapEvent.latlng;
        switch (this.#selectedWorkout) {
          case 'cycling': {
            const duration = formData.get('duration');
            const distance = formData.get('distance');
            const cyclingItem = new Cycling(
              newId,
              location,
              duration,
              new Date(),
              distance,
              (duration / distance).toFixed(2)
            );
            this.addWorkout(cyclingItem);
            break;
          }
          case 'running': {
            const duration = formData.get('duration');
            const distance = formData.get('distance');
            const runningItem = new Running(
              newId,
              location,
              duration,
              new Date(),
              distance,
              (duration / distance).toFixed(2)
            );
            this.addWorkout(runningItem);
            break;
          }
          case 'weightlifting': {
            const duration = formData.get('duration');
            const totalExercise = formData.get('exercise');
            const intensity = formData.get('intensity');
            const weightliftingItem = new WeightLifting(
              newId,
              location,
              duration,
              new Date(),
              totalExercise,
              intensity
            );
            this.addWorkout(weightliftingItem);
            break;
          }
          case 'yoga': {
            const duration = formData.get('duration');
            const totalExercise = formData.get('exercise');
            const intensity = formData.get('intensity');
            const yogaItem = new Yoga(
              newId,
              location,
              duration,
              new Date(),
              totalExercise,
              intensity
            );
            this.addWorkout(yogaItem);
            break;
          }
        }
        this._closeModal();
      });
    });
    containerWorkouts.addEventListener('click', e => {
      const deleteButton = e.target.closest('.workout__delete-btn');
      const workoutEle = e.target.closest('.workout');
      if (!deleteButton && !workoutEle) return;

      const workoutId = Number(workoutEle.dataset.id);
      if (deleteButton) {
        this.removeWorkout(workoutId);
        return;
      }
      const workout = this.workout.list.find(
        workout => workout.id === workoutId
      );

      if (!workout) return;
      this._moveToPopup([workout.location.lat, workout.location.lng]);
    });
    hamburgerButton.addEventListener('click', () => {
      document.body.classList.toggle('toggle-sidebar');
      setTimeout(() => this.#map.invalidateSize(), 300);
    });
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this._loadMap([latitude, longitude]);
        },
        function () {
          alert("Couldn't get your position");
        }
      );
    }
  }

  _showModalForm() {
    // showing correct form
    if (
      this.#selectedWorkout === 'cycling' ||
      this.#selectedWorkout === 'running'
    ) {
      forms.forEach(form => {
        if (Number(form.dataset.type) === 1) {
          form.classList.remove('hidden');
        } else {
          form.classList.add('hidden');
        }
      });
    } else if (
      this.#selectedWorkout === 'weightlifting' ||
      this.#selectedWorkout === 'yoga'
    ) {
      forms.forEach(form => {
        if (Number(form.dataset.type) === 2) {
          form.classList.remove('hidden');
        } else {
          form.classList.add('hidden');
        }
      });
    }

    // moving to step 2 of form
    dialogSteps.forEach(step => {
      if (Number(step.dataset.step) === 2) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    });
  }

  _loadMap(coordinates) {
    this.#map = L.map('map').setView(coordinates, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#markerLayer = L.layerGroup().addTo(this.#map);
    this.renderMarkers();

    this.#map.on('click', mapE => {
      this.#mapEvent = mapE;
      this._showModal();
    });
  }

  _moveToPopup(coordinates) {
    this.#map.setView(coordinates, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _showModal() {
    dialogSteps.forEach(step => {
      if (Number(step.dataset.step) === 1) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    });
    dialog.showModal();
  }

  _closeModal() {
    dialog.close();
    this.#selectedWorkout = null;
    workoutChoiceForm.reset();
    forms.forEach(form => form.reset());
  }

  removeWorkout(id) {
    this.workout.remove(id);
    this.workout.render();
    this.renderMarkers();
  }
  addWorkout(item) {
    this.workout.add(item);
    this.workout.render();
    this.renderMarkers();
  }

  renderMarkers() {
    this.#markerLayer.clearLayers();
    this.workout.list.forEach(workout => {
      L.marker([workout.location.lat, workout.location.lng])
        .addTo(this.#markerLayer)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`,
          })
        )
        .setPopupContent(workout.description)
        .openPopup();
    });
  }

  // newMarker(location, type, item) {
  //   const { lat, lng } = location;

  //   L.marker([lat, lng])
  //     .addTo(this.#map)
  //     .bindPopup(
  //       L.popup({
  //         maxWidth: 250,
  //         minWidth: 100,
  //         autoClose: false,
  //         closeOnClick: false,
  //         className: 'running-popup',
  //       })
  //     )
  //     .setPopupContent('Workout')
  //     .openPopup();
  // }
}

const app = new App();
