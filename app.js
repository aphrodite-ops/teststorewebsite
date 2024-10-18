
var super_list=[[],''];
let mouse_pos;
let cur_key;
localStorage.setItem("time",0)

document.body.addEventListener("keydown",function get_key(ev) {
    cur_key=""
    cur_key=ev.key;
    super_list[1]=cur_key;
});
window.addEventListener("mousemove",function get_mouse_pos(ev) {
    mouse_pos=[ev.x,ev.y];
    super_list[0]=mouse_pos;
});
function loop() {
    //if (localStorage.getItem("time")==0) {
    //    
    //}
    let super_list_serialized=JSON.stringify(super_list);
    localStorage.setItem("superList",super_list_serialized);
    let super_list_deserialized=JSON.parse(localStorage.getItem("superList"))
    console.log(localStorage.getItem("superList"))
    
};
setInterval(loop,1);
