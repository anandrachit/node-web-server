console.log('Loaded the serverside js file');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();

    const location = search.value;
    console.log(location);
    message1.textContent = 'Loading...';
    fetch(`/weather?address=${location}`).then((res) => {
    res.json().then(data => {
        if(data.error) {
            message1.textContent = data.error;
            return console.log(data.error);
        }
        message1.textContent = data.location;
        message2.textContent = `Current Temperature is ${data.temperature} degrees. There is a ${data.rainProbability}% chance of rain`;
        console.log(data.location);
        console.log(data.temperature);
        console.log(data.rainProbability);
    })
});
})