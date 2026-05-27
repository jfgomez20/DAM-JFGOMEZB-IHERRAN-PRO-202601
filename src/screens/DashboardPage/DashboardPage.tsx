import React, { useCallback, useState } from "react";
import { View } from "react-native";
import { MainTemplate } from "../../components/templates";
import { ProductList, Product } from "../../components/organisms";
import { Button } from "../../components/atoms";
import { SearchBar } from "../../components/molecules";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import { ProductService } from "../../core/services";
import styles from "./DashboardPageStyles";

const DashboardPage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState<Product[]>([]);

    useFocusEffect(
        useCallback(() => {
            const loadedProducts = ProductService.getAll();
            setProducts(loadedProducts);
        }, [])
    );

    const filtered = products.filter(p =>
        p.nombre.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <MainTemplate title="Bienvenido" scrollable={false}>
            <View style={styles.actions}>
                <Button
                    title="NUEVO PRODUCTO"
                    onSubmit={() => navigation.navigate("RegisterProduct")}
                />
            </View>

            <SearchBar value={search} onChangeText={setSearch} />

            <View style={styles.sectionLabel} />

            <ProductList
                products={filtered}
                onVender={p => console.log("Vender:", p)}
            />
        </MainTemplate>
    );
};

export default DashboardPage;