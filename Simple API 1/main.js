//The user input the name of a country
//The user will input a year
//The returned value is the population list of the country from 1961-2018

document.querySelector('button').addEventListener('click', getPop);

function getPop() {
    let url = 'https://countriesnow.space/api/v0.1/countries/population';
    const countryInput = document.querySelector('#searchCountry').value.trim();
    const yearInput = document.querySelector('#searchYear').value.trim();

    //Ensure both country and year inputs are provided
    if (!countryInput || !yearInput) {
        alert("Please enter a country and a year");
        return;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log("Fetched Data:", data);
            const responseArray = data.data; //Extract the data array
                //Confirm array
            if (Array.isArray(responseArray) && responseArray.length > 0) {
    
                let country = responseArray.find(item => item.country.toLowerCase() === countryInput.toLowerCase());

                if (!country) {
                    document.querySelector('#country').innerHTML = `Country not found: ${countryInput}`;
                    document.querySelector('#year').innerHTML = "";
                    document.querySelector('#population').innerHTML = "";
                    return;
                }

                document.querySelector('#country').innerHTML = `Country: ${country.country}`;

                //Checking if populationCounts exists and has data
                if (Array.isArray(country.populationCounts) && country.populationCounts.length > 0) {
                    let populationRecord = country.populationCounts.find(record => record.year.toString() === yearInput);

                    if (populationRecord) {
                        //Displaying population data
                        document.querySelector("#year").innerHTML = `Year: ${populationRecord.year}`;
                        document.querySelector("#population").innerHTML = `Population: ${populationRecord.value}`;
                    } else {
                        document.querySelector("#year").innerHTML = `No data available for year: ${yearInput}`;
                        document.querySelector("#population").innerHTML = "";
                    }
                } else {
                    document.querySelector("#year").innerHTML = "No population data available.";
                    document.querySelector("#population").innerHTML = "";
                }
            } else {
                console.error("Response does not contain a valid array.");
            }
        })
        .catch(err => console.error("Error fetching data:", err)); 
}
