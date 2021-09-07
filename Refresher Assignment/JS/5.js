// https://documenter.getpostman.com/view/10808728/SzS8rjbc

//5. Make external API call, you can use npm package like axios
'use strict';

var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://api.covid19api.com/summary'
};
//arrow function
let totalDeathsByDescending= (x,y) =>{
  'use strict';
  if(x.TotalDeaths <y.TotalDeaths){
    return 1;
  }
  if(x.TotalDeaths >y.TotalDeaths)
    return -1;
  return 0;
}
axios.request(options).then((response)=> {
  console.log(response.data.Countries.sort(totalDeathsByDescending).slice(0,5));
}).catch((error) => {
	console.error(error);
});

//==================================================================
