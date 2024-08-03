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
if you click on a place the name of place is displayed in the console
*/
function selectPlace(event) {
    const selectedPlace = event.target;
    console.log(selectedPlace.getAttribute('place'));
}

// assign test player to localStorage
localStorage.setItem('player', 'Isaac');

document.addEventListener('DOMContentLoaded', () => {
    addPlaces();
    // the DOM has to load with the places element before you can any event listeners to it
    document.getElementById('places').addEventListener('click', selectPlace);
});

