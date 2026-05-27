import { db } from "../../config";
import { Product } from "../../entities";

const ProductRepository = {
    create: (product: Omit<Product, "id">): number | undefined => {
        const query = `
            INSERT INTO products (
                nombre, sku, stock, costoCompra, precioVenta, descripcion, ganancia
            ) VALUES (?, ?, ?, ?, ?, ?, ?);
        `;

        const result = db.execute(query, [
            product.nombre,
            product.sku,
            product.stock,
            product.costoCompra,
            product.precioVenta,
            product.descripcion || "",
            product.ganancia,
        ]);

        return result.insertId;
    },

    findAll: (): Product[] => {
        const query = `SELECT * FROM products ORDER BY id DESC;`;
        const { rows } = db.execute(query);

        if (rows && rows._array) {
            return rows._array as Product[];
        }

        return [];
    },

    findBySku: (sku: string): Product | null => {
        const query = `SELECT * FROM products WHERE sku = ? LIMIT 1;`;
        const { rows } = db.execute(query, [sku]);

        if (rows && rows._array.length > 0) {
            return rows._array[0] as Product;
        }

        return null;
    },

    delete: (id: number): void => {
        const query = `DELETE FROM products WHERE id = ?;`;
        db.execute(query, [id]);
    },
};

export default ProductRepository;