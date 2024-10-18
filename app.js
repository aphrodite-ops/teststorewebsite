
var super_list=[]; //this will store the mouse position
let mouse_pos; //this will temporarily store the moust position
localStorage.setItem("time",0)

window.addEventListener("mousemove",function get_mouse_pos(ev) { //get mouse position
    mouse_pos=[ev.x,ev.y]; //mouse position
    super_list=mouse_pos;
});

function loop() { //main loop
    let super_list_serialized=JSON.stringify(super_list);
    localStorage.setItem("superList",super_list_serialized);
    console.log(localStorage.getItem("superList"))
    
};
setInterval(loop,1); //run loop
