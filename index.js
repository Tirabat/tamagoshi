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

let eat = 100
let game = 100
let sleep = 0
let water = 100
let drink1 = 100
let health = 100
let virus = 0
let job = 0

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
        health = Math.min(100, health - 5)
    }
    else {
        health = Math.min(100, health + 5)
    }
}

stamina.innerHTML = game + '% 🔋'
hungerH.innerHTML = eat + '% 🍗'
fatigue.innerHTML = sleep + '% 😴'
wash1.innerHTML = water + '% 🚿'
drinker.innerHTML = drink1 + '% 💧'
healer.innerHTML = health + '% ❤️'
tostudy.innerHTML = job + '% 📚 '

button.addEventListener('click', () => {
    if (choice.value === 'food') {
        if (eat < 100 && sleep < 100) {
            eat = Math.min(eat + rnd(6, 25), 100);
            game = Math.min(game + rnd(6, 15), 100);
            sleep = Math.max(0, Math.min(sleep + rnd(1, 10), 100));
            water = Math.max(0, Math.min(water - rnd(1, 5), 100));
            drink1 = Math.max(0, Math.min(drink1 + rnd(1, 5), 100));
            talk.innerHTML = 'Бен поел и готов играть'
            heal()
            virusi()
        }
        else if (eat === 100) {
            talk.innerHTML = 'Бен уже сыт и не хочет еще'
            return
        }
        else if (sleep === 100) {
            talk.innerHTML = 'Бен очень хочет спать и не может сейчас есть'
        }
    }
    else if (choice.value === 'play') {
        if (game > 0 && eat > 0 && sleep < 100 && drink1 > 0) {
            eat = Math.max(0, Math.min(eat - rnd(11, 35), 100));
            sleep = Math.max(0, Math.min(sleep + rnd(10, 30), 100));
            game = Math.max(0, Math.min(game - rnd(11, 30), 100));
            water = Math.max(0, Math.min(water - rnd(6, 15), 100));
            drink1 = Math.max(0, Math.min(drink1 - rnd(11, 45), 100));
            talk.innerHTML = 'Бен поиграл и теперь у него урчит в животе'
            heal()
            virusi()
        }
        else if (sleep === 100) {
            talk.innerHTML = 'Бен очень устал и нуждается в отдыхе'
            return
        }
        else if (game === 0) {
            talk.innerHTML = 'Бен измотан и нуждается в подкреплении'
            return
        }
        else if (eat === 0) {
            talk.innerHTML = 'Бен голоден и не может дальше играть'
            return
        }
        else if (drink1 === 0) {
            talk.innerHTML = 'Бен хочет пить'
            return
        }
    }
    else if (choice.value === 'sleep') {
        if (sleep > 0 && eat > 0 && water > 0 && drink1 > 0) {
            sleep = Math.max(0, Math.min(sleep - rnd(11, 20), 100));
            game = Math.max(0, Math.min(game + rnd(16, 35), 100));
            eat = Math.max(0, Math.min(eat - rnd(6, 20), 100));
            water = Math.max(0, Math.min(water - rnd(16, 35), 100));
            drink1 = Math.max(0, Math.min(drink1 - rnd(1, 25), 100));
            talk.innerHTML = 'Бен поспал и немного проголадался'
            virusi()
        }
        else if (sleep === 0) {
            talk.innerHTML = 'Бен полон сил и не хочет спать'
            return
        }
        else if (eat <= 0) {
            talk.innerHTML = 'Бен голоден и не может спать'
            return
        }
        else if (water <= 0) {
            talk.innerHTML = 'Бен не может лечь спать грязным'
            return
        }
        else if (drink1 === 0) {
            talk.innerHTML = 'Бен не может уснуть, он хочет пить'
            return
        }
    }
    else if (choice.value === 'wash') {
        if (water === 100) {
            talk.innerHTML = 'Бен и так чистый'
            return
        }
        else if (water < 100) {
            water = Math.min(100, water + rnd(21, 50))
            game = Math.max(0, game - rnd(1, 5));
            talk.innerHTML = 'Бен помылся и готов дальше узнавать этот мир'
            heal()
            virusi()
        }
    }
    else if (choice.value === 'drink') {
        if (drink1 < 100) {
            drink1 = Math.min(100, drink1 + rnd(15, 35))
            talk.innerHTML = 'Бен попил и теперь готов продолжать'
            virusi()
        }
        else if (drink1 === 100) {
            talk.innerHTML = 'Бен и так много попил и больше не сможет'
            return
        }
    }
    else if (choice.value === 'heal') {
        if (virus === 0) {
            talk.innerHTML = 'Бен здоров и не нуждается в лечении'
            return
        }
        else if (virus === 1) {
            virus = 0
            health = 100
            talk.innerHTML = 'Бен выздоровил'
        }
    }
    else if (choice.value === 'study') {
        if (job < 100) {
            if (rnd(1, 100) <= 4) {
                sleep = Math.max(0, Math.min(sleep - rnd(5, 15), 100))
                talk.innerHTML = 'Вы немного задремали'
            }
            else {
                job = Math.min(100, job + rnd(1, 15))
                talk.innerHTML = 'Бен стал умнее'
                sleep = Math.max(0, Math.min(sleep + rnd(1, 10), 100));
                virusi
            }
        }
        else if (job === 100) {
            talk.innerHTML = 'Бен настоящий гений и не нуждается в этих ваших учебниках'
            return
        }
    }

    stamina.innerHTML = game + '% 🔋'
    hungerH.innerHTML = eat + '% 🍗'
    fatigue.innerHTML = sleep + '% 😴'
    wash1.innerHTML = water + '% 🚿'
    drinker.innerHTML = drink1 + '% 💧'
    healer.innerHTML = health + '% ❤️'
    tostudy.innerHTML = job + '% 📚 '

})