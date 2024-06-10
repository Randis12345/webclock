const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const degconversion = 3.1415/180
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
let sizeperc;

function drawtextcenter(x,y,text){
	const textmetric = ctx.measureText(text);
	const textwidth = textmetric.width;
	//console.log(text,textwidth)
	const textheight = textmetric.actualBoundingBoxAscent + textmetric.actualBoundingBoxDescent;
	ctx.fillText(text, x-textwidth/2, y+textheight/2);

}

function drawhand(t,nummax,amount,distance=22){
	distance*=sizeperc;
	let num = parseInt(t%nummax);
	if (nummax==12 && num == 0) num = 12;
	const angle = (num/nummax+0.75)*3.1415*2
	for (let i = 1; i <= amount; i++){
		drawtextcenter(Math.cos(angle)*i*distance + canvas.width/2,Math.sin(angle)*i*distance + canvas.height/2,num);
	}
	return angle
}


let time;
function main(){
    canvas.height = document.documentElement.clientHeight*0.95;
    canvas.width = canvas.height
    sizeperc = canvas.width/600;
	
	date = new Date()
	time = date .getTime()-date.getTimezoneOffset()*minute;
	//console.log(time)

	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	ctx.font = `${parseInt(sizeperc*18*0.5)}px serif`;
	drawhand(time/second,60,20,11);

	ctx.font = `${parseInt(sizeperc*18)}px serif`;
	drawhand(time/minute,60,10);
	drawhand(time/hour,12,6);
	for(let i = 0; i < 60; i++){
		drawhand(i,60,1,280);
	}
	for(let i = 0; i < 12; i++){
		drawhand(i,12,1,250);
	}
	//ctx.font = "24px serif";
	//drawhand(time/second,60,6)
	window.requestAnimationFrame(main); 
}
window.requestAnimationFrame(main); 