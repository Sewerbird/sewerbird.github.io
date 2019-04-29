// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('ludum44js.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
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
ludum44js.core.current_scene = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$GAME);
ludum44js.core.current_level = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((1));
ludum44js.core.prior_bet_bid = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
ludum44js.core.current_bet_bid = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((5));
ludum44js.core.wallet_balance = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((100));
ludum44js.core.life_for_player = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((10));
ludum44js.core.time_now = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((0));
ludum44js.core.time_of_last_purchase = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((-10));
ludum44js.core.time_of_last_bid_change = cljs.core.atom.cljs$core$IFn$_invoke$arity$1((-10));
ludum44js.core.purchases = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$fire_rate,(0),cljs.core.cst$kw$fire_spread,(0),cljs.core.cst$kw$vessel_size,(0),cljs.core.cst$kw$armor,(0),cljs.core.cst$kw$bullet_size,(0),cljs.core.cst$kw$bullet_speed,(0)], null));
ludum44js.core.load_image = (function ludum44js$core$load_image(image){
var path = ["/scripts/public/",cljs.core.name(image),".png"].join('');
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Loading",path], 0));

return quil.core.load_image(path);
});
ludum44js.core.load_font = (function ludum44js$core$load_font(font){
var path = ["/scripts/public/",cljs.core.name(font)].join('');
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Loading",path], 0));

return quil.core.load_font(path);
});
ludum44js.core.draw_image = (function ludum44js$core$draw_image(state,k,p__55440,w,h){
var vec__55441 = p__55440;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55441,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55441,(1),null);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Drawing image",k,x,y,w,h], 0));

if(cljs.core.truth_((function (){var or__4131__auto__ = w;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return h;
}
})())){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Resizing to ",w,h], 0));

quil.core.resize(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$images,k], null)),w,h);
} else {
}

return quil.core.image.cljs$core$IFn$_invoke$arity$3(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$images,k], null)),x,y);
});
ludum44js.core.draw_text = (function ludum44js$core$draw_text(state,font,message,p__55444){
var vec__55445 = p__55444;
var x = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55445,(0),null);
var y = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__55445,(1),null);
quil.core.text_font.cljs$core$IFn$_invoke$arity$2("Arial",(30));

