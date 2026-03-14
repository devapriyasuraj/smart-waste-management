// Smart Waste Management System JavaScript

// Bin data
let bins = [
    { id: "bin1", type: "Plastic", level: 0 },
    { id: "bin2", type: "Metal", level: 0 },
    { id: "bin3", type: "Organic", level: 0 },
    { id: "bin4", type: "Paper", level: 0 },
    { id: "bin5", type: "Glass", level: 0 },
    { id: "bin6", type: "E-Waste", level: 0 },
    { id: "bin7", type: "Medical", level: 0 },
    { id: "bin8", type: "Hazardous", level: 0 },
    { id: "bin9", type: "General", level: 0 }
];


// Function to add waste to a bin
function addWaste(binId, amount) {

    let bin = bins.find(b => b.id === binId);

    if (bin) {
        bin.level += amount;

        if (bin.level > 100) {
            bin.level = 100;
        }

        updateBinUI(binId, bin.level);

        if (bin.level >= 80) {
            alert(bin.type + " Bin is almost full! Please collect waste.");
        }
    }
}


// Update UI
function updateBinUI(binId, level) {

    let bar = document.querySelector(`#${binId} .fill`);

    if (bar) {
        bar.style.height = level + "%";
    }
}


// Random waste simulation (for demo)
function simulateWaste() {

    let randomBin = bins[Math.floor(Math.random() * bins.length)];

    let amount = Math.floor(Math.random() * 20) + 5;

    addWaste(randomBin.id, amount);

}


// Run simulation every 3 seconds
setInterval(simulateWaste, 3000);


// Reset bins
function resetBins() {

    bins.forEach(bin => {
        bin.level = 0;
        updateBinUI(bin.id, 0);
    });

}


// Hover animation
document.querySelectorAll(".bin").forEach(bin => {

    bin.addEventListener("mouseenter", () => {
        bin.style.transform = "scale(1.1)";
    });

    bin.addEventListener("mouseleave", () => {
        bin.style.transform = "scale(1)";
    });

});


// Click event to manually add waste
document.querySelectorAll(".bin").forEach(bin => {

    bin.addEventListener("click", () => {

        let binId = bin.id;

        addWaste(binId, 10);

    });

});
