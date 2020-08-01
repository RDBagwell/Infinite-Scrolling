const apiKey = "p6HhWJToxq6VoGnN-xRGkH_2zIR0FL7MNBR56Oj3YTo";
let getImageCount = 3;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${getImageCount}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

function imageLoader(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        getImageCount = 30;
    }
}

function setAttributes(elements, attributes){
    for (const key in attributes){
        elements.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo)=>{
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        img.addEventListener('load', imageLoader);


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

window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
        getPhotos();
        ready = false;
        imagesLoaded = 0;
    }
})

getPhotos();
