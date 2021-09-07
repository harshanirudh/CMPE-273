'use strict';

// const { default: axios } = require("axios");

// var axios = require("axios").default;

// const { default: axios } = require("axios");

let lat;
let lon;
async function getAddress(latlng,key){
    const res= await axios.get('https://maps.googleapis.com/maps/api/geocode/json',
        {params:{latlng:latlng,key:key}});
        let address=res.data.results[0].formatted_address;
        console.log(address);
        return address;
}
async function getCoOrdinates(){
    const res=await axios.post('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBZi--8bDA1gLOlH1o0cC0NFVGngFseprE');
    return res;
}
function getLocation(){
    
    getCoOrdinates().then(resp=>{
        const resultString=` Longitude = ${resp.data.location.lng} Latitude =${resp.data.location.lat}`;
        lon=resp.data.location.lng;
        lat=resp.data.location.lat;
            getAddress(resp.data.location.lat+','+resp.data.location.lng,'AIzaSyB1mRHizceSJDs4TuXu_pi8j8HPt5DQRLY').then(res=>{
                document.getElementById('locationBody').innerHTML=resultString+'<br/>'+res;
        });
    })


}
// https://documenu.com/docs#get_search_restaurants_geo
let getNearByFromGoogle= async ()=>{
    const url='https://api.documenu.com/v2/restaurants/search/geo';
    const res=await axios.get(url,
    {params:{
        lat:lat,
        lon:lon,
        distance:1,
        fullmenu:false,
        //key:'AIzaSyB1mRHizceSJDs4TuXu_pi8j8HPt5DQRLY'
        key:'bf04d0d92ed9cd8f15e6022aa3f202d3'
    }})
    console.log(res.headers);
    let detailStr='<ul>';
    for(let row of res.data.data){
        detailStr+='<li>'+row.restaurant_name+'</li>'+
        '<ul><li> Address: '+row.address.formatted+'</li>'+
        '<li> Cuisines:'+row.cuisines.toString()+
        '</ul>';
    }
    detailStr+='</ul>';
    console.log(detailStr);
    document.getElementById('details').innerHTML=detailStr;

}
let changeColor=(id)=>{
    let element=document.getElementById(id);
    element.classList.remove("btn-info");
    element.classList.add('btn-warning');
}
let resetColor=(id)=>{
    let element=document.getElementById(id);
    element.classList.remove("btn-warning");
    element.classList.add('btn-info');
}
// getNearByFromGoogle('37.3333053,-121.9119996','restaurant')
