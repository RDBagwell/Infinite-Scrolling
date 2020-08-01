let getImageCount = 3;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const apiKey = "p6HhWJToxq6VoGnN-xRGkH_2zIR0FL7MNBR56Oj3YTo";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${getImageCount}`;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

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
        const caption = document.createElement('p');
        caption.classList.add('caption');
        caption.innerText = photo.alt_description;

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
        });
    
        img.addEventListener('load', imageLoader);
        item.appendChild(img);
        imageContainer.appendChild(item);
        imageContainer.appendChild(caption);
        
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
