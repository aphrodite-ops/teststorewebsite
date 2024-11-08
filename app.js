//imports
import { pen } from "./pen.js";
import { ctrl, alt, shift, meta, keys, is_pressed, mouse_pos, down_key, abs_mouse_pos } from "./inputs.js";
import { line_width, tool, stroke_col, font_size, cur_font } from "./getElementVals.js";
import rectangle from "./rectangle.js";
import line from "./line.js";
import create_text from "./text.js";

//define variables
//constants
const canvas = document.getElementById("canv"); //canvas
const ERASE_KEY='x' //keybind to erase
const textBox=document.getElementById("textBox")
const text_options=document.getElementById("textOptions");
const font_selection=document.getElementById("fonts")

//variable
let prev_key; //last key pressed
let prev_shift;
let prev_is_pressed; //previously pressed key
let prev_mouse_pos; //previous mouse position
let ctx_cop=[['-'],['-'],['-'],['-'],['-']]; //stores data on context(explanation in info)
let bg_col='white'; //current background color
let pen_col='black'; //current pen color
let cur_stroke=[];
let text="";
let typing=false;
let cur_tool='pen'; //tool currently being
let mouse_pos_start_rect; //anchored corner of rectangle
let mouse_pos_start_line; //starting point of line
let text_pos;
let text_pos_rel;
let ctx = canvas.getContext("2d"); //2d context of canvas
let finished_typing=false;
let selecting_element = (document.activeElement != textBox);

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
        //ctx.fillStyle=bg_col;
        ctx.clearRect(0,0,canvas.width, canvas.height); //fill canvas with white
    }
    if (type=='force') {
        ctx_cop=[['-'],['-'],['-'],['-'],['-']]; //deletes ctx_cop(context data)
        /**if you're wandering why it sets ctx_cop=[''] instead of just ctx_cop=[]. the padding the empty string is just padding for other code*/
        //ctx.fillStyle=bg_col;
        ctx.clearRect(0,0,canvas.width, canvas.height); //fill canvas with white
    }
}

//generates an object from the context data
function gen_obj(obj) {
    const init_lineWidth=ctx.lineWidth;
    const init_strokeStyle=ctx.strokeStyle;
    const init_fillStyle=ctx.fillStyle;
    ctx.lineWidth=obj[2];
    ctx.strokeStyle=obj[3];
    ctx.fillStyle=obj[3]
    //part of a pen stroke
    if (obj[0]==='stroke') {
        for (let j=0; j<obj[1].length; j++) {
            pen(obj[1][j][1],ctx);
        }
    }
    if (obj[0]==='pen') {
        pen(obj[1],ctx)
    }
    //a rectangle
    if (obj[0]==='rect') {
        rectangle(obj[1],ctx);
    }
    //a line
    if (obj[0]==='line') {
        line(obj[1],ctx)
    }
    if (obj[0]==='text') {
        const init_font=ctx.font
        ctx.font=obj[5]
        create_text(obj[1],obj[4],ctx);
        ctx.font=init_font
    }
    ctx.lineWidth=init_lineWidth;
    ctx.strokeStyle=init_strokeStyle;
    ctx.fillStyle=init_fillStyle;

}

//regenerate the entire screen from the context data(ctx_cop)
function gen_canvas(canv) {
    let obj;
    for (let i=0; i<canv.length; i++) {
        obj=canv[i];
        gen_obj(obj)
    }
}

function get_font(fz,font) {
    return fz.toString().concat("px ").concat(font)
}

function undo() {
    ctx_cop.pop()
    return ctx_cop.pop();
}

function commit_text() {
    typing=false
    text=textBox.value
    textBox.hidden=true
    ctx_cop.push(create_text(text_pos_rel,text,ctx));
    ctx_cop.push('')
    text=""
    textBox.value = ""
    finished_typing=true
}

//fill screen with white when starting
delete_canvas('normal')

//main loop
function loop() {
    selecting_element = (document.activeElement!=textBox && document.activeElement!=document.body);
    //save image you have drawn
    if (keys=='s' && ctrl && (prev_key!='s')) {
        save_canvas()
    }

    cur_tool=tool //change current tool

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
        ctx.strokeStyle=stroke_col
        ctx.lineWidth=line_width
        ctx.font=get_font(font_size,cur_font)
    }


    //Draw with various tools
    //draw if the mouse is down
    if (cur_tool=="pen") {
        if (is_pressed==true) {
            //once you have moved your mose, it begins to draw
            cur_stroke.push(pen([prev_mouse_pos,mouse_pos],ctx));
            ctx_cop.push(pen([prev_mouse_pos,mouse_pos],ctx));
        }
        if (!is_pressed && prev_is_pressed) {
            for (let i=ctx_cop.length-1; ctx_cop[i][0]==='pen'; i--) {
                ctx_cop.pop()
            }
            ctx_cop.push(['stroke',cur_stroke,ctx.lineWidth,ctx.strokeStyle]);
            cur_stroke=[]
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
            if (!mouse_pos_start_rect) {
                mouse_pos_start_rect=mouse_pos;
            }
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
            if (!mouse_pos_start_line) {
                mouse_pos_start_line=mouse_pos;
            }
            ctx_cop.pop();
            ctx_cop.push(line([mouse_pos_start_line,mouse_pos],ctx));
            ctx_cop.push('')
        }
    }
    if (cur_tool=='text') {
        text_options.hidden=false
        if (is_pressed && !prev_is_pressed && !typing && !finished_typing && !selecting_element) {
            typing=true
            text_pos=abs_mouse_pos
            text_pos_rel=mouse_pos
            textBox.style.top=text_pos[1].toString().concat("px")
            textBox.style.left=text_pos[0].toString().concat("px")
            textBox.style.font=ctx.font
            textBox.hidden=false
            textBox.focus()
            textBox.onblur = commit_text
        }
        if (typing) {
            if (ctx_cop[ctx_cop.length-1][0]==='text') {
                ctx_cop.pop()
            }
        }
    }
    else {
        text_options.hidden=true
    }

    //set previous keys
    prev_key=keys;
    prev_is_pressed=is_pressed;
    prev_shift=shift;
    prev_mouse_pos=mouse_pos;
    finished_typing=false
    delete_canvas('normal');
    gen_canvas(ctx_cop);


    requestAnimationFrame(loop); //run loop
};

requestAnimationFrame(loop); //run loop
