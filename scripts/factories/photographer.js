function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        // ajout de la balise p que l'on nommme p
        const p = document.createElement ( 'p' );
        // affichage de p
        p.textContent = city + ", " + country;
        // ajout de la balise p que l'on nommme p1
        const p1 = document.createElement ( 'p' );
        // affichage de p1
        p1.textContent = tagline;
        // ajout de la balise p que l'on nommme p2
        const p2 = document.createElement ( 'p' );
        // affichage de p2
        p2.textContent = price + "/jour";
        p2.style.color =
        // ajout visuel img
        article.appendChild(img);
        // ajout visuel h2
        article.appendChild(h2);
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