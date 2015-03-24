---
layout : post
date : '2015-03-24T01:13:00.000+08:00'
title : Quick Scoreboard Peek
featured: 1
---

Working on a scoreboard for the games on this site using Firebase. 

## Reactive Scoreboard

Firebase is pretty similar to the technology I was working on at Backwi.re, although it is lacking a good query syntax and pushes you into maintaining your data in a JSON tree. That said, its set up is very easy and pleasant to throw something small like a scoreboard together. My most consistent feedback on my code toys has been that it'd be better to have a high scores board, so poking at accomplishing that this week. Here's the scores currently in Firebase: they'll even update automatically on your page if someone gets a new personal high score.

<table class="table-bordered">
	<thead>
		<tr>
			<th><a href="http://sewerbird.github.io/blog/coding/2015/03/20/Dodger"><h4><small>sewerbird</small>Dodger</h4></a></th>
			<th><a href="http://sewerbird.github.io/blog/coding/2015/03/14/missiledefense"><h4><small>sewerbird</small>MissileDefense</h4></a></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td id="scrDodger">
			</td>
			<td id="scrMissile">
			</td>
		</tr>
	</tbody>
</table>

Nothing fancy, but another tool in my belt I suppose! I'll slowly add the score submission code and UX bits to preexisting code toys on this site soonish. I should have the widget on github in not too many days :)

<script src="https://cdn.firebase.com/js/client/2.2.3/firebase.js"></script>
<script type='text/javascript' src="/scripts/dodger/lib/lodash.js"></script>
<script>
function getScores(db_game_ref, callback)
{
	db_game_ref.orderByChild("score").on("value", function(snapshot){
		var results = snapshot.val()
		callback(results)
	})
}
function submitScore(db_game_ref, username, score)
{
	var tgt = db_game_ref.child("/"+username)
	tgt.once("value",function(data){
		var results = data.val()
		if(results && results.score < score)
			tgt.update({score:score})
	})
}
function displayScore(results,divid){
	var div = document.getElementById(divid)
	while(div.firstChild)
		div.removeChild(div.firstChild)
	var table = document.createElement("table")
	var tbody = document.createElement("tbody")
	_.forInRight(results, function(data, user){
		var tr = document.createElement("tr")
		var tdUsr = document.createElement("td")
		var tdScr = document.createElement("td")
		var usr = document.createTextNode(user)
		var scr = document.createTextNode(Math.floor(data.score))
		tdUsr.appendChild(usr)
		tdScr.appendChild(scr)
		tr.appendChild(tdUsr)
		tr.appendChild(tdScr)
		tbody.appendChild(tr)
	})
	table.appendChild(tbody)
	div.appendChild(table)
}
getScores(new Firebase("https://sewerbird-high-score.firebaseio.com/Dodger"),function(res){displayScore(res,"scrDodger")})
getScores(new Firebase("https://sewerbird-high-score.firebaseio.com/Missile Defense"),function(res){displayScore(res,"scrMissile")})

</script>