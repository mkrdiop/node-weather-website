


// const fetchLocation = (location) => {

//     fetch('http://localhost:3000/weather?address=' + location).then((response) => {

//     response.json().then((data)=>{
//         if (data.error){
//             console.log(data.error)
//         } else{
//             console.log(data)

//         }
        
//     })



// })


// }


const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#country')
//const messageTwo = document.querySelector('#message-2')
const displayTemp = document.querySelector('#temperature')
const displaySummary = document.querySelector('#summary')
const displayImg = document.querySelector('#cloud')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'loading data ....'
    //messageTwo.textContent = ''


    fetch('http://localhost:3000/weather?address=' + location).then((response) => {

        response.json().then((data)=>{
            if (data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            } else{
                console.log(data)
                messageOne.textContent = data.location
                displayTemp.textContent = data.temperature
                displaySummary.textContent = data.summary
                displayImg.src=data.icon
    
            }
            
        })
    
    
    
    })
    
    

   

})

