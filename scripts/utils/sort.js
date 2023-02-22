// on séléctionne la classe .dropdown que l'on attribut à la variable dropdown
const dropdowns = document.querySelectorAll('.dropdown');

// pour tous les dropwdowns
dropdowns.forEach(dropdown => {
    // on attribut à des vatiables des class
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');

    // événement au click sur le dropdown
    dropdown.addEventListener('click', (e) => {
        // on ajoute la class .caret-rotate qui dans le CSS permet la rotation du caret à 180°
        caret.classList.add('caret-rotate');
        // on ajoute la class .menu-open qui fait référence à l'ouverture du menu déroulant
        menu.classList.add('menu-open');
    });

    // on ajoute un événement au clavier (ici la touche Entrer) qui permet l'ouverture du menu déroulant à la navigation clavier
    dropdown.addEventListener('keydown', (event) => {
        if (!(event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter')) return;
        // on ajoute la class .caret-rotate qui dans le CSS permet la rotation du caret à 180°
        caret.classList.add('caret-rotate');
        // on ajoute la class .menu-open qui fait référence à l'ouverture du menu déroulant
        menu.classList.add('menu-open');
    });

    options.forEach(option => {
        // evenement au click
        option.addEventListener('click', (event) => {
            // menu n'a pas pour class menu-open on ne retourne rien
            if(!menu.classList.contains('menu-open')) {
                return
            }
            
            event.stopPropagation();
            // on retire la class .caret-rotate à caret
            caret.classList.remove('caret-rotate');
            // on retire la class .menu-open à menu
            menu.classList.remove('menu-open');

            options.forEach(option => {
                // on retire la class .active à option
                option.classList.remove('active');
            });

            // on ajoute la class active à option
            option.classList.add('active');
            // si option a pour texte html "Date"
            if (option.innerText === "Date") {
                // sortImagesInGallery aura pour parametre (false, false, true)
                return sortImagesInGallery(false, false, true)
            }
            // si option a pour texte html "Popularité"
            if (option.innerText === "Popularité") {
                // sortImagesInGallery aura pour parametre (false, true, false)
                return sortImagesInGallery(false, true, false)
            }
            // si option a pour texte html "Titre"
            if (option.innerText === "Titre") {
                // sortImagesInGallery aura pour parametre (true, false, false)
                return sortImagesInGallery(true, false, false)
            }
        });

        // on reproduit la même chose qu'au dessus mais cette fois ci grâce à la navigation au clavier
        option.addEventListener('keydown', (event) => {
            if (!(event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter')) return;
            
            if(!menu.classList.contains('menu-open')) {
                return
            }
            
            event.stopPropagation();
            
            caret.classList.remove('caret-rotate');

            menu.classList.remove('menu-open');

            options.forEach(option => {
                option.classList.remove('active');
            });

            option.classList.add('active');

            if (option.innerText === "Date") {
                return sortImagesInGallery(false, false, true)
            }

            if (option.innerText === "Popularité") {
                return sortImagesInGallery(false, true, false)
            }

            if (option.innerText === "Titre") {
                return sortImagesInGallery(true, false, false)
            }       
        });
    });
});