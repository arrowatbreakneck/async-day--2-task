var res = fetch("https://restcountries.com/v3.1/all");
res
  .then((data) => {
    return data.json();
  })
  .then((data1) => {
    // console.log(data1);
    datafirst(data1);
  })
  .catch((error) => console.log(error));

var maindiv = document.createElement("div");
maindiv.className = "container";
// maindiv.setAttribute("style","flex");
var row = document.createElement("div");
row.classList.add("row");

var source;

function datafirst(data1) {
  for (var i = 0; i < data1.length; i++) {
    const country = data1[i];
        const capital = country.capital ? country.capital[0] : 'N/A';
        const latlng = country.latlng || 'N/A';
        const flag = country.flags.png || 'N/A';
        const region = country.region || 'N/A';
        const name = country.name.common || 'N/A';
        const countryCodes = country.cca2 || 'N/A';
    var col = document.createElement("div");
    col.classList.add("col-lg-4");
    col.innerHTML = `<div class="card border-primary mb-3 " style="max-width: 18rem; background-color:lightblue;">
  <div class="card-header" >${data1[i].name.common}</div>
   <img src="${data1[i].flags.png}" alt="national flag" class ="cardimg">
  <div class="card-body text-primary" style="d-flex">
  
    <h5 class="card-title">capital:${data1[i].capital}</h5>
     <h5 class="card-title">region: ${data1[i].region}</h5>
      <h5 class="card-title">latlng: ${data1[i].latlng}</h5>
      <div><p class ="displaybox"></p>
      </div>
      
   <button id ="match-${i}">click for weather</button>
 
  </div>`;
  const temp = document.createElement("p");
  temp.setAttribute("style","color:yellow;background-color:black;border-radius:4px;text-align:center")
  col.append(temp);
col.querySelector(`#match-${i}`).addEventListener("click",function(){

    open_weather(latlng,temp);
 
})
    row.append(col);
    maindiv.append(row);
    document.body.append(maindiv);
  }
}

async function open_weather(latlng, temp) {
  try {
    
    var res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=ea5c7112fab5e5cb0c9cd20b3e4602af`
    );
   var res1 = await res.json();
    
    temp.innerHTML= `temperature = ${res1.main.temp}`;
   
  } catch (error) {
    console.log(error);
  }
};