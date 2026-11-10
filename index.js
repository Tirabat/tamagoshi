const choice = document.getElementById("choice")
const button = document.getElementById("button")
const talk = document.getElementById("talk")
const stamina = document.getElementById("stamina")
const fatigue = document.getElementById("fatigue")
const hungerH = document.getElementById("hunger")

let eat = 100
let game = 100
let sleep = 0

function eater() {
    return Math.floor(Math.random() * 10) + 1
}
function sleeper() {
    return Math.floor(Math.random() * 20) + 16
}
function sleeper1() {
    return Math.floor(Math.random() * 10) + 11
}
function gamer() {
    return Math.floor(Math.random() * 10) + 6
}
function gamer1() {
    return Math.floor(Math.random() * 20) + 11
}
function fatiguer() {
    return Math.floor(Math.random() * 10) + 1
}
function hunger() {
    return Math.floor(Math.random() * 25) + 11
}
function hunger1() {
    return Math.floor(Math.random() * 15) + 6
}
function fatiguer1() {
    return Math.floor(Math.random() * 20) + 1
}

stamina.innerHTML = game + '% 🔋'
hungerH.innerHTML = eat + '% 🍗'
fatigue.innerHTML = sleep + '% 😴'

button.addEventListener('click', () => {
    if (choice.value === 'food') {
        if (eat < 100 && sleep < 100) {
            eat = Math.min(eat + eater(), 100);
            game = Math.min(game + gamer(), 100);
            sleep = Math.max(0, Math.min(sleep + fatiguer(), 100));
            talk.innerHTML = 'Бен поел и готов играть'
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
        if (game > 0 && eat > 0 && sleep < 100) {
            eat = Math.max(0, Math.min(eat - hunger(), 100));
            sleep = Math.max(0, Math.min(sleep + fatiguer1(), 100));
            game = Math.max(0, game - gamer1());
            talk.innerHTML = 'Бен поиграл и теперь у него урчит в животе'
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
    }
    else if (choice.value === 'sleep') {
        if (sleep > 0) {
            sleep = Math.max(0, Math.min(sleep - sleeper1(), 100));
            game = Math.max(0, Math.min(game + sleeper(), 100));
            eat = Math.max(0, Math.min(eat - hunger1(), 100));
            talk.innerHTML = 'Бен поспал и немного проголадался'
        }
        else if (sleep === 0) {
            talk.innerHTML = 'Бен полон сил и не хочет спать'
            return
        }
    }
    stamina.innerHTML = game + '% 🔋'
    hungerH.innerHTML = eat + '% 🍗'
    fatigue.innerHTML = sleep + '% 😴'
})