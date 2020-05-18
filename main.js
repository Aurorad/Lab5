"use strict";

let loaderDiv = document.createElement('div');
loaderDiv.classList.add('d-flex');
loaderDiv.classList.add('justify-content-center');
loaderDiv.style.margin = '25px';
let loader = document.createElement('div');
loader.classList.add('spinner-border');
loader.setAttribute('role', 'status');
loaderDiv.append(loader);



function load(x) {
    let httpRequest;
    if(window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    }
    else if (window.ActiveXObject) {
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        }catch (e) {
            try {
                httpRequest = ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }
    loaderDiv.remove();
    httpRequest.onreadystatechange = function(){
        if(httpRequest.readyState === 4 && httpRequest.status === 200) {
            let myJSON = httpRequest.responseText;
            let ob = JSON.parse(myJSON);
            for(let i=0; i<ob.results.length; i+=5){
                let div = document.createElement('div');
                div.classList.add('row');
                div.style.margin = "0px";
                div.classList.add('container-fluid');
                for(let j=0; j<5; j++){
                    let img = document.createElement('img');
                    img.setAttribute('src', ob.results[i+j].picture.large);

                    img.classList.add('img-fluid');
                    img.classList.add('col');
                    img.classList.add('image');
                    img.style.padding = '15px';
                    div.append(img);

                }
                document.getElementById('mainDiv').append(div);
            }
        }
    };
    httpRequest.open('GET', 'https://randomuser.me/api/?results='+x,true);
    httpRequest.send();
}
window.onload = load(50);

window.addEventListener('scroll', function() {
    let documentHeight = document.documentElement.getBoundingClientRect().bottom;
    let y = document.documentElement.clientHeight;
    if(documentHeight<= y+100) {
        document.body.append(loaderDiv);
        setTimeout(load, 5000, 25);
    }

});
