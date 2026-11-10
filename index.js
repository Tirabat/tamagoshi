const choice = document.getElementById("choice")
const button = document.getElementById("button")
const talk = document.getElementById("talk")
const stamina = document.getElementById("stamina")
const fatigue = document.getElementById("fatigue")
const hungerH = document.getElementById("hunger")
const wash1 = document.getElementById("wash1")
const drinker = document.getElementById("drinker")
const healer = document.getElementById("healer")
const tostudy = document.getElementById("tostudy")
const pupu = document.getElementById("pupu")
const houer = document.getElementById("houer")
const sleepInput = document.getElementById("sleepInput")

let eat = 100
let game = 100
let sleep = 0
let water = 100
let drink1 = 100
let health = 100
let virus = 0
let job = 0
let hour = 12
let pipi = 0

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function heal() {
    if (virus === 0) {
        if (rnd(1, 100) <= 15) {
            virus = 1
            talk.innerHTML = 'Бен заболел и теперь его здоровье будет только ухудшаться'
        }
    }
}
function virusi() {
    if (virus === 1) {
        health = Math.max(0, health - 5)
    } else {
        health = Math.min(100, health + 5)
    }
}
function hourer(){
    if (hour < 23){
        hour += 1
    } else if (hour === 23){
        hour = 0
    }
}
function updateUI() {
    stamina.innerHTML = game + '% 🔋'
    hungerH.innerHTML = eat + '% 🍗'
    fatigue.innerHTML = sleep + '% 😴'
    wash1.innerHTML = water + '% 🚿'
    drinker.innerHTML = drink1 + '% 💧'
    healer.innerHTML = health + '% ❤️'
    tostudy.innerHTML = job + '% 📚'
    pupu.innerHTML = pipi + '% 🚽'
    houer.innerHTML = hour + ':00 🕒'
}

choice.addEventListener('change', () => {
    if (choice.value.trim() === 'sleep') {
        sleepInput.style.display = 'inline-block'
    } else {
        sleepInput.style.display = 'none'
    }
})

updateUI()

