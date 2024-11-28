import React, {useState} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import ItemService from "@/services/ItemService";
import {ItemType} from "@/types/ItemType";
import ItenCard from "@/components/ItenCard";


export default function RootLayout() {

    const tabsRef: { name: string, value: string }[] = [{name: "Todos Itens", value: "allItens"}, {
        name: "lista",
        value: "list"
    }, {name: "Ultimas Compras", value: "Last"}]

    const [selectedTab, setSelectedTab] = useState<string>("list")

    const [Itens, setItens] = useState<ItemType[]>([])

    const handleChangeTab = (tabName: string) => {
        setSelectedTab(tabName)
    }


    ItemService.getItens().then((res) => {
        setItens(res.data)
    })



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
                {
                    selectedTab == "allItens" && <>
                        {
                            Itens.length > 0
                                ?
                                <FlatList data={Itens} keyExtractor={(item) => item.id.toString()} renderItem={
                                    ({item}) => <ItenCard item={item} onAddPress={() => console.log("a")}
                                                          onRemovePress={() => console.log("a")} isSelect={false}/>
                                }/>
                                :
                                <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold", marginTop: 20}}>Sem
                                    Itens</Text>
                        }
                    </>
                }
                {
                    (selectedTab == "list" || selectedTab == "Last") && <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginTop: 20 }}>Em breve</Text>
                }

            </View>
        </View>
    )
}