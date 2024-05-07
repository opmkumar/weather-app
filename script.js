let str1="Delhi,india"

async function getTemp(str1){
   
    const response= await fetch('http://api.weatherapi.com/v1/current.json?key=43516a612aea4b868d1184527233108&q='+str1+'&aqi=no', {mode: 'cors'})
  
    const temp= await response.json()
    console.log(temp)
    console.log(Math.round(temp.current.temp_c))
    const cond=document.querySelector("#cond")
    cond.innerHTML=temp.current.condition.text
    const loc=document.querySelector("#loc")
    loc.innerHTML=temp.location.name+','+temp.location.country
    const dat=document.querySelector("#date")
    console.log(dat)
    const showDate=new Date(temp.location.localtime)
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    console.log(weekday[showDate.getDay()])
    console.log(showDate.getDate())
    console.log(showDate.getMonth())
    dat.innerHTML=weekday[showDate.getDay()]+','
    dat.innerHTML+=showDate.getDate()+'th '
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    dat.innerHTML+=month[showDate.getMonth()];
    dat.innerHTML+=' '+showDate.getFullYear()
    const time=document.querySelector("#time")
    if(showDate.getHours()<10){
    time.innerHTML='0'+showDate.getHours()+':'}
    else{
        time.innerHTML=showDate.getHours()+':'
    }
    if(showDate.getMinutes()<10){
    time.innerHTML+='0'+showDate.getMinutes()}
    else{
        time.innerHTML+=showDate.getMinutes()
    }
    
    if(showDate.getHours()<12){
        time.innerHTML+=' am'
    }
    else{
        time.innerHTML+=' pm'
    }
    const tempC=document.querySelector("#tempC")
    tempC.innerHTML=Math.round(temp.current.temp_c)+"&#8451;"
    const tempF=document.querySelector("#tempF")
    tempF.innerHTML=Math.round(temp.current.temp_f)+"&#8457;"
    const forF=document.querySelector("#forF")
    const forC=document.querySelector("#forC")
    forF.addEventListener("click",function(){
        
            forC.style.display="block"
            forF.style.display="none"
            tempF.style.display="block"
            tempC.style.display="none"
            
    }
    )
    forC.addEventListener("click",function(){
        
            forF.style.display="block"
            forC.style.display="none"
            tempC.style.display="block"
            tempF.style.display="none"
    }
    )
    console.log(temp.current.condition.icon)
    const icon=document.querySelector("#icon")
    icon.src=temp.current.condition.icon

    const humid=document.querySelector("#humid")
    humid.innerHTML=temp.current.humidity+'%'
    const wind=document.querySelector("#wind")
    wind.innerHTML=temp.current.wind_kph+'km/h'


}

getTemp(str1)
async function forcast(str1){
    const loadcast=await fetch('http://api.weatherapi.com/v1/forecast.json?key=43516a612aea4b868d1184527233108&q='+str1+'&days=1&aqi=no&alerts=no',{mode:'cors'})
    const cast= await loadcast.json()
    console.log(cast)
     const rain=document.querySelector("#rain")
     rain.innerHTML=cast.forecast.forecastday[0].day.daily_chance_of_rain+'%'
     
    //  let j=1
    //  for(let i=0;i<8;i++){
    //     let ids='#box'+j
    //     let ids1='#inbox'+j
    //     console.log(ids)
    //     var time = new Date(cast.forecast.forecastday[0].hour[j].time);
    //     document.querySelector(ids).innerText=time.toLocaleString('en-US', { hour: 'numeric', hour12: true })
    //     const futuretemp=Math.round(cast.forecast.forecastday[0].hour[j].temp_c)
    //     console.log(futuretemp)
    //     document.querySelector(ids).innerHTML+='\n'+futuretemp     
    //     j++;
        
    //  }
 
}
forcast(str1)
const str=document.querySelector(".entere")

str.addEventListener("keydown",function(event){
if(event.key==="Enter"){
    let str1=str.value
    console.log(str.value)
    str.value=null
    console.log(str1)

    getTemp(str1)
    forcast(str1)
}
})