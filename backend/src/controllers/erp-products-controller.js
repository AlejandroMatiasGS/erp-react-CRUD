import Product from "../models/product.js"

export const createProduct = async (req, res) => {
    try {
        const { nombre, desc, precio, cant } = req.body

        const prod = new Product({
            nombre,
            descripcion: desc,
            precio,
            cantidad: cant
        })

        await prod.save()

        return res.status(200).json({ message: "Producto creado con éxito!" })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Error al crear el producto" })
    }
}

export const searchProducts = async (req, res) => {
    try {
        const { nombre } = req.body

        if (nombre == "") return res.status(500)

        Product.find({ nombre: { $regex: nombre, $options: 'i' } }).then(data => {
            return res.status(200).json(data)
        }).catch(err => {
            return res.status(500)
        })
    } catch (err) {
        return res.status(500)
    }
}

export const editProduct = async (req, res) => {
    try {
        const { id, nombre, descripcion, precio, cantidad } = req.body

        const prod = await Product.findById({ _id: id })

        prod.nombre = nombre
        prod.descripcion = descripcion
        prod.precio = precio
        prod.cantidad = cantidad

        await prod.save()

        return res.status(200).json({ message: "Producto editado con éxito!" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body

        const del = await Product.deleteOne({ _id: id })

        if (del.deletedCount > 0) return res.status(200).json({ message: "Producto eliminado con éxito!" })
        else return res.status(400).json({ message: "Error al buscar el producto." })
    } catch (err) {
        return res.status(500).json({ message: "Error al eliminar el producto." })
    }
}