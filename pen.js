function draw_line(pos1,pos2,ctx) {
    /*pos1 is the first pos. it starts the line at pos1, and ends it at pos2*/
    ctx.beginPath();
    ctx.moveTo(pos1[0],pos1[1]);
    ctx.lineTo(pos2[0],pos2[1]);
    ctx.stroke();
}

function draw_with_pen(ctx) {
    /*second_newest_mouse_pos was an earlier positon of the mouse, while
    newest_mouse_pos is the current position of the mouse. the way it draws 
    is by drawing small lines connecting second_newest_mouse_pos to
    newest_mouse_pos*/
    let second_newest_mouse_pos=art[art.length-2]; //start point of the line
    let newest_mouse_pos=art[art.length-1]; //end point of the line

    //draw line
    draw_line(second_newest_mouse_pos,newest_mouse_pos,ctx);

}

export {draw_with_pen };
