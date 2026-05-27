import React from "react";
import { View, Text, FlatList } from "react-native";
import { ProductCard } from "../../molecules";
import styles from "./ProductListStyles";

export interface Product {
    id: number;
    nombre: string;
    sku: string;
    stock: number;
    ganancia: number;
}

interface ProductListProps {
    products: Product[];
    onVender?: (product: Product) => void;
}

const ProductList = ({ products, onVender }: ProductListProps) => {
    if (products.length === 0) {
        return (
            <View style={styles.empty}>
                <Text style={styles.emptyText}>No hay productos aún.</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <ProductCard
                    nombre={item.nombre}
                    sku={item.sku}
                    stock={item.stock}
                    ganancia={item.ganancia}
                    onVender={() => onVender?.(item)}
                />
            )}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default ProductList;