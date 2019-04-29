// Compiled by ClojureScript 1.10.520 {:static-fns true, :optimize-constants true}
goog.provide('quil.sketch');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('quil.util');
goog.require('quil.middlewares.deprecated_options');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.style');
goog.require('goog.events.EventType');
quil.sketch._STAR_applet_STAR_ = null;
quil.sketch.current_applet = (function quil$sketch$current_applet(){
return quil.sketch._STAR_applet_STAR_;
});
quil.sketch.rendering_modes = new cljs.core.PersistentArrayMap(null, 4, [cljs.core.cst$kw$java2d,(p5.prototype["JAVA2D"]),cljs.core.cst$kw$p2d,(p5.prototype["P2D"]),cljs.core.cst$kw$p3d,(p5.prototype["P3D"]),cljs.core.cst$kw$opengl,(p5.prototype["OPENGL"])], null);
quil.sketch.resolve_renderer = (function quil$sketch$resolve_renderer(mode){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$p3d,mode)){
return (p5.prototype["WEBGL"]);
} else {
return quil.util.resolve_constant_key(mode,quil.sketch.rendering_modes);
}
});
quil.sketch.set_size = (function quil$sketch$set_size(applet,width,height){
var temp__5457__auto__ = applet.quil_canvas;
if(cljs.core.truth_(temp__5457__auto__)){
var el = temp__5457__auto__;
var inner_canvas = el.querySelector("canvas");
inner_canvas.setAttribute("width",width);

inner_canvas.setAttribute("height",height);

(inner_canvas.style["width"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(width),"px"].join(''));

(inner_canvas.style["height"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(height),"px"].join(''));

applet.width = window.parseInt(goog.style.getComputedStyle(inner_canvas,"width"));

return applet.height = window.parseInt(goog.style.getComputedStyle(inner_canvas,"height"));
} else {
return null;
}
});
quil.sketch.size = (function quil$sketch$size(var_args){
var G__6822 = arguments.length;
switch (G__6822) {
case 2:
return quil.sketch.size.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return quil.sketch.size.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

quil.sketch.size.cljs$core$IFn$_invoke$arity$2 = (function (width,height){
return quil.sketch.current_applet().createCanvas((width | (0)),(height | (0)));
});

quil.sketch.size.cljs$core$IFn$_invoke$arity$3 = (function (width,height,mode){
return quil.sketch.current_applet().createCanvas((width | (0)),(height | (0)),quil.sketch.resolve_renderer(mode));
});

quil.sketch.size.cljs$lang$maxFixedArity = 3;

quil.sketch.bind_handlers = (function quil$sketch$bind_handlers(prc,opts){
var seq__6824 = cljs.core.seq(cljs.core.PersistentHashMap.fromArrays([cljs.core.cst$kw$keyPressed,cljs.core.cst$kw$mouseOut,cljs.core.cst$kw$mouseScrolled,cljs.core.cst$kw$mouseDragged,cljs.core.cst$kw$setup,cljs.core.cst$kw$keyReleased,cljs.core.cst$kw$mouseClicked,cljs.core.cst$kw$mouseReleased,cljs.core.cst$kw$mousePressed,cljs.core.cst$kw$mouseMoved,cljs.core.cst$kw$mouseOver,cljs.core.cst$kw$keyTyped,cljs.core.cst$kw$draw],[cljs.core.cst$kw$key_DASH_pressed,cljs.core.cst$kw$mouse_DASH_exited,cljs.core.cst$kw$mouse_DASH_wheel,cljs.core.cst$kw$mouse_DASH_dragged,cljs.core.cst$kw$setup,cljs.core.cst$kw$key_DASH_released,cljs.core.cst$kw$mouse_DASH_clicked,cljs.core.cst$kw$mouse_DASH_released,cljs.core.cst$kw$mouse_DASH_pressed,cljs.core.cst$kw$mouse_DASH_moved,cljs.core.cst$kw$mouse_DASH_entered,cljs.core.cst$kw$key_DASH_typed,cljs.core.cst$kw$draw]));
var chunk__6825 = null;
var count__6826 = (0);
var i__6827 = (0);
while(true){
if((i__6827 < count__6826)){
var vec__6838 = chunk__6825.cljs$core$IIndexed$_nth$arity$2(null,i__6827);
var processing_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6838,(0),null);
var quil_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6838,(1),null);
var temp__5457__auto___6848 = (opts.cljs$core$IFn$_invoke$arity$1 ? opts.cljs$core$IFn$_invoke$arity$1(quil_name) : opts.call(null,quil_name));
if(cljs.core.truth_(temp__5457__auto___6848)){
var handler_6849 = temp__5457__auto___6848;
(prc[cljs.core.name(processing_name)] = ((function (seq__6824,chunk__6825,count__6826,i__6827,handler_6849,temp__5457__auto___6848,vec__6838,processing_name,quil_name){
return (function (){
var _STAR_applet_STAR__orig_val__6841 = quil.sketch._STAR_applet_STAR_;
var _STAR_applet_STAR__temp_val__6842 = prc;
quil.sketch._STAR_applet_STAR_ = _STAR_applet_STAR__temp_val__6842;

try{return (handler_6849.cljs$core$IFn$_invoke$arity$0 ? handler_6849.cljs$core$IFn$_invoke$arity$0() : handler_6849.call(null));
}finally {quil.sketch._STAR_applet_STAR_ = _STAR_applet_STAR__orig_val__6841;
}});})(seq__6824,chunk__6825,count__6826,i__6827,handler_6849,temp__5457__auto___6848,vec__6838,processing_name,quil_name))
);
} else {
}


var G__6850 = seq__6824;
var G__6851 = chunk__6825;
var G__6852 = count__6826;
var G__6853 = (i__6827 + (1));
seq__6824 = G__6850;
chunk__6825 = G__6851;
count__6826 = G__6852;
i__6827 = G__6853;
continue;
} else {
var temp__5457__auto__ = cljs.core.seq(seq__6824);
if(temp__5457__auto__){
var seq__6824__$1 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__6824__$1)){
var c__4550__auto__ = cljs.core.chunk_first(seq__6824__$1);
var G__6854 = cljs.core.chunk_rest(seq__6824__$1);
var G__6855 = c__4550__auto__;
var G__6856 = cljs.core.count(c__4550__auto__);
var G__6857 = (0);
seq__6824 = G__6854;
chunk__6825 = G__6855;
count__6826 = G__6856;
i__6827 = G__6857;
continue;
} else {
var vec__6843 = cljs.core.first(seq__6824__$1);
var processing_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6843,(0),null);
var quil_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__6843,(1),null);
var temp__5457__auto___6858__$1 = (opts.cljs$core$IFn$_invoke$arity$1 ? opts.cljs$core$IFn$_invoke$arity$1(quil_name) : opts.call(null,quil_name));
if(cljs.core.truth_(temp__5457__auto___6858__$1)){
var handler_6859 = temp__5457__auto___6858__$1;
(prc[cljs.core.name(processing_name)] = ((function (seq__6824,chunk__6825,count__6826,i__6827,handler_6859,temp__5457__auto___6858__$1,vec__6843,processing_name,quil_name,seq__6824__$1,temp__5457__auto__){
return (function (){
var _STAR_applet_STAR__orig_val__6846 = quil.sketch._STAR_applet_STAR_;
var _STAR_applet_STAR__temp_val__6847 = prc;
quil.sketch._STAR_applet_STAR_ = _STAR_applet_STAR__temp_val__6847;

try{return (handler_6859.cljs$core$IFn$_invoke$arity$0 ? handler_6859.cljs$core$IFn$_invoke$arity$0() : handler_6859.call(null));
}finally {quil.sketch._STAR_applet_STAR_ = _STAR_applet_STAR__orig_val__6846;
}});})(seq__6824,chunk__6825,count__6826,i__6827,handler_6859,temp__5457__auto___6858__$1,vec__6843,processing_name,quil_name,seq__6824__$1,temp__5457__auto__))
);
} else {
}


var G__6860 = cljs.core.next(seq__6824__$1);
var G__6861 = null;
var G__6862 = (0);
var G__6863 = (0);
seq__6824 = G__6860;
chunk__6825 = G__6861;
count__6826 = G__6862;
i__6827 = G__6863;
continue;
}
} else {
return null;
}
}
break;
}
});
quil.sketch.in_fullscreen_QMARK_ = (function quil$sketch$in_fullscreen_QMARK_(){
var or__4131__auto__ = document.fullscreenElement;
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return document.mozFullScreenElement;
}
});
/**
 * Adds fullscreen support for provided Processing object.
 *   Fullscreen is enabled when user presses F11. We turn
 *   sketch <canvas> element to fullscreen storing old size
 *   in an atom. When user cancels fullscreen (F11 or Esc)
 *   we resize sketch to the old size.
 */
