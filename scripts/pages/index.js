    // fonction permettant de récupérer les données dans data/photographers.json
    async function getPhotographers() {
        const res = await fetch('data/photographers.json');
            const body = await res.json();
            return body;
    }
    // fonction permettant d'afficher les differentes fonction de la factories dans la balise qui a pour class photographer_section
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    // fonction init qu'on appelle juste en dessous pour afficher le code de la page
    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }

    init();