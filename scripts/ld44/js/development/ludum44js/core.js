// Compiled by ClojureScript 1.10.520 {}
goog.provide('ludum44js.core');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('quil.middleware');
ludum44js.core.clamp = (function ludum44js$core$clamp(value,min_value,max_value){
var x__4219__auto__ = min_value;
var y__4220__auto__ = (function (){var x__4222__auto__ = value;
var y__4223__auto__ = max_value;
return ((x__4222__auto__ < y__4223__auto__) ? x__4222__auto__ : y__4223__auto__);
})();
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
});
ludum44js.core.abs = (function ludum44js$core$abs(n){
var x__4219__auto__ = n;
var y__4220__auto__ = (- n);
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
});
ludum44js.core.motion_sensitivity = 10.0;
ludum44js.core.current_scene = cljs.core.atom.call(null,new cljs.core.Keyword(null,"GAME","GAME",-1201089127));
ludum44js.core.current_level = cljs.core.atom.call(null,(1));
ludum44js.core.prior_bet_bid = cljs.core.atom.call(null,(0));
ludum44js.core.current_bet_bid = cljs.core.atom.call(null,(5));
ludum44js.core.wallet_balance = cljs.core.atom.call(null,(100));
ludum44js.core.life_for_player = cljs.core.atom.call(null,(10));
ludum44js.core.time_now = cljs.core.atom.call(null,(0));
ludum44js.core.time_of_last_purchase = cljs.core.atom.call(null,(-10));
ludum44js.core.time_of_last_bid_change = cljs.core.atom.call(null,(-10));
ludum44js.core.purchases = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),(0),new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),(0),new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),(0),new cljs.core.Keyword(null,"armor","armor",-829575337),(0),new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),(0),new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),(0)], null));
ludum44js.core.load_image = (function ludum44js$core$load_image(image){
var path = ["/scripts/ld44/",cljs.core.name.call(null,image),".png"].join('');
cljs.core.println.call(null,"Loading",path);

return quil.core.load_image.call(null,path);
});
ludum44js.core.load_font = (function ludum44js$core$load_font(font){
var path = ["/scripts/ld44/",cljs.core.name.call(null,font)].join('');
cljs.core.println.call(null,"Loading",path);

return quil.core.load_font.call(null,path);
});
ludum44js.core.draw_image = (function ludum44js$core$draw_image(state,k,p__59222,w,h){
var vec__59223 = p__59222;
var x = cljs.core.nth.call(null,vec__59223,(0),null);
var y = cljs.core.nth.call(null,vec__59223,(1),null);
cljs.core.println.call(null,"Drawing image",k,x,y,w,h);

if(cljs.core.truth_((function (){var or__4131__auto__ = w;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return h;
}
})())){
cljs.core.println.call(null,"Resizing to ",w,h);

quil.core.resize.call(null,cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"images","images",1757475080),k], null)),w,h);
} else {
}

