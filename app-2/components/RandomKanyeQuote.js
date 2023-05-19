import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import React, {useEffect, useState} from "react"
import { StyleSheet, View, Text, TouchableOpacity, Modal, SafeAreaView } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {generic} from "../styles/Styles"

export default function RandomKanyeQuote() {

  
   
    //runs code once at start (kinda like a setup function )
    
    useEffect (() => {
        getRandomKanyeQuote();
        getData();
    },[])
    const [favouriteQuotes, setFavouriteQuotes] = useState([]);
    const [kanyeQuote, setKanyeQuote] = useState("");
    const [modalVisible, setModalVisible] = useState(false)
    
   //asyncronous function to get data from kayne api
    async function getRandomKanyeQuote() {
        try {
            let response = await fetch(
            'https://api.kanye.rest/',
            );
            let data = await response.json();
        
            //console.log(data);
            //sets kayneQuote to the quote returned by api
            setKanyeQuote(data["quote"])
            return data;
            //logs error if there is problem with api
        } catch (error) {
            console.error(error);
        }
    }

    const storeData = async () => {  
        try {
            await AsyncStorage.setItem( "kanye", JSON.stringify(favouriteQuotes))
        } catch (e) {    
            alert(err) 
        }
    }

    const getData = async () => {  
        try { 

            const value = await AsyncStorage.getItem("kanye")
            if(value !== null) {      
                return JSON.parse(value);
            }  

        } catch(e) {    
            // error reading value 
        }
    }

    const addToFavorites = () => {
        if(!favouriteQuotes.includes(kanyeQuote)) {
            favouriteQuotes.push(kanyeQuote);
        }
       // console.log(favouriteQuotes)
        storeData();
        

    }
    console.log(kanyeQuote);
    //will render JSX once per frame (Kinda like draw/update function )
    return (
        <View style={generic.container}>
          
            <Text style={[generic.text]}>"{kanyeQuote}"</Text>
            <View style={[generic.buttonsContainer]} >
                <TouchableOpacity style={generic.button} onPress={addToFavorites}><Text style={generic.buttonText}>Add Quote To Favourites</Text></TouchableOpacity>
                <TouchableOpacity style={generic.button} onPress={getRandomKanyeQuote}><Text style={generic.buttonText}>Generate New Kanye Quote</Text></TouchableOpacity>
                <TouchableOpacity style={generic.button} onPress={() => {setModalVisible(true)}}><Text style={generic.buttonText}>Information</Text></TouchableOpacity>
            </View>
            <Modal
                style={generic.container}
                animationType="slide"
                transparent={false}
                visible={modalVisible}>
                <SafeAreaView style={generic.container} >
                    <Text style={{padding: "5%", fontSize: 25, color: "white"}}>
                        Welcome to the Kanye Translator. In this app you can generate random Kanye west quotes and then save them to favourties.
                        Where you can then view them in that favourite quotes tab. Here you can delete any quotes that you no longer want though you will
                        have to pull up to refresh the list.

                        You can then navigate to the translator where you will be able to select the quote you want to translate and the fantasy language or
                        joke dialect you want to select to generate a translation. I hope you have as much fun messing about with this app as I did making it. 
                    </Text>
                
                <TouchableOpacity  style={[generic.button]} onPress={() => {setModalVisible(false)}}><Text style={[generic.buttonText]}>Apply</Text></TouchableOpacity>
                </SafeAreaView>
            </Modal>
           
        </View>
        
    )
}



