//imports
import { draw_with_pen } from "./pen";

//define variables
const canvas = document.getElementById("canv") //canvas
const ctx = canvas.getContext("2d");
const ERASE_KEY='x' //keybind to erase

var super_list = []; //this will store the mouse position
let art = [] //stores all the mouse positions in your current stroke
let line_width = 3 //pen size
let prev_key=null //last key pressed
let bg_col='white' //background color
let pen_col='black' //pen color
let cur_tool='pen' //tool currently being

localStorage.setItem("time",0) //sets time to 0



//get mouse position
window.addEventListener("mousemove",function get_mouse_pos(ev) { 
    mouse_pos=[ev.x+this.scrollX,ev.y+this.scrollY]; //mouse position. the this.scrollX/this.scrollY is to so you can scroll through the page and stil have the pen draw at the right location
    super_list=mouse_pos;
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
    console.log(keys)

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

//function to save canvas as a png
function save_canvas() {
    if (confirm("Do you want to save this drawing?")) {
        const download_link=document.createElement('a'); //add a temperory link to download the canvas
        download_link.href=canvas.toDataURL(); //set the download_link's link to an encoded version of the canvas
        download_link.download="canvas.png"; //set the filename of download_link's file
        download_link.click(); //automatically download it
    }
}

//function to convert hexidecimal to rgb
function hex_to_rgb(hex_code) { 
    hex_code=hex_code.replace(/^#/,'');

    let r=parseInt(hex_code.substring(0,2),16)
    let g=parseInt(hex_code.substring(2,4),16)
    let b=parseInt(hex_code.substring(4,6),16)
    return [r,g,b];
}

//get the color in the color box
function get_pen_col() { //get the color in the color box
    const col=document.getElementById("pen_color").value
    return col;
}

function delete_canvas() {
    ctx.fillStyle=bg_col
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function get_tool() {
    const tool=document.getElementById("tools").value
    return tool
}


function change_pen_size() {
    if (keys=='[') {
        line_width-=1
        
    }
    if (keys==']') {
        line_width+=1
    }
}

delete_canvas()

//main loop
function loop() {
    //stringify variables before adding them to local storage
    let super_list_serialized=JSON.stringify(super_list);
    let is_pressed_serialized=JSON.stringify(is_pressed);
    
    //add variables to local storage
    localStorage.setItem("isPressed",is_pressed_serialized);
    localStorage.setItem("superList",super_list_serialized);

    //save image you have drawn
    if (keys=='s' && ctrl && (prev_key!='s')) {
        save_canvas()
    }

    pen_col=get_pen_col() //change pen color
    cur_tool=get_tool()

    //erase canvas
    if (keys=='Delete') {
        delete_canvas()
    }

    //draw if the mouse is down
    if (cur_tool=="pen") {
        if (is_pressed==true) {

            art.push(mouse_pos); //add mouse pos to art

            //once you have moved your mose, it begins to draw
            if (art.length>=2) {

                //set up constents related to the pen and eraser
                //constants when using eraser
                if (keys==ERASE_KEY) {
                    ctx.lineWidth=20;
                    ctx.strokeStyle=bg_col;
                }
                //constants when using pen
                else {
                    ctx.lineWidth=line_width;
                    ctx.strokeStyle=pen_col;
                }

                draw_with_pen(ctx);

            }
        }
        //empty's art once you let go of your mouse button
        else {
            art=[];
        }
    }

    prev_key=keys

    requestAnimationFrame(loop);
};
requestAnimationFrame(loop); //run loop