button.addEventListener('click', () => {
    const currentChoice = choice.value.trim(); 

    if (currentChoice === 'food') {
        if (eat < 100 && sleep < 100) {
            eat = Math.min(eat + rnd(1, 15), 100);
            game = Math.min(game + rnd(6, 15), 100);
            sleep = Math.min(sleep + rnd(1, 10), 100);
            water = Math.max(0, water - rnd(1, 5));
            drink1 = Math.min(drink1 + rnd(1, 5), 100);
            pipi = Math.min(pipi + rnd(1, 10), 100); 
            talk.innerHTML = 'Бен поел и готов играть'
            heal()
            virusi()
            hourer()
        } else if (eat === 100) {
            talk.innerHTML = 'Бен уже сыт и не хочет еще'
        } else if (sleep === 100) {
            talk.innerHTML = 'Бен очень хочет спать и не может сейчас есть'
        }
    }
    
    else if (currentChoice === 'cook'){
        if (sleep < 100 && game > 0 && eat < 100){ 
            eat = Math.min(eat + rnd(10, 30), 100);
            sleep = Math.max(0, sleep - rnd(5, 20));
            game = Math.max(0, game - rnd(10, 25));
            pipi = Math.min(pipi + rnd(5, 20), 100); 
            talk.innerHTML = 'Вы приготовили еду для Бена'
            hourer()
            virusi()
        } else if (sleep === 100){
            talk.innerHTML = 'Бен устал и не может готовить'
        } else if (eat === 100){ 
            talk.innerHTML = 'Бен сыт и нет нужды готовить'
        }
    }
    
    else if (currentChoice === 'play') {
        if (game > 0 && eat > 0 && sleep < 100 && drink1 > 0) {
            eat = Math.max(0, eat - rnd(11, 35));
            sleep = Math.min(sleep + rnd(10, 30), 100);
            game = Math.max(0, game - rnd(11, 30));
            water = Math.max(0, water - rnd(6, 15));
            drink1 = Math.max(0, drink1 - rnd(11, 45));
            talk.innerHTML = 'Бен поиграл и теперь у него урчит в животе'
            heal()
            health = Math.min(100, health + 15)
            if (health === 100){
                virus === 0
            }
            hourer()
        } else if (sleep === 100) {
            talk.innerHTML = 'Бен очень устал и нуждается в отдыхе'
        } else if (game === 0) {
            talk.innerHTML = 'Бен измотан и нуждается в подкреплении'
        } else if (eat === 0) {
            talk.innerHTML = 'Бен голоден и не может дальше играть'
        } else if (drink1 === 0) {
            talk.innerHTML = 'Бен хочет пить'
        }
    }
    
    else if (currentChoice === 'sleep') {
        let hours = Number(sleepInput.value) || 1;
        if (hours < 1) hours = 1;
        if (hours > 12) hours = 12;

        if (sleep > 0 && eat > 0 && water > 0 && drink1 > 0) {
            sleep = Math.max(0, sleep - (rnd(10, 15) * hours));
            game = Math.min(100, game + (rnd(10, 20) * hours));
            eat = Math.max(0, eat - (rnd(5, 10) * hours));
            water = Math.max(0, water - (rnd(5, 12) * hours));
            drink1 = Math.max(0, drink1 - (rnd(5, 15) * hours));
            
            for (let i = 0; i < hours; i++) {
                hourer();
            }

            talk.innerHTML = 'Бен поспал ' + hours + ' ч. и проголодался';
            virusi()
        } else if (sleep === 0) {
            talk.innerHTML = 'Бен полон сил и не хочет спать'
        } else if (eat <= 0) {
            talk.innerHTML = 'Бен голоден и не может спать'
        } else if (water <= 0) {
            talk.innerHTML = 'Бен не может лечь спать грязным'
        } else if (drink1 === 0) {
            talk.innerHTML = 'Бен не может уснуть, он хочет пить'
        }
    }
    
    else if (currentChoice === 'wash') {
        if (water === 100) {
            talk.innerHTML = 'Бен и так чистый'
        } else {
            water = Math.min(100, water + rnd(21, 50))
            game = Math.max(0, game - rnd(1, 5));
            pipi = Math.min(pipi + rnd(5, 15), 100); 
            talk.innerHTML = 'Бен помылся и готов дальше узнавать этот мир'
            heal()
            virusi()
            hourer()
        }
    }
    
    else if (currentChoice === 'drink') {
        if (drink1 < 100) {
            drink1 = Math.min(100, drink1 + rnd(15, 35))
            pipi = Math.min(pipi + rnd(10, 30), 100); 
            talk.innerHTML = 'Бен попил и теперь готов продолжать'
            virusi()
            hourer()
        } else if (drink1 === 100) {
            talk.innerHTML = 'Бен и так много попил и больше не сможет'
        }
    }
    
    else if (currentChoice === 'heal') {
        if (virus === 0) {
            talk.innerHTML = 'Бен здоров и не нуждается в лечении'
        } else if (virus === 1) {
            virus = 0
            health = 100
            talk.innerHTML = 'Бен выздоровел'
        }
    }
    
    else if (currentChoice === 'study') {
        if (job < 100) {
            if (rnd(1, 100) <= 4) { 
                sleep = Math.max(0, sleep - rnd(5, 15))
                talk.innerHTML = 'Вы немного задремали'
            } else {
                job = Math.min(100, job + rnd(1, 15))
                talk.innerHTML = 'Бен стал умнее'
                sleep = Math.min(sleep + rnd(1, 10), 100);
            }
            pipi = Math.min(pipi + rnd(1, 10), 100); 
            virusi()
            hourer()
        } else if (job === 100) {
            talk.innerHTML = 'Бен настоящий гений и не нуждается в этих ваших учебниках'
        }
    }
    
    else if (currentChoice === 'pipi') { 
        if (pipi > 0) { 
            pipi = Math.max(0, pipi - rnd(20, 50)); 
            drink1 = Math.max(0, drink1 - rnd(5, 15)); 
            talk.innerHTML = 'Бен чувствует облегчение'
            virusi()
            hourer()
        } else if (pipi === 0) { 
            talk.innerHTML = 'Бену незачем туда идти'
        }
    }

    updateUI()
})