return quil.core.image.call(null,cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"images","images",1757475080),k], null)),x,y);
});
ludum44js.core.draw_text = (function ludum44js$core$draw_text(state,font,message,p__59226){
var vec__59227 = p__59226;
var x = cljs.core.nth.call(null,vec__59227,(0),null);
var y = cljs.core.nth.call(null,vec__59227,(1),null);
quil.core.text_font.call(null,"Arial",(30));

return quil.core.text.call(null,message,x,y);
});
ludum44js.core.images = new cljs.core.PersistentVector(null, 18, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"bg","bg",-206688421),new cljs.core.Keyword(null,"test","test",577538877),"bid0","bid1","bid2","bid3","bid4","bid5","bid6","bid7","bid8","bid9",new cljs.core.Keyword(null,"upgradepip","upgradepip",1065500056),new cljs.core.Keyword(null,"pew","pew",248942754),"baddie1","baddie2","baddie3",new cljs.core.Keyword(null,"player","player",-97687400)], null);
ludum44js.core.fonts = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"earthorbiteracad","earthorbiteracad",29589921)], null);
ludum44js.core.ui_extents = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"test","test",577538877),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(800),(600)], null),new cljs.core.Keyword(null,"bg","bg",-206688421),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(600),(800)], null)], null);
ludum44js.core.setup = (function ludum44js$core$setup(){
ludum44js.core.kill_line = (1.25 * quil.core.height.call(null));

quil.core.frame_rate.call(null,(30));

quil.core.color_mode.call(null,new cljs.core.Keyword(null,"hsb","hsb",-753472031));

return new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"images","images",1757475080),cljs.core.zipmap.call(null,ludum44js.core.images,cljs.core.map.call(null,ludum44js.core.load_image,ludum44js.core.images)),new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511),(0),new cljs.core.Keyword(null,"frame_count","frame_count",-122201924),(0),new cljs.core.Keyword(null,"level_time_elapsed","level_time_elapsed",-737725489),(0),new cljs.core.Keyword(null,"player","player",-97687400),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[(0),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),1.0,new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),1.0,new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),1.0,new cljs.core.Keyword(null,"armor","armor",-829575337),1.0,new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),1.0,new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),1.5], null),(0),(50),(10),(quil.core.height.call(null) * 0.9),0.5,(100),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),(0),new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),(0),new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),(0),new cljs.core.Keyword(null,"armor","armor",-829575337),(0),new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),(0),new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),(0)], null),0.5,(50)]),new cljs.core.Keyword(null,"enemies","enemies",2114285722),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399),cljs.core.PersistentVector.EMPTY], null);
});
ludum44js.core.update_enemy = (function ludum44js$core$update_enemy(enemy,dt,projectiles){
var timer = (dt + new cljs.core.Keyword(null,"timer","timer",-1266967739).cljs$core$IFn$_invoke$arity$1(enemy));
var was_hit = cljs.core.count.call(null,ludum44js.core.check_collision.call(null,enemy,projectiles));
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"timer","timer",-1266967739),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"down_speed","down_speed",-912046520),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114),new cljs.core.Keyword(null,"cleanup","cleanup",1045776959)],[(0),timer,new cljs.core.Keyword(null,"variant","variant",-424354234).cljs$core$IFn$_invoke$arity$1(enemy),new cljs.core.Keyword(null,"down_speed","down_speed",-912046520).cljs$core$IFn$_invoke$arity$1(enemy),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(enemy),((((0) < was_hit))?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(enemy) - was_hit):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(enemy)),(new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(enemy) + (dt * new cljs.core.Keyword(null,"down_speed","down_speed",-912046520).cljs$core$IFn$_invoke$arity$1(enemy))),(new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(enemy) + (dt * new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114).cljs$core$IFn$_invoke$arity$1(enemy))),new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114).cljs$core$IFn$_invoke$arity$1(enemy),(function (){var or__4131__auto__ = (new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(enemy) < ludum44js.core._kill_line);
if(or__4131__auto__){
return or__4131__auto__;
} else {
var and__4120__auto__ = ((0) < was_hit);
if(and__4120__auto__){
return (new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(enemy) - was_hit);
} else {
return and__4120__auto__;
}
}
})()]);
});
ludum44js.core.update_projectile = (function ludum44js$core$update_projectile(projectile,dt){
var timer = (dt + new cljs.core.Keyword(null,"timer","timer",-1266967739).cljs$core$IFn$_invoke$arity$1(projectile));
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"timer","timer",-1266967739),new cljs.core.Keyword(null,"down_speed","down_speed",-912046520),new cljs.core.Keyword(null,"duration","duration",1444101068),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114),new cljs.core.Keyword(null,"cleanup","cleanup",1045776959)],[(100),timer,new cljs.core.Keyword(null,"down_speed","down_speed",-912046520).cljs$core$IFn$_invoke$arity$1(projectile),new cljs.core.Keyword(null,"duration","duration",1444101068).cljs$core$IFn$_invoke$arity$1(projectile),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(projectile),(new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(projectile) + (dt * new cljs.core.Keyword(null,"down_speed","down_speed",-912046520).cljs$core$IFn$_invoke$arity$1(projectile))),(new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(projectile) + (dt * new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114).cljs$core$IFn$_invoke$arity$1(projectile))),new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114).cljs$core$IFn$_invoke$arity$1(projectile),(((new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(projectile) > quil.core.height.call(null))) || ((new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(projectile) < (0))) || ((new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(projectile) > quil.core.width.call(null))) || ((new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(projectile) < (0))) || (((((0) < new cljs.core.Keyword(null,"duration","duration",1444101068).cljs$core$IFn$_invoke$arity$1(projectile))) && ((timer > new cljs.core.Keyword(null,"duration","duration",1444101068).cljs$core$IFn$_invoke$arity$1(projectile))))))]);
});
ludum44js.core.reinitialize_player = (function ludum44js$core$reinitialize_player(player){
var new_player = cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[(0),new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),(1.0 * ((1) / new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases)))),new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),((0.75 * new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases))) + 1.0),new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),((1.0 / new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases))) * 1.0),new cljs.core.Keyword(null,"armor","armor",-829575337),((0.3 * new cljs.core.Keyword(null,"armor","armor",-829575337).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases))) + 1.0),new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),((0.2 * new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases))) + 1.0),new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),((0.5 * new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases))) + 1.0)], null),(180),(50),cljs.core.deref.call(null,ludum44js.core.life_for_player),(quil.core.height.call(null) * 0.9),0.5,(100),cljs.core.deref.call(null,ludum44js.core.purchases),0.5,((50) * ((1) / (function (){var x__4219__auto__ = (1);
var y__4220__auto__ = new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.purchases));
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})()))]);
return new_player;
});
ludum44js.core.update_player = (function ludum44js$core$update_player(player,dt,player_is_hit){
var took_damage = ((((0) < new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288).cljs$core$IFn$_invoke$arity$1(player)))?false:player_is_hit);
var inv = (cljs.core.truth_(took_damage)?(1.0 * new cljs.core.Keyword(null,"armor","armor",-829575337).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player))):new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288).cljs$core$IFn$_invoke$arity$1(player));
if(cljs.core.truth_(quil.core.key_pressed_QMARK_.call(null))){
var dkey = quil.core.raw_key.call(null);
var G__59230 = dkey;
switch (G__59230) {
case "d":
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[ludum44js.core.clamp.call(null,(inv - dt),(0),(100)),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player) - (1)):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player)),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player),ludum44js.core.clamp.call(null,(new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player) + ludum44js.core.motion_sensitivity),(0),quil.core.width.call(null)),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]);

break;
case "a":
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[ludum44js.core.clamp.call(null,(inv - dt),(0),(100)),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player) - (1)):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player)),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player),ludum44js.core.clamp.call(null,(new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player) - ludum44js.core.motion_sensitivity),(0),quil.core.width.call(null)),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]);

break;
case "s":
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[ludum44js.core.clamp.call(null,(inv - dt),(0),(100)),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player) - (1)):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player)),ludum44js.core.clamp.call(null,(new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player) + ludum44js.core.motion_sensitivity),(0),quil.core.height.call(null)),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]);

break;
case "w":
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[ludum44js.core.clamp.call(null,(inv - dt),(0),(100)),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player) - (1)):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player)),ludum44js.core.clamp.call(null,(new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player) - ludum44js.core.motion_sensitivity),(0),quil.core.height.call(null)),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]);

