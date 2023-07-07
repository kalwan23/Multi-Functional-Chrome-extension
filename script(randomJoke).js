const jokebtn=document.getElementById("jokebtn");

jokebtn.addEventListener('click', ()=>{
    if(jokeElement.innerHTML==""){
        fetch('https://icanhazdadjoke.com/slack')
        .then(data => data.json())
        .then(jokeData =>{
            const jokeText=jokeData.attachments[0].text;
            const jokeElement=document.getElementById('jokeElement');

            jokeElement.innerHTML=jokeText;
        })
    }else{
        jokeElement.innerHTML="";
    }
});