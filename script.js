// BIN DATA

let bins = [

{ id:"bin1_bio", location:"Market Bio", level:0 },
{ id:"bin1_nonbio", location:"Market NonBio", level:0 },

{ id:"bin2_bio", location:"Bus Stand Bio", level:0 },
{ id:"bin2_nonbio", location:"Bus Stand NonBio", level:0 },

{ id:"bin3_bio", location:"Railway Station Bio", level:0 },
{ id:"bin3_nonbio", location:"Railway Station NonBio", level:0 },

{ id:"bin4_bio", location:"Hospital Bio", level:0 },
{ id:"bin4_nonbio", location:"Hospital NonBio", level:0 },

{ id:"bin5_bio", location:"School Bio", level:0 },
{ id:"bin5_nonbio", location:"School NonBio", level:0 },

{ id:"bin6_bio", location:"Park Bio", level:0 },
{ id:"bin6_nonbio", location:"Park NonBio", level:0 },

{ id:"bin7_bio", location:"Mall Bio", level:0 },
{ id:"bin7_nonbio", location:"Mall NonBio", level:0 },

{ id:"bin8_bio", location:"Residential Bio", level:0 },
{ id:"bin8_nonbio", location:"Residential NonBio", level:0 },

{ id:"bin9_bio", location:"Beach Bio", level:0 },
{ id:"bin9_nonbio", location:"Beach NonBio", level:0 },

{ id:"bin10_bio", location:"Stadium Bio", level:0 },
{ id:"bin10_nonbio", location:"Stadium NonBio", level:0 }

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
updateFilledBins();

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
if(bin.level >= 80 && !bin.alertShown){

alert("⚠ Alert: " + bin.location + " bin is almost full!");

bin.alertShown = true;

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

routeButton.addEventListener("click", function(){
generateRoute();
moveTruck();
});

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
function toggleMenu(){

let menu = document.getElementById("menuLinks");

if(menu.style.display === "flex"){
menu.style.display = "none";
}

else{
menu.style.display = "flex";
}

}
function openMenu(){

document.getElementById("sideMenu").style.width = "250px";

}

function closeMenu(){

document.getElementById("sideMenu").style.width = "0";

}

function moveTruck(){

let truck = document.getElementById("truck");

let route = [
{top:40,left:80},
{top:120,left:200},
{top:200,left:100},
{top:300,left:250},
{top:140,left:500}
];

let i = 0;

function nextStop(){

if(i >= route.length) return;

truck.style.top = route[i].top + "px";
truck.style.left = route[i].left + "px";

i++;

setTimeout(nextStop,2000);

}

nextStop();

}

function updateFilledBins(){

let list = document.getElementById("filledBinsList");

list.innerHTML = "";

let filled = bins.filter(bin => bin.level >= 80);

if(filled.length === 0){
list.innerHTML = "<li>No bins above 80%</li>";
return;
}

filled.sort((a,b)=> b.level - a.level);

filled.forEach(bin => {

let item = document.createElement("li");

item.innerText = bin.location + " → " + bin.level + "% full";

list.appendChild(item);

});

}
