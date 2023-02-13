const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {

    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');


    dropdown.addEventListener('click', () => {

        caret.classList.add('caret-rotate');

        menu.classList.add('menu-open');

    });

    dropdown.addEventListener('keydown', (event) => {
        console.log(event)
        if (!(event.keyCode === 13 || event.key === 'Enter' || event.code === 'Enter')) return;

        caret.classList.add('caret-rotate');
        menu.classList.add('menu-open');
    });

    options.forEach(option => {
        
        option.addEventListener('click', (event) => {
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
            console.log(option.innerText)

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

        option.addEventListener('keydown', (event) => {
            console.log(event)
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
            console.log(option.innerText)

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