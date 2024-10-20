//define variables
const canvas = document.getElementById("canv") //canvas
const ctx = canvas.getContext("2d");
const ERASE_KEY='x' //keybind to erase

var super_list = []; //this will store the mouse position
var is_pressed = false //this will store wether or not the mouse is pressed

let mouse_pos; //this will temporarily store the moust position
let art = [] //stores all the mouse positions in your current stroke
let ctrl = false //is ctrl pressed
let line_width = 2 //stroke width
let keys = null //key currently pressed

localStorage.setItem("time",0) //sets time to 0

window.addEventListener("mousemove",function get_mouse_pos(ev) { //get mouse position
    mouse_pos=[ev.x,ev.y]; //mouse position
    super_list=mouse_pos;
})

//mouse down->is_pressed=true
//mouse up->is_pressed=false
window.addEventListener("mousedown", function get_mouse_click(ev) { //set is_pressed to true when the mouse is down
    is_pressed=true;
})
window.addEventListener("mouseup", function get_mouse_up(ev) { //set is_pressed to false when the mouse is up
    is_pressed=false;
})

//get key pressed
window.addEventListener("keydown", function is_ctrl(ev) {
    ctrl=ev.ctrlKey
})
window.addEventListener("keydown",function get_keys(ev) {
    keys=ev.key
})
window.addEventListener("keyup", function undo_keys(ev) {
    if (ev.key==keys) {
        keys=null
    }
})
function loop() { //main loop
    //stringify variables before adding them to local storage
    let super_list_serialized=JSON.stringify(super_list);
    let is_pressed_serialized=JSON.stringify(is_pressed);
    
    //add variables to local storage
    localStorage.setItem("isPressed",is_pressed_serialized);
    localStorage.setItem("superList",super_list_serialized);

    if (is_pressed==true) { //draw if the mouse is down

        art.push(mouse_pos); //add mouse pos to art

        if (art.length>=2) { //once you have moved your mose, it begins to draw

            if (keys==ERASE_KEY) {
                ctx.lineWidth=20;
                ctx.strokeStyle='white';
            }
            else {
                ctx.lineWidth=line_width;
                ctx.strokeStyle='black';
            }

            var secend_newest_mouse_pos=art[art.length-2]; //start point of the line
            var newest_mouse_pos=art[art.length-1]; //end point of the line

            //begin to draw line
            ctx.beginPath();
            ctx.moveTo(secend_newest_mouse_pos[0],secend_newest_mouse_pos[1]);
            ctx.lineTo(newest_mouse_pos[0],newest_mouse_pos[1]);
            ctx.stroke(); //draw line
        }
    }
    else { //emptys art once you let go of your mouse button
        art=[];
    }

};
setInterval(loop,1); //run loop
