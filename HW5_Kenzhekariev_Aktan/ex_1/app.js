const som = document.querySelector("#som");
const usd = document.querySelector("#usd");
const eur = document.querySelector("#eur");

const convert = (elem, target, target2) => {
    elem.addEventListener("input", () => {
        const req = new XMLHttpRequest();
        req.open("GET", "data.json");
        req.setRequestHeader("Content-type", "application/json");
        req.send();
        req.addEventListener("load", () => {
            const response = JSON.parse(req.response);
            if(elem === som){
                target.value = (elem.value / response.usd).toFixed(2);
                target2.value = (elem.value / response.eur).toFixed(2);
            }else if(elem === usd){
                target.value = (elem.value * response.usd).toFixed(2);
                target2.value = (elem.value * response.usd / response.eur).toFixed(2);
            }else if(elem === eur){
                target.value = (elem.value * response.eur).toFixed(2);
                target2.value = (elem.value * response.eur / response.usd).toFixed(2);
            }
            elem.value === "" && (target.value = "");
            elem.value === "" && (target2.value = "");
        })
    })
}
convert(som, usd, eur);
convert(usd, som, eur);
convert(eur, som , usd);