function setDescription(s, tgt){

	if(!tgt) tgt = "description"
	var ss = document.getElementById(tgt)
	var node = document.createTextNode(s);
	while (ss.firstChild) {
	    ss.removeChild(ss.firstChild);
	}
	ss.appendChild(node)
}

function appendDescription(s, tgt){
	if(!tgt) tgt = "description"
	var ss = document.getElementById(tgt)
	var node = document.createTextNode(s);
	var br = document.createElement('br');
	ss.appendChild(br)
	ss.appendChild(node)	
}

function makeCircle(id, color,radius){
	var NS="http://www.w3.org/2000/svg";
	var svg=document.createElementNS(NS,"svg");
	var cir = document.createElementNS(NS,"circle")
	cir.setAttribute("cx",radius+1)
	cir.setAttribute("cy",radius+1)
	cir.setAttribute("r",radius)
	cir.setAttribute("height",radius*2)
	cir.setAttribute("id","i"+id+"_circ")
	cir.style.fill=color
	cir.style.stroke="black"
	svg.setAttribute("id","i"+id)
	svg.setAttribute("width",radius*2+2)
	svg.setAttribute("height",radius*2+2)
	svg.appendChild(cir)
	return svg
}
function constructGuessLineUI(guess, result, tgt,eletype){
	var ele = document.createElement(eletype?eletype:"div")
	for(var i = 0; i < guess.length; i ++)
	{
		ele.appendChild(makeCircle("",guess[i],8))
	}
	var cor = document.createElement("span")
	for(var i = 0; i < result.hit; i ++)
	{
		cor.appendChild(makeCircle("","red",4))
	}
	for(var i = 0; i < result.close; i ++)
	{
		cor.appendChild(makeCircle("","white",4))
	}
	ele.appendChild(cor)
	console.log(tgt)
	document.getElementById(tgt).appendChild(ele)
}
function showColorInput(tgt){
	var ele = document.createElement("div")
	for(var i = 0; i < 4; i++)
	{
		var inp = makeCircle(i,'lightgrey',8)
		inp.idx=-1
		inp.onclick=function(){
			console.log(this)
			this.idx = (this.idx+1) % codeColors.length; 
			document.getElementById(this.id+"_circ").style.fill=codeColors[this.idx]
		}
		ele.appendChild(inp)
	}
	var btn = document.createElement("button")
	btn.id = "guess_btn"
	btn.appendChild(document.createTextNode("Guess"))
	btn.onclick = function(){
		var guess = [];
		for(var i = 0; i < 4; i++)
		{
			guess[i] = codeColors[document.getElementById("i"+i).idx]
		}
		submitGuess(guess,ccc)
	}
	ele.appendChild(btn)
	document.getElementById(tgt).appendChild(ele)
}

//Mastermind Stuff
var ccc = generateNewCode(4)
var codeColors = ["red","green","blue","white","orange","yellow"]
function generateNewCode(codeLength){
	return _.times(codeLength,function(){return _.sample(codeColors)})
}
function submitGuess(guess, code){
	var result = scoreGuess(guess,code);
	if(result.hit == code.length)
	{
		//win
		console.log("WIN GAME!")
		constructGuessLineUI(guess,result,"description")
		var btn = document.getElementById("guess_btn")
		btn.removeChild(btn.firstChild)
		btn.appendChild(document.createTextNode("You Won!"))
		btn.onclick = window.location.reload.bind(window.location)
	}
	else
	{
		//lose
		console.log("Play Continues...",result)
		constructGuessLineUI(guess,result,"description")
	}
}
function scoreGuess(guess,code){
	guess = _.clone(guess)
	code = _.clone(code)
	if(!_.isArray(guess) || !_.isArray(code) || guess.length != code.length)
		throw "Bad arguments: Can't score guess"

	var result = {hit: 0, close: 0, miss: code.length}
	//Red
	for(var i = 0; i < code.length; i++)
	{
		if(guess[i] == code[i])
		{
			guess[i] = undefined
			code[i] = undefined
			result.hit++
			result.miss--
		}
	}
	//White
	for(var i = 0; i < code.length; i++)
	{
		var isn = _.findIndex(code,function(o){return o == guess[i] && o !== undefined});
		if(isn >= 0)
		{
			guess[i] = undefined
			code[isn] = undefined
			result.close++
			result.miss--
		} 
	}
	return result
}