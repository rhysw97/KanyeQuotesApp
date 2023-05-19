import React from "react"
import { useEffect, useState } from "react"
import {View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList} from "react-native"
import {generic} from "../styles/Styles";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function ViewFavouriteQuotes() { 
    const [favouriteQuote, getFavouriteQuote] = useState("")
    //if photo could not be retrieved this is displayed instead
    //if(!photoData) return (<Text>Couldn't retrieve data from api</Text>)
    const [favouriteQuotes, setFavouriteQuotes] = useState([]);
    const [flatListItems, setFlatListItems] = useState([])
    const [currentItem, setCurrentItem] = useState("")
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        getData()
    },[])
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

    const storeData = async () => {  
        try {
            await AsyncStorage.setItem( "kanye", JSON.stringify(favouriteQuotes))
        } catch (err) {    
            alert(err) 
        }
    }

    const onRefresh = () => {
        setIsRefreshing(true)
        getData();
    }

    //removes item from favourite quotes then stores the edited array in asyncStorage by calling store data
    const removeItem = (id) => {
       
        console.log(id)
        let arr = favouriteQuotes;
        console.log(arr)
        arr.splice(id, 1)
       // console.log(arr)
        setFavouriteQuotes(arr);
        storeData();
    }


    return (
       <View style={generic.container}>
           
          
           <FlatList style={{height: "100%"}}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                data={favouriteQuotes}
                extraData={favouriteQuotes}
                renderItem={( {item} ) =>(
                    <View style={{height: "100%", padding: "5%", flex: 1 , backgroundColor: "#f7f7f7", marginBottom: "1%"}}>
                        <Text style={{color: "black", fontSize: 15}}>{item}</Text>
                        <View style={{width: "100%", flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <TouchableOpacity style={{backgroundColor: "#621ce3", borderRadius: 30, width: "80%" }} onPress={ () => removeItem(item.id)}>
                       
                                <Text style={{textAlign: "center", backgroundColor: "#621ce3", borderRadius: 20, color: "white", marginTop: "2%"}}>Delete</Text>
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
