const loadCountries = async (region) => {
    const url = `https://restcountries.com/v3.1/${region}`;
    console.log(url)
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCountries(data);
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

const displayCountries = (countries) => {
    console.log(countries)
    const infoSection = document.getElementById('countries-info');
    // console.log(countries)
    countries.forEach(country => {
        // console.log(country)
        const countryDiv = document.createElement('div')
        countryDiv.classList.add('col');
        countryDiv.innerHTML = `
        <div class="card h-100">
        <img src="${country.flags.png}" class="card-img-top" alt="${country.flags.alt}">
        <div class="card-body">
          <h5 class="card-title">Name: ${country.name.common}</h5>
          <p class="card-text">Capital: ${country.capital ? country.capital[0] : 'No capital'}</p>
          <button onclick="loadCountryDetail('${country.cca2}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#countryDetails">
          Details
        </button>
        </div>
      </div>
        `;
        infoSection.appendChild(countryDiv)
    });
}

const loadCountryDetail = async (code) => {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        countryDetail(data[0]);
    } catch (error) {
        console.log(error)
    }
}

const countryDetail = (country) => {
    // console.log(country)
    const countryName = document.getElementById('countryDetailsLabel');
    countryName.innerText = country.name.common;
    const details = document.getElementById('countryDetailsBody');
    details.innerHTML = `
    <img src="${country.flags.png}" class="card-img-top" alt="${country.flags.alt}">
    <p class="fw-medium">Official Name: ${country.name.official}</p>
    <p class="fw-medium">Capital: ${country.capital ? country.capital[0] : 'No capital'}</p>
    <p class="fw-medium">Region: ${country.region}</p>
    <p class="fw-medium">Population: ${country.population}</p>
    `;
}

const dropdownBtn = (region) => {
    const name = document.getElementById(`${region}`);
    const regionName = name.innerText;
    const regionID = `region/${regionName}`;
    // console.log(regionID);
    loadCountries(regionID);
}


loadCountries('all');


