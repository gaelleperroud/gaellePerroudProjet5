export function getAllCameras(url){    
    fetch (url)
    .then ((res) => {  
        console.log(res);
        return res.json();        
    })
};