quil.sketch.add_fullscreen_support = (function quil$sketch$add_fullscreen_support(applet){
var old_size = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var adjust_canvas_size = ((function (old_size){
return (function (){
if(cljs.core.truth_(quil.sketch.in_fullscreen_QMARK_())){
cljs.core.reset_BANG_(old_size,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [applet.width,applet.height], null));

return quil.sketch.set_size(applet,window.screen.width,window.screen.height);
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(quil.sketch.set_size,applet,cljs.core.deref(old_size));
}
});})(old_size))
;
var G__6865_6871 = window;
var G__6866_6872 = goog.events.EventType.KEYDOWN;
var G__6867_6873 = ((function (G__6865_6871,G__6866_6872,old_size,adjust_canvas_size){
return (function (event){
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(event.key,"F11")) && (cljs.core.not(quil.sketch.in_fullscreen_QMARK_())))){
event.preventDefault();

var canvas = applet.quil_canvas;
if(cljs.core.truth_(canvas.requestFullscreen)){
return canvas.requestFullscreen();
} else {
if(cljs.core.truth_(canvas.mozRequestFullScreen)){
return canvas.mozRequestFullScreen();
} else {
return console.warn("Fullscreen mode is not supported in current browser.");

}
}
} else {
return null;
}
});})(G__6865_6871,G__6866_6872,old_size,adjust_canvas_size))
;
goog.events.listen(G__6865_6871,G__6866_6872,G__6867_6873);