break;
default:
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[ludum44js.core.clamp.call(null,(inv - dt),(0),(100)),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player) - (1)):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player)),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]);

}
} else {
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[ludum44js.core.clamp.call(null,(inv - dt),(0),(100)),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player) - (1)):new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player)),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]);
}
});
ludum44js.core.check_collision = (function ludum44js$core$check_collision(tgt,colliders){

return cljs.core.filterv.call(null,(function (a){
var wa = (cljs.core.truth_(new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(a))?new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(a):new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(a));
var wtgt = (cljs.core.truth_(new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(tgt))?new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(tgt):new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(tgt));
var dx = (new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(a) - new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(tgt));
var dy = (new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(a) - new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(tgt));
var dd = Math.sqrt(((dx * dx) + (dy * dy)));
var r = (wa + wtgt);
return (dd < (r / (2)));
}),colliders);
});
ludum44js.core.cleanup = (function ludum44js$core$cleanup(col){
return cljs.core.filterv.call(null,(function (p1__59232_SHARP_){
return cljs.core.not.call(null,new cljs.core.Keyword(null,"cleanup","cleanup",1045776959).cljs$core$IFn$_invoke$arity$1(p1__59232_SHARP_));
}),col);
});
ludum44js.core.spawn_new_random_enemy = (function ludum44js$core$spawn_new_random_enemy(){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"timer","timer",-1266967739),new cljs.core.Keyword(null,"variant","variant",-424354234),new cljs.core.Keyword(null,"down_speed","down_speed",-912046520),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114),new cljs.core.Keyword(null,"cleanup","cleanup",1045776959)],[(0),(0),(1),200.0,(20),(1),(quil.core.height.call(null) * (0)),(quil.core.width.call(null) * quil.core.random.call(null,1.0)),(0),false]);
});
ludum44js.core.spawn_enemies = (function ludum44js$core$spawn_enemies(is_needed,old_enemies){
if(cljs.core.truth_(is_needed)){
return cljs.core.conj.call(null,old_enemies,ludum44js.core.spawn_new_random_enemy.call(null));
} else {
return old_enemies;
}
});
ludum44js.core.check_player_firing = (function ludum44js$core$check_player_firing(player,dt){
if(cljs.core._EQ_.call(null,(0),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player))){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"player","player",-97687400),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player),(new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player) * new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player))),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]),new cljs.core.Keyword(null,"shots","shots",-1155689265),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"timer","timer",-1266967739),new cljs.core.Keyword(null,"down_speed","down_speed",-912046520),new cljs.core.Keyword(null,"duration","duration",1444101068),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"right_speed","right_speed",-2039906114),new cljs.core.Keyword(null,"cleanup","cleanup",1045776959)],[(66),(0),((-400) * new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player))),(3),((5) * new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player))),(new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player) - new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player)),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),(((10) * (quil.core.random.call(null,2.0) - (1))) * new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player))),false])], null)], null);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"player","player",-97687400),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288),new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399),new cljs.core.Keyword(null,"upgrades","upgrades",306367012),new cljs.core.Keyword(null,"color","color",1011675173),new cljs.core.Keyword(null,"radius","radius",-2073122258),new cljs.core.Keyword(null,"life","life",939004719),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970),new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610),new cljs.core.Keyword(null,"x_offset","x_offset",759077110),new cljs.core.Keyword(null,"purchases","purchases",-1215855274),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344),new cljs.core.Keyword(null,"player_size","player_size",1717679481)],[new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"upgrades","upgrades",306367012).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player),ludum44js.core.clamp.call(null,(new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player) - dt),(0),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player)),new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"shot_period","shot_period",-503894344).cljs$core$IFn$_invoke$arity$1(player),new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player)]),new cljs.core.Keyword(null,"shots","shots",-1155689265),cljs.core.PersistentVector.EMPTY], null);
}
});
ludum44js.core.over_update_draw_state = (function ludum44js$core$over_update_draw_state(state,dt){
if(cljs.core.truth_(quil.core.key_pressed_QMARK_.call(null))){
var dkey_59234 = quil.core.raw_key.call(null);
var G__59233_59235 = dkey_59234;
switch (G__59233_59235) {
case " ":
ludum44js.core._STAR_js.call(null,"window.location.reload(false);");

break;
default:

}
} else {
}

return state;
});
ludum44js.core.game_update_draw_state = (function ludum44js$core$game_update_draw_state(state,dt){
var old_player = new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state);
var old_enemies = new cljs.core.Keyword(null,"enemies","enemies",2114285722).cljs$core$IFn$_invoke$arity$1(state);
var old_projectiles = new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399).cljs$core$IFn$_invoke$arity$1(state);
var updated_enemies = ludum44js.core.cleanup.call(null,cljs.core.map.call(null,((function (old_player,old_enemies,old_projectiles){
return (function (p1__59237_SHARP_){
return ludum44js.core.update_enemy.call(null,p1__59237_SHARP_,dt,old_projectiles);
});})(old_player,old_enemies,old_projectiles))
,old_enemies));
var updated_projectiles = ludum44js.core.cleanup.call(null,cljs.core.map.call(null,((function (old_player,old_enemies,old_projectiles,updated_enemies){
return (function (p1__59238_SHARP_){
return ludum44js.core.update_projectile.call(null,p1__59238_SHARP_,dt);
});})(old_player,old_enemies,old_projectiles,updated_enemies))
,old_projectiles));
var spawn_needed = (quil.core.frame_count.call(null) > (new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511).cljs$core$IFn$_invoke$arity$1(state) + (3)));
var new_enemies = ludum44js.core.spawn_enemies.call(null,(quil.core.frame_count.call(null) > (new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511).cljs$core$IFn$_invoke$arity$1(state) + (3))),updated_enemies);
var player_is_hit = ((0) < cljs.core.count.call(null,ludum44js.core.check_collision.call(null,old_player,new_enemies)));
var player_is_firing = ludum44js.core.check_player_firing.call(null,old_player,dt);
var new_player = ((function (old_player,old_enemies,old_projectiles,updated_enemies,updated_projectiles,spawn_needed,new_enemies,player_is_hit,player_is_firing){
return (function (p1__59239_SHARP_){
return ludum44js.core.update_player.call(null,p1__59239_SHARP_,dt,player_is_hit);
});})(old_player,old_enemies,old_projectiles,updated_enemies,updated_projectiles,spawn_needed,new_enemies,player_is_hit,player_is_firing))
.call(null,new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(player_is_firing));
var new_player_projectiles = new cljs.core.Keyword(null,"shots","shots",-1155689265).cljs$core$IFn$_invoke$arity$1(player_is_firing);
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"level_time_elapsed","level_time_elapsed",-737725489),(dt + new cljs.core.Keyword(null,"level_time_elapsed","level_time_elapsed",-737725489).cljs$core$IFn$_invoke$arity$1(state)),new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511),((spawn_needed)?quil.core.frame_count.call(null):new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511).cljs$core$IFn$_invoke$arity$1(state)),new cljs.core.Keyword(null,"frame_count","frame_count",-122201924),quil.core.frame_count.call(null),new cljs.core.Keyword(null,"player","player",-97687400),new_player,new cljs.core.Keyword(null,"enemies","enemies",2114285722),new_enemies,new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399),ludum44js.core.cleanup.call(null,cljs.core.into.call(null,updated_projectiles,new_player_projectiles)),new cljs.core.Keyword(null,"images","images",1757475080),new cljs.core.Keyword(null,"images","images",1757475080).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"fonts","fonts",1683167295),new cljs.core.Keyword(null,"fonts","fonts",1683167295).cljs$core$IFn$_invoke$arity$1(state)], null);
});
ludum44js.core.interstitial_update_draw_state = (function ludum44js$core$interstitial_update_draw_state(state,dt){
var old_player = new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state);
var new_player = ludum44js.core.reinitialize_player.call(null,old_player);
if(cljs.core.truth_(quil.core.key_pressed_QMARK_.call(null))){
var dkey_59241 = quil.core.raw_key.call(null);
var G__59240_59242 = dkey_59241;
switch (G__59240_59242) {
case "a":
ludum44js.core.up_the_stakes.call(null,state);

break;
case "d":
ludum44js.core.lower_the_stakes.call(null,state);

break;
case "1":
ludum44js.core.purchase.call(null,state,new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775));

break;
case "2":
ludum44js.core.purchase.call(null,state,new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557));

break;
case "3":
ludum44js.core.purchase.call(null,state,new cljs.core.Keyword(null,"armor","armor",-829575337));

break;
case "4":
ludum44js.core.purchase.call(null,state,new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655));

