    // code JavaScript lié à la page photographer.html

    // fonction permettant de :
    // - récupérer grace au fetch les données dans data/photographers.json
    // - récupérer l'id du photographe dans l'url
    // - filtrer grace à l'id les donnees
    async function getInfoPhotographers() {
        const res = await fetch('data/photographers.json')
        const data = await res.json()

        let params = new URLSearchParams(location.search)
        let id_photographer = parseInt(params.get("id"), 10)

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
        
        let filter_id = data.media.filter( obj => obj.photographerId === id_photographer )

        return {
            infoPhotographer : photographer_find,
            galleryPhotographers : filter_id,
        }
    }

    // fonction permettant :
    // - d'afficher dans .photographer-header les information du photographe ainsi que sa photo de profil
    // - afficher la galerie dans #main
    // afficher le nombre total de like
    async function displayData(infoPhotographer, galleryPhotographers) {
        const mainContainer = document.querySelector(".photograph-header");
        // likes
        const mainPage = document.querySelector("#main");

        const infoPhotographerModel = photographerFactory(infoPhotographer, galleryPhotographers);
        const infoUserDOM = infoPhotographerModel.getInfoUserDOM();
        const pPUserDOM = infoPhotographerModel.getProfilePictureUserDOM();
        // likes
        const likesTotalDOM = infoPhotographerModel.getLikesOfPhotographerDOM();
        mainContainer.prepend(infoUserDOM);
        mainContainer.appendChild(pPUserDOM);
        // likes
        mainPage.appendChild(likesTotalDOM);

        const picturesContainer = document.querySelector(".gallery");

        galleryPhotographers.forEach((galleryPhotographer) => {
            const galleryPhotographerModel = mediaFactory(galleryPhotographer, infoPhotographer.name);
            const galleryPhotographerDOM = galleryPhotographerModel.getGalleryPhotographerDOM();
            picturesContainer.appendChild(galleryPhotographerDOM);
        });
        Lightbox.init()
    }
    // fonction permettant d'effacer le contenue de la lightbox
    async function resetGallery() {
        const picturesContainer = document.querySelector(".gallery");

        picturesContainer.innerHTML = '';
    }
    // fonction permettant de trier la gallerie de photos par Popularité, Titre (ordre alphabetique) ou par date (du plus récent au plus ancien)
    async function sortImagesInGallery(byTitle=false, byPopularity=false, byDate=false) {
        const { infoPhotographer, galleryPhotographers } = await getInfoPhotographers();
        if (byPopularity) {
            const gallery = galleryPhotographers.sort((a, b) => b.likes - a.likes);   
            await resetGallery(); 
            const picturesContainer = document.querySelector(".gallery");

            gallery.forEach((galleryPhotographer) => {
                const galleryPhotographerModel = mediaFactory(galleryPhotographer, infoPhotographer.name);
                const galleryPhotographerDOM = galleryPhotographerModel.getGalleryPhotographerDOM();
                picturesContainer.appendChild(galleryPhotographerDOM);
            });
            Lightbox.init()
        } else if (byTitle) {
            const gallery = galleryPhotographers.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0; 
            });

            await resetGallery(); 
            const picturesContainer = document.querySelector(".gallery");

            gallery.forEach((galleryPhotographer) => {
                const galleryPhotographerModel = mediaFactory(galleryPhotographer, infoPhotographer.name);
                const galleryPhotographerDOM = galleryPhotographerModel.getGalleryPhotographerDOM();
                picturesContainer.appendChild(galleryPhotographerDOM);
            });
            Lightbox.init()
        } else {
            const gallery = galleryPhotographers.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA; 
            }) 

            await resetGallery(); 
            const picturesContainer = document.querySelector(".gallery");

            gallery.forEach((galleryPhotographer) => {
                const galleryPhotographerModel = mediaFactory(galleryPhotographer, infoPhotographer.name);
                const galleryPhotographerDOM = galleryPhotographerModel.getGalleryPhotographerDOM();
                picturesContainer.appendChild(galleryPhotographerDOM);
            });
            Lightbox.init()
        }
    }

    // fonction qui initialise toute la page et permet de l'appeler juste en dessous
    async function init() {
        
        const { infoPhotographer, galleryPhotographers } = await getInfoPhotographers();
        await displayData(infoPhotographer, galleryPhotographers);

        const contact_btn = document.querySelector(".contact_button");

        const closeForm = document.querySelector(".close_contact_form")

        contact_btn.addEventListener('click', () => {
            displayModal()
        })

        closeForm.addEventListener('click', () => {
            closeModal()
        })

        closeForm.addEventListener('keydown', (event) => {
            if (!(event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter')) return;
            closeModal();
        })

        document.addEventListener('keydown', (event) => {
            if (!(event.keyCode === 27 || event.key === 'Escape' || event.code === 'Escape')) return;
            closeModal();
        })
    }

    init();
 