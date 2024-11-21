const BASE_URL = "https://api-adresse.data.gouv.fr/reverse/";

export async function getAddressFromCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`${BASE_URL}?lon=${longitude}&lat=${latitude}`);
        if (!response.ok) throw new Error("Erreur lors de la récupération de l'adresse.");
        const data = await response.json();
        return data.features[0]?.properties.label || "Adresse introuvable";
    } catch (error) {
        console.error(error);
        return "Adresse introuvable";
    }
}

export async function getCinemasNearby(latitude, longitude, distance) {
    const CINEMA_API_URL = "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records";
    const query = `within_distance(geolocalisation, geom'POINT(${longitude} ${latitude})', ${distance}km)`;
    const url = `${CINEMA_API_URL}?where=${encodeURIComponent(query)}&limit=20`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erreur lors de la récupération des cinémas.");
        const data = await response.json();
        return data.records.map(record => ({
            name: record.record.fields.nom,
            address: record.record.fields.adresse
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}