return quil.core.text.cljs$core$IFn$_invoke$arity$3(message,x,y);
});
ludum44js.core.images = new cljs.core.PersistentVector(null, 18, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$bg,cljs.core.cst$kw$test,"bid0","bid1","bid2","bid3","bid4","bid5","bid6","bid7","bid8","bid9",cljs.core.cst$kw$upgradepip,cljs.core.cst$kw$pew,"baddie1","baddie2","baddie3",cljs.core.cst$kw$player], null);
ludum44js.core.fonts = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$earthorbiteracad], null);
ludum44js.core.ui_extents = new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$test,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(800),(600)], null),cljs.core.cst$kw$bg,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(600),(800)], null)], null);
ludum44js.core.setup = (function ludum44js$core$setup(){
ludum44js.core.kill_line = (1.25 * quil.core.height());

quil.core.frame_rate((30));

quil.core.color_mode.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$hsb);

return new cljs.core.PersistentArrayMap(null, 7, [cljs.core.cst$kw$images,cljs.core.zipmap(ludum44js.core.images,cljs.core.map.cljs$core$IFn$_invoke$arity$2(ludum44js.core.load_image,ludum44js.core.images)),cljs.core.cst$kw$last_spawn,(0),cljs.core.cst$kw$frame_count,(0),cljs.core.cst$kw$level_time_elapsed,(0),cljs.core.cst$kw$player,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[(0),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$fire_rate,1.0,cljs.core.cst$kw$fire_spread,1.0,cljs.core.cst$kw$vessel_size,1.0,cljs.core.cst$kw$armor,1.0,cljs.core.cst$kw$bullet_size,1.0,cljs.core.cst$kw$bullet_speed,1.5], null),(0),(50),(10),(quil.core.height() * 0.9),0.5,(100),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$fire_rate,(0),cljs.core.cst$kw$fire_spread,(0),cljs.core.cst$kw$vessel_size,(0),cljs.core.cst$kw$armor,(0),cljs.core.cst$kw$bullet_size,(0),cljs.core.cst$kw$bullet_speed,(0)], null),0.5,(50)]),cljs.core.cst$kw$enemies,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$projectiles,cljs.core.PersistentVector.EMPTY], null);
});
ludum44js.core.update_enemy = (function ludum44js$core$update_enemy(enemy,dt,projectiles){
var timer = (dt + cljs.core.cst$kw$timer.cljs$core$IFn$_invoke$arity$1(enemy));
var was_hit = cljs.core.count((ludum44js.core.check_collision.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.check_collision.cljs$core$IFn$_invoke$arity$2(enemy,projectiles) : ludum44js.core.check_collision.call(null,enemy,projectiles)));
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$color,cljs.core.cst$kw$timer,cljs.core.cst$kw$variant,cljs.core.cst$kw$down_speed,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$right_speed,cljs.core.cst$kw$cleanup],[(0),timer,cljs.core.cst$kw$variant.cljs$core$IFn$_invoke$arity$1(enemy),cljs.core.cst$kw$down_speed.cljs$core$IFn$_invoke$arity$1(enemy),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(enemy),((((0) < was_hit))?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(enemy) - was_hit):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(enemy)),(cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(enemy) + (dt * cljs.core.cst$kw$down_speed.cljs$core$IFn$_invoke$arity$1(enemy))),(cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(enemy) + (dt * cljs.core.cst$kw$right_speed.cljs$core$IFn$_invoke$arity$1(enemy))),cljs.core.cst$kw$right_speed.cljs$core$IFn$_invoke$arity$1(enemy),(function (){var or__4131__auto__ = (cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(enemy) < ludum44js.core._kill_line);
if(or__4131__auto__){
return or__4131__auto__;
} else {
var and__4120__auto__ = ((0) < was_hit);
if(and__4120__auto__){
return (cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(enemy) - was_hit);
} else {
return and__4120__auto__;
}
}
})()]);
});
ludum44js.core.update_projectile = (function ludum44js$core$update_projectile(projectile,dt){
var timer = (dt + cljs.core.cst$kw$timer.cljs$core$IFn$_invoke$arity$1(projectile));
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$color,cljs.core.cst$kw$timer,cljs.core.cst$kw$down_speed,cljs.core.cst$kw$duration,cljs.core.cst$kw$radius,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$right_speed,cljs.core.cst$kw$cleanup],[(100),timer,cljs.core.cst$kw$down_speed.cljs$core$IFn$_invoke$arity$1(projectile),cljs.core.cst$kw$duration.cljs$core$IFn$_invoke$arity$1(projectile),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(projectile),(cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(projectile) + (dt * cljs.core.cst$kw$down_speed.cljs$core$IFn$_invoke$arity$1(projectile))),(cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(projectile) + (dt * cljs.core.cst$kw$right_speed.cljs$core$IFn$_invoke$arity$1(projectile))),cljs.core.cst$kw$right_speed.cljs$core$IFn$_invoke$arity$1(projectile),(((cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(projectile) > quil.core.height())) || ((cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(projectile) < (0))) || ((cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(projectile) > quil.core.width())) || ((cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(projectile) < (0))) || (((((0) < cljs.core.cst$kw$duration.cljs$core$IFn$_invoke$arity$1(projectile))) && ((timer > cljs.core.cst$kw$duration.cljs$core$IFn$_invoke$arity$1(projectile))))))]);
});
ludum44js.core.reinitialize_player = (function ludum44js$core$reinitialize_player(player){
var new_player = cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[(0),new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$fire_rate,(1.0 * ((1) / cljs.core.cst$kw$fire_rate.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases)))),cljs.core.cst$kw$fire_spread,((0.75 * cljs.core.cst$kw$fire_spread.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases))) + 1.0),cljs.core.cst$kw$vessel_size,((1.0 / cljs.core.cst$kw$vessel_size.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases))) * 1.0),cljs.core.cst$kw$armor,((0.3 * cljs.core.cst$kw$armor.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases))) + 1.0),cljs.core.cst$kw$bullet_size,((0.2 * cljs.core.cst$kw$bullet_size.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases))) + 1.0),cljs.core.cst$kw$bullet_speed,((0.5 * cljs.core.cst$kw$bullet_speed.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases))) + 1.0)], null),(180),(50),cljs.core.deref(ludum44js.core.life_for_player),(quil.core.height() * 0.9),0.5,(100),cljs.core.deref(ludum44js.core.purchases),0.5,((50) * ((1) / (function (){var x__4219__auto__ = (1);
var y__4220__auto__ = cljs.core.cst$kw$vessel_size.cljs$core$IFn$_invoke$arity$1(cljs.core.deref(ludum44js.core.purchases));
return ((x__4219__auto__ > y__4220__auto__) ? x__4219__auto__ : y__4220__auto__);
})()))]);
return new_player;
});
ludum44js.core.update_player = (function ludum44js$core$update_player(player,dt,player_is_hit){
var took_damage = ((((0) < cljs.core.cst$kw$invulnerability_timer.cljs$core$IFn$_invoke$arity$1(player)))?false:player_is_hit);
var inv = (cljs.core.truth_(took_damage)?(1.0 * cljs.core.cst$kw$armor.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player))):cljs.core.cst$kw$invulnerability_timer.cljs$core$IFn$_invoke$arity$1(player));
if(cljs.core.truth_(quil.core.key_pressed_QMARK_())){
var dkey = quil.core.raw_key();
var G__55448 = dkey;
switch (G__55448) {
case "d":
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[ludum44js.core.clamp((inv - dt),(0),(100)),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player) - (1)):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player)),cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player),ludum44js.core.clamp((cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player) + ludum44js.core.motion_sensitivity),(0),quil.core.width()),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]);

