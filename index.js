const choice = document.getElementById("choice")
const button = document.getElementById("button")
const talk = document.getElementById("talk")

let eat = 100
let game = 100
let sleep = 0

function eater() {
    return Math.floor(Math.random() * 10) + 1
}
function sleeper() {
    return Math.floor(Math.random() * 20) + 16
}
function gamer(){
    return Math.floor(Math.random() * 10) + 6
}
function fatiguer(){
    return Math.floor(Math.random() * 15) + 1
}
function hunger(){
    return Math.floor(Math.random() * 25) + 11
}

button.addEventListener('click', () =>{
    if (choice.value === 'food'){
        if (eat < 100 && sleep < 100){
            eat = Math.min(eat + eater(), 100);
            game = Math.min(game + gamer(), 100);
            sleep = Math.max(0, Math.min(sleep - fatiguer(), 100));
            talk.innerHTML = 'Бен поел и готов играть'
            return
        }
        else if (eat === 100){
            talk.innerHTML = 'Бен уже ел и не хочет еще'
            return
        }
        else if (sleep === 0){
            talk.innerHTML ='Бен очень хочет спать и не может сейчас есть'
        }
    }
    else if (choice.value === 'play'){
        if (game > 0 && eat > 0 && sleep < 100){
            game = Math.max(0, Math.min(game - hunger(), 100));
            
            talk.innerHTML = 'Бен поиграл и теперь у него урчит в животе'
            return
        }
        else if (game === 1 || eat === 0){
            talk.innerHTML = 'Бен не может сейчас играть'
            return
        }
    }
})