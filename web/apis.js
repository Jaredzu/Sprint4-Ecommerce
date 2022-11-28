console.log("Hola desde las API's")

const API_URL = "http://localhost:3000"
let responseData;


const API_PATHS = {
	products: "/products/",
	shop: "/shop/"
}

// ASYNC/AWAIT to use the Mock API Information //

const bringInfo = async (path) => {
	try {
		let response = await fetch(API_URL + path)
		responseData = await response.json()
		return responseData

	} catch (error) {
		console.log("Se encontró un error: " + error)
		document.querySelector(".cards-output").innerHTML = `<h3 class="error">Error Found, please check the LocalHost and try again</h3>`
		alert("Error Found, please check the LocalHost and try again 😯")
	}
}


// ------------- HTTPS VERBS --------------//


const httpGetOneProduct = async (path, id) => {
	try {
		let response = await fetch(API_URL + path + id)
		responseData = await response.json()
		return responseData

	} catch (error) {
		console.log("Se encontró un error: " + error)
		document.querySelector(".cards-output").innerHTML = `<h3 class="error">Error Found, please check the LocalHost and try again</h3>`
		alert("Error Found, please check the LocalHost and try again 😯")
	}
}



const httpPATCH = async (path, newProp, id) => {
	try {
		let response = await fetch(
			API_URL + path + `${id}`, // js string templates
			{
				body: JSON.stringify(newProp),
				method: "PATCH",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		let data = await response.json()
		return data
	} catch (error) {
		console.log("Se encontró un error: " + error)
		document.querySelector(".cards-output").innerHTML = `<h3 class="error">Error Found, please check the LocalHost and try again</h3>`
		alert("Error Found, please check the LocalHost and try again 😯")
	}
}


const httpPOST = async (path, newPost) => {
	try {
		let response = await fetch(
			API_URL + path,
			{
				body: JSON.stringify(newPost),
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		let data = await response.json()
		return data
	} catch (error) {
		console.log("Se encontró un error: " + error)
		alert("Error Found, please check the LocalHost and try again 😯")	}
}


const httpDELETE = async (path, id) => {
	try {

		let response = await fetch(
			`${API_URL}${path}${id}`, // js string templates
			{
				method: "DELETE",
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		let data = await response.json()
		return data

	} catch (error) {
		handleError(error)
	}
}

//--------- Fuctions to execute the HTTP verbs CRUD ----------//
const executeGET = async () => await bringInfo(API_PATHS.products)
const executeOneProduct = async (id) => await httpGetOneProduct(API_PATHS.products, id)
const executePATCH = async (newProp, id) => { await httpPATCH(API_PATHS.products, newProp, id) }
const executePOST = async (newProduct) => { await httpPOST(API_PATHS.products, newProduct) }
const executeDELETE = async (id) => { await httpDELETE(API_PATHS.products, id) }

const executePOSTpurchase = async (newBuy) => { await httpPOST(API_PATHS.shop, newBuy) }
const executeGETpurchase = async () => await bringInfo(API_PATHS.shop)
