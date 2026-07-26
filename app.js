const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const fromSelect = document.querySelector("#from");
const toSelect = document.querySelector("#to");

const fromImg = document.querySelector(".box:first-child img");
const toImg = document.querySelector(".box:last-child img");

const amountInput = document.querySelector("#amount");
const btn = document.querySelector("#btn");
const result = document.querySelector(".result");


// Add currencies in dropdown

for (let currCode in countryList) {

    let option1 = document.createElement("option");
    option1.value = currCode;
    option1.innerText = currCode;

    let option2 = document.createElement("option");
    option2.value = currCode;
    option2.innerText = currCode;


    if(currCode === "USD"){
        option1.selected = true;
    }

    if(currCode === "INR"){
        option2.selected = true;
    }


    fromSelect.append(option1);
    toSelect.append(option2);

}



// Update flag

function updateFlag(select, img){

    let currency = select.value;

    let countryCode = countryList[currency];

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;

}


fromSelect.addEventListener("change",()=>{
    updateFlag(fromSelect,fromImg);
});


toSelect.addEventListener("change",()=>{
    updateFlag(toSelect,toImg);
});




// Convert Currency

async function convertCurrency(){

    let amount = Number(amountInput.value);


    if(amount <= 0 || isNaN(amount)){
        amount = 1;
        amountInput.value = 1;
    }


    let from = fromSelect.value.toLowerCase();
    let to = toSelect.value.toLowerCase();


    try{


        const response = await fetch(
            `${BASE_URL}/${from}.json`
        );


        const data = await response.json();


        const rate = data[from][to];


        let finalAmount = amount * rate;


        result.innerText =
        `${amount} ${fromSelect.value} = ${finalAmount.toFixed(2)} ${toSelect.value}`;


    }
    catch(error){

        result.innerText = "Unable to fetch exchange rate";

        console.log(error);

    }

}



btn.addEventListener("click", (e)=>{

    e.preventDefault();

    convertCurrency();

});


// Default conversion on page load

window.addEventListener("load",()=>{

    convertCurrency();

});
