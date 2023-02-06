const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {

    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');


    dropdown.addEventListener('click', () => {

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
        });
    });
});