function displayModal() {
    const modal = document.getElementById("contact_modal");
    console.log(modal);
	modal.style.display = "block";
    
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.overflow = "auto";
    
    modal.style.backgroundColor = "rgba(0, 0, 0, .20)";
}

console.log(displayModal)

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Prénom:', e.target.first_name.value)
    console.log('Nom:', e.target.last_name.value)
    console.log('Email:', e.target.email.value)
    console.log('Message:', e.target.message.value)
});