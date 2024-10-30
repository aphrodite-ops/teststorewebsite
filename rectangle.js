/*rectangle tool*/
function rectangle(mouse_poss,ctx) {
    let start_pos=mouse_poss[0];
    let cur_pos=mouse_poss[1];

    ctx.beginPath()
    ctx.rect(start_pos[0],start_pos[1],cur_pos[0]-start_pos[0],cur_pos[1]-start_pos[1]);
    ctx.stroke();
    return ['rect',mouse_poss,ctx.lineWidth,ctx.strokeStyle];
}

function hi() {
    console.log("hi")
}

export { rectangle, hi };
