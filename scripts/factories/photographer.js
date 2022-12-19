function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

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
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}