//Mettre le code JavaScript lié à la page photographer.html



fetch('data/photographers.json')
    .then(res => res.json())
    //.then(res2 => console.log(res2))
    .then(res => {
        let params = new URLSearchParams(location.search)

        let id_photographer = parseInt(params.get("id"), 10)

        console.log(res)
        console.log(id_photographer)
        let photographer_find = res.photographers.find(
            function (photographer) {
                console.log(id_photographer, photographer.id, id_photographer === photographer.id)
                if(id_photographer === photographer.id){
                    return true
                } else {
                    return false
                }
            }
        )
        console.log(photographer_find)
    })
