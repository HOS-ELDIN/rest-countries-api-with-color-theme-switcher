// ! dark mode variables
let darkSwitch = document.querySelector(".dark-sw");
let page = document.querySelector("html");

// ! search input
let search = document.querySelector("#search");

// ! region selector variables
let RegionUl = document.querySelector("ul.region");
let RegionSelect = document.querySelector(".region-select");
let regions = document.querySelectorAll("ul li");

// ! all countries container
let countriesContainer = document.querySelector(".countries-container");
// ! main and details pages
let mainContainer = document.querySelector(".main.container");
let singleContainer = document.querySelector(".single.container");

// ! details page variales
let backButton = document.querySelector("button.back");
let flag = document.querySelector(".large-flag");
let countryNameDetails = document.querySelector(".country-name");
let nativeName = document.querySelector(".native-name");
let populationDetails = document.querySelector(".population-detailed");
let regionDetails = document.querySelector(".region-detailed");
let subRegion = document.querySelector(".sub-region");
let capitalDetails = document.querySelector(".Capital-detailed");
let topDomain = document.querySelector(".top-domain");
let currencies = document.querySelector(".currencies");
let language = document.querySelector(".language");
let bordersCountries = document.querySelector(".borders-container");

// ! coding variables
let filter = "";
let countryCode;

// set dark mode based on local storage
setDarkmode();

// run fetching to get the countries
fetchData(filter);

// dark mode switch
darkSwitch.onclick = (e) => {
	page.classList.toggle("dark");
	addDarkStatusToLocalStorage();
};

// get dark mode status and save it to local storage
function addDarkStatusToLocalStorage() {
	if (page.className == "") {
		localStorage.setItem("darkMode", false);
	} else {
		localStorage.setItem("darkMode", true);
	}
}

// set the mode from local storage
function setDarkmode() {
	if (localStorage.getItem("darkMode") != null) {
		// console.log("yes i have data");
		if (localStorage.getItem("darkMode") == "true") {
			// console.log("i am dark");
			page.classList.add("dark");
		} else {
			// console.log("i am white");
			page.classList.remove("dark");
		}
	} else {
		// console.log("no i dont have data");
		page.classList.add("dark");
	}
}

// selector menu
RegionSelect.onclick = (e) => {
	RegionUl.classList.toggle("hidden");
};

// get the selected region
regions.forEach((reg) => {
	reg.addEventListener("click", () => {
		filter = reg.innerHTML.trim();
		if (filter == "All") {
			filter = "";
		}
		// console.log(filter);
		filterByRigon(filter);
		RegionSelect.click();
		search.value = "";
	});
});

// handle back click
backButton.onclick = () => {
	mainContainer.classList.remove("hidden");
	singleContainer.classList.add("hidden");
};

// filter the countries by region
function filterByRigon(filter) {
	countriesContainer.innerHTML = "";

	// console.log(filter);
	fetchData(filter);
}

// fetching function
function fetchData(filter) {
	// console.log(filter);
	fetch(
		"https://restcountries.com/v3.1/all?fields=name,flags,capital,region,currencies,languages,population,subregion,tld,ccn3,cca3,borders"
	)
		.then((response) => {
			let data = response.json();
			return data;
		})
		.then((countriesData) => {
			// creating all countries on page
			creatMainPageAllCountries(countriesData, filter);

			// run get country code by click
			let allPageCountries = document.querySelectorAll(".country");
			getCountryCode(allPageCountries, countriesData);

			// searching on
			searching(countriesData, filter);
		});
}

// create all countries on main page
function creatMainPageAllCountries(countriesData, filter) {
	for (let i = 0; i < countriesData.length; i++) {
		if (
			countriesData[i].region.toLowerCase() == filter &&
			countriesData[i].name.common != "Israel"
		) {
			createCountry(countriesData[i]);
		} else if (filter == "" && countriesData[i].name.common != "Israel") {
			createCountry(countriesData[i]);
		}
	}
}

// creating countries function
function createCountry(countryObject) {
	//create country main div
	let country = document.createElement("div");
	country.classList.add("country");
	country.setAttribute("data-code", countryObject.ccn3);

	// create flag img
	let flag = document.createElement("img");
	flag.src = countryObject.flags.png;
	flag.alt = countryObject.flags.alt;
	country.appendChild(flag);

	// create info div
	let info = document.createElement("div");
	country.appendChild(info);

	// create h3
	let countryNameHeading = document.createElement("h3");
	let countryName = document.createTextNode(countryObject.name.common);
	countryNameHeading.appendChild(countryName);
	info.appendChild(countryNameHeading);

	// create first div
	let population = document.createElement("div");
	let populationText = document.createTextNode("Population: ");
	let populationSpan = document.createElement("span");
	let populationSpantext = document.createTextNode(countryObject.population);
	info.appendChild(population);
	population.appendChild(populationText);
	population.appendChild(populationSpan);
	populationSpan.appendChild(populationSpantext);

	// create second div
	let region = document.createElement("div");
	let regionText = document.createTextNode("Region: ");
	let regionSpan = document.createElement("span");
	let regionSpantext = document.createTextNode(countryObject.region);
	info.appendChild(region);
	region.appendChild(regionText);
	region.appendChild(regionSpan);
	regionSpan.appendChild(regionSpantext);

	// create third div
	let capital = document.createElement("div");
	let capitalText = document.createTextNode("Capital: ");
	let capitalSpan = document.createElement("span");
	let capitalSpantext = document.createTextNode(countryObject.capital);
	info.appendChild(capital);
	capital.appendChild(capitalText);
	capital.appendChild(capitalSpan);
	capitalSpan.appendChild(capitalSpantext);

	countriesContainer.appendChild(country);
}

