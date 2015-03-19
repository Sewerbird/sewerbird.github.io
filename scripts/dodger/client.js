var gameState = {}
function run(tgt){
	gameState = reset(gameState,tgt)
	setInterval(function(){
		update(gameState,0.01)
	},10)
	setTimeout(window.onresize,11)
}
function reset(gamestate,displayDiv){
	refreshViewPortDimensions(gamestate, displayDiv)
	//Normalize size
	return {
		player : {
			okay : true,
			pos : {
				x:500/2,
				y:500/2 - 200
			},
			motion : {
				dx : 0,
				dy : 0,
				speed : 80
			},
			size:7
		},
		entities : [],
		time: 0,
		lastSpawn : 0,
		score: 0,
		field_w: 500,
		field_h: 500,
		bound_r: 200,
		viewport : gamestate.viewport,
		sprng: seed(2015),
		display: displayDiv,
		mouse_pos: {
			x:250,
			y:250,
			locked: true,
		},
		highScore : Math.floor(Math.max(_.isFinite(gamestate.highScore)?gamestate.highScore:gamestate.score, gamestate.score))
	}
}
function update(gamestate, dt){
	if(!gamestate.player.okay)
	{
		gameState = reset(gamestate,gamestate.display)
		return;
	}
	gamestate.time += dt
	//Update player
	if(!gamestate.mouse_pos.locked)
	{
		var rel_pos = {
			x : gamestate.player.pos.x - (gamestate.mouse_pos.x * gamestate.viewport.wR),
			y : gamestate.player.pos.y - (gamestate.mouse_pos.y * gamestate.viewport.hR)
		}
		var mag = Math.sqrt((rel_pos.x * rel_pos.x)+(rel_pos.y*rel_pos.y))
		rel_pos.x /= mag > 1 ? mag : 1 
		rel_pos.y /= mag > 1 ? mag : 1
		gamestate.player.pos.x += -rel_pos.x * Math.min(dt * gamestate.player.motion.speed,mag)
		gamestate.player.pos.y += -rel_pos.y * Math.min(dt * gamestate.player.motion.speed,mag)
	}
	if(getDistance(gamestate.player.pos,{x:gamestate.field_w/2,y:gamestate.field_h/2}) > gamestate.bound_r + gamestate.player.size)
	{
		//Player went off play area and dies
		gamestate.player.okay = false
	}
	//Spawn new entities
	if(gamestate.time - gamestate.lastSpawn > 0.15)
	{
		gamestate.entities.push(generateFallingEntity(gamestate))
		gamestate.lastSpawn = gamestate.time
	}
	//update entities
	gamestate.entities = _.filter(gamestate.entities, function(entity, n){
		var motion = entity.motion(dt);
		entity.pos.x += motion.dx
		entity.pos.y += motion.dy
		//Detect player collision
		var distance = getDistance(entity.pos, gamestate.player.pos);
		if(_.isFinite(distance) && distance < entity.size + gamestate.player.size)
		{
			gamestate.player.okay = false;
		}
		var offset = gamestate.player.size + entity.size
		return getDistance(entity.pos, {x:gamestate.field_w/2,y:gamestate.field_h/2}) < (gamestate.bound_r+(entity.size*2))
	})
	//Update score
	gamestate.score += 20 * dt * (gamestate.bound_r - getDistance(gamestate.player.pos,{x:gamestate.field_w/2,y:gamestate.field_h/2})) / gamestate.bound_r
	draw(gamestate);
}

function generateFallingEntity(gamestate){
	var s = gamestate.sprng() * 25
	var w = gamestate.sprng() * 12 + 5
	var angle = Math.PI * 2 * gamestate.sprng()
	var x = Math.sin(angle);
	var y = Math.cos(angle);
	return {
		size : w,
		pos : {
			x : x * (gamestate.bound_r + w) + gamestate.field_w/2,
			y : y * (gamestate.bound_r + w) + gamestate.field_h/2
		},
		motion : function(dt){
			return {dx:-x*s*dt,dy:-y*s*dt}
		}
	}
}

function seed(s) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};

function getDistance(pos_a,pos_b){
	if(_.isFinite(pos_a.x) && _.isFinite(pos_a.y) && _.isFinite(pos_b.x) && _.isFinite(pos_b.y)){
		return Math.sqrt(Math.pow((pos_a.x - pos_b.x),2) + Math.pow((pos_a.y - pos_b.y),2))
	} else{
		return NaN;
	}
}

function mouseDown(evt)
{
	evt.preventDefault()
	gameState.mouse_pos.locked = false
}

function mouseMove(evt)
{
	evt.preventDefault()
	gameState.mouse_pos.x = evt.offsetX
	gameState.mouse_pos.y = evt.offsetY
}

function mouseUp(evt)
{
	evt.preventDefault()
	gameState.mouse_pos.locked = true
}

function touchStart(evt)
{
	evt.preventDefault()
	gameState.mouse_pos.locked = false
}

function touchMove(evt)
{
	evt.preventDefault()
	console.log(evt.changedTouches[0])
	gameState.mouse_pos.x = evt.changedTouches[0].clientX
	gameState.mouse_pos.y = evt.changedTouches[0].clientY
}

function touchEnd(evt)
{
	evt.preventDefault()
	gameState.mouse_pos.locked = true
}

