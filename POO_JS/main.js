let memory = document.getElementById('memory');
let score = document.getElementById('score');
let points = 0;
let step = 1;
let p1,p2;
let timer = null;




'112233445566'
.split('')
.map(x => [x,Math.random()])
.sort( (a,b) => a[1]-b[1])

.forEach(function(pic){
    let p = document.createElement('img');
    p.src = 'pics/spr0.png';
    p.src0 = 'pics/spr'+pic[0]+'.png';
    p.clicked = false;
    memory.appendChild(p);
});

function check(){
    clearTimeout(timer);
    p1.clicked = p2.clicked = false;
    if (p1.src==p2.src){
        // effacer les images
        memory.replaceChild(document.createElement('span'), p1);
        memory.replaceChild(document.createElement('span'), p2);
        points += 50;
    } else {
        // retourner les images
        p1.src = p2.src = 'pics/spr0.png';
        points = Math.max(0, points-10);
    }
    score.textContent = points;
    step = memory.getElementsByTagName('img').length==0 ? 4 : 1;
    if (step==4) score.textContent += ' WIN!';
}

document.addEventListener('click', function(e){
    let t = e.target;
    switch(step){
        case 1: // cliquer sur la 1ere image
        if (t.tagName=='IMG' && !t.clicked){
            t.clicked = true;
            t.src = t.src0;
            p1 = t;
            step = 2;
        }
        break;
        case 2: // cliquer sur la 2eme image
        if (t.tagName=='IMG' && !t.clicked){
            t.clicked = true;
            t.src = t.src0;
            p2 = t;
            step = 3;
            timer = setTimeout(check, 1000);
        }
        break;
        case 3: // si 3eme click
        check();
        break;
    }


});






class Chrono {
	constructor(options) {
		// selectors
		this.bStart = options.bStart;
		this.bReset = options.bReset;
		this.output = options.output;
		this.lap = options.lap;
		// init vars
		this.start = 0;
		this.end = 0;
		this.diff = 0;
		this.timeID = 0;
	}

	main() {
		// Fri Sep 22 2017 13:10:35 GMT+0200
		// only check 13:10:35
		this.end = new Date();
		// Thu Jan 01 1970 01:00:01 GMT+0100
		// only check  01:00:01
		this.diference = new Date(this.end - this.start);
		let d = this.diference,
			msec = d.getMilliseconds(),
			sec = d.getSeconds(),
			min = d.getMinutes(),
			hr = d.getHours() - 1; //  01:00:00 = 00:00:00
		// add 0
		if (min < 10) min = "0" + min; // 04
		if (sec < 10) sec = "0" + sec; // 03
		// add 0 or 00
		if (msec < 10) msec = "00" + msec;
		else if (msec < 100)
			// 00 3
			msec = "0" + msec; // 0 99
		// output 0:00:00:000
		this.output.textContent = `${hr}:${min}:${sec}:${msec}`;
		// timeout
		this.timerID = setTimeout(() => this.main(), 10);
	}
	
	run(type) {
		
		switch (type) {
			case "start":
				
				this.bStart.innerHTML = '<i class="fa fa-pause"></i>';
				this.bStart.className = "start isPause";
				
				this.bStart.onclick = () => this.run("pause");
				this.bReset.onclick = () => this.run("reset");
				
				this.start = new Date();
				
				this.main();
				break;
			case "continue":
				
				this.bStart.innerHTML = '<i class="fa fa-pause"></i>';
				this.bStart.className = "start isPause";
				
				this.bStart.onclick = () => this.run("pause");
				this.bReset.onclick = () => this.run("reset");
				
				this.start = new Date(new Date() - this.diference);
				
				this.main();
				break;
			case "pause":
				
				this.bStart.innerHTML = '<i class="fa fa-play"></i>';
				this.bStart.className = "start";
				
				this.bStart.onclick = () => this.run("continue");
				this.bReset.onclick = () => this.run("stopReset");
				
				clearTimeout(this.timerID);
				break;
			case "lap":
				
				let time = this.output.innerHTML;
				this.lap.innerHTML += `<em>${time}</em><br/>`;
				break;
			case "reset":
				
				this.lap.innerHTML = "";
				
				this.output.textContent = "0:00:00:000";
				
				this.start = new Date();
				break;
			case "stopReset":
				
				this.lap.innerHTML = "";
			
				this.output.textContent = "0:00:00:000";
			
				this.bReset.onclick = () => this.run("start");
				break;
		}
	}
}

const _ = element => {
	return document.querySelector(element);
};

const chrono = new Chrono({
	
	bStart: _(".start"),
	bReset: _(".reset"),
	output: _(".chrono"),
	lap: _(".lap")
});


_(".start").onclick = () => chrono.run("start");
_(".reset").onclick = () => chrono.run("reset");
_(".addLap").onclick = () => chrono.run("lap");
