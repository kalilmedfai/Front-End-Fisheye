const dropdown = document.querySelector('.dropdown'); // On récupère le menu dropdown
const menu = document.querySelector('.menu')  // On récupére le menu
const caret = dropdown.querySelector('.caret'); // on récupére l'élement qui a la classe caret

document.addEventListener('click', (event) => { // on écoute tout les click sur la page 
    const isClickInside = dropdown.contains(event.target); // On vérifie si le click est dans le div dropdown ou en dehors 

    if (!isClickInside) { // Si le click est en dehors du menu  
        const activeElement = menu.querySelector('.active'); // On récupére l'élement qui a l'id active actuellement 

        if (!activeElement) { // si l'élement existe on supprime la classe active 
          activeElement.classList.remove('active'); 
        }

        caret.classList.remove('caret-rotate'); // on lance les actions pour fermer le menu 
        menu.classList.remove('menu-open');
      }
    });