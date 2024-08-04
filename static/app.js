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
            // add a field deployment to each holding
            // value is 0 now since we haven't deployed any armies yet
            state.holdings.forEach(holding => holding.deployments = 0);
        })
        .catch(error => console.error('Error fetching data:', error));

    await fetch('/api/reinforcements')
        .then(response => response.json())
        .then(reinforcements => {
            state.reinforcements = reinforcements;
        })
        .catch(error => console.error('Error fetching data:', error));
}

/* state manipulation functions */

function increaseArmyCount(place) {
    state.holdings.filter(holding => holding.place === place)[0].army_count++;
}

function decreaseArmyCount(place) {
    state.holdings.filter(holding => holding.place === place)[0].army_count--;
}

function increaseReinforcements(player) {
    state.reinforcements[player]++;
}

function decreaseReinforcements(player) {
    state.reinforcements[player]--;
}

function increaseDeployments(place) {
    state.holdings.filter(holding => holding.place === place)[0].deployments++;
}

function decreaseDeployments(place) {
    state.holdings.filter(holding => holding.place === place)[0].deployments--;
}

/*
deployments are linked to both a place and a player
but since only 1 player can be owner of a place at a given time, we don't have to keep track of it here
*/

function increaseDeployments(place) {
    state.holdings.filter(holding => holding.place === place)[0].deployments++;
}

function decreaseDeployments(place) {
    state.holdings.filter(holding => holding.place === place)[0].deployments--;
}

/* checking functions */

function checkDeploymentsLeft() {
    return state.reinforcements[state.currentPlayer] > 0;
}

function checkPlaceOwned(place) {
    return state.holdings.filter(holding => holding.place === place)[0].player === state.currentPlayer;
}

function checkAnyDeploymentsPlace(place) {
    return state.holdings.filter(holding => holding.place === place)[0].deployments > 0;
}

/* rendering functions */

function renderArmyCountPlace(place) {
    // select place element
    const placeElement = document.querySelector(`[place="${place}"]`);

    // set army count as text content
    placeElement.textContent = state.holdings.filter(holding => holding.place === place)[0].army_count;
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

/* functions to handle actions */

function handleSelectPlace(event) {
    const place = event.target.getAttribute('place');

    const leftClick = event.button === 0;
    const rightClick = event.button === 2;

    if (leftClick|rightClick && !checkPlaceOwned(place)) {
        alert('You do not own this place.');
        return;
    }

    if (leftClick && checkPlaceOwned(place) && !checkDeploymentsLeft()) {
        alert('You have no more reinforcements left.');
        return; // without return there will still be 1 army added after the stock of reinforcements is depleted
    }

    if (rightClick && checkPlaceOwned(place) && !checkAnyDeploymentsPlace(place)) {
        alert('You did not deploy armies to this place before so can you cannot remove any armies from it either.');
        return;
    }

    if (leftClick && checkPlaceOwned(place)) {
        increaseArmyCount(place);
        increaseDeployments(place);
        decreaseReinforcements(state.currentPlayer);
        
        renderArmyCountPlace(place);
    }

    if (rightClick && checkPlaceOwned(place) && checkAnyDeploymentsPlace(place)) {
        decreaseArmyCount(place);
        decreaseDeployments(place);
        increaseReinforcements(state.currentPlayer);

        renderArmyCountPlace(place);
    }
}

/* setup game and adding event listeners */

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


