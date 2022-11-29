console.log("Hola Mundo");

let infoProducts;

// ------------- CREATE THE CARDS SECTION --------------------//

// INDEX CARDS //
const output = document.querySelector(".cards-output")

const createCard = (product) => {
    output.innerHTML += `
        <div class="card">
            <div class="card-img">
                <img src=${product.image} class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <span class="type">${product.type}</span><i class="fa-regular fa-heart favs" onclick = "addFavs(${product.id})"></i>
                <h5 class="card-title">${product.name} <span class="content">${product.content}</span></h5>
                <h6 class="price">$ ${product.price}</h6>
                   <div class= "d-flex flex-nowrap align-items-center">
                    <div class="input-group mb">
                        <input type="number" class="form-control number" placeholder="1" disabled>
                        <button class="btn btn-outline-secondary carts" onclick = "addCart(${product.id})" type="button"><i class="fa-solid fa-cart-arrow-down"></i></button>
                    </div>
                    
                    </div>
            </div>
        </div>`
};



// ASYNC/AWAIT to use the Mock API Information from apis.js//


const showInfo = async (filter = "") => {
    output.innerHTML = ""

    infoProducts = await bringInfo(`${API_PATHS.products}?q=${filter} `)

    console.log(infoProducts)

    infoProducts.forEach(element => {
        createCard(element)
    });

    return infoProducts

}



//------------------------- FILTER --------------------------//

const search = document.querySelector("form")

search.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event)
    let searched = event.target.search.value
    console.log(searched)
    showInfo(searched)

})


// ------------------ ADD TO CART LOCAL STORAGE------------------//

let cart;
const addCart = (id) => {
    let localData = localStorage.getItem("cartJSON")

    cart = JSON.parse(localData) // Parseo para tenerlo listo en los if's inferiores
    if (localData == undefined) {
        cart = []
    }

    if (cart.some((product) => product.id === id)) {  //Esta condición compara si ya existe el elemento en el Local Storage
        localStorage.removeItem("cartJSON") // Esto elimina todo del cartJSON

        const toastLiveExample = document.getElementById('liveToast2')
        const toast = new bootstrap.Toast(toastLiveExample)

        toast.show()

        let filterCart = cart.filter((element) => {
            return element.id != id
        })
        console.log(filterCart)

        let cartJSON = JSON.stringify(filterCart)
        localStorage.setItem("cartJSON", cartJSON)
        notificationCart()



    } else {

        let productSelected = infoProducts.find((producto) => producto.id === id); //Se usa .find de la info traida del .json para compararlo con el id del click y guardamos ese elemento

        cart.push(productSelected)

        let cartJSON = JSON.stringify(cart)
        localStorage.setItem("cartJSON", cartJSON)
        notificationCart()
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    }
    return cart
}


// ------------------ ADD TO FAVOURITES LOCAL STORAGE------------------//

const addFavs = (id) => {
    let localData2 = localStorage.getItem("favsJSON")
    let favs;

    favs = JSON.parse(localData2) // Parseo para tenerlo listo en los if's inferiores
    if (localData2 == undefined) {
        favs = []
    }

    if (favs.some((product) => product.id === id)) {  //Esta condición compara si ya existe el elemento en el Local Storage
        localStorage.removeItem("favsJSON") // Esto elimina todo del cartJSON
        alert("Product deleted from your favourites ♥")
        let filterFavs = favs.filter((element) => {
            return element.id != id
        })
        console.log(filterFavs)

        let favsJSON = JSON.stringify(filterFavs)
        localStorage.setItem("favsJSON", favsJSON)

    } else {

        let productSelected = infoProducts.find((producto) => producto.id === id); //Se usa .find de la info traida del .json para compararlo con el id del click y guardamos ese elemento

        favs.push(productSelected)

        let favsJSON = JSON.stringify(favs)
        localStorage.setItem("favsJSON", favsJSON)
        alert("Product added to your favourites ♥")
    }
}

//----------- NOTIFICATION CART ------------//

const notificationCart = () => {

    let notification = document.querySelector(".notification")
    let localData = localStorage.getItem("cartJSON")
    let localParsed = JSON.parse(localData)
    notification.innerHTML = `${localParsed.length}`
}


showInfo()
notificationCart()



