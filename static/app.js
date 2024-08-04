let state = {
    holdings: null,
    reinforcements: null,
    currentPlayer: "Isaac"
}

async function initializeState() {
    // async/await because we want to have the state initialized before we render anything else like the places
    await fetch('/api/holdings')
        .then(response => response.json())
        .then(holdings => {
            state.holdings = holdings;
        })
        .catch(error => console.error('Error fetching data:', error));

    await fetch('/api/reinforcements')
        .then(response => response.json())
        .then(reinforcements => {
            state.reinforcements = reinforcements;
        })
        .catch(error => console.error('Error fetching data:', error));
}

function renderPlace(holding, placesElement) {
    const placeElement = document.createElement('div');

    placeElement.setAttribute('class', 'place');
    placeElement.setAttribute('place', holding.place);
    placeElement.setAttribute('player', holding.player);
    placeElement.setAttribute('army_count', holding.army_count);

    placeElement.textContent = holding.army_count;

    placesElement.appendChild(placeElement);
}

function renderPlaces() {
    const placesElement = document.getElementById('places');

    state.holdings.forEach(holding => {
        renderPlace(holding, placesElement);
    });
}

function checkPlaceOwned(place) {
    return state.holdings.filter(holding => holding.place === place)[0].player === state.currentPlayer;
}

function increaseArmyCount(place) {
    state.holdings.filter(holding => holding.place === place)[0].army_count++;
}

function decreaseArmyCount(place) {
    state.holdings.filter(holding => holding.place === place)[0].army_count--;
}

function renderArmyCountPlace(place) {
    // select place element
    const placeElement = document.querySelector(`[place="${place}"]`);

    // set army count as text content
    placeElement.textContent = state.holdings.filter(holding => holding.place === place)[0].army_count;
}

function handleSelectPlace(event) {
    const selectedPlace = event.target;
    const place = selectedPlace.getAttribute('place');

    const leftClick = event.button === 0;
    const rightClick = event.button === 2;

    if (leftClick|rightClick && !checkPlaceOwned(place)) {
        alert('You do not own this place!');
    }

    if (leftClick && checkPlaceOwned(place)) {
        increaseArmyCount(place);
        renderArmyCountPlace(place);
    }

    if (rightClick && checkPlaceOwned(place)) {
        decreaseArmyCount(place);
        renderArmyCountPlace(place);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeState().then(() => {
        // the DOM containing the places element has to load before you can attach any event listeners to it
        renderPlaces();

        document.getElementById('places').addEventListener('click', handleSelectPlace);
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
            handleSelectPlace(event);
        });
    });
});


