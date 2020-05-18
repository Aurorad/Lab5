"use strict";

let loaderDiv = document.createElement('div');
loaderDiv.classList.add('d-flex');
loaderDiv.classList.add('justify-content-center');
loaderDiv.style.margin = '25px';
let loader = document.createElement('div');
loader.classList.add('spinner-border');
loader.setAttribute('role', 'status');
loaderDiv.append(loader);

function Load(x) {
    return new Promise(function (resolve, reject) {
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
        httpRequest.open('GET', 'https://randomuser.me/api/?results='+x,true);
        httpRequest.onload = function () {
            if (this.status === 200) {
                resolve(httpRequest);
            } else {
                let error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        httpRequest.onerror = function () {
            reject (new Error ("Network Error"));
        };
        httpRequest.send();
    }).then(response=>{
        let myJSON = response.responseText;
        let ob = JSON.parse(myJSON);
        return ob;
    })
        .then(
            ob=>{
                loaderDiv.remove();
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
            },
            error => {
                console.log(error);
            }
        )
}
window.onload = function () {
    Load(50);
};

window.addEventListener('scroll', function() {
    let documentHeight = document.documentElement.getBoundingClientRect().bottom;
    let y = document.documentElement.clientHeight;
    if(documentHeight<= y+100) {
        document.body.append(loaderDiv);
        //setTimeout(load, 5000, 25);
        setTimeout(Load, 3000, 25);
    }

});