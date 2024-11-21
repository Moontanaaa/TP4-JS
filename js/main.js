import { getUserLocation } from './geolocation.js';
import { getAddressFromCoordinates, getCinemasNearby } from './addressAPI.js';

document.addEventListener('DOMContentLoaded', () => {
    const geolocateBtn = document.getElementById('geolocate-btn');
    const addressInput = document.getElementById('address');
    const distanceInput = document.getElementById('distance');
    const distanceValue = document.getElementById('distance-value');
    const searchForm = document.getElementById('search-form');
    const cinemaList = document.getElementById('cinema-list');

    distanceInput.addEventListener('input', () => {
        distanceValue.textContent = `${distanceInput.value} km`;
    });

    geolocateBtn.addEventListener('click', async () => {
        try {
            const { latitude, longitude } = await getUserLocation();
            const address = await getAddressFromCoordinates(latitude, longitude);
            addressInput.value = address;
        } catch (error) {
            alert("Erreur lors de la géolocalisation : " + error.message);
        }
    });

    searchForm.addEventListener('submit', async event => {
        event.preventDefault();
        const address = addressInput.value;
        const distance = distanceInput.value;

        if (!address) {
            alert("Veuillez entrer une adresse ou vous géolocaliser.");
            return;
        }

        try {
            // tour eiffel
            const latitude = 48.8588443;
            const longitude = 2.2943506;

            const cinemas = await getCinemasNearby(latitude, longitude, distance);
            cinemaList.innerHTML = cinemas.length
                ? cinemas.map(cinema => `<li>${cinema.name} - ${cinema.address}</li>`).join('')
                : '<li>Aucun cinéma trouvé.</li>';
        } catch (error) {
            alert("Erreur lors de la recherche des cinémas.");
        }
    });
});
