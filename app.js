const canvas = document.getElementById("canv")
const ctx = canvas.getContext("2d");
console.log(canvas)
var super_list=[]; //this will store the mouse position
var is_pressed=false //this will store wether or not the mouse is pressed
let mouse_pos; //this will temporarily store the moust position
let size=5 //size of squares
let art=[]
let col="red" //color of squares
let ctrl=false
let undo=false
let keys=null //keys pressed
localStorage.setItem("time",0)//current time

window.addEventListener("mousemove",function get_mouse_pos(ev) { //get mouse position
    mouse_pos=[ev.x,ev.y]; //mouse position
    super_list=mouse_pos;
});

//mouse down->is_pressed=true
//mouse up->is_pressed=false
window.addEventListener("mousedown", function get_mouse_click(ev) { //set is_pressed to true when the mouse is down
    is_pressed=true;
});
window.addEventListener("mouseup", function get_mouse_up(ev) { //set is_pressed to false when the mouse is up
    is_pressed=false;
});
window.addEventListener("keydown", function is_ctrl(ev) { //is control pressed
    ctrl=ev.ctrlKey
})

//assign a value for keys
window.addEventListener("keydown",function get_keys(ev) { //say when a key is pressed
    keys=ev.key
})
window.addEventListener("keyup", function undo_keys(ev) { //say when a key has stopped being pressed
    if (ev.key==keys) {
        keys=null
    }
})

function loop() { //main loop
    let super_list_serialized=JSON.stringify(super_list);
    let is_pressed_serialized=JSON.stringify(is_pressed);
    
    localStorage.setItem("isPressed",is_pressed_serialized);
    localStorage.setItem("superList",super_list_serialized);

    
    if (ctrl && keys=='z') { //undo art when ctrl+z is pressed
        ctx.fillStyle='white' //switch pen to eraser
        ctx.fillRect(art[art.length-1][0],art[art.length-1][1],size,size) //erase
        art.pop(art.length-1) //remove from art
    };

    if (is_pressed==true) { //draw
        ctx.fillStyle=col //set pen color
        ctx.fillRect(mouse_pos[0],mouse_pos[1],size,size); //place squares
        art.push(mouse_pos) //add to art
    };
};
setInterval(loop,1); //run loop
