/* =================================
   VINTAGE JOURNAL SCRIPT
================================= */


/* ==============================
   ELEMENTS
============================== */


const book = document.getElementById("book");
const cover = document.getElementById("cover");
const music = document.getElementById("music");

const pages = document.querySelectorAll(".page");

let currentPage = 0;
let opened = false;



/* ==============================
   OPEN JOURNAL
============================== */


cover.addEventListener("click", () => {


    if(!opened){

        book.classList.add("open");

        opened = true;


        // start music after interaction
        if(music){

            music.volume = 0.35;
            music.play();

        }


        createDust();


    }


});



/* ==============================
   PAGE TURNING
============================== */


const buttons = document.querySelectorAll(".next");


buttons.forEach((button,index)=>{


    button.addEventListener("click",()=>{


        if(currentPage < pages.length){


            pages[currentPage]
            .classList.add("flipped");


            currentPage++;


            if(currentPage === pages.length-1){

                celebration();

            }


        }


    });


});



/* First page button */

const firstButton =
document.getElementById("next1");


if(firstButton){


firstButton.addEventListener("click",()=>{


    pages[0].classList.add("flipped");

    currentPage++;


});


}



/* ==============================
   TYPEWRITER EFFECT
============================== */


function typeWriter(element,text,speed=50){


    let i=0;


    element.innerHTML="";


    function write(){


        if(i < text.length){


            element.innerHTML += text.charAt(i);

            i++;


            setTimeout(write,speed);


        }


    }


    write();


}



/* Example usage:

const letter =
document.querySelector(".letter-text");

typeWriter(
letter,
"Happy Birthday..."
);

*/



/* ==============================
   DUST PARTICLES
============================== */


function createDust(){


    for(let i=0;i<40;i++){


        let dust =
        document.createElement("div");


        dust.className="dust";


        dust.style.left =
        Math.random()*100+"vw";


        dust.style.animationDelay =
        Math.random()*10+"s";


        dust.style.animationDuration =
        (8+Math.random()*10)+"s";


        document.body.appendChild(dust);



        setTimeout(()=>{

            dust.remove();

        },18000);



    }


}



/* ==============================
   CONFETTI ENDING
============================== */


function celebration(){


    let duration = 4000;


    let end =
    Date.now()+duration;



    function frame(){


        confetti({

            particleCount:5,

            spread:60,

            origin:{
                x:0
            }

        });



        confetti({

            particleCount:5,

            spread:60,

            origin:{
                x:1
            }

        });



        if(Date.now()<end){

            requestAnimationFrame(frame);

        }


    }


    frame();


}



/* ==============================
   KEYBOARD CONTROLS
============================== */


document.addEventListener(
"keydown",
(event)=>{


    if(event.key==="ArrowRight"){


        if(currentPage < pages.length){


            pages[currentPage]
            .classList.add("flipped");


            currentPage++;

        }


    }


});



/* ==============================
   TOUCH SWIPE SUPPORT
============================== */


let touchStartX=0;


document.addEventListener(
"touchstart",
(e)=>{


    touchStartX =
    e.changedTouches[0].screenX;


});



document.addEventListener(
"touchend",
(e)=>{


    let touchEndX =
    e.changedTouches[0].screenX;



    if(touchStartX-touchEndX > 50){


        if(currentPage < pages.length){


            pages[currentPage]
            .classList.add("flipped");


            currentPage++;


        }


    }


});
