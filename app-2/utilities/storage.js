import AsycStorage from "@react-native-async-storage/async-storage"

export async function storeData(key, value){  
    try {
        await AsyncStorage.setItem( key, value)
    } catch (e) {    
        alert(err) 
    }
}

export async function getData(key){  
    try { 
       
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {      
            return value
        }  

    } catch(e) {    
        // error reading value 
    }
}
