console.log("Hola desde Favs.js");

/* let infoProducts;
 */
// ------------- CREATE THE FAVS CARDS SECTION --------------------//

const outputFavs = document.querySelector(".favs-cards-output")

const createFavsCard = (favProduct) => {
    console.log("SOY EL CREATEFAVSCARD")
    outputFavs.innerHTML += `<div class="card bg-light m-3">
    <div class="card-img">
        <img src=${favProduct.image} class="card-img-top" alt="...">
    </div>
    <div class="card-body">
        <span class="type">${favProduct.type}</span><i class="fa-solid fa-square-xmark favsdelete" onclick="addFavs(${favProduct.id})"></i>
        <h5 class="card-title">${favProduct.name} <span class="content">${favProduct.content}</span></h5>
        <h6 class="price">$ ${favProduct.price}</h6>
        <div class="d-flex flex-nowrap align-items-center">
            <div class="input-group mb">
                <input type="number" class="form-control number" placeholder="${favProduct.quantity}" disabled>
                <button class="btn btn-outline-secondary carts" onclick="addCart(${favProduct.id})" type="button"><i
                        class="fa-solid fa-cart-arrow-down"></i></button>
            </div>
        </div>
    </div>
</div>
   `
};

const showFavsInfo = () => {

    let favInfo = JSON.parse(localStorage.getItem("favsJSON"))

    favInfo.forEach(element => {
        createFavsCard(element)
    });

}

/* // ASYNC/AWAIT to use the Mock API Information from apis.js//


const showInfo = async (filter = "") => {
    infoProducts = await bringInfo(`${API_PATHS.products}?q = ${filter} `)
    return infoProducts

} */

/* // ------------------ ADD TO FAVOURITES LOCAL STORAGE------------------//

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
} */

/* showInfo()
 */showFavsInfo()
