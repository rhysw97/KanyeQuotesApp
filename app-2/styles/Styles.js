import { StyleSheet } from "react-native"

export const generic = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#621ce3",
      alignItems: "center",
      justifyContent: "space-evenly",
      
  },

  buttonsContainer: {
      flex: 1,
      height: "30%",
      width: "100%",
      backgroundColor: "#621ce3",
      alignItems: "center",
      justifyContent: "space-evenly",
      
  },

  text: {
      fontSize: 35 ,
      color: "#FFF",
      textAlign: "center",
      padding: "2%"
  },
  
  button: {
    justifyContent: "center",
    marginBottom: "4%",
    height: "15%",
    width: "50%",
    borderWidth: 1,
    backgroundColor: "#fff",
    color: "#000",
    borderColor: "#000",
    alignItems: "center",
    borderRadius: 300,

  },

  buttonText: {
    
    textAlign: "center",
    textAlignVertical: "center",
    color: "#000",
  }
})



