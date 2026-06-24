export const validateImageUrl = (url) => {
    try {
        new URL(url)
        return true
    } catch {
        return false
    }
}

export const validateItem = (body) => {
    const errors = {};
    const {name, image, price, discount, stock} = body
    console.log(discount)

    if (!name || name.trim() === '') errors.title = "El campo no puede estar vacio."
    if (!validateImageUrl(image)) errors.image = "El campo debe contener una url."
    if (price === null || price < 0) errors.price = "El campo no puede estar vacio ni puede ser negativo."  
    if (discount === null || discount < 0 || discount > 1) errors.discount = "El campo no puede estar vacio y debe estar entre 0 y 1."
    if (stock === null || stock < 0) errors.stock = "El campo no puede estar vacio ni puede ser negativo"

    return errors
}