console.log("Hola desde el User Admin")

const output = document.querySelector(".cards-output-admin")

const createCard = (product) => {
    output.innerHTML += `
        <div class="card m-2">
            <div class="card-img">
                <img src=${product.image} class="card-img-top" alt="...">
            </div>
            <div class="card-body">
                <span class="type">${product.type}</span>
                <h5 class="card-title">${product.name} <span class="content">${product.content}</span></h5>
                <h6 class="price">$ ${product.price}</h6>
                   <div class= "d-flex flex-nowrap align-items-center">
                    <div class="input-group mb">
                    <a href="#editDiv"> <button class="btn btn-outline-info" onclick = "editProduct(${product.id})">Edit Product</button> </a>
                        <button class="btn btn-outline-danger m-auto delete" onclick = "deleteProduct(${product.id})" type="button">Delete Product</button>
                    </div>
                    
                    </div>
            </div>
        </div>`
};

const showInfo = async () => {
    output.innerHTML = ""
    infoProducts = await bringInfo(`${API_PATHS.products}`)

    console.log(infoProducts)

    infoProducts.forEach(element => {
        createCard(element)
    });
}

showInfo()

// ---------- CAPTURE FORM INPUTS AND POST --------- //

const captureForm = async () => {
    let addName = document.querySelector("#addName").value
    let addType = document.querySelector("#addType").value
    let addContent = document.querySelector("#addContent").value
    let addPrice = parseInt(document.querySelector("#addPrice").value)
    let addImage = document.querySelector("#addImage").value

    let newProduct = {
        type: addType,
        name: addName,
        image: addImage,
        price: addPrice,
        content: `${addContent} g`,
        quantity: 0
    }
    await executePOST(newProduct)
    console.log("Posting...")
    return newProduct
}

const submitBtn = document.querySelector("#submitBtn")

submitBtn.addEventListener("click", async () => {
    captureForm()
})


//----------------- DELETE PRODUCT ---------------//

const deleteProduct = (id_) => {

    console.log("Eliminanding producto...")
    executeDELETE(id_)
    console.log("Volviending a renderizar...");
    location.reload()

}

//----------------------- EDIT PRODUCTS ---------------//

const editProduct = async (id_) => {

    let products = await executeOneProduct(id_)

    document.getElementById("editId").value = products.id;
    document.getElementById("editName").value = products.name;
    document.getElementById("editType").value = products.type;
    document.getElementById("editContent").value = parseInt(products.content);
    document.getElementById("editPrice").value = products.price;
    document.getElementById("editImage").value = products.image;
}

const editBtn = document.querySelector("#editBtn")

editBtn.addEventListener("click", async () => {

    let editId = document.getElementById("editId").value
    let editName = document.getElementById("editName").value
    let editType = document.getElementById("editType").value
    let editContent = document.getElementById("editContent").value
    let editPrice = parseInt(document.getElementById("editPrice").value)
    let editImage = document.getElementById("editImage").value

    let editProduct = {
        type: editType,
        name: editName,
        image: editImage,
        price: editPrice,
        content: `${editContent} g`,
        quantity: 0
    }
    await executePATCH(editProduct, editId)
    console.log("Editing...")
    return editProduct

})

//----------------- SHOW PURCHASE SECTION --------------//

const outputPurchase = document.querySelector(".cards-output-purchase")

const createPurchaseCard = (product) => {
    outputPurchase.innerHTML += `
    <div class="card purchaseCard m-2" style="width: 18rem;">
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><strong>Name:</strong> ${product.name}</li>
          <li class="list-group-item"><strong>Direction:</strong> ${product.direction}</li>
          <li class="list-group-item"><strong>Contact:</strong> ${product.cell}</li>
          <li class="list-group-item"><strong>Products: </strong>${product.facture}</li>
          <li class="list-group-item"><strong>Total Purchase: </strong>${product.total}</li>
        </ul>
        <div class="card-footer">
            <strong>Purchase Number :</strong> ${product.id}
        </div>
  </div>`
};

const showPurchaseInfo = async () => {
    outputPurchase.innerHTML = ""
    infoPurchase = await bringInfo(API_PATHS.shop)

    console.log(infoPurchase)

    infoPurchase.forEach(element => {
        createPurchaseCard(element)
    });
}
showPurchaseInfo()