break;
case "5":
ludum44js.core.purchase.call(null,state,new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021));

break;
case "6":
ludum44js.core.purchase.call(null,state,new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856));

break;
case " ":
ludum44js.core.go_to_next_level.call(null);

break;
default:
cljs.core.println.call(null,"*whistle*");

}
} else {
}

return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"level_time_elapsed","level_time_elapsed",-737725489),(0),new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511),new cljs.core.Keyword(null,"last_spawn","last_spawn",-1436338511).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"frame_count","frame_count",-122201924),quil.core.frame_count.call(null),new cljs.core.Keyword(null,"player","player",-97687400),new_player,new cljs.core.Keyword(null,"enemies","enemies",2114285722),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399),cljs.core.PersistentVector.EMPTY,new cljs.core.Keyword(null,"images","images",1757475080),new cljs.core.Keyword(null,"images","images",1757475080).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"fonts","fonts",1683167295),new cljs.core.Keyword(null,"fonts","fonts",1683167295).cljs$core$IFn$_invoke$arity$1(state)], null);
});
ludum44js.core.up_the_stakes = (function ludum44js$core$up_the_stakes(state){
cljs.core.println.call(null,"Upping the stakes, time vs last is",cljs.core.deref.call(null,ludum44js.core.time_now),cljs.core.deref.call(null,ludum44js.core.time_of_last_bid_change));

if((0.25 < (cljs.core.deref.call(null,ludum44js.core.time_now) - cljs.core.deref.call(null,ludum44js.core.time_of_last_bid_change)))){
cljs.core.swap_BANG_.call(null,ludum44js.core.time_of_last_bid_change,(function (old){
return cljs.core.deref.call(null,ludum44js.core.time_now);
}));

cljs.core.swap_BANG_.call(null,ludum44js.core.current_bet_bid,(function (old){
return ludum44js.core.clamp.call(null,(old + (1)),(0),(9));
}));

return cljs.core.swap_BANG_.call(null,ludum44js.core.life_for_player,(function (old){
return ((10) - cljs.core.deref.call(null,ludum44js.core.current_bet_bid));
}));
} else {
return null;
}
});
ludum44js.core.lower_the_stakes = (function ludum44js$core$lower_the_stakes(state){
if((0.25 < (cljs.core.deref.call(null,ludum44js.core.time_now) - cljs.core.deref.call(null,ludum44js.core.time_of_last_bid_change)))){
cljs.core.swap_BANG_.call(null,ludum44js.core.time_of_last_bid_change,(function (old){
return cljs.core.deref.call(null,ludum44js.core.time_now);
}));

cljs.core.swap_BANG_.call(null,ludum44js.core.current_bet_bid,(function (old){
return ludum44js.core.clamp.call(null,(old - (1)),(0),(9));
}));

return cljs.core.swap_BANG_.call(null,ludum44js.core.life_for_player,(function (old){
return ((10) - cljs.core.deref.call(null,ludum44js.core.current_bet_bid));
}));
} else {
return null;
}
});
ludum44js.core.go_to_next_level = (function ludum44js$core$go_to_next_level(state){
cljs.core.swap_BANG_.call(null,ludum44js.core.prior_bet_bid,(function (old){
return cljs.core.deref.call(null,ludum44js.core.current_bet_bid);
}));

cljs.core.swap_BANG_.call(null,ludum44js.core.life_for_player,(function (old){
return ((10) - cljs.core.deref.call(null,ludum44js.core.current_bet_bid));
}));

return cljs.core.swap_BANG_.call(null,ludum44js.core.current_scene,(function (old){
return new cljs.core.Keyword(null,"GAME","GAME",-1201089127);
}));
});
ludum44js.core.finish_level = (function ludum44js$core$finish_level(state){
cljs.core.swap_BANG_.call(null,ludum44js.core.wallet_balance,(function (old){
return (old + cljs.core.deref.call(null,ludum44js.core.current_bet_bid));
}));

return cljs.core.swap_BANG_.call(null,ludum44js.core.current_scene,(function (old){
return new cljs.core.Keyword(null,"INTERSTITIAL","INTERSTITIAL",137061923);
}));
});
ludum44js.core.purchase = (function ludum44js$core$purchase(state,upgrade){
if((((cljs.core.deref.call(null,ludum44js.core.wallet_balance) >= (5))) && ((0.5 < (cljs.core.deref.call(null,ludum44js.core.time_now) - cljs.core.deref.call(null,ludum44js.core.time_of_last_purchase)))))){
var new_purchases = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),((cljs.core._EQ_.call(null,upgrade,new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557)))?((1) + new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))):new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))),new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),((cljs.core._EQ_.call(null,upgrade,new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775)))?((1) + new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))):new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))),new cljs.core.Keyword(null,"armor","armor",-829575337),((cljs.core._EQ_.call(null,upgrade,new cljs.core.Keyword(null,"armor","armor",-829575337)))?((1) + new cljs.core.Keyword(null,"armor","armor",-829575337).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))):new cljs.core.Keyword(null,"armor","armor",-829575337).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))),new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),((cljs.core._EQ_.call(null,upgrade,new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655)))?((1) + new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))):new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))),new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),((cljs.core._EQ_.call(null,upgrade,new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856)))?((1) + new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))):new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))),new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),((cljs.core._EQ_.call(null,upgrade,new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021)))?((1) + new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))):new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"purchases","purchases",-1215855274).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state))))], null);
cljs.core.swap_BANG_.call(null,ludum44js.core.time_of_last_purchase,((function (new_purchases){
return (function (old){
return cljs.core.deref.call(null,ludum44js.core.time_now);
});})(new_purchases))
);

