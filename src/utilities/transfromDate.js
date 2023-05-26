const transformDate = (str) => {

    if(str === "finished") return "Finished" 

    const date = new Date(str)

    const dateFormat = (date)=>{
        const options = { timeZone: "UTC", day: "numeric", year: "2-digit", month: "2-digit" }
        return date.toLocaleDateString("es-ES",options )
    }

    return dateFormat(date)
}

export default transformDate