goog.events.listen(document,"fullscreenchange",adjust_canvas_size);

goog.events.listen(document,"mozfullscreenchange",adjust_canvas_size);

var G__6868 = document;
var G__6869 = "fullscreenerror";
var G__6870 = ((function (G__6868,G__6869,old_size,adjust_canvas_size){
return (function (p1__6864_SHARP_){
return console.error("Error while switching to/from fullscreen: ",p1__6864_SHARP_);
});})(G__6868,G__6869,old_size,adjust_canvas_size))
;
return goog.events.listen(G__6868,G__6869,G__6870);
});
quil.sketch.make_sketch = (function quil$sketch$make_sketch(options){
var opts = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$size,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(500),(300)], null)], null),(function (){var G__6876 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.comp,cljs.core.cons(quil.middlewares.deprecated_options.deprecated_options,cljs.core.cst$kw$middleware.cljs$core$IFn$_invoke$arity$2(options,cljs.core.PersistentVector.EMPTY)));
var fexpr__6875 = ((function (G__6876){
return (function (p1__6874_SHARP_){
return (p1__6874_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__6874_SHARP_.cljs$core$IFn$_invoke$arity$1(options) : p1__6874_SHARP_.call(null,options));
});})(G__6876))
;
return fexpr__6875(G__6876);
})()], 0));
var sketch_size = cljs.core.cst$kw$size.cljs$core$IFn$_invoke$arity$1(opts);
var renderer = cljs.core.cst$kw$renderer.cljs$core$IFn$_invoke$arity$1(opts);
var features = cljs.core.set(cljs.core.cst$kw$features.cljs$core$IFn$_invoke$arity$1(opts));
var setup = ((function (opts,sketch_size,renderer,features){
return (function (){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(quil.sketch.size,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(sketch_size,(cljs.core.truth_(renderer)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [renderer], null):cljs.core.PersistentVector.EMPTY)));

if(cljs.core.truth_(cljs.core.cst$kw$settings.cljs$core$IFn$_invoke$arity$1(opts))){
var fexpr__6877_6881 = cljs.core.cst$kw$settings.cljs$core$IFn$_invoke$arity$1(opts);
(fexpr__6877_6881.cljs$core$IFn$_invoke$arity$0 ? fexpr__6877_6881.cljs$core$IFn$_invoke$arity$0() : fexpr__6877_6881.call(null));
} else {
}

if(cljs.core.truth_(cljs.core.cst$kw$setup.cljs$core$IFn$_invoke$arity$1(opts))){
var fexpr__6878 = cljs.core.cst$kw$setup.cljs$core$IFn$_invoke$arity$1(opts);
return (fexpr__6878.cljs$core$IFn$_invoke$arity$0 ? fexpr__6878.cljs$core$IFn$_invoke$arity$0() : fexpr__6878.call(null));
} else {
return null;
}
});})(opts,sketch_size,renderer,features))
;
var mouse_wheel = (cljs.core.truth_(cljs.core.cst$kw$mouse_DASH_wheel.cljs$core$IFn$_invoke$arity$1(opts))?((function (opts,sketch_size,renderer,features,setup){
return (function (){
var G__6880 = ((-1) * quil.sketch._STAR_applet_STAR_.mouseScroll);
var fexpr__6879 = cljs.core.cst$kw$mouse_DASH_wheel.cljs$core$IFn$_invoke$arity$1(opts);
return (fexpr__6879.cljs$core$IFn$_invoke$arity$1 ? fexpr__6879.cljs$core$IFn$_invoke$arity$1(G__6880) : fexpr__6879.call(null,G__6880));
});})(opts,sketch_size,renderer,features,setup))
:null);
var opts__$1 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(opts,cljs.core.cst$kw$setup,setup,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$mouse_DASH_wheel,mouse_wheel], 0));
var sketch = ((function (opts,sketch_size,renderer,features,setup,mouse_wheel,opts__$1){
return (function (prc){
quil.sketch.bind_handlers(prc,opts__$1);

prc.quil = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);

return prc.quil_internal_state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(quil.util.initial_internal_state);
});})(opts,sketch_size,renderer,features,setup,mouse_wheel,opts__$1))
;
return sketch;
});
quil.sketch.destroy_previous_sketch = (function quil$sketch$destroy_previous_sketch(host_elem){
var temp__5457__auto__ = host_elem.processing_obj;
if(cljs.core.truth_(temp__5457__auto__)){
var proc_obj = temp__5457__auto__;
return proc_obj.remove();
} else {
return null;
}
});
quil.sketch.sketch = (function quil$sketch$sketch(var_args){
var args__4736__auto__ = [];
var len__4730__auto___6883 = arguments.length;
var i__4731__auto___6884 = (0);
while(true){
if((i__4731__auto___6884 < len__4730__auto___6883)){
args__4736__auto__.push((arguments[i__4731__auto___6884]));

var G__6885 = (i__4731__auto___6884 + (1));
i__4731__auto___6884 = G__6885;
continue;
} else {
}
break;
}

var argseq__4737__auto__ = ((((0) < args__4736__auto__.length))?(new cljs.core.IndexedSeq(args__4736__auto__.slice((0)),(0),null)):null);
return quil.sketch.sketch.cljs$core$IFn$_invoke$arity$variadic(argseq__4737__auto__);
});

