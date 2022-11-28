console.log("Hola desde el Carrito uwu");

// ---------- CART CARDS ------------ //

let totalProduct = 0
let totalFinal = 0
let cartInfo;   // Declaro por fuera para extraer la info del LocalStorage en el resto de este Script

const outputCart = document.querySelector(".cart-cards-output")

const createCartCard = async (cartProduct) => {

    let product = await executeOneProduct(cartProduct.id)
    let quantity = parseInt(product.quantity)
    totalProduct = (product.price * quantity)
    totalFinal = totalFinal + totalProduct;
    document.querySelector("#totalfinal").innerHTML = `<h5><u>$${totalFinal}</u></h5>`

    outputCart.innerHTML += `
    <div class="cart-cards d-flex justify-content-evenly align-items-center p-3 border-bottom flex-wrap">
        <img src=${product.image} style="width: 7rem" alt="...">
        <div>
            <h4 class="card-title">${product.name}</h4>
            <p>${product.content}</p>
        </div>
        <div>
            <h6>price</h6>
            <h5>$ ${product.price}</h5>
        </div>
        <div class="d-flex flex-nowrap align-items-center">
            <div class="input-group mb">
                <button class="btn btn-outline-secondary" onclick = "subtract(${product.id})"  type="button">-</button>
                <input id="quantity${product.id}" type="number" class="form-control number" style="width: 5rem ;" value="${quantity}" aria-label=""
                    disabled>
                <button class="btn btn-outline-secondary" onclick = "addition(${product.id})" type="button">+</button>
            </div>
        </div>
        <div>
            <h6>Total</h6>
            <h5 class="text-success" id="total${product.id}" ><u>$${totalProduct}</u></h5>
        </div>
        <div>
            <h6>Action</h6>
            <h5 class="remove text-danger" onclick = "addCart(${product.id})"><u>Remove</u></h5>
        </div>

        </div>`

    return product
};

const showCartInfo = () => {

    cartInfo = JSON.parse(localStorage.getItem("cartJSON"))

    cartInfo.forEach(element => {
        createCartCard(element)
    });

    return cartInfo

}

// -------------------------- CART OPERATION ----------------------- //


const subtract = async (_id) => {

    let products = await executeGET()
    let product = products.find((producto) => producto.id === _id)      // Comparo...
    console.log("restandooo")

    if (product.quantity > 1) {

        let newQuantity = product.quantity - 1

        executePATCH({ quantity: newQuantity }, _id)

        document.getElementById(`quantity${_id}`).value = newQuantity;

        let total = newQuantity * product.price

        document.getElementById(`total${_id}`).innerHTML = `<u>$${total}</u>`;

        totalFinal -= product.price
        document.querySelector("#totalfinal").innerHTML = `<h5><u>$${totalFinal}</u></h5>`

        return totalFinal
    }
}


const addition = async (_id) => {

    let products = await executeGET()
    let product = products.find((producto) => producto.id === _id)
    console.log("sumandooo")

    let newQuantity = product.quantity + 1

    executePATCH({ quantity: newQuantity }, _id)

    document.getElementById(`quantity${_id}`).value = newQuantity;

    let total = newQuantity * product.price

    document.getElementById(`total${_id}`).innerHTML = `<u>$${total}</u>`;

    totalFinal += product.price
    document.querySelector("#totalfinal").innerHTML = `<h5><u>$${totalFinal}</u></h5>`

    return totalFinal

}


document.addEventListener("DOMContentLoaded", showCartInfo)


//------------- CONTINUE BUTTON --------- //

let continueButton = document.querySelector("#continue")
let sectionCart = document.querySelector(".cart-cards-output")
let sectionTotal = document.querySelector(".cart-total")
continueButton.addEventListener("click", () => {

    sectionCart.style.display = "none";
    continueButton.style.display = "none"
    sectionTotal.style.display = "flex";

})


// ---------------- CAPTURE THE NEW ORDERS -----------------//
let buyNowButton = document.querySelector("#buynow")

buyNowButton.addEventListener("click", async (event) => {
    event.preventDefault()
    let buyName = document.querySelector("#buyName").value
    let buyDirection = document.querySelector("#buyDirection").value
    let buyCell = document.querySelector("#buyCell").value
    let buytotal = `$${totalFinal}`
    let facture = []

    cartInfo.forEach(element => {
        facture.push(`${element.name}`)
    });


    let newOrder = {
        name: buyName,
        direction: buyDirection,
        cell: buyCell,
        facture: facture,
        total: buytotal,
    }

    localStorage.removeItem("cartJSON")
    await executePOSTpurchase(newOrder)
    console.log("Posting...")


    let allProducts = await executeGET()

    await allProducts.forEach(element => {
        executePATCH({ quantity: 1 }, element.id)
    })

/*     location.reload()
 */    return newOrder
});

