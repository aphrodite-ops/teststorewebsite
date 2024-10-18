
var super_list=[]; //this will store the mouse position
var is_pressed=false //this will store wether or not the mouse is pressed
let mouse_pos; //this will temporarily store the moust position
localStorage.setItem("time",0)

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


function loop() { //main loop
    let super_list_serialized=JSON.stringify(super_list);
    let is_pressed_serialized=JSON.stringify(is_pressed);
    
    localStorage.setItem("isPressed",is_pressed_serialized);
    localStorage.setItem("superList",super_list_serialized);
    
    console.log(localStorage.getItem("isPressed"));
    
};
setInterval(loop,1); //run loop
