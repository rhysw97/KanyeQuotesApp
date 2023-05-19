import React from "react"
import { useEffect, useState } from "react"
import {View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList} from "react-native"
import {generic} from "../styles/Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function SelectQuote(props) { 
   
    //if photo could not be retrieved this is displayed instead
    //if(!photoData) return (<Text>Couldn't retrieve data from api</Text>)
    const [favouriteQuotes, setFavouriteQuotes] = useState([]);
    const [flatListItems, setFlatListItems] = useState([])
    const [currentItem, setCurrentItem] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false);

    //used to get data when tab is first opened. Will only run once due to second argument being an empty array
    useEffect(() => {
        getData()
    },[])

    //gets data from kanye array stored in AsyncStorage and sets favouriteQuotes to the data returned by calling getItem.
    const getData = async () => {  
        try { 
            const kanyeValue = await AsyncStorage.getItem("kanye")
            if(kanyeValue !== null) {      
                const data = JSON.parse(kanyeValue);
                setFavouriteQuotes(data);
                setIsRefreshing(false)
            }  
        } catch(e) {    
             alert(e)   // error reading value 
        }
    }


    //stores data in kanye array in async storage
    const storeData = async () => {  
        try {
            await AsyncStorage.setItem( "kanye", JSON.stringify(favouriteQuotes))
        } catch (e) {    
            alert(err) 
        }
    }

    //so I can refresh list
    const onRefresh = () => {
        setIsRefreshing(true)
        getData();
    }
    
    return (
       <View style={generic.container}>
           
          
           <FlatList
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                data={favouriteQuotes}
                extraData={favouriteQuotes}
                renderItem={( {item} ) =>(
                    <View style={{height: "100%", padding: "5%", flex: 1 , backgroundColor: "#f7f7f7", marginBottom: "1%"}}>
                        <Text style={{color: "black", fontSize: 15}}>{item}</Text>
                        <View style={{width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity style={{backgroundColor: "#621ce3", borderRadius: 30, width: "80%" }} onPress={ () => props.select(item)}>
                                <Text style={{textAlign: "center", backgroundColor: "#621ce3", borderRadius: 20, color: "white", marginTop: "2%"}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
           
        </View>
    )
}


/* <FlatList 
                data={favouriteQuotes}
                renderItem={( {item} ) =>(
                    <Text>{item}</Text>
                )}
            />*/