cljs.core.println.call(null,"Purchasing ",upgrade," for 5");

cljs.core.swap_BANG_.call(null,ludum44js.core.wallet_balance,((function (new_purchases){
return (function (old){
return (old - (5));
});})(new_purchases))
);

return cljs.core.swap_BANG_.call(null,ludum44js.core.purchases,((function (new_purchases){
return (function (old){
return new_purchases;
});})(new_purchases))
);
} else {
return cljs.core.println.call(null,"Insufficient vespene gas");
}
});
ludum44js.core.update_state = (function ludum44js$core$update_state(state){
var dt = ((quil.core.frame_count.call(null) - new cljs.core.Keyword(null,"frame_count","frame_count",-122201924).cljs$core$IFn$_invoke$arity$1(state)) / quil.core.target_frame_rate.call(null));
var new_time_elapsed = (dt + new cljs.core.Keyword(null,"level_time_elapsed","level_time_elapsed",-737725489).cljs$core$IFn$_invoke$arity$1(state));
cljs.core.swap_BANG_.call(null,ludum44js.core.time_now,((function (dt,new_time_elapsed){
return (function (old){
return (old + dt);
});})(dt,new_time_elapsed))
);

if((new_time_elapsed > (10))){
cljs.core.swap_BANG_.call(null,ludum44js.core.current_scene,((function (dt,new_time_elapsed){
return (function (old){
return new cljs.core.Keyword(null,"INTERSTITIAL","INTERSTITIAL",137061923);
});})(dt,new_time_elapsed))
);

cljs.core.swap_BANG_.call(null,ludum44js.core.current_level,((function (dt,new_time_elapsed){
return (function (old){
return ((1) + old);
});})(dt,new_time_elapsed))
);
} else {
}

if(cljs.core._EQ_.call(null,(0),new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state)))){
cljs.core.swap_BANG_.call(null,ludum44js.core.current_scene,((function (dt,new_time_elapsed){
return (function (old){
return new cljs.core.Keyword(null,"OVER","OVER",109318442);
});})(dt,new_time_elapsed))
);
} else {
}

var G__59244 = cljs.core.deref.call(null,ludum44js.core.current_scene);
var G__59244__$1 = (((G__59244 instanceof cljs.core.Keyword))?G__59244.fqn:null);
switch (G__59244__$1) {
case "GAME":
return ludum44js.core.game_update_draw_state.call(null,state,dt);

break;
case "INTERSTITIAL":
return ludum44js.core.interstitial_update_draw_state.call(null,state,dt);

break;
case "OVER":
return ludum44js.core.over_update_draw_state.call(null,state,dt);

break;
default:
return state;

}
});
ludum44js.core.draw_player = (function ludum44js$core$draw_player(state,player){
quil.core.fill.call(null,new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(player),(255),((255) * (1.0 - new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288).cljs$core$IFn$_invoke$arity$1(player))));

var x = new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(player);
var y = new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(player);
var life = new cljs.core.Keyword(null,"life","life",939004719).cljs$core$IFn$_invoke$arity$1(player);
var invuln = new cljs.core.Keyword(null,"invulnerability_timer","invulnerability_timer",1704656288).cljs$core$IFn$_invoke$arity$1(player);
var shot_timer = new cljs.core.Keyword(null,"shot_timer","shot_timer",-1952245610).cljs$core$IFn$_invoke$arity$1(player);
var r = new cljs.core.Keyword(null,"player_size","player_size",1717679481).cljs$core$IFn$_invoke$arity$1(player);
quil.core.text.call(null,["Life: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(life)].join(''),(15),(15));

quil.core.scale.call(null,0.5);

var seq__59246_59250 = cljs.core.seq.call(null,cljs.core.range.call(null,(life - (1))));
var chunk__59247_59251 = null;
var count__59248_59252 = (0);
var i__59249_59253 = (0);
while(true){
if((i__59249_59253 < count__59248_59252)){
var i_59254 = cljs.core._nth.call(null,chunk__59247_59251,i__59249_59253);
ludum44js.core.draw_image.call(null,state,new cljs.core.Keyword(null,"upgradepip","upgradepip",1065500056),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((0) + (i_59254 * (30))),(0)], null));


var G__59255 = seq__59246_59250;
var G__59256 = chunk__59247_59251;
var G__59257 = count__59248_59252;
var G__59258 = (i__59249_59253 + (1));
seq__59246_59250 = G__59255;
chunk__59247_59251 = G__59256;
count__59248_59252 = G__59257;
i__59249_59253 = G__59258;
continue;
} else {
var temp__5457__auto___59259 = cljs.core.seq.call(null,seq__59246_59250);
if(temp__5457__auto___59259){
var seq__59246_59260__$1 = temp__5457__auto___59259;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__59246_59260__$1)){
var c__4550__auto___59261 = cljs.core.chunk_first.call(null,seq__59246_59260__$1);
var G__59262 = cljs.core.chunk_rest.call(null,seq__59246_59260__$1);
var G__59263 = c__4550__auto___59261;
var G__59264 = cljs.core.count.call(null,c__4550__auto___59261);
var G__59265 = (0);
seq__59246_59250 = G__59262;
chunk__59247_59251 = G__59263;
count__59248_59252 = G__59264;
i__59249_59253 = G__59265;
continue;
} else {
var i_59266 = cljs.core.first.call(null,seq__59246_59260__$1);
ludum44js.core.draw_image.call(null,state,new cljs.core.Keyword(null,"upgradepip","upgradepip",1065500056),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((0) + (i_59266 * (30))),(0)], null));


var G__59267 = cljs.core.next.call(null,seq__59246_59260__$1);
var G__59268 = null;
var G__59269 = (0);
var G__59270 = (0);
seq__59246_59250 = G__59267;
chunk__59247_59251 = G__59268;
count__59248_59252 = G__59269;
i__59249_59253 = G__59270;
continue;
}
} else {
}
}
break;
}

