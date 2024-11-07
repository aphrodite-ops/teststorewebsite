function create_text(mouse_pos,text,ctx) {
    ctx.fillText(text,mouse_pos[0]+3,mouse_pos[1]+ctx.font.split("px")[0]*(13/12));
    
    return ['text',mouse_pos,ctx.lineWidth,ctx.fillStyle,text,ctx.font];
}
export default create_text;