quil.sketch.sketch.cljs$core$IFn$_invoke$arity$variadic = (function (opts){
var opts_map = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,opts);
var host_elem = cljs.core.cst$kw$host.cljs$core$IFn$_invoke$arity$1(opts_map);
var renderer = (function (){var or__4131__auto__ = cljs.core.cst$kw$renderer.cljs$core$IFn$_invoke$arity$1(opts_map);
if(cljs.core.truth_(or__4131__auto__)){
return or__4131__auto__;
} else {
return cljs.core.cst$kw$p2d;
}
})();
var host_elem__$1 = ((typeof host_elem === 'string')?document.getElementById(host_elem):host_elem);
if(cljs.core.truth_(host_elem__$1)){
if(cljs.core.truth_(host_elem__$1.processing_context)){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(renderer,host_elem__$1.processing_context)){
} else {
console.warn("WARNING: Using different context on one canvas!");
}
} else {
host_elem__$1.processing_context = renderer;
}

quil.sketch.destroy_previous_sketch(host_elem__$1);

var proc_obj = (new p5(quil.sketch.make_sketch(opts_map),host_elem__$1));
host_elem__$1.processing_obj = proc_obj;

proc_obj.quil_canvas = host_elem__$1;

quil.sketch.add_fullscreen_support(proc_obj);

return proc_obj;
} else {
return console.error((cljs.core.truth_(cljs.core.cst$kw$host.cljs$core$IFn$_invoke$arity$1(opts_map))?["ERROR: Cannot find host element: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.cst$kw$host.cljs$core$IFn$_invoke$arity$1(opts_map))].join(''):"ERROR: Cannot create sketch. :host is not specified or element not found."));
}
});

quil.sketch.sketch.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
quil.sketch.sketch.cljs$lang$applyTo = (function (seq6882){
var self__4718__auto__ = this;
return self__4718__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq6882));
});