quil.core.scale.call(null,2.0);

var tr__1734__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__1734__auto__);

return quil.core.ellipse.call(null,x,y,r,r);
}finally {quil.core.pop_matrix.call(null);
}});
ludum44js.core.draw_enemy = (function ludum44js$core$draw_enemy(state,enemy){
quil.core.fill.call(null,new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(enemy),(255),(255));

var y = new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(enemy);
var x = new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(enemy);
var r = new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(enemy);
var tr__1734__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__1734__auto__);

return quil.core.ellipse.call(null,x,y,r,r);
}finally {quil.core.pop_matrix.call(null);
}});
ludum44js.core.draw_bullet = (function ludum44js$core$draw_bullet(state,bullet){
quil.core.fill.call(null,new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(bullet),(255),(255));

var y = new cljs.core.Keyword(null,"y_offset","y_offset",1125597970).cljs$core$IFn$_invoke$arity$1(bullet);
var x = new cljs.core.Keyword(null,"x_offset","x_offset",759077110).cljs$core$IFn$_invoke$arity$1(bullet);
var r = new cljs.core.Keyword(null,"radius","radius",-2073122258).cljs$core$IFn$_invoke$arity$1(bullet);
var tr__1734__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__1734__auto__);

return quil.core.ellipse.call(null,x,y,r,r);
}finally {quil.core.pop_matrix.call(null);
}});
ludum44js.core.draw_state = (function ludum44js$core$draw_state(state){
var G__59271 = cljs.core.deref.call(null,ludum44js.core.current_scene);
var G__59271__$1 = (((G__59271 instanceof cljs.core.Keyword))?G__59271.fqn:null);
switch (G__59271__$1) {
case "GAME":
return ludum44js.core.draw_game_state.call(null,state);

break;
case "INTERSTITIAL":
return ludum44js.core.draw_interstitial_state.call(null,state);

break;
case "OVER":
return ludum44js.core.draw_game_over.call(null,state);

break;
default:
return state;

}
});
ludum44js.core.draw_game_state = (function ludum44js$core$draw_game_state(state){
quil.core.background.call(null,(0),(0),(0));

var player = new cljs.core.Keyword(null,"player","player",-97687400).cljs$core$IFn$_invoke$arity$1(state);
var enemies = new cljs.core.Keyword(null,"enemies","enemies",2114285722).cljs$core$IFn$_invoke$arity$1(state);
var projectiles = new cljs.core.Keyword(null,"projectiles","projectiles",-1303310399).cljs$core$IFn$_invoke$arity$1(state);
ludum44js.core.draw_player.call(null,state,player);

var seq__59273_59281 = cljs.core.seq.call(null,enemies);
var chunk__59274_59282 = null;
var count__59275_59283 = (0);
var i__59276_59284 = (0);
while(true){
if((i__59276_59284 < count__59275_59283)){
var enemy_59285 = cljs.core._nth.call(null,chunk__59274_59282,i__59276_59284);
ludum44js.core.draw_enemy.call(null,state,enemy_59285);


var G__59286 = seq__59273_59281;
var G__59287 = chunk__59274_59282;
var G__59288 = count__59275_59283;
var G__59289 = (i__59276_59284 + (1));
seq__59273_59281 = G__59286;
chunk__59274_59282 = G__59287;
count__59275_59283 = G__59288;
i__59276_59284 = G__59289;
continue;
} else {
var temp__5457__auto___59290 = cljs.core.seq.call(null,seq__59273_59281);
if(temp__5457__auto___59290){
var seq__59273_59291__$1 = temp__5457__auto___59290;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__59273_59291__$1)){
var c__4550__auto___59292 = cljs.core.chunk_first.call(null,seq__59273_59291__$1);
var G__59293 = cljs.core.chunk_rest.call(null,seq__59273_59291__$1);
var G__59294 = c__4550__auto___59292;
var G__59295 = cljs.core.count.call(null,c__4550__auto___59292);
var G__59296 = (0);
seq__59273_59281 = G__59293;
chunk__59274_59282 = G__59294;
count__59275_59283 = G__59295;
i__59276_59284 = G__59296;
continue;
} else {
var enemy_59297 = cljs.core.first.call(null,seq__59273_59291__$1);
ludum44js.core.draw_enemy.call(null,state,enemy_59297);


var G__59298 = cljs.core.next.call(null,seq__59273_59291__$1);
var G__59299 = null;
var G__59300 = (0);
var G__59301 = (0);
seq__59273_59281 = G__59298;
chunk__59274_59282 = G__59299;
count__59275_59283 = G__59300;
i__59276_59284 = G__59301;
continue;
}
} else {
}
}
break;
}

