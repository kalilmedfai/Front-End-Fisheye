class Lightbox {

    static init() {
        const links = Array.from(document.querySelectorAll('img[src$=".jpg"].photographer_image, img[src$=".png"].photographer_image, img[src$=".jpeg"].photographer_image'))
        const linksVideo = Array.from(document.getElementsByTagName('video'))
   

        const listOfPictures = links.map(link => link.getAttribute('src')); 
        const linkOfVideos = linksVideo.map(link => link.getAttribute("src"));
        
        
        for (const linkImage of links) {
            linkImage.addEventListener('click', e => {
                new Lightbox(e.currentTarget.getAttribute('src'), listOfPictures, linkOfVideos); 
            });
            linkImage.addEventListener('keydown', e => {
                if (e.keyCode === 13 || e.keyCode === 32 ) {
                    new Lightbox(e.currentTarget.getAttribute('src'), listOfPictures, linkOfVideos); 
                }
            });
        }

        for (const linkvideo of linksVideo) {
            linkvideo.addEventListener('click', e => {
                new Lightbox(e.currentTarget.getAttribute('src'), listOfPictures, linkOfVideos); 
            });
            linkvideo.addEventListener('keydown', e => {
                if (e.keyCode === 13 || e.keyCode === 32 ) {
                    new Lightbox(e.currentTarget.getAttribute('src'), listOfPictures, linkOfVideos); 
                }
            });
        }
     }
    
    // parametre (string) est un string url de l'image
    // parametre (tableau) chemin vers la lightbox
    constructor(url, images, videos) {  
        this.element = this.buildDOM(url, images, videos)  
        this.players =  images.concat(videos);  
        const lastElement = this.players[this.players.length - 1];
        const secondElement = this.players[this.players.length - 2];
        this.players[this.players.length-1] = secondElement;
        this.players[this.players.length-2] = lastElement; 
        this.loadImage(url)
        this.OnEscKey = this.OnEscKey.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.OnEscKey)
    }

    // loadImage qui a pour paramètre url permet d'afficher la photo ou la vidéo de la gallerie du photographe
    loadImage(url) {
        // si url est une photo alors on execute ce code
        if (url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png')) {
            this.url = null 
            const image = new Image()
            const container = this.element.querySelector('.lightbox__container')
            container.innerHTML = ''
            image.onload = () => {
                container.appendChild(image)
                this.url = url
            }
            image.src = url
        } else { // sinon on execute celui ci
            this.url = "";
            const video = document.createElement('iframe')
            const container = this.element.querySelector('.lightbox__container')
            container.innerHTML = '';
            video.onload = () => {
              this.url = url
            }
            video.src = url
            container.appendChild(video);
            this.url = url;
        }
      
    }

    // Permet la navigation au clavier
    // fermer la lightbox en appuyant sur la touche échap
    // Passer à l'image précédente en appuyant sur la touche flèche de gauche
    // Passer à l'image suivant en appuyant sur la touche flèche de droite
    OnEscKey(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } 
        else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    // ferme la lightbox
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.OnEscKey)
    }

    // passer à l'image suivante
    next(e) {
        e.preventDefault()
        let position = this.players.findIndex(image => image === this.url)  
        position += 1
        if (position === this.players.length) {
            position = 0
        }
        this.loadImage(this.players[position])

    } 
    
    // passer à l'image précédente
    prev(e) {
        e.preventDefault()
        let position = this.players.findIndex(image => image === this.url)
        position -= 1
        if (position === -1) {
            position = this.players.length - 1
        }
        this.loadImage(this.players[position])
    }
 

    // string url de l'image / image à afficher / vidéo à afficher
    buildDOM(url, image, video) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        // renvoie code html si image ou video
        if (image) {
            dom.innerHTML = `
            <img class="lightbox__close" src="assets/icons/close_lightbox.svg" aria-label="Bouton pour fermer la lightbox"/>
            <img class="lightbox__next" src="assets/icons/chevron-right.svg" aria-label="Bouton pour passer à l'image suivante"/>
            <img class="lightbox__prev" src="assets/icons/chevron-left.svg" aria-label="Bouton pour revenir à l'image précédente"/>
            <div class="lightbox__container">
                <img src="${url}" alt="">                
            </div>
            <div class="title_of_picture">TEST</div>`
        } else {
            dom.innerHTML = `
            <img class="lightbox__close" src="assets/icons/close_lightbox.svg" aria-label="Bouton pour fermer la lightbox"/>
            <img class="lightbox__next" src="assets/icons/chevron-right.svg" aria-label="Bouton pour passer à l'image suivante"/>
            <img class="lightbox__prev" src="assets/icons/chevron-left.svg" aria-label="Bouton pour revenir à l'image précédente"/>
            <div class="lightbox__container">
                <video src="${url}" alt=""></video>              
            </div>`

        }
        // ajout d'évènements au click
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this)) 
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom
    }
}