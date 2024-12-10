import React, {useState} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import ItemService from "@/services/ItemService";
import {ItemType} from "@/types/ItemType";
import ItenCard from "@/components/ItenCard";
import {ListType} from "@/types/ListTypes";
import ListService from "@/services/ListService";


export default function RootLayout() {

    const tabsRef: { name: string, value: string }[] = [{name: "Todos Itens", value: "allItens"}, {
        name: "lista",
        value: "list"
    }, {name: "Ultimas Compras", value: "Last"}]

    const [selectedTab, setSelectedTab] = useState<string>("list")

    const [Itens, setItens] = useState<ItemType[]>([])

    const [activeList, setActiveList] = useState<ListType | undefined>(undefined)

    const [searchText, setSearchText] = useState<string>("")

    const handleChangeTab = (tabName: string) => {
        setSearchText("")
        setSelectedTab(tabName)
    }

    ItemService.getItens().then((res) => {
        setItens(res.data)

    })

    ListService.getAtiva().then((res) => {
        setActiveList(res.data)
    })


    function handlerAddIten (item:ItemType) {
        if (activeList) {
            ListService.addIten(item, activeList.id).then((res) => {
                setActiveList(res.data)
            })
        }else {
            ListService.create(item).then((res) => {
                setActiveList(res.data)
            })
        }
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

                {
                    selectedTab == "allItens" && <>
                        {
                            Itens.length > 0
                                ?
                                <>
                                    <TextInput style={{
                                        width: "100%",
                                        borderColor: "lightblue",
                                        borderStyle: "solid",
                                        borderWidth: 2,
                                        paddingHorizontal: 8,
                                        paddingVertical: 10,
                                        marginTop: 15,
                                        marginBottom: 18,
                                        borderRadius: 18
                                    }} placeholder="Busque itens aqui"
                                    onChangeText={(text) => {setSearchText(text)
                                   }}
                                    />

                                    <FlatList data={Itens.filter((iten) => iten.nome.toLowerCase().includes(searchText.toLowerCase()))} keyExtractor={(item) => item.id.toString()} renderItem={
                                        ({item}) => <ItenCard item={item} onAddPress={() => handlerAddIten(item)}
                                                              onRemovePress={() => console.log("a")} isSelect={false}/>
                                    }/>
                                </>
                                :
                                <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold", marginTop: 20}}>Sem
                                    Itens</Text>
                        }
                    </>
                }
                {
                    selectedTab == "list" && <>
                        {
                            activeList != undefined
                                ?
                                <>
                                    <TextInput style={{
                                        width: "100%",
                                        borderColor: "lightblue",
                                        borderStyle: "solid",
                                        borderWidth: 2,
                                        paddingHorizontal: 8,
                                        paddingVertical: 10,
                                        marginTop: 15,
                                        marginBottom: 18,
                                        borderRadius: 18
                                    }} placeholder="Busque itens aqui"
                                               onChangeText={(text) => {setSearchText(text)
                                               }}
                                    />

                                    <FlatList data={activeList.listaProduto.filter((iten) => iten.produto.nome.toLowerCase().includes(searchText.toLowerCase()))} keyExtractor={(item) => item.id.toString()} renderItem={
                                        ({item}) => <ItenCard item={item.produto} onAddPress={() => console.log("a")}
                                                              onRemovePress={() => console.log("a")} isSelect={true}/>
                                    }/>
                                </>
                                :
                                <Text style={{textAlign: "center", fontSize: 24, fontWeight: "bold", marginTop: 20}}>Sem
                                    Lista Ativa</Text>
                        }
                    </>
                }
                {
                    ( selectedTab == "Last") && <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold", marginTop: 20 }}>Em breve</Text>
                }

            </View>
        </View>
    )
}