var seq__59277 = cljs.core.seq.call(null,projectiles);
var chunk__59278 = null;
var count__59279 = (0);
var i__59280 = (0);
while(true){
if((i__59280 < count__59279)){
var bullet = cljs.core._nth.call(null,chunk__59278,i__59280);
ludum44js.core.draw_bullet.call(null,state,bullet);


var G__59302 = seq__59277;
var G__59303 = chunk__59278;
var G__59304 = count__59279;
var G__59305 = (i__59280 + (1));
seq__59277 = G__59302;
chunk__59278 = G__59303;
count__59279 = G__59304;
i__59280 = G__59305;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq.call(null,seq__59277);
if(temp__5457__auto__){
var seq__59277__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__59277__$1)){
var c__4550__auto__ = cljs.core.chunk_first.call(null,seq__59277__$1);
var G__59306 = cljs.core.chunk_rest.call(null,seq__59277__$1);
var G__59307 = c__4550__auto__;
var G__59308 = cljs.core.count.call(null,c__4550__auto__);
var G__59309 = (0);
seq__59277 = G__59306;
chunk__59278 = G__59307;
count__59279 = G__59308;
i__59280 = G__59309;
continue;
} else {
var bullet = cljs.core.first.call(null,seq__59277__$1);
ludum44js.core.draw_bullet.call(null,state,bullet);


var G__59310 = cljs.core.next.call(null,seq__59277__$1);
var G__59311 = null;
var G__59312 = (0);
var G__59313 = (0);
seq__59277 = G__59310;
chunk__59278 = G__59311;
count__59279 = G__59312;
i__59280 = G__59313;
continue;
}
} else {
return null;
}
}
break;
}
});
ludum44js.core.draw_interstitial_state = (function ludum44js$core$draw_interstitial_state(state){
quil.core.background.call(null,(0));

quil.core.fill.call(null,(0),(0),(255));

ludum44js.core.draw_image.call(null,state,new cljs.core.Keyword(null,"bg","bg",-206688421),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0)], null));

ludum44js.core.draw_bet_dialog.call(null,state);

ludum44js.core.draw_money_progress.call(null,state);

ludum44js.core.draw_store.call(null,state);

return state;
});
ludum44js.core.draw_game_over = (function ludum44js$core$draw_game_over(state){
quil.core.background.call(null,(0));

quil.core.text.call(null,"You Died!",(250),(400));

quil.core.text.call(null,"Refresh this page to try again!",(100),(450));

return state;
});
ludum44js.core.draw_bet_dialog = (function ludum44js$core$draw_bet_dialog(state){
return ludum44js.core.draw_image.call(null,state,["bid",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.current_bet_bid))].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(115),(360)], null),(0),(55));
});
ludum44js.core.draw_money_progress = (function ludum44js$core$draw_money_progress(){
return ludum44js.core.draw_text.call(null,ludum44js.core.state,new cljs.core.Keyword(null,"earthorbiteracad","earthorbiteracad",29589921),["Balance: $",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,ludum44js.core.wallet_balance))].join(''),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(400),(500)], null));
});
ludum44js.core.draw_store = (function ludum44js$core$draw_store(){
var seq__59314_59342 = cljs.core.seq.call(null,cljs.core.zipmap.call(null,cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,ludum44js.core.purchases))),cljs.core.deref.call(null,ludum44js.core.purchases)));
var chunk__59315_59343 = null;
var count__59316_59344 = (0);
var i__59317_59345 = (0);
while(true){
if((i__59317_59345 < count__59316_59344)){
var vec__59330_59346 = cljs.core._nth.call(null,chunk__59315_59343,i__59317_59345);
var i_59347 = cljs.core.nth.call(null,vec__59330_59346,(0),null);
var vec__59333_59348 = cljs.core.nth.call(null,vec__59330_59346,(1),null);
var kind_59349 = cljs.core.nth.call(null,vec__59333_59348,(0),null);
var purchase_59350 = cljs.core.nth.call(null,vec__59333_59348,(1),null);
var locs_59351 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),(0),new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),(1),new cljs.core.Keyword(null,"armor","armor",-829575337),(2),new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),(3),new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),(4),new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),(5)], null);
quil.core.text.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(((1) + purchase_59350)),((80) + (kind_59349.call(null,locs_59351) * (95))),(600));


