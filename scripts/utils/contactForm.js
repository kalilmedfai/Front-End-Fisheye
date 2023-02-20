// fonction displayModal faisant référence au formulaire de contact
function displayModal() {
    // on attribut à la variable modal la balise qui a pour ID #contact_modal
    const modal = document.getElementById("contact_modal");
    // On stylise la modal
	modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0, 0, 0, .20)";
}

// fonction permettant de fermer la modal -----------------
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// on attribut à la variable form la balise form 
const form = document.querySelector('form');
// on ajoute un evenement permettant d'afficher dans la console les valeurs écrite dans les input lorsque l'on clique sur envoyer
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Prénom:', e.target.first_name.value)
    console.log('Nom:', e.target.last_name.value)
    console.log('Email:', e.target.email.value)
    console.log('Message:', e.target.message.value)
});