import {Text, View} from "react-native";

export default function RootLayout() {

    const tabs: {name:String, ref:String}[] = [{name: "Todos Itens", ref:"allItnes"}, {name:"lista", ref:"list"}, {name:"Ultimas Compras", ref:"Last"}]
    return (
        <View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                {
                    tabs.map((tab, i) => (
                        <Text key={i}>{tab.name}</Text>
                    ))
                }
            </View>
        </View>
    )
}