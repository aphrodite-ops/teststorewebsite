/*This file gets all user inputs from mouse and keyboard(and in the future
    possibly other things such as a webcam or phonescreen)*/

const canvas = document.getElementById("canv") //canvas
let ctrl; //is ctrl pressed
let alt;
let shift;
let meta;
let keys; //key currently pressed
let is_pressed; //this will store wether or not the mouse is pressed
let mouse_pos; //this will temporarily store the moust position


//get mouse position
window.addEventListener("mousemove",function get_mouse_pos(ev) { 
    mouse_pos=[ev.clientX+this.scrollX-canvas.offsetLeft,ev.clientY+this.scrollY-canvas.offsetTop]; //mouse position. the this.scrollX/this.scrollY is to so you can scroll through the page and stil have the pen draw at the right location
})

//mouse down->is_pressed=true
//mouse up->is_pressed=false

//set is_pressed to true when the mouse is down
window.addEventListener("mousedown", function get_mouse_click(ev) {
    is_pressed=true;
})
//set is_pressed to false when the mouse is up
window.addEventListener("mouseup", function get_mouse_up(ev) {
    is_pressed=false;
})

//get key pressed
window.addEventListener("keydown",function get_keys(ev) {
    keys=ev.key
    ctrl=ev.ctrlKey
    alt=ev.altKey
    shift=ev.shiftKey
    meta=ev.metaKey

    //prevent website from saving index.html when clicking ctrl+s
    if (ev.ctrlKey && ev.key === 's') {
        ev.preventDefault();
    }
})
window.addEventListener("keyup", function undo_keys(ev) {
    if (ev.key==keys) {
        keys=null
    }
})

export { ctrl, alt, shift, meta, keys, is_pressed, mouse_pos };
