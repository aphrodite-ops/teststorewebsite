/*line tool*/

function line(mouse_poss,ctx) {
    let start_pos=mouse_poss[0]
    let cur_pos=mouse_poss[1]

    ctx.beginPath();
    ctx.moveTo(start_pos[0],start_pos[1]);
    ctx.lineTo(cur_pos[0],cur_pos[1]);
    ctx.stroke();
    return ['line',mouse_poss,ctx.lineWidth,ctx.strokeStyle]
}

export default line;