break;
case "a":
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[ludum44js.core.clamp((inv - dt),(0),(100)),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player) - (1)):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player)),cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player),ludum44js.core.clamp((cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player) - ludum44js.core.motion_sensitivity),(0),quil.core.width()),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]);

break;
case "s":
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[ludum44js.core.clamp((inv - dt),(0),(100)),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player) - (1)):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player)),ludum44js.core.clamp((cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player) + ludum44js.core.motion_sensitivity),(0),quil.core.height()),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]);

break;
case "w":
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[ludum44js.core.clamp((inv - dt),(0),(100)),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player) - (1)):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player)),ludum44js.core.clamp((cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player) - ludum44js.core.motion_sensitivity),(0),quil.core.height()),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]);

break;
default:
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[ludum44js.core.clamp((inv - dt),(0),(100)),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player) - (1)):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player)),cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]);

}
} else {
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[ludum44js.core.clamp((inv - dt),(0),(100)),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.truth_(took_damage)?(cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player) - (1)):cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player)),cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]);
}
});
ludum44js.core.check_collision = (function ludum44js$core$check_collision(tgt,colliders){

return cljs.core.filterv((function (a){
var wa = (cljs.core.truth_(cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(a))?cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(a):cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(a));
var wtgt = (cljs.core.truth_(cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(tgt))?cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(tgt):cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(tgt));
var dx = (cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(a) - cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(tgt));
var dy = (cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(a) - cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(tgt));
var dd = (function (){var G__55450 = ((dx * dx) + (dy * dy));
return Math.sqrt(G__55450);
})();
var r = (wa + wtgt);
return (dd < (r / (2)));
}),colliders);
});
ludum44js.core.cleanup = (function ludum44js$core$cleanup(col){
return cljs.core.filterv((function (p1__55451_SHARP_){
return cljs.core.not(cljs.core.cst$kw$cleanup.cljs$core$IFn$_invoke$arity$1(p1__55451_SHARP_));
}),col);
});
ludum44js.core.spawn_new_random_enemy = (function ludum44js$core$spawn_new_random_enemy(){
return cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$color,cljs.core.cst$kw$timer,cljs.core.cst$kw$variant,cljs.core.cst$kw$down_speed,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$right_speed,cljs.core.cst$kw$cleanup],[(0),(0),(1),200.0,(20),(1),(quil.core.height() * (0)),(quil.core.width() * quil.core.random.cljs$core$IFn$_invoke$arity$1(1.0)),(0),false]);
});
ludum44js.core.spawn_enemies = (function ludum44js$core$spawn_enemies(is_needed,old_enemies){
if(cljs.core.truth_(is_needed)){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(old_enemies,ludum44js.core.spawn_new_random_enemy());
} else {
return old_enemies;
}
});
ludum44js.core.check_player_firing = (function ludum44js$core$check_player_firing(player,dt){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player))){
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$player,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$projectiles,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[cljs.core.cst$kw$invulnerability_timer.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$projectiles.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player),(cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player) * cljs.core.cst$kw$fire_rate.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player))),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]),cljs.core.cst$kw$shots,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$color,cljs.core.cst$kw$timer,cljs.core.cst$kw$down_speed,cljs.core.cst$kw$duration,cljs.core.cst$kw$radius,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$right_speed,cljs.core.cst$kw$cleanup],[(66),(0),((-400) * cljs.core.cst$kw$bullet_speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player))),(3),((5) * cljs.core.cst$kw$bullet_size.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player))),(cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player) - cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player)),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),(((10) * (quil.core.random.cljs$core$IFn$_invoke$arity$1(2.0) - (1))) * cljs.core.cst$kw$fire_spread.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player))),false])], null)], null);
} else {
return new cljs.core.PersistentArrayMap(null, 2, [cljs.core.cst$kw$player,cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$invulnerability_timer,cljs.core.cst$kw$projectiles,cljs.core.cst$kw$upgrades,cljs.core.cst$kw$color,cljs.core.cst$kw$radius,cljs.core.cst$kw$life,cljs.core.cst$kw$y_offset,cljs.core.cst$kw$shot_timer,cljs.core.cst$kw$x_offset,cljs.core.cst$kw$purchases,cljs.core.cst$kw$shot_period,cljs.core.cst$kw$player_size],[cljs.core.cst$kw$invulnerability_timer.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$projectiles.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$upgrades.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$color.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$radius.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$y_offset.cljs$core$IFn$_invoke$arity$1(player),ludum44js.core.clamp((cljs.core.cst$kw$shot_timer.cljs$core$IFn$_invoke$arity$1(player) - dt),(0),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player)),cljs.core.cst$kw$x_offset.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$shot_period.cljs$core$IFn$_invoke$arity$1(player),cljs.core.cst$kw$player_size.cljs$core$IFn$_invoke$arity$1(player)]),cljs.core.cst$kw$shots,cljs.core.PersistentVector.EMPTY], null);
}
});
ludum44js.core.over_update_draw_state = (function ludum44js$core$over_update_draw_state(state,dt){
if(cljs.core.truth_(quil.core.key_pressed_QMARK_())){
var dkey_55453 = quil.core.raw_key();
var G__55452_55454 = dkey_55453;
switch (G__55452_55454) {
case " ":
(ludum44js.core._STAR_js.cljs$core$IFn$_invoke$arity$1 ? ludum44js.core._STAR_js.cljs$core$IFn$_invoke$arity$1("window.location.reload(false);") : ludum44js.core._STAR_js.call(null,"window.location.reload(false);"));

break;
default:

}
} else {
}

return state;
});
ludum44js.core.game_update_draw_state = (function ludum44js$core$game_update_draw_state(state,dt){
var old_player = cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state);
var old_enemies = cljs.core.cst$kw$enemies.cljs$core$IFn$_invoke$arity$1(state);
var old_projectiles = cljs.core.cst$kw$projectiles.cljs$core$IFn$_invoke$arity$1(state);
var updated_enemies = ludum44js.core.cleanup(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (old_player,old_enemies,old_projectiles){
return (function (p1__55456_SHARP_){
return ludum44js.core.update_enemy(p1__55456_SHARP_,dt,old_projectiles);
});})(old_player,old_enemies,old_projectiles))
,old_enemies));
var updated_projectiles = ludum44js.core.cleanup(cljs.core.map.cljs$core$IFn$_invoke$arity$2(((function (old_player,old_enemies,old_projectiles,updated_enemies){
return (function (p1__55457_SHARP_){
return ludum44js.core.update_projectile(p1__55457_SHARP_,dt);
});})(old_player,old_enemies,old_projectiles,updated_enemies))
,old_projectiles));
var spawn_needed = (quil.core.frame_count() > (cljs.core.cst$kw$last_spawn.cljs$core$IFn$_invoke$arity$1(state) + (3)));
var new_enemies = ludum44js.core.spawn_enemies((quil.core.frame_count() > (cljs.core.cst$kw$last_spawn.cljs$core$IFn$_invoke$arity$1(state) + (3))),updated_enemies);
var player_is_hit = ((0) < cljs.core.count(ludum44js.core.check_collision(old_player,new_enemies)));
var player_is_firing = ludum44js.core.check_player_firing(old_player,dt);
var new_player = (function (){var G__55460 = cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(player_is_firing);
var fexpr__55459 = ((function (G__55460,old_player,old_enemies,old_projectiles,updated_enemies,updated_projectiles,spawn_needed,new_enemies,player_is_hit,player_is_firing){
return (function (p1__55458_SHARP_){
return ludum44js.core.update_player(p1__55458_SHARP_,dt,player_is_hit);
});})(G__55460,old_player,old_enemies,old_projectiles,updated_enemies,updated_projectiles,spawn_needed,new_enemies,player_is_hit,player_is_firing))
;
return fexpr__55459(G__55460);
})();
var new_player_projectiles = cljs.core.cst$kw$shots.cljs$core$IFn$_invoke$arity$1(player_is_firing);
return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$level_time_elapsed,(dt + cljs.core.cst$kw$level_time_elapsed.cljs$core$IFn$_invoke$arity$1(state)),cljs.core.cst$kw$last_spawn,((spawn_needed)?quil.core.frame_count():cljs.core.cst$kw$last_spawn.cljs$core$IFn$_invoke$arity$1(state)),cljs.core.cst$kw$frame_count,quil.core.frame_count(),cljs.core.cst$kw$player,new_player,cljs.core.cst$kw$enemies,new_enemies,cljs.core.cst$kw$projectiles,ludum44js.core.cleanup(cljs.core.into.cljs$core$IFn$_invoke$arity$2(updated_projectiles,new_player_projectiles)),cljs.core.cst$kw$images,cljs.core.cst$kw$images.cljs$core$IFn$_invoke$arity$1(state),cljs.core.cst$kw$fonts,cljs.core.cst$kw$fonts.cljs$core$IFn$_invoke$arity$1(state)], null);
});
ludum44js.core.interstitial_update_draw_state = (function ludum44js$core$interstitial_update_draw_state(state,dt){
var old_player = cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state);
var new_player = ludum44js.core.reinitialize_player(old_player);
if(cljs.core.truth_(quil.core.key_pressed_QMARK_())){
var dkey_55474 = quil.core.raw_key();
var G__55461_55475 = dkey_55474;
switch (G__55461_55475) {
case "a":
(ludum44js.core.up_the_stakes.cljs$core$IFn$_invoke$arity$1 ? ludum44js.core.up_the_stakes.cljs$core$IFn$_invoke$arity$1(state) : ludum44js.core.up_the_stakes.call(null,state));

break;
case "d":
(ludum44js.core.lower_the_stakes.cljs$core$IFn$_invoke$arity$1 ? ludum44js.core.lower_the_stakes.cljs$core$IFn$_invoke$arity$1(state) : ludum44js.core.lower_the_stakes.call(null,state));

break;
case "1":
var G__55462_55477 = state;
var G__55463_55478 = cljs.core.cst$kw$fire_spread;
(ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2(G__55462_55477,G__55463_55478) : ludum44js.core.purchase.call(null,G__55462_55477,G__55463_55478));

break;
case "2":
var G__55464_55479 = state;
var G__55465_55480 = cljs.core.cst$kw$fire_rate;
(ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2(G__55464_55479,G__55465_55480) : ludum44js.core.purchase.call(null,G__55464_55479,G__55465_55480));

break;
case "3":
var G__55466_55481 = state;
var G__55467_55482 = cljs.core.cst$kw$armor;
(ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2(G__55466_55481,G__55467_55482) : ludum44js.core.purchase.call(null,G__55466_55481,G__55467_55482));

break;
case "4":
var G__55468_55483 = state;
var G__55469_55484 = cljs.core.cst$kw$bullet_size;
(ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2(G__55468_55483,G__55469_55484) : ludum44js.core.purchase.call(null,G__55468_55483,G__55469_55484));

break;
case "5":
var G__55470_55485 = state;
var G__55471_55486 = cljs.core.cst$kw$vessel_size;
(ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2(G__55470_55485,G__55471_55486) : ludum44js.core.purchase.call(null,G__55470_55485,G__55471_55486));

break;
case "6":
var G__55472_55487 = state;
var G__55473_55488 = cljs.core.cst$kw$bullet_speed;
(ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2 ? ludum44js.core.purchase.cljs$core$IFn$_invoke$arity$2(G__55472_55487,G__55473_55488) : ludum44js.core.purchase.call(null,G__55472_55487,G__55473_55488));

break;
case " ":
(ludum44js.core.go_to_next_level.cljs$core$IFn$_invoke$arity$0 ? ludum44js.core.go_to_next_level.cljs$core$IFn$_invoke$arity$0() : ludum44js.core.go_to_next_level.call(null));

break;
default:
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["*whistle*"], 0));

}
} else {
}

