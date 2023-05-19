
export async function getApiData(url) {
    try {
        console.log(url);
        let response = await fetch(url);
        let data = await response.json();
    
        console.log("Data: " + data)
        return data;
    } catch (error) {
        console.error(error);
    }
}