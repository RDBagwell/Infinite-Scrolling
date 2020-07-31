const apiKey = "p6HhWJToxq6VoGnN-xRGkH_2zIR0FL7MNBR56Oj3YTo";
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];

function setAttributes(elements, attributes){
    
}

function displayPhotos(){
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

getPhotos();