return new cljs.core.PersistentArrayMap(null, 8, [cljs.core.cst$kw$level_time_elapsed,(0),cljs.core.cst$kw$last_spawn,cljs.core.cst$kw$last_spawn.cljs$core$IFn$_invoke$arity$1(state),cljs.core.cst$kw$frame_count,quil.core.frame_count(),cljs.core.cst$kw$player,new_player,cljs.core.cst$kw$enemies,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$projectiles,cljs.core.PersistentVector.EMPTY,cljs.core.cst$kw$images,cljs.core.cst$kw$images.cljs$core$IFn$_invoke$arity$1(state),cljs.core.cst$kw$fonts,cljs.core.cst$kw$fonts.cljs$core$IFn$_invoke$arity$1(state)], null);
});
ludum44js.core.up_the_stakes = (function ludum44js$core$up_the_stakes(state){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Upping the stakes, time vs last is",cljs.core.deref(ludum44js.core.time_now),cljs.core.deref(ludum44js.core.time_of_last_bid_change)], 0));

if((0.25 < (cljs.core.deref(ludum44js.core.time_now) - cljs.core.deref(ludum44js.core.time_of_last_bid_change)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.time_of_last_bid_change,(function (old){
return cljs.core.deref(ludum44js.core.time_now);
}));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_bet_bid,(function (old){
return ludum44js.core.clamp((old + (1)),(0),(9));
}));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.life_for_player,(function (old){
return ((10) - cljs.core.deref(ludum44js.core.current_bet_bid));
}));
} else {
return null;
}
});
ludum44js.core.lower_the_stakes = (function ludum44js$core$lower_the_stakes(state){
if((0.25 < (cljs.core.deref(ludum44js.core.time_now) - cljs.core.deref(ludum44js.core.time_of_last_bid_change)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.time_of_last_bid_change,(function (old){
return cljs.core.deref(ludum44js.core.time_now);
}));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_bet_bid,(function (old){
return ludum44js.core.clamp((old - (1)),(0),(9));
}));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.life_for_player,(function (old){
return ((10) - cljs.core.deref(ludum44js.core.current_bet_bid));
}));
} else {
return null;
}
});
ludum44js.core.go_to_next_level = (function ludum44js$core$go_to_next_level(state){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.prior_bet_bid,(function (old){
return cljs.core.deref(ludum44js.core.current_bet_bid);
}));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.life_for_player,(function (old){
return ((10) - cljs.core.deref(ludum44js.core.current_bet_bid));
}));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_scene,(function (old){
return cljs.core.cst$kw$GAME;
}));
});
ludum44js.core.finish_level = (function ludum44js$core$finish_level(state){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.wallet_balance,(function (old){
return (old + cljs.core.deref(ludum44js.core.current_bet_bid));
}));

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_scene,(function (old){
return cljs.core.cst$kw$INTERSTITIAL;
}));
});
ludum44js.core.purchase = (function ludum44js$core$purchase(state,upgrade){
if((((cljs.core.deref(ludum44js.core.wallet_balance) >= (5))) && ((0.5 < (cljs.core.deref(ludum44js.core.time_now) - cljs.core.deref(ludum44js.core.time_of_last_purchase)))))){
var new_purchases = new cljs.core.PersistentArrayMap(null, 6, [cljs.core.cst$kw$fire_rate,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(upgrade,cljs.core.cst$kw$fire_rate))?((1) + cljs.core.cst$kw$fire_rate.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))):cljs.core.cst$kw$fire_rate.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))),cljs.core.cst$kw$fire_spread,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(upgrade,cljs.core.cst$kw$fire_spread))?((1) + cljs.core.cst$kw$fire_spread.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))):cljs.core.cst$kw$fire_spread.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))),cljs.core.cst$kw$armor,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(upgrade,cljs.core.cst$kw$armor))?((1) + cljs.core.cst$kw$armor.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))):cljs.core.cst$kw$armor.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))),cljs.core.cst$kw$bullet_size,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(upgrade,cljs.core.cst$kw$bullet_size))?((1) + cljs.core.cst$kw$bullet_size.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))):cljs.core.cst$kw$bullet_size.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))),cljs.core.cst$kw$bullet_speed,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(upgrade,cljs.core.cst$kw$bullet_speed))?((1) + cljs.core.cst$kw$bullet_speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))):cljs.core.cst$kw$bullet_speed.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))),cljs.core.cst$kw$vessel_size,((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(upgrade,cljs.core.cst$kw$vessel_size))?((1) + cljs.core.cst$kw$vessel_size.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))):cljs.core.cst$kw$vessel_size.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$purchases.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state))))], null);
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.time_of_last_purchase,((function (new_purchases){
return (function (old){
return cljs.core.deref(ludum44js.core.time_now);
});})(new_purchases))
);

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Purchasing ",upgrade," for 5"], 0));

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.wallet_balance,((function (new_purchases){
return (function (old){
return (old - (5));
});})(new_purchases))
);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.purchases,((function (new_purchases){
return (function (old){
return new_purchases;
});})(new_purchases))
);
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Insufficient vespene gas"], 0));
}
});
ludum44js.core.update_state = (function ludum44js$core$update_state(state){
var dt = ((quil.core.frame_count() - cljs.core.cst$kw$frame_count.cljs$core$IFn$_invoke$arity$1(state)) / quil.core.target_frame_rate());
var new_time_elapsed = (dt + cljs.core.cst$kw$level_time_elapsed.cljs$core$IFn$_invoke$arity$1(state));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.time_now,((function (dt,new_time_elapsed){
return (function (old){
return (old + dt);
});})(dt,new_time_elapsed))
);

if((new_time_elapsed > (10))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_scene,((function (dt,new_time_elapsed){
return (function (old){
return cljs.core.cst$kw$INTERSTITIAL;
});})(dt,new_time_elapsed))
);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_level,((function (dt,new_time_elapsed){
return (function (old){
return ((1) + old);
});})(dt,new_time_elapsed))
);
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((0),cljs.core.cst$kw$life.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$player.cljs$core$IFn$_invoke$arity$1(state)))){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(ludum44js.core.current_scene,((function (dt,new_time_elapsed){
return (function (old){
return cljs.core.cst$kw$OVER;
});})(dt,new_time_elapsed))
);
} else {
}

var G__55489 = cljs.core.deref(ludum44js.core.current_scene);
var G__55489__$1 = (((G__55489 instanceof cljs.core.Keyword))?G__55489.fqn:null);
switch (G__55489__$1) {
case "GAME":
return ludum44js.core.game_update_draw_state(state,dt);

break;
case "INTERSTITIAL":
return ludum44js.core.interstitial_update_draw_state(state,dt);

break;
case "OVER":
return ludum44js.core.over_update_draw_state(state,dt);

break;
default:
return state;

}
});
