// Fetch all town names
export async function fetchAllHDBdata() {
    const response = await fetch("http://localhost:8081/allhdbdata");
    const hdbArray = await response.json();
    const townNames = [...new Set(hdbArray.map(hdb => hdb.town))];
    return townNames;
}

// Fetch HDB data by selected town
export async function fetchAllHDBdataByTown(town) {
    const response = await fetch(`http://localhost:8081/bytown/${encodeURIComponent(town)}`);
    const hdbArray = await response.json();
    console.log(hdbArray[0]);

    return hdbArray;
}


