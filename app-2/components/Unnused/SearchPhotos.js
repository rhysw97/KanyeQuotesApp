import React, {useState} from "react"
import { StyleSheet, View, TextInput, Text } from "react-native"


export default function SearchPhotos() {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState
    return (
        <View>
            <Text>Day</Text>
            <TextInput></TextInput>
            <Text>Month</Text>
            <TextInput></TextInput>
            <Text>Year</Text>
            <TextInput></TextInput>
        </View>
    )


}