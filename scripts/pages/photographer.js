    //Mettre le code JavaScript lié à la page photographer.html


    async function getInfoPhotographers() {
        const res = await fetch('data/photographers.json')
        const data = await res.json()

        let params = new URLSearchParams(location.search)
        let id_photographer = parseInt(params.get("id"), 10)

        console.log(id_photographer)
        let photographer_find = data.photographers.find( val => val.id === id_photographer)

        /*let photographer_find = data.photographers.find(
            function (photographer) {
                console.log(id_photographer, photographer.id, id_photographer === photographer.id)
                if(id_photographer === photographer.id){
                    return true
                } else {
                    return false
                }
            }
        )*/
        console.log(photographer_find)
        
        let filter_id = data.media.filter( obj => obj.photographerId === id_photographer)
        console.log(filter_id)
        return {
            infoPhotographer : photographer_find,
            galleryPhotographers : filter_id,
        }
    }

    async function displayData(infoPhotographer, galleryPhotographers) {
        const mainContainer = document.querySelector(".photograph-header");

        const infoPhotographerModel = photographerFactory(infoPhotographer);
        const infoUserDOM = infoPhotographerModel.getInfoUserDOM();
        const pPUserDOM = infoPhotographerModel.getProfilePictureUserDOM();
        mainContainer.prepend(infoUserDOM);
        mainContainer.appendChild(pPUserDOM);

        const picturesContainer = document.querySelector(".gallery");

        galleryPhotographers.forEach((galleryPhotographer) => {
            const galleryPhotographerModel = infoPhotographerModel.mediaFactory(galleryPhotographer);
            const galleryPhotographerDOM = galleryPhotographerModel.getGalleryPhotographerDOM();
            picturesContainer.appendChild(galleryPhotographerDOM);
        });

    };


    async function init() {
        // Récupère les datas du photographe
        const { infoPhotographer, galleryPhotographers } = await getInfoPhotographers();
        console.log(infoPhotographer);
        displayData(infoPhotographer, galleryPhotographers);
    };

    init();