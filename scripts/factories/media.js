function mediaFactory(mediaData, photographerName) {
    let { id, photographerId, title, image, likes, date, price } = mediaData;

    const picturesPhotographer = `assets/${photographerName}/${image}`;

    function getGalleryPhotographerDOM() {
        // ajout de la balise article que l'on nommme article
        const article = document.createElement( 'article' );
        // ajout de la balise img que l'on nommme img
        const img = document.createElement( 'img' );
        // ajout de l'attribut src
        img.setAttribute("src", picturesPhotographer);
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.classList.add("photographer_image");
        img.style.width = "350px";
        img.style.height = "350px";
        img.style.objectFit = "cover";
        const div = document.createElement( 'div' );
        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.alignItems = "center";
        const div2 = document.createElement( 'div' );
        const h3 = document.createElement ( 'h3' );
        h3.textContent = title;
        h3.style.color = "#901C1C";
        const div3 = document.createElement( 'div' );
        div3.style.display = "flex";
        const p = document.createElement( 'p' );
        p.textContent = likes;
        p.style.fontWeight = "bold";
        p.style.color = "#901C1C";


        const minimumNumber = 1;
        const maximumNumber = 5000;
        const randomId = Math.random() * (maximumNumber - minimumNumber) + minimumNumber;

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

        article.appendChild(img);
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