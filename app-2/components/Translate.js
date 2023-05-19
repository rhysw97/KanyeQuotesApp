import React from "react"
import { useEffect, useState } from "react"
import {View, Text, Image, ScrollView, TextInput, TouchableOpacity, Modal, SafeAreaView} from "react-native"
import {generic} from "../styles/Styles";
import AsyncStorage from '@react-native-async-storage/async-storage'
import SelectQuote from "./SelectQuote";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

export default function Translate() {
   
    const [translation, setTranslation] = useState('');
    const [selectModalVisible, setSelectModalVisible] = useState(false);
    const [languageModalVisible, setLanguageModalVisible] = useState(false);
    const [language, setLanguage ] = useState('');
    const [selectedQuote, setSelectedQuote] = useState("")


    //function to translate the messaged passed in to the language passed in as apiName
    async function getTranslation(apiName, toTranslate) {
        try {
            
            const formatedText = toTranslate
            console.log(formatedText)
            let requestTranslation = await fetch(
                `https://api.funtranslations.com/translate/${apiName}.json?text=${formatedText}`,
            );
            let data = await requestTranslation.json();
            setTranslation(data["contents"]['translated'])//sets translation to the translated test
                console.log(data["contents"]['translated']);
            //console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
//sets Selected Quote to quote passed in. This is used so I can select items using the flatlist
    const selectQuote  = (quote) => {
        setSelectedQuote(quote);
    }
   


    return(
        <View style={generic.container}>

            <TouchableOpacity  style={generic.button} onPress={() => {setSelectModalVisible(true)}}><Text  style={generic.buttonText}>Select Quote</Text></TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={selectModalVisible}
                
            >
                <View style={generic.container}>
                    <View style={{height: "100%", width: "100%"}}>
                        <SelectQuote select={selectQuote}></SelectQuote>
                        <View style={generic.container}>
                            <Text style={generic.text}></Text>
                            <Text style={{backgroundColor: "white", color: "black", fontSize: 20, margin: "2%" }}>Quote Selected: {selectedQuote}</Text>
                            <TouchableOpacity style={generic.button} onPress={() => {setSelectModalVisible(false)}}><Text style={generic.buttonText}>Close</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
        <Text style={{backgroundColor: "white", color: "black", fontSize: 20, margin: "2%" }}>Quote Selected: {selectedQuote}</Text>
        <TouchableOpacity style={generic.button} onPress={() => {setLanguageModalVisible(true)}}><Text style={generic.buttonText}>Select Language</Text></TouchableOpacity>
    
        <Modal
            style={generic.container}
            animationType="slide"
            transparent={false}
            visible={languageModalVisible}>
            <SafeAreaView style={[generic.container, {width: "100%"}]} >
                <TouchableOpacity style={generic.button} onPress={() => {setLanguage("sith")}}><Text style={generic.buttonText}>Sith</Text></TouchableOpacity>
                <TouchableOpacity style={generic.button} onPress={() => {setLanguage("pirate")}}><Text style={generic.buttonText}>Pirate</Text></TouchableOpacity>
                <TouchableOpacity style={generic.button} onPress={() => {setLanguage("dothraki")}}><Text style={generic.buttonText}>Dothraki</Text></TouchableOpacity>
                <Text style={{backgroundColor: "white", color: "black", fontSize: 20, margin: "2%" }}>Language Selected: {language}</Text>

                <TouchableOpacity style={generic.button} onPress={() => {setLanguageModalVisible(false)}}><Text style={generic.buttonText}>Apply</Text></TouchableOpacity>
            </SafeAreaView>
            
        </Modal>
            
            <Text style={{backgroundColor: "white", color: "black", fontSize: 20, margin: "2%" }}>Language Selected: {language}</Text>
            <TouchableOpacity style={generic.button} onPress={() => {getTranslation(language, selectedQuote )}}><Text style={generic.buttonText}>Translate</Text></TouchableOpacity>
            
           <Text style={{backgroundColor: "white", color: "black", fontSize: 20, margin: "2%" }}>Translation: {translation}</Text>
        </View>
    )
}