function draw(gamestate){
	var display = document.getElementById(gamestate.display)
	//Clear
	while (display.firstChild) {
	    display.removeChild(display.firstChild);
	}
	//Create frame
	var NS="http://www.w3.org/2000/svg";
	var svg=document.createElementNS(NS,"svg");
	svg.setAttribute("width","100%");
	svg.setAttribute("height","100%");
	svg.setAttribute("viewBox","0 0 "+gamestate.field_w+" "+gamestate.field_h)
	svg.setAttribute("id","mdSVGvp")
	//::Draw Bounds
		var bnd = document.createElementNS(NS,"circle")
		bnd.setAttribute("cx",gamestate.field_w/2)
		bnd.setAttribute("cy",gamestate.field_h/2)
		bnd.setAttribute("r",gamestate.bound_r)
		bnd.setAttribute("fill","#CCDDDD")
		bnd.setAttribute("fill-opacity",5)
		bnd.setAttribute("stroke","#FF0000")
		bnd.setAttribute("stroke-dasharray","3 1")
		svg.appendChild(bnd)
	//::Draw hot1Zones
		var hot1 = document.createElementNS(NS,"circle")
		hot1.setAttribute("cx",gamestate.field_w/2)
		hot1.setAttribute("cy",gamestate.field_h/2)
		hot1.setAttribute("r",gamestate.bound_r/10)
		hot1.setAttribute("fill","#EEFFFF")
		hot1.setAttribute("stroke","#00FFFF")
		hot1.setAttribute("stroke-dasharray","3 2")
		svg.appendChild(hot1)
		var hot2 = document.createElementNS(NS,"circle")
		hot2.setAttribute("cx",gamestate.field_w/2)
		hot2.setAttribute("cy",gamestate.field_h/2)
		hot2.setAttribute("r",gamestate.bound_r * 0.25)
		hot2.setAttribute("fill-opacity",0)
		hot2.setAttribute("stroke","green")
		hot2.setAttribute("stroke-dasharray","3 2")
		svg.appendChild(hot2)
		var hot3 = document.createElementNS(NS,"circle")
		hot3.setAttribute("cx",gamestate.field_w/2)
		hot3.setAttribute("cy",gamestate.field_h/2)
		hot3.setAttribute("r",gamestate.bound_r * 0.50)
		hot3.setAttribute("fill-opacity",0)
		hot3.setAttribute("stroke","yellow")
		hot3.setAttribute("stroke-dasharray","3 2")
		svg.appendChild(hot3)
		var hot4 = document.createElementNS(NS,"circle")
		hot4.setAttribute("cx",gamestate.field_w/2)
		hot4.setAttribute("cy",gamestate.field_h/2)
		hot4.setAttribute("r",gamestate.bound_r * 0.75)
		hot4.setAttribute("fill-opacity",0)
		hot4.setAttribute("stroke","orange")
		hot4.setAttribute("stroke-dasharray","3 2")
		svg.appendChild(hot4)
	//::Player
		var guy = document.createElementNS(NS,"circle")
		guy.setAttribute("cx",gamestate.player.pos.x)
		guy.setAttribute("cy",gamestate.player.pos.y)
		guy.setAttribute("r",gamestate.player.size)
		guy.setAttribute("fill",gamestate.player.okay?"green":"gray")
		svg.appendChild(guy)
	//::Falling objects
	_.each(gamestate.entities, function(entity){
		var fig = document.createElementNS(NS,"circle")
		fig.setAttribute("cx",entity.pos.x)
		fig.setAttribute("cy",entity.pos.y)
		fig.setAttribute("stroke","#CC0000")
		fig.setAttribute("fill","#CC0000");
		fig.setAttribute("fill-opacity",10)
		fig.setAttribute("r",entity.size)
		svg.appendChild(fig);
	})
	//::Score
		var txt = document.createElementNS(NS,"text")
		txt.setAttribute("x",gamestate.field_w/2)
		txt.setAttribute("y",25)
		txt.setAttribute("text-anchor","middle")
		txt.setAttribute("fill",_.isFinite(gamestate.highScore) && gamestate.highScore < gamestate.score?"#66FF66":"green")
		var txtNode = document.createTextNode("Score: "+Math.floor(gamestate.score))
		txt.appendChild(txtNode);
		if(_.isFinite(gamestate.highScore))
		{
			var txtH = document.createElementNS(NS,"text")
			txtH.setAttribute("x",gamestate.field_w/2)
			txtH.setAttribute("y",50)
			txtH.setAttribute("text-anchor","middle")
			txtH.setAttribute("fill","green")
			var txtHNode = document.createTextNode("High: "+Math.floor(gamestate.highScore))
			txtH.appendChild(txtHNode);
		}
		svg.appendChild(txt)
	//::Input
		var inp = document.createElementNS(NS, "rect")
		inp.setAttribute("x",0)
		inp.setAttribute("y",0)
		inp.setAttribute("width",gamestate.field_w)
		inp.setAttribute("height",gamestate.field_h)
		inp.setAttribute("fill-opacity",0)
		svg.appendChild(inp)
	//Show
	display.appendChild(svg);
	inp.addEventListener("mousedown", mouseDown, false);
    inp.addEventListener("mouseup", mouseUp, false);
  	inp.addEventListener("mousemove", mouseMove, false);	
  	inp.addEventListener("touchstart", touchStart, false);
    inp.addEventListener("touchend", touchEnd, false);
  	inp.addEventListener("touchmove", touchMove, false);
}
//Page resize stuff
function refreshViewPortDimensions(gamestate, div){
	var tgt = document.getElementById(div)
	var tStyle = window.getComputedStyle(tgt);
	var viewWidth = tStyle.width;
	var viewHeight = tStyle.height;
	if(typeof viewWidth !== "number") viewWidth = viewWidth.replace(/px/g,'');
	if(typeof viewHeight !== "number") viewHeight = viewHeight.replace(/px/g,'');
	gamestate.viewport = {
		w: viewWidth,
		h: viewHeight,
		wR : 500 / viewWidth,
		hR : 500 / viewHeight
	}
}

window.onresize = function(){
	if(gameState.display !== undefined){
		refreshViewPortDimensions(gameState, gameState.display)
	}
}