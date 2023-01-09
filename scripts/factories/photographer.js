function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const a = document.createElement( 'a' );
        a.setAttribute("href", `photographer.html?id=${id}`)
        a.setAttribute("id", "photographer__link")
        // ajout de la balise article que l'on nommme article
        const article = document.createElement( 'article' );
        // ajout de la balise img que l'on nommme img
        const img = document.createElement( 'img' );
        // ajout de l'attribut src
        img.setAttribute("src", picture)
        // ajout de la balise h2 que l'on nommme h2
        const h2 = document.createElement( 'h2' );
        // affichage de h2
        h2.textContent = name;
        // ajout de la balise p que l'on nommme p
        const p = document.createElement ( 'p' );
        // changement de la couleur p
        p.style.color = "#901C1C"
        // affichage de p
        p.textContent = city + ", " + country;
        // ajout de la balise p que l'on nommme p1
        const p1 = document.createElement ( 'p' );
        // affichage de p1
        p1.textContent = tagline;
        // ajout de la balise p que l'on nommme p2
        const p2 = document.createElement ( 'p' );
        // affichage de p2
        p2.textContent = price + "€/jour";
        p2.style.color = "#757575"
        article.appendChild(a);
        // ajout visuel img
        a.appendChild(img);
        // ajout visuel h2
        a.appendChild(h2);
        // ajout visuel p
        article.appendChild(p);
        // ajout visuel p1
        article.appendChild(p1);
        // ajout visuel p2
        article.appendChild(p2);
        return (article);
    }

    function getInfoUserDOM() {
        // ajout de la balise div que l'on nommme div
        const div = document.createElement( 'div' );
        div.setAttribute("class", "info-header")
        div.style.paddingLeft = "50px";
        // ajout de la balise h2 que l'on nommme h2
        const h2 = document.createElement( 'h2' );
        // affichage de h2
        h2.textContent = name;
        h2.style.fontFamily = "DM Sans";
        h2.style.fontWeight = "400";
        h2.style.fontSize = "64px";
        h2.style.color = "#D3573C";
        h2.style.marginBottom = "0";
        // ajout de la balise p que l'on nommme p
        const p = document.createElement ( 'p' );
        // changement de la couleur p
        p.style.color = "#901C1C"
        p.style.fontFamily = "DM Sans";
        p.style.fontSize = "24px";
        p.style.margin = "0";
        // affichage de p
        p.textContent = city + ", " + country;
        // ajout de la balise p que l'on nommme p1
        const p1 = document.createElement ( 'p' );
        p1.style.color = "#525252";
        p1.style.fontFamily = "DM Sans";
        p1.style.fontSize = "18px";
        // affichage de p1
        p1.textContent = tagline;
        
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(p1);
        return(div);
    }

    function getProfilePictureUserDOM() {
        // ajout de la balise div que l'on nommme div
        const div = document.createElement( 'div' );
        div.setAttribute("class", "picture_header")
        // ajout de la balise img que l'on nommme img
        const img = document.createElement( 'img' );
        // ajout de l'attribut src
        img.setAttribute("src", picture)
        img.style.objectFit = "cover";
        img.style.height = "200px";
        img.style.width = "200px";
        img.style.borderRadius = "50%";
        img.style.marginRight = "50px";
        div.style.display = "flex";
        //div.style.margin = "auto";
        div.style.justifyContent = "flex-end";
        div.style.alignItems = "center";

        div.appendChild(img);
        return(div);
    }

    function mediaFactory(data) {
        const { id, photographerId, title, image, likes, date, price } = data;
    
        const picturesPhotographer = `assets/${name}/${image}`;
    
        function getGalleryPhotographerDOM() {
            // ajout de la balise article que l'on nommme article
            const article = document.createElement( 'article' );
            // ajout de la balise img que l'on nommme img
            const img = document.createElement( 'img' );
            // ajout de l'attribut src
            img.setAttribute("src", picturesPhotographer);
            img.style.width = "350px";
            img.style.height = "350px";
            img.style.objectFit = "cover";
            const div = document.createElement( 'div' );
            const h3 = document.createElement ( 'h3' );
            h3.textContent = title;
    
            article.appendChild(img);
            article.appendChild(div);
            div.appendChild(h3);
            return(article);
        }
    
        return { id, photographerId, title, picturesPhotographer, likes, date, price, getGalleryPhotographerDOM }
    }
    
    return { name, picture, city, country, tagline, price, getUserCardDOM, getInfoUserDOM, getProfilePictureUserDOM, mediaFactory }
}