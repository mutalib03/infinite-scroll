
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let photosArray =[]
let ready = false
let imagesLoaded = 0;
let totalImages


//////unsplash api
let count = 5;
const apiKey = 'mvaPNTy8xiLCm7ud7Cn1pDvtnfNre4obotWlUqiIEfM'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

/// check if all images were loaded
function imgLoaded(){ 
    
    imagesLoaded++ 
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
       loader.hidden = true;
       imagesLoaded = 0
       

        console.log('ready =', ready);
    }
    
}
///// helper function to set Attributes on DOM Elements
function setAttributes (element, attributes){
    for (const key in  attributes) {
       element.setAttribute(key, attributes[key])
      }
}

///// create elements for links & photos, Add to Dom
function displayPhotos(){
   
    totalImages = photosArray.length
    console.log('totalImages', totalImages)
   /// run function foreach object in photosArray
    photosArray.forEach(photo => {   
        //// create <a> to link to unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html)
        item.setAttribute('target', "_blank")
        item.setAttribute('class', "mutalib")
    //   setAttributes(item, {
    //       href: photo.links.html,
    //       target: "_blank",
    //       class: "mutalib"
    //   })
      
        //// create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular)
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
      
        // setAttributes(img, {
        //     src : photo.links.html,
        //     alt : photo.alt_description,
        //     title : photo.alt_description
        // })
      
        /// event listener,  check when each is finished loading
      img.addEventListener('load', imgLoaded)
        /// put <img> inside <a>, then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
    

}

//get photos from Unsplash API 
 async function getPhotos() {  
    try{
     const reponse = await fetch(apiUrl)
     photosArray = await reponse.json()
     console.log(photosArray)

     displayPhotos()
       }catch(error){
console.log(error)
    }
}

/// check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll',()=> {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
     ready = false
        getPhotos()
    }
})
getPhotos() 