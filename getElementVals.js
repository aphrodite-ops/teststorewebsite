/*This file contains all the function to get values from the
    html elements such as sliders, textboxes, colorboxes, etc*/

//get the color in the color box
function get_pen_col() { //get the color in the color box
    const col=document.getElementById("pen_color").value;
    return col;
}

//get the current selected tool
function get_tool() {
    const tool=document.getElementById("tools").value;
    return tool;
}

export { get_pen_col, get_tool };
