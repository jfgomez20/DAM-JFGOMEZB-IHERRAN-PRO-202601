import React from "react";
import { Alert } from "react-native";
import { MainTemplate } from "../../components/templates";
import { RegisterProductForm, ProductData } from "../../components/organisms";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../Routes";
import { ProductService } from "../../core/services";

const RegisterProductPage = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleCreate = (data: ProductData) => {
        try {
            ProductService.create(data);

            Alert.alert("Producto creado", "El producto se registró correctamente");
            navigation.navigate("Dashboard");
        } catch (error: any) {
            Alert.alert(
                "Error al crear producto",
                error?.message || "No se pudo crear el producto"
            );
        }
    };

    return (
        <MainTemplate title="REGISTRAR PRODUCTO" subtitle="Create a new product listing">
            <RegisterProductForm
                onSubmit={handleCreate}
                onBack={() => navigation.navigate("Dashboard")}
            />
        </MainTemplate>
    );
};

export default RegisterProductPage;