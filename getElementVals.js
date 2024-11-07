/*This file contains all the function to get values from the
    html elements such as sliders, textboxes, colorboxes, etc*/

const strokeStyle=document.getElementById("pen_color");
const tools=document.getElementById("tools");
const lineWidth=document.getElementById("size");
const fontSize=document.getElementById("fontSize")
const font=document.getElementById("fonts")

let stroke_col=strokeStyle.value;
let tool=tools.value;
let line_width=lineWidth.value;
let font_size=fontSize.value;
let cur_font=font.value;

lineWidth.addEventListener("change", (ev) => {
    line_width = ev.target.value
})

tools.addEventListener("change", (ev) => {
    tool = ev.target.value
})

strokeStyle.addEventListener("change", (ev) => {
    stroke_col=ev.target.value;
})


fontSize.addEventListener("change", (ev) => {
    font_size=ev.target.value;
})

font.addEventListener("change", (ev) => {
    cur_font=ev.target.value;
})

export { line_width, tool, stroke_col, font_size, cur_font };
