// BIN DATA

let bins = [
{ id:"bin1", location:"Market", level:0 },
{ id:"bin2", location:"Bus Stand", level:0 },
{ id:"bin3", location:"Railway Station", level:0 },
{ id:"bin4", location:"Hospital", level:0 },
{ id:"bin5", location:"School", level:0 },
{ id:"bin6", location:"City Park", level:0 },
{ id:"bin7", location:"Shopping Mall", level:0 },
{ id:"bin8", location:"Residential Area", level:0 },
{ id:"bin9", location:"Beach", level:0 },
{ id:"bin10", location:"City Stadium", level:0 }
];



// INITIALIZE BINS

bins.forEach((bin,index)=>{

let binElement = document.getElementById(bin.id);
let fill = binElement.querySelector(".fill");
let percent = binElement.querySelector(".percent");


// CLICK BIN TO ADD WASTE

binElement.addEventListener("click",()=>{

bin.level += 10;

if(bin.level > 100){
bin.level = 100;
}

updateBin(bin,fill,percent);
updateDashboard();

});


// EMPTY BUTTON

let button = binElement.parentElement.querySelector("button");

button.addEventListener("click",()=>{

bin.level = 0;

updateBin(bin,fill,percent);
updateDashboard();

});

});



// UPDATE BIN VISUAL

function updateBin(bin,fill,percent){

fill.style.height = bin.level + "%";

percent.innerText = bin.level + "%";


// COLOR LOGIC

if(bin.level <= 30){
fill.style.background = "green";
}

else if(bin.level <= 60){
fill.style.background = "yellow";
}

else{
fill.style.background = "red";
}

}



// DASHBOARD UPDATE

function updateDashboard(){

let alertBins = bins.filter(bin=>bin.level >= 80);

document.getElementById("alertBins").innerText = alertBins.length;

if(alertBins.length > 0){

let sorted = alertBins.sort((a,b)=>b.level - a.level);

document.getElementById("priorityZone").innerText = sorted[0].location;

}

else{

document.getElementById("priorityZone").innerText = "No urgent bins";

}

}



// ROUTE GENERATION

let routeButton = document.querySelector("#routes button");

routeButton.addEventListener("click", generateRoute);

function generateRoute(){

let routeBins = bins.filter(bin=>bin.level >= 80);

routeBins.sort((a,b)=>b.level - a.level);

let routeText = "Truck Route: ";

routeBins.forEach(bin=>{
routeText += " → " + bin.location;
});

if(routeBins.length == 0){
routeText = "No bins above 80%";
}

alert(routeText);

}
