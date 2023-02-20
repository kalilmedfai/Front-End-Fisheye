// Fonction mediaFactory à deux paramètres (mediaData et PhoographerName)
function mediaFactory(mediaData, photographerName) {

    // on dit que mediaData regroupe les differentes variables des données stockées dans data/photographers.json
    // variable mediaPhotographer correspond à image de mediaData et si ce n'est pas le cas alors il va voir si c'est une video
    // variable picturePhotographer va chercher dans le bon dossier l'image ou la vidéo à afficher
    let { id, photographerId, title, image, video, likes, date, price } = mediaData;
    const mediaPhotographer = image ? image : video; 
    const picturesPhotographer = `assets/${photographerName}/${mediaPhotographer}`;

    // fonction permettant de générer une galerie de photos
    function getGalleryPhotographerDOM() {  
        
        // ajout de la balise article que l'on nommme article
        // ajout de la balise video que l'on nommme vid
        // ajout de la balise img que l'on nommme img
        const article = document.createElement( 'article' );
        const vid = document.createElement( 'video' );
        const img = document.createElement("img"); 

        // si c'est une image
        if (image) { 
            // ajout de l'attribut src à image
            // ajout de l'attribut tabindex à 0 pour pouvoir effectuer la navigation au clavier
            // ajout de l'attribut role button permettant de faire de l'image un bouton
            // ajout de la class photographer_image à la balise img
            // ajout du style width à 100% pour l'image
            // ajout du style height à 100% pour l'image
            // ajout du style object-fit cover pour l'image
            img.setAttribute("src", picturesPhotographer);
            img.setAttribute("tabindex", "0");
            img.setAttribute("role", "button");
            img.classList.add("photographer_image");
            img.style.width = "100%";
            img.style.height = "25vw";
            img.style.objectFit = "cover";
        } else {
            // sinon
            // ajout de l'attribut src à la video
            // ajout de l'attribut allow = autoplay encrypted-media  à la video
            // ajout du style width à 100% pour l'image
            // ajout du style height à 100% pour l'image
            // ajout du style object-fit cover pour l'image
            vid.setAttribute("src", picturesPhotographer);
            vid.setAttribute("allow", "autoplay; encrypted-media");
            vid.classList.add("photographer_image");
            vid.style.width = "100%";
            vid.style.height = "25vw";
            vid.style.objectFit = "cover";
        }
        
        // ajout de la balise div que l'on nommme div
        const div = document.createElement( 'div' );

        // ajout du style display flex à la div
        // ajout du style justify-content space-between à la div
        // ajout du style width à 100% pour l'image
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        div.style.width = "100%";

        // ajout de la balise div2 que l'on nommme div2
        // ajout de la balise h3 que l'on nommme h3
        const div2 = document.createElement( 'div' );
        const h3 = document.createElement ( 'h3' );

        // on attritut comme texte la variable de la data title à h3
        // on attribut la couleur #901C1C à h3
        h3.textContent = title;
        h3.style.color = "#901C1C";

        // ajout de la balise div que l'on nommme div3
        const div3 = document.createElement( 'div' );

        // ajout du style display flex à la div3
        div3.style.display = "flex";

        // ajout de la balise p que l'on nommme p
        const p = document.createElement( 'p' );

        // on attritut comme texte la variable de la data likes à p
        // ajout du style font-weight bold à p
        // on attribut la couleur #901C1C à p
        p.textContent = likes;
        p.style.fontWeight = "bold";
        p.style.color = "#901C1C";

        // les 3 lignes permettent d'attribuer un chiffre au hasard entre 1 et 50 à chaque photo de la gallerie qui sera utilisé pour le trie
        const minimumNumber = 1;
        const maximumNumber = 50;
        const randomId = Math.random() * (maximumNumber - minimumNumber) + minimumNumber;

        // ce qui suit permet d'ajouter un like ou de le retirer sur une photo et de changer en temps réel le nombre totale de likes
        const i = document.createElement( 'i' );
        i.setAttribute("class", "fa-regular fa-heart");
        i.setAttribute("id", randomId.toString());
        i.addEventListener('click', async () => { 
            const likesNow = localStorage.setItem("likeNow", parseInt(document.getElementById("total_likes").textContent));

            const btn = document.getElementById(randomId.toString())
            if(btn.classList.contains("fa-regular")){
                btn.classList.remove("fa-regular");
                btn.classList.add("fa-solid");
                btn.style.color = "#901C1C";
                likes = likes + 1; 
                localStorage.setItem("likeNow", parseInt(localStorage.getItem("likeNow")) + 1)
            } else {
                btn.classList.remove("fa-solid");
                btn.classList.add("fa-regular");
                likes = likes - 1;
                localStorage.setItem("likeNow", parseInt(localStorage.getItem("likeNow")) - 1)
            }
             p.textContent = likes; 

            const { galleryPhotographers } =  await getInfoPhotographers()  
            const photoInfo = Object.values(galleryPhotographers)  

            
            
            document.getElementById("total_likes").textContent = localStorage.getItem("likeNow")

        }); 

        i.style.display = "flex";
        i.style.alignItems = "center";
        i.style.marginLeft = "5%";      

        // affichage de la gallerie photo
        if (image) { article.appendChild(img); } 
        else { article.appendChild(vid); } 
        article.appendChild(div);
        div.appendChild(div2);
        div.appendChild(div3);
        div2.appendChild(h3);
        div3.appendChild(p);
        div3.appendChild(i);
        return(article);
    }

    return { id, photographerId, title, picturesPhotographer, likes, date, price, getGalleryPhotographerDOM }
}