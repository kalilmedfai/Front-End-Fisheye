class Lightbox {

    static init() {
        const links = Array.from(document.querySelectorAll('img[src$=".jpg"].photographer_image, img[src$=".png"].photographer_image, img[src$=".jpeg"].photographer_image'))
        const listOfPictures = links.map(link => link.getAttribute('src'))

            links.forEach(link => {
                link.addEventListener('click', e => {
                    new Lightbox(e.currentTarget.getAttribute('src'), listOfPictures)
                });
                link.addEventListener('keydown', e => {
                    if (e.keyCode === 13 || e.keyCode === 32 ) {
                        new Lightbox(e.currentTarget.getAttribute('src'), listOfPictures)
                    }
                });
            })
    }
    
    // parametre (string) est un string url de l'image
    // parametre (tableau) chemin vers la lightbox
    constructor(url, images) {
        this.element = this.buildDOM(url)
        this.images = images
        this.loadImage(url)
        this.OnEscKey = this.OnEscKey.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.OnEscKey)
    }

    loadImage(url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container')
        container.innerHTML = ''
        image.onload = () => {
            container.appendChild(image)
            this.url = url
        }
        image.src = url
    }

    OnEscKey(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
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

    next(e) {
        e.preventDefault()
        let position = this.images.findIndex(image => image === this.url)
        position += 1
        if (position === this.images.length) {
            position = 0
        }
        this.loadImage(this.images[position])
    }
    
    prev(e) {
        e.preventDefault()
        let position = this.images.findIndex(image => image === this.url)
        position -= 1
        if (position === -1) {
            position = this.images.length - 1
        }
        this.loadImage(this.images[position])
    }

    // parametre est un string url de l'image
    // renvoie element html
    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `
            <img class="lightbox__close" src="assets/icons/close_lightbox.svg"/>
            <img class="lightbox__next" src="assets/icons/chevron-right.svg"/>
            <img class="lightbox__prev" src="assets/icons/chevron-left.svg"/>
            <div class="lightbox__container">
                <img src="${url}" alt="">
            </div>`
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return dom
    }
}