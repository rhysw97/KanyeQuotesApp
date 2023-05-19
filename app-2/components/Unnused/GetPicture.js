import React from "react"
import axios from 'axios';
import { useEffect, useState } from "react"
import {View, Text, Image, ScrollView, TextInput} from "react-native"
import generic from "../../styles/Styles";

export default function GetPicture(props) { 
    //state hooks
    const [photoData, setPhotoData] = useState(null);
    const [inputText, onChangeInputText] = useState("by date")

    if(!props.apiQuery) {
        props.apiQuery = ""
    } else {
        props.apiQuery = "$" + props.apiQuery
    }
    useEffect(() => {
        fetchPicData();
        
        //async function to get  astronomy picture of the day
        async function fetchPicData() {
            try{
               
            const url = `https://api.nasa.gov/planetary/apod?api_key=4gejOSm9GDBxZ3hgzrjy0gwSBReJtxntrStxku4o`
           
            //awaits until we have fetched data at the url stored in url variable 
            const res = await fetch(url) 
            
            //stores json data into data variable 
            const data = res.json();
            setPhotoData(data)
            console.log(data)
            return data
            } catch (error) {
                console.log(error)
            }
        }

        
    }, []);
    //if photo could not be retrieved this is displayed instead
    if(!photoData) return (<Text>Couldn't retrieve data from api</Text>)

    return (
        <View style={generic.container}>
            <Image
                style={{width: '100%', height: '50%'}}
                source={{uri: photoData.url}}
            />
            <ScrollView>
                <Text>{photoData.title}</Text>
                <Text>{photoData.date}</Text>
                <Text>{photoData.explanation}</Text>
            </ScrollView>
        </View>
    )
}

