/*
add places on load:
- fetch data from /api/holdings
- create an element for each place filled in with holding data
*/

function addPlaces() {
    fetch('/api/holdings')
        .then(response => response.json())
        .then(holdings => {
            const placesElement = document.getElementById('places');
            holdings.forEach(holding => {
                const placeElement = document.createElement('div');
                placeElement.setAttribute('class', 'place');
                placeElement.setAttribute('place', holding.place);
                placeElement.setAttribute('player', holding.player);
                placeElement.setAttribute('army_count', holding.army_count);

                placeElement.textContent = holding.army_count;

                placesElement.appendChild(placeElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

/*
if you click on a place:
- the place is selected if the player owns it
- an alert is shown if the player does not own the place
- if you click on a place that is already selected, it's unselected
*/
function selectPlace(event) {
    // get data needed to make decision what to select or unselect
    const selectedPlace = event.target;
    const player = localStorage.getItem('player');
    const placePlayer = selectedPlace.getAttribute('player');

    // do you own the place selected?
    // if not, an alert is shown
    if (player != placePlayer) {
        alert('You do not own this place!');
    }

    // if you own the place
    // but it's already selected, unselect it
    if (player === placePlayer && selectedPlace.classList.contains('selected')) {
        selectedPlace.classList.remove('selected');
        return
    }

    // if you do own the place
    // select the place if it's not already selected
    if (player === placePlayer && !selectedPlace.classList.contains('selected')) {
        selectedPlace.classList.add('selected');
    }
}

// assign test player to localStorage
localStorage.setItem('player', 'Isaac');

document.addEventListener('DOMContentLoaded', () => {
    addPlaces();
    // the DOM has to load with the places element before you can any event listeners to it
    document.getElementById('places').addEventListener('click', selectPlace);
});

