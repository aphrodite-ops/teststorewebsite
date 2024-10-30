//imports
import { draw_line, pen } from "./pen.js";
import { ctrl, alt, shift, meta, keys, is_pressed, mouse_pos} from "./inputs.js";
import { get_pen_col, get_tool } from "./getElementVals.js"
import rectangle from "./rectangle.js"
import line from "./line.js"

//define variables
//constants
const canvas = document.getElementById("canv") //canvas
const ERASE_KEY='x' //keybind to erase

//variable
let line_width = 3; //pen size
let prev_key; //last key pressed
let prev_is_pressed; //previously pressed key
let prev_mouse_pos; //previous mouse position
let ctx_cop=[]; //stores data on context(explanation in info)
let bg_col='white'; //current background color
let pen_col='black'; //current pen color
let cur_tool='pen'; //tool currently being
let mouse_pos_start_rect; //anchored corner of rectangle
let mouse_pos_start_line; //starting point of line
let ctx = canvas.getContext("2d"); //2d context of canvas

localStorage.setItem("time",0); //time spent on website. //this isn't really being used but i may aswell keep it here¯\_(ツ)_/¯

//function to save canvas as a png
function save_canvas() {
    if (confirm("Do you want to save this drawing?")) {
        const download_link=document.createElement('a'); //add a temperory link to download the canvas
        download_link.href=canvas.toDataURL(); //set the download_link's link to an encoded version of the canvas
        download_link.download="canvas.png"; //set the filename of download_link's file
        download_link.click(); //automatically download it
    }
}

//fills screen with background color
function delete_canvas(type) {
    /*Normal mode simply fills the screen with the current background color
    Force mode on the other hand. deletes the context data(ctx_cop). which means you can't regenerate the context*/
    if (type=='normal') {
        ctx.fillStyle=bg_col;
        ctx.fillRect(0,0,canvas.width, canvas.height); //fill canvas with white
    }
    if (type=='force') {
        ctx_cop=['']; //deletes ctx_cop(context data)
        /**if you're wandering why it sets ctx_cop=[''] instead of just ctx_cop=[]. the padding the empty string is just padding for other code*/
        ctx.fillStyle=bg_col;
        ctx.fillRect(0,0,canvas.width, canvas.height); //fill canvas with white
    }
}

//generates an object from the context data
function gen_obj(obj) {
    ctx.lineWidth=obj[2];
    ctx.strokeStyle=obj[3]
    //part of a pen stroke
    if (obj[0]==='pen') {
        pen(obj[1],ctx);
    }
    //a rectangle
    if (obj[0]==='rect') {
        rectangle(obj[1],ctx);
    }
    //a line
    if (obj[0]==='line') {
        line(obj[1],ctx)
    }
}

//regenerate the entire screen from the context data(ctx_cop)
function gen_canvas(canv) {
    let obj;
    for (let i=0; i<canv.length; i++) {
        obj=canv[i];
        gen_obj(obj)
        console.log(i)
    }
}

//fill screen with white when starting
delete_canvas('normal')

//main loop
function loop() {

    //save image you have drawn
    if (keys=='s' && ctrl && (prev_key!='s')) {
        save_canvas()
    }

    pen_col=get_pen_col() //change pen color
    cur_tool=get_tool() //change current tool

    //erase canvas
    if (keys=='Delete') {
        delete_canvas('force')
    }

    //set up constents related to the pen and eraser
    //constants when using eraser
    if (keys==ERASE_KEY) {
        ctx.lineWidth=100;
        ctx.strokeStyle=bg_col;
    }
    //constants when using pen
    else {
        ctx.lineWidth=line_width;
        ctx.strokeStyle=pen_col;
    }


    //Draw with various tools
    //draw if the mouse is down
    if (cur_tool=="pen") {
        if (is_pressed==true) {

            //once you have moved your mose, it begins to draw
            ctx_cop.push(pen([prev_mouse_pos,mouse_pos],ctx));
        }
    }
    //draw with rectangle tool
    if (cur_tool=="rectangle") {
        if (is_pressed) {

            if (!prev_is_pressed) {
                mouse_pos_start_rect=mouse_pos
            }

            //art.push([mouse_poss[0][0],mouse_poss[0][1],mouse_poss[1][0],mouse_poss[1][1]])

            if (mouse_pos!=prev_mouse_pos) {
                if (ctx_cop[ctx_cop.length-1][0]==='rect') {
                    ctx_cop.pop()
                }
                ctx_cop.push(rectangle([mouse_pos_start_rect,mouse_pos],ctx));
            }
        }
        if (!is_pressed && prev_is_pressed) {
            ctx_cop.pop();
            ctx_cop.push(rectangle([mouse_pos_start_rect,mouse_pos],ctx));
            ctx_cop.push(['','']);
        }
    }
    //draw line tool
    if (cur_tool=="line") {
        if (is_pressed) {

            if (!prev_is_pressed) {
                mouse_pos_start_line=mouse_pos;
            }

            if (mouse_pos!=prev_mouse_pos) {
                ctx_cop.pop()
                ctx_cop.push(line([mouse_pos_start_line,mouse_pos],ctx));
            }
        }
        if (!is_pressed && prev_is_pressed) {
            ctx_cop.pop();
            ctx_cop.push(line([mouse_pos_start_line,mouse_pos],ctx));
            ctx_cop.push('')
        }
    }

    //set previous keys
    prev_key=keys;
    prev_is_pressed=is_pressed;
    prev_mouse_pos=mouse_pos;
    delete_canvas('normal');
    gen_canvas(ctx_cop);


    requestAnimationFrame(loop); //run loop
};

requestAnimationFrame(loop); //run loop