// get country code by click
function getCountryCode(allPageCountries, countriesData) {
	allPageCountries.forEach((child) => {
		child.addEventListener("click", () => {
			countryCode = child.dataset.code;
			getCountryObjectByCode(countryCode, countriesData);
		});
	});
}
// get country all data by code
function getCountryObjectByCode(countryCode, countriesData) {
	for (let i = 0; i < countriesData.length; i++) {
		if (countriesData[i].ccn3 == countryCode) {
			// fill the data on the details page
			createSelectedCountryDetailsPage(countriesData[i], countriesData);
		}
	}
}

// create details page
function createSelectedCountryDetailsPage(countryObject, countriesData) {
	// switch to details page
	mainContainer.classList.add("hidden");
	singleContainer.classList.remove("hidden");

	// flag src & alt
	flag.src = countryObject.flags.png;
	flag.alt = countryObject.flags.alt;

	// country name in details page
	countryNameDetails.innerHTML = countryObject.name.common;

	//native name in detais page
	let nativeNameKey = Object.keys(countryObject.name.nativeName)[0];
	nativeName.innerHTML = countryObject.name.nativeName[nativeNameKey].common;

	// population
	populationDetails.innerHTML = countryObject.population;

	// region
	regionDetails.innerHTML = countryObject.region;
	// sub region
	subRegion.innerHTML = countryObject.subregion;

	// capital
	capitalDetails.innerHTML = countryObject.capital;

	// top domain
	topDomain.innerHTML = countryObject.tld;

	//currencies
	let currenciesKeys = Object.keys(countryObject.currencies);
	let currenciesArray = [];
	for (let i = 0; i < currenciesKeys.length; i++) {
		currenciesArray.push(countryObject.currencies[currenciesKeys[i]].name);
	}
	currencies.innerHTML = currenciesArray.join(", ");

	// languages
	let langKeys = Object.keys(countryObject.languages);
	let lang = [];
	for (let i = 0; i < langKeys.length; i++) {
		lang.push(countryObject.languages[langKeys[i]]);
	}
	language.innerHTML = lang.join(", ");

	//borders
	// create borders array
	let bordersArray = [];
	if (countryObject.borders.length > 0) {
		for (let index = 0; index < countryObject.borders.length; index++) {
			for (let i = 0; i < countriesData.length; i++) {
				if (
					countriesData[i].cca3 == countryObject.borders[index] &&
					countriesData[i].name.common != "Israel"
				) {
					bordersArray.push(countriesData[i].name.common);
				}
			}
		}
	} else {
		bordersArray.push("--");
	}

	//clear previous borders
	bordersCountries.innerHTML = "";

	// create borders in page
	for (let i = 0; i < bordersArray.length; i++) {
		let border = document.createElement("span");
		border.classList.add("border-country");
		border.appendChild(document.createTextNode(bordersArray[i]));
		bordersCountries.appendChild(border);
	}

	let bordersSpans = document.querySelectorAll(".border-country");
	fetchByName(bordersSpans, countriesData);
}

// fetch by search
function fetchOnSearch(countriesData, filter) {
	// console.log(filter);

	if (search.value != "") {
		fetch(`https://restcountries.com/v3.1/name/${search.value}`)
			.then((respo) => {
				let data = respo.json();
				return data;
			})
			.then((countries) => {
				// console.log(filter);
				if (countries.length == 1) {
					if (countries[0].region.toLowerCase() == filter) {
						createSelectedCountryDetailsPage(countries[0], countriesData);
					} else if (filter == "") {
						// console.log(filter);
						// console.log("empty");
						createSelectedCountryDetailsPage(countries[0], countriesData);
					} else {
						countriesContainer.innerHTML = "";
					}
				} else if (countries.length > 1) {
					countriesContainer.innerHTML = "";
					creatMainPageAllCountries(countries, filter);

					// get country code by click
					let allPageCountries = document.querySelectorAll(".country");
					getCountryCode(allPageCountries, countriesData);
				}
			});
	}
}

// searching function
function searching(countriesData, filter) {
	search.onkeydown = (e) => {
		if (e.key === "Enter") {
			// console.log("enter");
			fetchOnSearch(countriesData, filter);
		}
	};

	search.oninput = () => {
		fetchOnSearch(countriesData, filter);

		if (search.value == "") {
			countriesContainer.innerHTML = "";
			fetchData(filter);
		}
	};
}

// handle clicking on borders
function fetchByName(bordersSpans, countriesData) {
	bordersSpans.forEach((span) => {
		span.addEventListener("click", (e) => {
			if (span.innerHTML != "--") {
				anyCountryName = span.innerHTML;
				fetch(`https://restcountries.com/v3.1/name/${anyCountryName}`)
					.then((respo) => {
						let data = respo.json();
						return data;
					})
					.then((countries) => {
						createSelectedCountryDetailsPage(countries[0], countriesData);
					});
			}
		});
	});
}
