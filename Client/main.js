import { fetchAllHDBdata, fetchAllHDBdataByTown } from "./fetchinfo.js";

function loadActivity() {
    fetchAllHDBdata().then(townNames => {
        const townDropdown = document.querySelector("#townDropdown");
        townNames.forEach(town => {
            const option = document.createElement('option');
            option.value = town;
            option.textContent = town;
            townDropdown.appendChild(option);
        });
    });

    document.querySelector("#townForm").addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission

        const selectedTown = document.querySelector("#townDropdown").value;
        document.querySelector("#hdb").innerHTML = ''; 
        

        try {
            const hdbArray = await fetchAllHDBdataByTown(selectedTown);

            // Group HDB data by flat type
            const groupedByFlatType = {};
            hdbArray.forEach(hdb => {
                if (!groupedByFlatType[hdb.flat_type]) {
                    groupedByFlatType[hdb.flat_type] = [];
                }
                groupedByFlatType[hdb.flat_type].push(hdb.resale_price);
            });

            // Display highest and lowest price for each flat type
            Object.entries(groupedByFlatType).forEach(([flatType, prices]) => {
                const highestPrice = Math.max(...prices);
                const lowestPrice = Math.min(...prices);
                
                const newHDB = document.createElement('hdb-card');
                newHDB.setAttribute('town', selectedTown);
                newHDB.setAttribute('flat_type', flatType);
                newHDB.setAttribute('highest_price', highestPrice);
                newHDB.setAttribute('lowest_price', lowestPrice);
                document.querySelector("#hdb").appendChild(newHDB);
            });

            // Display mean and median for each flat type
            Object.entries(groupedByFlatType).forEach(([flatType, prices]) => {
                const mean = calculateMean(prices);
                const median = calculateMedian(prices);
                
                const newHDB = document.createElement('hdb-card');
                newHDB.setAttribute('town', selectedTown);
                newHDB.setAttribute('flat_type', flatType);
                newHDB.setAttribute('mean_price', mean);
                newHDB.setAttribute('median_price', median);
                document.querySelector("#hdb").appendChild(newHDB);
            });
        } catch (error) {
            console.error("Error fetching HDB data:", error);
        }
    });
}

function calculateMean(prices) {
    const sum = prices.reduce((acc, price) => acc + price, 0);
    return (sum / prices.length).toFixed(2);
}

function calculateMedian(prices) {
    const sortedPrices = prices.sort((a, b) => a - b);
    const mid = Math.floor(sortedPrices.length / 2);

    if (sortedPrices.length % 2 === 0) {
        return ((sortedPrices[mid - 1] + sortedPrices[mid]) / 2).toFixed(2);
    } else {
        return sortedPrices[mid].toFixed(2);
    }
}

document.addEventListener("DOMContentLoaded", loadActivity);