quil.sketch.sketch_init_list = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.List.EMPTY);
quil.sketch.empty_body_QMARK_ = (function quil$sketch$empty_body_QMARK_(){
var child = document.body.childNodes;
return (child.length <= (1));
});
quil.sketch.add_canvas = (function quil$sketch$add_canvas(canvas_id){
var canvas = document.createElement("canvas");
canvas.setAttribute("id",canvas_id);

return document.body.appendChild(canvas);
});
quil.sketch.init_sketches = (function quil$sketch$init_sketches(){
var add_elem_QMARK__6894 = quil.sketch.empty_body_QMARK_();
var seq__6886_6895 = cljs.core.seq(cljs.core.deref(quil.sketch.sketch_init_list));
var chunk__6887_6896 = null;
var count__6888_6897 = (0);
var i__6889_6898 = (0);
while(true){
if((i__6889_6898 < count__6888_6897)){
var sk_6899 = chunk__6887_6896.cljs$core$IIndexed$_nth$arity$2(null,i__6889_6898);
if(add_elem_QMARK__6894){
quil.sketch.add_canvas(cljs.core.cst$kw$host_DASH_id.cljs$core$IFn$_invoke$arity$1(sk_6899));
} else {
}

var fexpr__6892_6900 = cljs.core.cst$kw$fn.cljs$core$IFn$_invoke$arity$1(sk_6899);
(fexpr__6892_6900.cljs$core$IFn$_invoke$arity$0 ? fexpr__6892_6900.cljs$core$IFn$_invoke$arity$0() : fexpr__6892_6900.call(null));


var G__6901 = seq__6886_6895;
var G__6902 = chunk__6887_6896;
var G__6903 = count__6888_6897;
var G__6904 = (i__6889_6898 + (1));
seq__6886_6895 = G__6901;
chunk__6887_6896 = G__6902;
count__6888_6897 = G__6903;
i__6889_6898 = G__6904;
continue;
} else {
var temp__5457__auto___6905 = cljs.core.seq(seq__6886_6895);
if(temp__5457__auto___6905){
var seq__6886_6906__$1 = temp__5457__auto___6905;
if(cljs.core.chunked_seq_QMARK_(seq__6886_6906__$1)){
var c__4550__auto___6907 = cljs.core.chunk_first(seq__6886_6906__$1);
var G__6908 = cljs.core.chunk_rest(seq__6886_6906__$1);
var G__6909 = c__4550__auto___6907;
var G__6910 = cljs.core.count(c__4550__auto___6907);
var G__6911 = (0);
seq__6886_6895 = G__6908;
chunk__6887_6896 = G__6909;
count__6888_6897 = G__6910;
i__6889_6898 = G__6911;
continue;
} else {
var sk_6912 = cljs.core.first(seq__6886_6906__$1);
if(add_elem_QMARK__6894){
quil.sketch.add_canvas(cljs.core.cst$kw$host_DASH_id.cljs$core$IFn$_invoke$arity$1(sk_6912));
} else {
}

var fexpr__6893_6913 = cljs.core.cst$kw$fn.cljs$core$IFn$_invoke$arity$1(sk_6912);
(fexpr__6893_6913.cljs$core$IFn$_invoke$arity$0 ? fexpr__6893_6913.cljs$core$IFn$_invoke$arity$0() : fexpr__6893_6913.call(null));


var G__6914 = cljs.core.next(seq__6886_6906__$1);
var G__6915 = null;
var G__6916 = (0);
var G__6917 = (0);
seq__6886_6895 = G__6914;
chunk__6887_6896 = G__6915;
count__6888_6897 = G__6916;
i__6889_6898 = G__6917;
continue;
}
} else {
}
}
break;
}

return cljs.core.reset_BANG_(quil.sketch.sketch_init_list,cljs.core.PersistentVector.EMPTY);
});
quil.sketch.add_sketch_to_init_list = (function quil$sketch$add_sketch_to_init_list(sk){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(quil.sketch.sketch_init_list,cljs.core.conj,sk);

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(document.readyState,"complete")){
return quil.sketch.init_sketches();
} else {
return null;
}
});
goog.events.listenOnce(window,goog.events.EventType.LOAD,quil.sketch.init_sketches);