var G__59352 = seq__59314_59342;
var G__59353 = chunk__59315_59343;
var G__59354 = count__59316_59344;
var G__59355 = (i__59317_59345 + (1));
seq__59314_59342 = G__59352;
chunk__59315_59343 = G__59353;
count__59316_59344 = G__59354;
i__59317_59345 = G__59355;
continue;
} else {
var temp__5457__auto___59356 = cljs.core.seq.call(null,seq__59314_59342);
if(temp__5457__auto___59356){
var seq__59314_59357__$1 = temp__5457__auto___59356;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__59314_59357__$1)){
var c__4550__auto___59358 = cljs.core.chunk_first.call(null,seq__59314_59357__$1);
var G__59359 = cljs.core.chunk_rest.call(null,seq__59314_59357__$1);
var G__59360 = c__4550__auto___59358;
var G__59361 = cljs.core.count.call(null,c__4550__auto___59358);
var G__59362 = (0);
seq__59314_59342 = G__59359;
chunk__59315_59343 = G__59360;
count__59316_59344 = G__59361;
i__59317_59345 = G__59362;
continue;
} else {
var vec__59336_59363 = cljs.core.first.call(null,seq__59314_59357__$1);
var i_59364 = cljs.core.nth.call(null,vec__59336_59363,(0),null);
var vec__59339_59365 = cljs.core.nth.call(null,vec__59336_59363,(1),null);
var kind_59366 = cljs.core.nth.call(null,vec__59339_59365,(0),null);
var purchase_59367 = cljs.core.nth.call(null,vec__59339_59365,(1),null);
var locs_59368 = new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"fire_spread","fire_spread",1695562775),(0),new cljs.core.Keyword(null,"fire_rate","fire_rate",324969557),(1),new cljs.core.Keyword(null,"armor","armor",-829575337),(2),new cljs.core.Keyword(null,"bullet_size","bullet_size",-1738026655),(3),new cljs.core.Keyword(null,"vessel_size","vessel_size",1804918021),(4),new cljs.core.Keyword(null,"bullet_speed","bullet_speed",138403856),(5)], null);
quil.core.text.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(((1) + purchase_59367)),((80) + (kind_59366.call(null,locs_59368) * (95))),(600));


var G__59369 = cljs.core.next.call(null,seq__59314_59357__$1);
var G__59370 = null;
var G__59371 = (0);
var G__59372 = (0);
seq__59314_59342 = G__59369;
chunk__59315_59343 = G__59370;
count__59316_59344 = G__59371;
i__59317_59345 = G__59372;
continue;
}
} else {
}
}
break;
}

if((cljs.core.deref.call(null,ludum44js.core.wallet_balance) < (5))){
quil.core.fill.call(null,quil.core.color.call(null,(0),(0),(0),(100)));

return quil.core.rect.call(null,(0),(450),(600),(220));
} else {
return null;
}
});
ludum44js.core.run_sketch = (function ludum44js$core$run_sketch(){
ludum44js.core.ludum44js = (function ludum44js$core$run_sketch_$_ludum44js(){
return quil.sketch.sketch.call(null,new cljs.core.Keyword(null,"host","host",-1558485167),"ludum44js",new cljs.core.Keyword(null,"update","update",1045576396),((cljs.core.fn_QMARK_.call(null,ludum44js.core.update_state))?(function() { 
var G__59373__delegate = function (args){
return cljs.core.apply.call(null,ludum44js.core.update_state,args);
};
var G__59373 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__59374__i = 0, G__59374__a = new Array(arguments.length -  0);
while (G__59374__i < G__59374__a.length) {G__59374__a[G__59374__i] = arguments[G__59374__i + 0]; ++G__59374__i;}
  args = new cljs.core.IndexedSeq(G__59374__a,0,null);
} 
return G__59373__delegate.call(this,args);};
G__59373.cljs$lang$maxFixedArity = 0;
G__59373.cljs$lang$applyTo = (function (arglist__59375){
var args = cljs.core.seq(arglist__59375);
return G__59373__delegate(args);
});
G__59373.cljs$core$IFn$_invoke$arity$variadic = G__59373__delegate;
return G__59373;
})()
:ludum44js.core.update_state),new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(600),(800)], null),new cljs.core.Keyword(null,"setup","setup",1987730512),((cljs.core.fn_QMARK_.call(null,ludum44js.core.setup))?(function() { 
var G__59376__delegate = function (args){
return cljs.core.apply.call(null,ludum44js.core.setup,args);
};
var G__59376 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__59377__i = 0, G__59377__a = new Array(arguments.length -  0);
while (G__59377__i < G__59377__a.length) {G__59377__a[G__59377__i] = arguments[G__59377__i + 0]; ++G__59377__i;}
  args = new cljs.core.IndexedSeq(G__59377__a,0,null);
} 
return G__59376__delegate.call(this,args);};
G__59376.cljs$lang$maxFixedArity = 0;
G__59376.cljs$lang$applyTo = (function (arglist__59378){
var args = cljs.core.seq(arglist__59378);
return G__59376__delegate(args);
});
G__59376.cljs$core$IFn$_invoke$arity$variadic = G__59376__delegate;
return G__59376;
})()
:ludum44js.core.setup),new cljs.core.Keyword(null,"middleware","middleware",1462115504),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),new cljs.core.Keyword(null,"draw","draw",1358331674),((cljs.core.fn_QMARK_.call(null,ludum44js.core.draw_state))?(function() { 
var G__59379__delegate = function (args){
return cljs.core.apply.call(null,ludum44js.core.draw_state,args);
};
var G__59379 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__59380__i = 0, G__59380__a = new Array(arguments.length -  0);
while (G__59380__i < G__59380__a.length) {G__59380__a[G__59380__i] = arguments[G__59380__i + 0]; ++G__59380__i;}
  args = new cljs.core.IndexedSeq(G__59380__a,0,null);
} 
return G__59379__delegate.call(this,args);};
G__59379.cljs$lang$maxFixedArity = 0;
G__59379.cljs$lang$applyTo = (function (arglist__59381){
var args = cljs.core.seq(arglist__59381);
return G__59379__delegate(args);
});
G__59379.cljs$core$IFn$_invoke$arity$variadic = G__59379__delegate;
return G__59379;
})()
:ludum44js.core.draw_state));
});
goog.exportSymbol('ludum44js.core.ludum44js', ludum44js.core.ludum44js);

if(cljs.core.truth_(cljs.core.some.call(null,(function (p1__1332__1333__auto__){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"no-start","no-start",1381488856),p1__1332__1333__auto__);
}),null))){
return null;
} else {
return quil.sketch.add_sketch_to_init_list.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fn","fn",-1175266204),ludum44js.core.ludum44js,new cljs.core.Keyword(null,"host-id","host-id",742376279),"ludum44js"], null));
}
});
goog.exportSymbol('ludum44js.core.run_sketch', ludum44js.core.run_sketch);

//# sourceMappingURL=core.js.map
