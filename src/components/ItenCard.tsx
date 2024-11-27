import {ItemType} from "@/types/ItemType";
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icon from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { FontAwesome } from '@expo/vector-icons';


export default function ItenCard({item, isSelect, onAddPress, onRemovePress}: {
    item: ItemType,
    isSelect: boolean,
    onAddPress: () => void,
    onRemovePress: () => void
}) {

    const IconComponent = (Icon as any)[item.icon.biblioteca];

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10, paddingVertical: 15, paddingHorizontal: 10, borderBottomColor:"black", borderBottomWidth: 2 }}>
            <View>
                <IconComponent name={item.icon.nome} size={42} color={item.icon.cor}/>
            </View>

            <View style={{flex:1, paddingHorizontal:10}}>
                <Text style={{fontSize: 20, fontWeight:"bold", marginLeft: 5}}>
                    {item.nome}
                </Text>
                <Text>
                    {item.descricao}
                </Text>
            </View>

            {!isSelect ? (
                <TouchableOpacity onPress={onAddPress}>
                    <View style={{ alignItems: "center", borderRadius: 8, backgroundColor: "#058EFF", padding: 8 }}>
                        <FontAwesome6 name="plus" size={16} color="white" />
                    </View>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={onRemovePress}>
                    <View style={{ alignItems: "center", borderRadius: 8, backgroundColor: "#d10c0c", padding: 8 }}>
                        {/* <Text style={{ color: "white" }}>Adicionar item</Text> */}
                        <FontAwesome name="remove" size={16} color="white" />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )

}
