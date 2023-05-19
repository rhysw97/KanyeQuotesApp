import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import generic from './styles/Styles'
import Translate from './components/Translate'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {NavigationContainer} from "@react-navigation/native"
import { SimpleLineIcons, AntDesign } from '@expo/vector-icons';
import { material } from 'react-native-typography'


import randomKanyeQuote from "./components/RandomKanyeQuote"

import viewFavouriteQuotes from './components/ViewFavouriteQuotes'
//https://api.nasa.gov/planetary/apod?api_key=4gejOSm9GDBxZ3hgzrjy0gwSBReJtxntrStxku4o
const Tab = createBottomTabNavigator()
const nasaKey = "api_key=4gejOSm9GDBxZ3hgzrjy0gwSBReJtxntrStxku4o"
export default function MyTabs() {

  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          activeTintColor: "#621ce3",
          tabStyle: { backgroundColor: "#621CE3"},
          labelStyle: { fontSize: 18, paddingBottom: 15},
        }}
      >
        <Tab.Screen name="Home" component={randomKanyeQuote} />
        <Tab.Screen name="Favourite Quotes" component={viewFavouriteQuotes} />
        <Tab.Screen name="Translate" component={Translate} />

        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  }
})

