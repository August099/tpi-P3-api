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
    const {title, price, imageUrl, tags, discount} = body

    if (!title || title.trim() === '') errors.title = "El campo no puede estar vacio."
    if (!price || price < 0) errors.price = "El campo no puede estar vacio ni puede ser negativo."  
    if (!validateImageUrl(imageUrl)) errors.imageUrl = "El campo debe contener una url."
    if (!tags || !Array.isArray(JSON.parse(array))) errors.tags = "El campo no puede estar vacio y debe ser una lista."
    if (!discount || discount < 0 || discount > 1) errors.discount = "El campo no puede estar vacio y debe estar entre 0 y 1."

    return errors
}