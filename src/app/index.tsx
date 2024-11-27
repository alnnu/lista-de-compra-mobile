import React, {useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import ItenCard from "@/components/ItenCard";
import {ItemType} from "@/types/ItemType";

export default function RootLayout() {

    const tabsRef: {name:string, value:string}[] = [{name: "Todos Itens", value:"allItnes"}, {name:"lista", value:"list"}, {name:"Ultimas Compras", value:"Last"}]

    const [selectedTab, setSelectedTab] = useState<string>("allItnes")

    const handleChangeTab = (tabName: string) => {
        setSelectedTab(tabName)
    }



    return (
        <View style={{paddingHorizontal: 16, paddingVertical: 12}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                {
                    tabsRef.map((tabRef) => (
                        <TouchableOpacity key={tabRef.value} onPress={() => handleChangeTab(tabRef.value)}>
                            <Text style={{ fontSize: selectedTab === tabRef.value ? 18 : 12, color: "#000", borderBottomWidth: selectedTab === tabRef.value ? 1 : 0, borderBottomColor: "#058EFF" }}>{tabRef.name}</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
            <View>
                <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginTop: 20 }}>Em breve</Text>
            </View>
        </View>
    )
}