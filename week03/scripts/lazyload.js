document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent = document.lastModified;

 const options = {
      root: null,
      rootMargin: "10px",
      threshold: 0
   };

  const observer = new IntersectionObserver(callback, options);  

  var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));

  lazyImages.forEach((lazyImage)=> {
    observer.observe(lazyImage);
  });

 function callback(entries, observer){
    entries.forEach((entry) => {
        const target = entry.target;
        const dataSrc = target.getAttribute('data-src');        
        if (entry.isIntersecting) {   
            target.classList.add("fade")     
            target.setAttribute('src', dataSrc);
           observer.unobserve(target);
        }        
      });    
  };