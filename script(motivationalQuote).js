const quotebtn=document.getElementById("quotebtn");

quotebtn.addEventListener('click', ()=>{
    if(quoteElement.innerHTML==""){
        fetch('https://api.quotable.io/random')
        .then(data => data.json())
        .then(quoteData =>{
            const quoteText=quoteData.content;
            const quoteElement=document.getElementById('quoteElement');

            quoteElement.innerHTML=quoteText;
        })
    }else{
        quoteElement.innerHTML="";
    }
});

