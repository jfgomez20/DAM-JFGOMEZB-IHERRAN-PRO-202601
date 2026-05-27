import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Button } from "../../atoms";
import { FormField } from "../../molecules";
import styles from "./RegisterProductFormStyles";

export interface ProductData {
    nombre: string;
    sku: string;
    stock: string;
    costoCompra: string;
    precioVenta: string;
    descripcion: string;
}

interface RegisterProductFormProps {
    onSubmit: (data: ProductData) => void;
    onBack?: () => void;
}

const RegisterProductForm = ({ onSubmit, onBack }: RegisterProductFormProps) => {
    const [nombre, setNombre] = useState('');
    const [sku, setSku] = useState('');
    const [stock, setStock] = useState('');
    const [costoCompra, setCostoCompra] = useState('');
    const [precioVenta, setPrecioVenta] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const isValid = nombre && sku && stock && costoCompra && precioVenta;

    return (
        <View style={styles.container}>
            <FormField label="Nombre del Producto" placeholder="" value={nombre} onChangeText={setNombre} />
            <FormField label="SKU / Código" placeholder="" value={sku} onChangeText={setSku} autoCapitalize="none" />
            <FormField label="Cantidad en Stock" placeholder="" value={stock} onChangeText={setStock} keyboardType="numeric" />

            <View style={styles.row}>
                <View style={styles.half}>
                    <FormField label="Costo de Compra" placeholder="$" value={costoCompra} onChangeText={setCostoCompra} keyboardType="decimal-pad" />
                </View>
                <View style={styles.half}>
                    <FormField label="Precio de Venta ($)" placeholder="" value={precioVenta} onChangeText={setPrecioVenta} keyboardType="decimal-pad" />
                </View>
            </View>

            <FormField
                label="Descripción"
                placeholder=""
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={3}
                style={{ height: 80, textAlignVertical: 'top' }}
            />

            <Button
                title="CREAR PRODUCTO"
                onSubmit={() => onSubmit({ nombre, sku, stock, costoCompra, precioVenta, descripcion })}
                disabled={!isValid}
            />

            <TouchableOpacity style={styles.backLink} onPress={onBack}>
                <Text style={styles.backText}>← Back to Catalog</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterProductForm;