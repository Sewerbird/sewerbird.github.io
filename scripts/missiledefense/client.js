var gameState = {
	cities : [
		spawnCity(63,350),
		spawnCity(63+75,350),
		spawnCity(63+75*2,350),
		spawnCity(50+63+75*3,350),
		spawnCity(50+63+75*4,350),
		spawnCity(50+63+75*5,350),
		spawnCity(300-20/2,370-20,20,20,true)
	],
	missiles : [],
	explosions : [],
	time: 0,
	HOPE_LIVES: true,
	PROJECTION_ENABLED: true,
	ANALYSIS_ENABLED: true,
	analysis:{
		MAX_EXPLOSIONS_SEEN : 0,
		MAX_MISSILES : 0
	}
}

function showField(id, gamestate){
	//Catch endslate
	if(!gamestate.HOPE_LIVES)
	{
		var svg = document.getElementById("mdSVGvp")
		var NS="http://www.w3.org/2000/svg";
		var fade = document.createElementNS(NS,"rect")
		fade.setAttribute("width",600)
		fade.setAttribute("height",400)
		fade.setAttribute("fill","black")
		fade.setAttribute("fill-opacity", 0.7)
		svg.appendChild(fade)
		var txt = document.createElementNS(NS,"text")
		txt.setAttribute("x",300)
		txt.setAttribute("y",200)
		txt.setAttribute("text-anchor","middle")
		txt.setAttribute("fill","white")
		var txtNode = document.createTextNode("THE END")
		var scoreNode = document.createTextNode("Score: "+Math.floor(gamestate.time))
		txt.appendChild(txtNode);
		txt.appendChild(scoreNode);
		fade.onclick = window.location.reload.bind(window.location)
		svg.appendChild(txt)
		return;
	}
	var display = document.getElementById(id)
	//Clear
	while (display.firstChild) {
	    display.removeChild(display.firstChild);
	}
	//Create frame
	var NS="http://www.w3.org/2000/svg";
	var svg=document.createElementNS(NS,"svg");
	svg.setAttribute("width",600);
	svg.setAttribute("height",400);
	svg.setAttribute("id","mdSVGvp")
	//::Ground
	var ground = document.createElementNS(NS,"polygon")
	ground.setAttribute("fill","brown")
	ground.setAttribute("stroke","brown")
	ground.setAttribute("stroke-width","10")
	ground.setAttribute("points","0,350 50,350 50,375 275,375 300,350 325,375 550,375 550,350 600,350 600,400 0,400")
	svg.appendChild(ground)
	//::Explosions
	for(var i = 0; i < gamestate.explosions.length; i++)
	{
		var cir = document.createElementNS(NS,"circle")
		var explosionstate = gamestate.explosions[i](gamestate.time)
		cir.setAttribute("cx",explosionstate.x)
		cir.setAttribute("cy",explosionstate.y)
		cir.setAttribute("r",explosionstate.rad)
		svg.appendChild(cir);
	}
	//::Missiles
	for(var i = 0; i < gamestate.missiles.length; i++)
	{	
		//Determine if we draw this missile
		var missileState = gamestate.missiles[i](gamestate.time);
		if(missileState.t0 <= gamestate.time)
		{
			//Draw missiles and their contrails
			var missileZero = gamestate.missiles[i](Math.max(gamestate.time-(missileState.kind==="player"?1.0:3.0),missileState.t0));
			//Warhead
			var cir = document.createElementNS(NS,"circle")
			cir.setAttribute("cx", missileState.x)
			cir.setAttribute("cy", missileState.y)
			cir.setAttribute("r", 3)
			cir.setAttribute("fill",missileState.kind==="player"?"red":"black")
			cir.setAttribute("color",missileState.kind==="player"?"red":"black")
			//Contrail
			var stroke = document.createElementNS(NS, "g")
			var lin = document.createElementNS(NS,"line")
			lin.setAttribute("x1", missileZero.x)
			lin.setAttribute("y1", missileZero.y)
			lin.setAttribute("x2", missileState.x)
			lin.setAttribute("y2", missileState.y)
			lin.setAttribute("stroke-width", missileState.kind==="player"?1:2)
			stroke.setAttribute("stroke",missileState.kind==="player"?"red":"black")
			stroke.appendChild(lin)
			if(gamestate.PROJECTION_ENABLED)
			{
				var str2 = document.createElementNS(NS,"g")
				var lin2 = document.createElementNS(NS,"line")
				var missileFuture = gamestate.missiles[i](gamestate.time+5.0);
				lin2.setAttribute("x1", missileFuture.x)
				lin2.setAttribute("y1", missileFuture.y)
				lin2.setAttribute("x2", missileState.x)
				lin2.setAttribute("y2", missileState.y)
				lin2.setAttribute("stroke-dasharray","3,9")
				str2.setAttribute("stroke","yellow")
				str2.appendChild(lin2)
				svg.appendChild(str2)
			}
			svg.appendChild(stroke)
			svg.appendChild(cir)
		}
	}
	//::Cities
	for(var i = 0; i < gamestate.cities.length; i++)
	{
		var city = document.createElementNS(NS,"rect")
		city.setAttribute("fill",gamestate.cities[i].okay?"green":"red")
		city.setAttribute("stroke","black")
		city.setAttribute("stroke-width","1")
		city.setAttribute("x",gamestate.cities[i].x)
		city.setAttribute("y",gamestate.cities[i].y)
		city.setAttribute("width",gamestate.cities[i].width)
		city.setAttribute("height",gamestate.cities[i].height)
		svg.appendChild(city);
	}
	//::analysis metrics
	if(gamestate.ANALYSIS_ENABLED)
	{
		if(gamestate.explosions.length > gamestate.analysis.MAX_EXPLOSIONS_SEEN)
			gamestate.analysis.MAX_EXPLOSIONS_SEEN = gamestate.explosions.length
		if(gamestate.missiles.length > gamestate.analysis.MAX_MISSILES)
			gamestate.analysis.MAX_MISSILES = gamestate.missiles.length
		var txt = document.createElementNS(NS,"text")
		txt.setAttribute("x",5)
		txt.setAttribute("y",395)
		txt.setAttribute("fill","white")
		var txtNode = document.createTextNode("Score: "+Math.floor(gamestate.time))
		txt.appendChild(txtNode);
		svg.appendChild(txt)
	}
	//::Further Cheating
	if(gamestate.PROJECTION_ENABLED)
	{
		var radar = document.createElementNS(NS,"circle")
		radar.setAttribute("fill","none")
		radar.setAttribute("cx",300)
		radar.setAttribute("cy",350)
		radar.setAttribute("r",250)
		radar.setAttribute("color","orange")
		radar.setAttribute("stroke-dasharray","3,9")
		radar.setAttribute("stroke-width",2)
		radar.setAttribute("stroke","orange")
		svg.appendChild(radar);
	}
	//::Input
	var inpReg = document.createElementNS(NS,"rect")
	inpReg.setAttribute("class","btn")
	inpReg.setAttribute("x",0)
	inpReg.setAttribute("y",0)
	inpReg.setAttribute("width",600)
	inpReg.setAttribute("height",400)
	inpReg.setAttribute("fill-opacity",0)
	inpReg.setAttribute("id","missile-defense-inputfieldsvg")
	svg.appendChild(inpReg);
	//::Publish and make interactive
	display.appendChild(svg)
	var tgt = document.getElementById("missile-defense-inputfieldsvg")
	tgt.onmouseup = function(evt){
		launchMissileTowards(gamestate,evt.offsetX,evt.offsetY)
	}
}

function update(gamestate, dt){
	//advance time
	gamestate.time += dt;
	//filter out missiles that have gone off screen
	gamestate.missiles = _.filter(gamestate.missiles, function(missile){
		var mState = missile(gamestate.time);
		return mState.x > 0 && mState.x < 600 && mState.y < 400//on screen
	})
	//find missiles that are going to explode due to nearness to each other
	gamestate.missiles = _.filter(gamestate.missiles, function(missile, n){
		var missilestate = missile(gamestate.time)
		var didNotExplode = true;
		for(var i = 0; i < gamestate.missiles.length; i ++)
		{
			if(i === n) continue;
			var otherstate = gamestate.missiles[i](gamestate.time)
			if(Math.pow(otherstate.x - missilestate.x,2) + Math.pow(otherstate.y-missilestate.y,2) < 100)
			{
				gamestate.explosions.push(spawnExplosion(gamestate.time,missilestate.x, missilestate.y))
				didNotExplode = false;
				break;
			}
		}
		return didNotExplode
	})
	//find explosions that are done exploding
	gamestate.explosions = _.filter(gamestate.explosions, function(explosion){
		return explosion(gamestate.time).active
	})
	//find missiles that have hit a town
	gamestate.missiles = _.filter(gamestate.missiles, function(missile){
		var missilestate = missile(gamestate.time)
		var didNotStrike = true;
		_.each(gamestate.cities, function(city, i){
			if(missilestate.x >= city.x && missilestate.x <= city.x + city.width &&
				missilestate.y >= city.y && missilestate.y <= city.y + city.height &&
				city.okay)
			{
				didNotStrike = false;
				destroyCity(gamestate,i)
				gamestate.explosions.push(spawnExplosion(gamestate.time, missilestate.x, missilestate.y))
			}
		})
		return didNotStrike
	})
	//find missiles that have gone below the ground
	gamestate.missiles = _.filter(gamestate.missiles, function(missile){
		var missilestate = missile(gamestate.time)
		var didNotLandstrike = true;
		if(missilestate.y > 375 ||
			(missilestate.y > 350 && missilestate.x < 50) ||
			(missilestate.y > 350 && missilestate.x > 550))
		{
			didNotLandstrike = false;
			gamestate.explosions.push(spawnExplosion(gamestate.time, missilestate.x, missilestate.y))
		}
		return didNotLandstrike;
	})
	//See if hope survies
	var siloActive = false;
	var cityExists = false;
	_.each(gamestate.cities, function(city){
		if(city.isSilo && city.okay) siloActive = true;
		else if(city.okay) cityExists = true;
	})
	gamestate.HOPE_LIVES = siloActive && cityExists
}

function spawnMissile(spawn_time, p_x, p_y, v_x, v_y, kind){
	return function(t){
		return {
			x : t >= spawn_time ? v_x * (t-spawn_time) + p_x : undefined, 
			y : t >= spawn_time ? v_y * (t-spawn_time) + p_y : undefined,
			t0 : spawn_time,
			prox : 5,
			kind : kind
		}
	}
}

function launchMissileTowards(gamestate, d_x, d_y){
	d_x = d_x - 300 //make relative to missile silo
	d_y = d_y - 350
	var angle = Math.atan2(d_y,d_x) + Math.PI/2
	gamestate.missiles.push(spawnMissile(gamestate.time,300,350,50 * Math.sin(angle), -Math.abs(-50 * Math.cos(angle)),"player"))
}

function spawnCity(zx, zy, height, width, isSilo){
	return {
			x : zx,
			y : zy,
			height : height?height:25,
			width : width?width:50,
			okay : true,
			isSilo : isSilo?isSilo:false
		}
}

function destroyCity(gamestate, idx){
	if(idx < 0 || idx >= gamestate.cities.length) return;
	gamestate.cities[idx].okay = false;
	gamestate.cities[idx].height = Math.max(5,gamestate.cities[idx].height-20);
	gamestate.cities[idx].y += 20;
}

function spawnExplosion(time, p_x, p_y){
	return function(t){
		var ete = t-time
		var dur = 2
		var rad = ete < dur ? ete * 10.0 : 0
		return {
			x : t >= time ? p_x : undefined,
			y : t >= time ? p_y : undefined,
			rad : rad,
			active : ete < dur
		}
	}
}