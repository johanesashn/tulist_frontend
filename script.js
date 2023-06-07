const nav = document.querySelector('nav.main')
const navContent = document.querySelector('nav .content')
const navRight = document.querySelector('nav .right')
const navSpan = document.querySelectorAll('nav span')
const navH2 = document.querySelector('nav h2')
const navSocialA = document.querySelectorAll('nav .content .social a')
const navImagesA = document.querySelectorAll("nav .content .images a img")
const navHeaderH1 = document.querySelectorAll("nav .content .header h1")
const projectH2 = document.querySelectorAll('.about .projects h2')
const project = document.querySelector('.about .projects')
const jumButton = document.querySelectorAll('.jumbotron button')
const skillCards = document.querySelectorAll(".skills .fill .cards .card")
const skillH2 = document.querySelectorAll(".skills .fill .cards .card h2")

for (let i = 0; i < jumButton.length; i++){
    let delay = i*0.3
    jumButton[i].style.animation = `2s ${delay} jump infinite`
}

navRight.addEventListener("click", function(){
    navContent.classList.toggle("slide")
    navSpan.forEach((span)=>{
        span.classList.toggle('slide')
    })

    navH2.classList.toggle('slide')
    nav.classList.toggle('main')

    navSocialA.forEach((a, i) => {
        let delay = .8 + i*0.3
        a.classList.toggle('slide')
    })

    navImagesA.forEach((a, i) => {
        let delay = .8 + i*0.3
        a.classList.toggle('slide')
    })

    navHeaderH1.forEach((h1, i)=>{
        let delay = i*0.1
        h1.classList.toggle("slide")
        h1.style.animationDelay = `${delay}s`
    })
})

for(let i = 0; i < projectH2.length; i++){
    projectH2[i].addEventListener("click", function(){
        projectH2[i].classList.add("active")
        for (let j = 0; j < projectH2.length; j++){
            if (j != i){
                projectH2[j].classList.remove("active")
            }
        }
    })  
}

let prevScrollPos = window.pageYOffset

window.onscroll = function(){
    let curScrollPos = window.pageYOffset
    if (nav.classList.contains("main")){
        if (prevScrollPos > curScrollPos){
            nav.style.top = "0"
        } else {
            nav.style.top = "-100px"
        }
        prevScrollPos = curScrollPos
    }
}

skillCards.forEach((card, i) => {
    card.addEventListener("click", function(){
        for (let i = 0; i < skillCards.length; i++){
            skillCards[i].classList.remove('active');
        }
        card.classList.toggle("active")
    })
})

if (skillH2.style.display == "none") {
    console.log("true")
}