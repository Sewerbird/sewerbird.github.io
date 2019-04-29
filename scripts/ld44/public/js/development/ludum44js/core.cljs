(ns ludum44js.core
  (:require [quil.core :as q :include-macros true]
            [quil.middleware :as m]))

(defn clamp [value min_value max_value] (max min_value (min value max_value)))
(defn abs [n] (max n (- n)))

(def motion_sensitivity 10.00)
;; Interstitial settings
(def current_scene (atom :GAME))
(def current_level (atom 1))
(def prior_bet_bid (atom 0))
(def current_bet_bid (atom 5))
(def wallet_balance (atom 100))
(def life_for_player (atom 10))
(def time_now (atom 0))
(def time_of_last_purchase (atom -10))
(def time_of_last_bid_change (atom -10)) ;don't delay if they are real quick at beginning
(def purchases (atom {
        :fire_rate 0, 
        :fire_spread 0, 
        :vessel_size 0, 
        :armor 0, 
        :bullet_size 0, 
        :bullet_speed 0
}))

(defn load-image [image]
  (let [path (str "/scripts/ld44/" (name image) ".png")]
    (println "Loading" path)
    (q/load-image path)))

(defn load-font [font]
  (let [path (str "/scripts/ld44/" (name font))]
    (println "Loading" path)
    (q/load-font path)))

(defn draw-image [state k [x y] w h]
  (println "Drawing image" k x y w h)
  (if (or w h)
    (let []
      (println "Resizing to " w h)
      (q/resize (get-in state [:images k]) w h)
    )
  )
  (q/image (get-in state [:images k]) x y))

(defn draw-text [state font message [x y]]
  (q/text-font "Arial" 30)
  (q/text message x y)
)

(def images [:bg :test "bid0" "bid1" "bid2" "bid3" "bid4" "bid5" "bid6" "bid7" "bid8" "bid9" :upgradepip :pew "baddie1" "baddie2" "baddie3" :player])
(def fonts [:earthorbiteracad])
(def ui_extents {
  :test [0 0 800 600]
  :bg [0 0 600 800]
})

(defn setup []
  (def kill_line (* 1.25 (q/height)))
  ; Set frame rate to 30 frames per second.
  (q/frame-rate 30)
  ; Set color mode to HSB (HSV) instead of default RGB.
  (q/color-mode :hsb)
  ; setup function returns initial state. It contains
  {
   ;;:stars  (take 25 (repeatedly #(random-star 6.0)))
   ;;:stars2 (take 25 (repeatedly #(random-star 3.0)))
   ;; :fade 1.2
    :images (zipmap images (map load-image images))
    :last_spawn 0
    :frame_count 0
    :level_time_elapsed 0
    :player {
      :color 0
      :radius 50
      :player_size 50
      :invulnerability_timer 0
      :shot_timer 0.500
      :shot_period 0.500
      :life 10
      :x_offset 100 ;;in percent
      :y_offset (* (q/height) 0.9) ;;in percent
      :purchases {
        :fire_rate 0, 
        :fire_spread 0, 
        :vessel_size 0, 
        :armor 0, 
        :bullet_size 0, 
        :bullet_speed 0
      }
      :upgrades {
        :fire_rate 1.00, 
        :fire_spread 1.00, 
        :vessel_size 1.00, 
        :armor 1.00, 
        :bullet_size 1.00, 
        :bullet_speed 1.50
      }
    }
    :enemies [ ]
    :projectiles [ ]
  }
)

(defn update_enemy [enemy dt projectiles]
  (let [timer (+ dt (:timer enemy))
        was_hit (count (check_collision enemy projectiles))
        ]
    {
     :cleanup (or (< (:x_offset enemy) -kill_line) (and (< 0 was_hit) (- (:life enemy) was_hit)))
     :timer timer
     :life (if (< 0 was_hit) (- (:life enemy) was_hit) (:life enemy))
     :down_speed (:down_speed enemy)
     :right_speed (:right_speed enemy)
     :y_offset (+ (:y_offset enemy) (* dt (:down_speed enemy)))
     :x_offset (+ (:x_offset enemy) (* dt (:right_speed enemy)))
     :color 0
     :radius (:radius enemy)
     :variant (:variant enemy)
    }
  )
)

(defn update_projectile [projectile dt]
  (let [timer (+ dt (:timer projectile))]
    {
     :cleanup (or
                (> (:y_offset projectile) (q/height))
                (< (:y_offset projectile) 0)
                (> (:x_offset projectile) (q/width))
                (< (:x_offset projectile) 0)
                (and (< 0 (:duration projectile)) (> timer (:duration projectile)))
              )
     :timer timer
     :duration (:duration projectile)
     :down_speed (:down_speed projectile)
     :right_speed (:right_speed projectile)
     :x_offset (+ (:x_offset projectile) (* dt (:right_speed projectile)))
     :y_offset (+ (:y_offset projectile) (* dt (:down_speed projectile)))
     :color 100
     :radius (:radius projectile)
    }
  )
)

(defn reinitialize_player [player]
  (let [new_player {
            :color 180
            :radius 50
            :player_size (* 50 (/ 1 (max 1 (:vessel_size @purchases))))
            :invulnerability_timer 0
            :shot_timer 0.500
            :shot_period 0.500
            :life @life_for_player
            :x_offset 100
            :y_offset (* (q/height) 0.9)
            :purchases @purchases
            :upgrades {
              :fire_rate (* 1.00 (/ 1 (:fire_rate @purchases)))
              :fire_spread (+ (* 0.75 (:fire_spread @purchases)) 1.00)
              :vessel_size (* (/ 1.0 (:vessel_size @purchases)) 1.00)
              :armor (+ (* 0.3 (:armor @purchases)) 1.00)
              :bullet_size (+ (* 0.2 (:bullet_size @purchases)) 1.00)
              :bullet_speed (+ (* 0.5 (:bullet_speed @purchases)) 1.00)
            }
          }
        ]
    new_player
  )
)

(defn update_player [player dt player_is_hit]
  (let [took_damage (if (< 0 (:invulnerability_timer player)) false player_is_hit)
        inv (if took_damage (* 1.0 (:armor (:upgrades player))) (:invulnerability_timer player)) ]
    (if (q/key-pressed?)
      (let [dkey (q/raw-key)]
        (case dkey
          "d" {
               :x_offset (clamp (+ (:x_offset player) motion_sensitivity) 0 (q/width)) 
               :y_offset (:y_offset player)
               :color (:color player)
               :radius (:radius player)
               :player_size (:player_size player)
               :invulnerability_timer (clamp (- inv dt) 0 100)
               :shot_timer (:shot_timer player)
               :shot_period (:shot_period player)
               :life (if took_damage (- (:life player) 1) (:life player))
               :upgrades (:upgrades player)
               :purchases (:purchases player)
              }
          "a" {
               :x_offset (clamp (- (:x_offset player) motion_sensitivity) 0 (q/width))
               :y_offset (:y_offset player)
               :color (:color player)
               :radius (:radius player)
               :player_size (:player_size player)
               :invulnerability_timer (clamp (- inv dt) 0 100)
               :shot_timer (:shot_timer player)
               :shot_period (:shot_period player)
               :life (if took_damage (- (:life player) 1) (:life player))
               :upgrades (:upgrades player)
               :purchases (:purchases player)
              }
          "s" {
               :y_offset (clamp (+ (:y_offset player) motion_sensitivity) 0 (q/height)) 
               :x_offset (:x_offset player)
               :color (:color player)
               :radius (:radius player)
               :player_size (:player_size player)
               :invulnerability_timer (clamp (- inv dt) 0 100)
               :shot_timer (:shot_timer player)
               :shot_period (:shot_period player)
               :life (if took_damage (- (:life player) 1) (:life player))
               :upgrades (:upgrades player)
               :purchases (:purchases player)
              }
          "w" {
               :y_offset (clamp (- (:y_offset player) motion_sensitivity) 0 (q/height))
               :x_offset (:x_offset player)
               :color (:color player)
               :radius (:radius player)
               :player_size (:player_size player)
               :invulnerability_timer (clamp (- inv dt) 0 100)
               :shot_timer (:shot_timer player)
               :shot_period (:shot_period player)
               :life (if took_damage (- (:life player) 1) (:life player))
               :upgrades (:upgrades player)
               :purchases (:purchases player)
              }
          {
            :x_offset (:x_offset player) 
            :y_offset (:y_offset player)
            :color (:color player)
            :radius (:radius player)
            :player_size (:player_size player)
            :invulnerability_timer (clamp (- inv dt) 0 100)
            :shot_timer (:shot_timer player)
            :shot_period (:shot_period player)
            :life (if took_damage (- (:life player) 1) (:life player))
            :upgrades (:upgrades player)
            :purchases (:purchases player)
          }
        )
      )
      {
        :x_offset (:x_offset player) 
        :y_offset (:y_offset player)
        :color (:color player)
        :radius (:radius player)
        :player_size (:player_size player)
        :invulnerability_timer (clamp (- inv dt) 0 100)
        :shot_timer (:shot_timer player)
        :shot_period (:shot_period player)
        :life (if took_damage (- (:life player) 1) (:life player))
        :upgrades (:upgrades player)
        :purchases (:purchases player)
      }
    )
  )
)

(defn check_collision [tgt colliders]
  "Does circle-to-circle collision check between tgt and all colliders. Returns collider(s), or nil"
  (filterv
    (fn [a]
      (let [wa (if (:player_size a) (:player_size a) (:radius a))
            wtgt (if (:player_size tgt) (:player_size tgt) (:radius tgt))
            dx (- (:x_offset a) (:x_offset tgt))
            dy (- (:y_offset a) (:y_offset tgt))
            dd (Math/sqrt (+ (* dx dx) (* dy dy)))
            r (+ wa wtgt) ]
        (< dd (/ r 2))
      )
    )
    colliders
  )
)

(defn cleanup [col]
  (filterv #(not (:cleanup %)) col)
)

(defn spawn_new_random_enemy []
  {
    :cleanup false
    :timer 0
    :down_speed 200.0
    :right_speed 0
    :color 0
    :radius 20
    :life 1
    :y_offset (* (q/height) 0)
    :x_offset (* (q/width) (q/random 1.0))
    :variant 1
  }
)

(defn spawn_enemies [is_needed old_enemies]
  (if is_needed
    (conj old_enemies (spawn_new_random_enemy))
    old_enemies
  )
)

(defn check_player_firing [player dt]
  (if (= 0 (:shot_timer player)) ;; (and (q/key-pressed?) (= q/raw-key " ")))
    {
     :player {
        :x_offset (:x_offset player) 
        :y_offset (:y_offset player)
        :shot_period (:shot_period player)
        :shot_timer (* (:shot_period player) (:fire_rate (:upgrades player))) ;;Intentional: sets timer to maximum period
        :color (:color player)
        :radius (:radius player)
        :player_size (:player_size player)
        :invulnerability_timer (:invulnerability_timer player)
        :life (:life player)
        :projectiles (:projectiles player)
        :upgrades (:upgrades player)
        :purchases (:purchases player)
     }
     :shots [{
              :x_offset (:x_offset player)
              :y_offset (- (:y_offset player) (:radius player))
              :down_speed (* -400 (:bullet_speed (:upgrades player)))
              :right_speed (* (* 10 (- (q/random 2.0) 1)) (:fire_spread (:upgrades player)))
              :radius (* 5 (:bullet_size (:upgrades player)))
              :cleanup false
              :duration 3
              :timer 0
              :color 66
             }]
    }
    {
     :player {
        :x_offset (:x_offset player) 
        :y_offset (:y_offset player)
        :shot_period (:shot_period player)
        :shot_timer (clamp (- (:shot_timer player) dt) 0 (:shot_period player))
        :color (:color player)
        :radius (:radius player)
        :player_size (:player_size player)
        :invulnerability_timer (:invulnerability_timer player)
        :life (:life player)
        :projectiles (:projectiles player)
        :upgrades (:upgrades player)
        :purchases (:purchases player)
     }
     :shots []
    }
  )
)

(defn over_update_draw_state [state dt]
  (if (q/key-pressed?)
    (let [dkey (q/raw-key)]
      (case dkey
        " " (*js "window.location.reload(false);" )
        ""
        )
      )
    )
  state
)

(defn game_update_draw_state [state dt]
  ; Keyboard-Controlled
  (let [
        old_player (:player state)
        old_enemies (:enemies state)
        old_projectiles (:projectiles state)

        updated_enemies (cleanup (map #(update_enemy % dt old_projectiles) old_enemies))
        updated_projectiles (cleanup (map #(update_projectile % dt) old_projectiles))
        spawn_needed (> (q/frame-count) (+ (:last_spawn state) 3))
        new_enemies (spawn_enemies (> (q/frame-count) (+ (:last_spawn state) 3)) updated_enemies)
        player_is_hit (< 0 (count (check_collision old_player new_enemies)))
        player_is_firing (check_player_firing old_player dt)
        new_player (#(update_player % dt player_is_hit) (:player player_is_firing))
        new_player_projectiles (:shots player_is_firing)
        ]
    {
      :level_time_elapsed (+ dt (:level_time_elapsed state))
      :last_spawn (if spawn_needed (q/frame-count) (:last_spawn state))
      :frame_count (q/frame-count)
      :player new_player
      :enemies new_enemies
      :projectiles (cleanup (into updated_projectiles new_player_projectiles))
      :images (:images state)
      :fonts (:fonts state)
    }
  )
)

(defn interstitial_update_draw_state [state dt]
  (let [old_player (:player state)
        new_player (reinitialize_player old_player)]
    (if (q/key-pressed?)
      (let [dkey (q/raw-key)]
        (case dkey
          "a" (up_the_stakes state) ;; increase stakes
          "d" (lower_the_stakes state) ;; decrease stakes
          "1" (purchase state :fire_spread) ;; purchase item 2, fire_spread upgrade
          "2" (purchase state :fire_rate) ;; purchase item 1, fire_rate upgrade
          "3" (purchase state :armor) ;; purchase item 3, armor upgrade
          "4" (purchase state :bullet_size) ;; purchase item 4, bullet_size upgrade
          "5" (purchase state :vessel_size) ;; purchase item 6, vessel_size upgrade
          "6" (purchase state :bullet_speed) ;; purchase item 5, bullet_speed upgrade
          " " (go_to_next_level) ;; continue to next level
          (println "*whistle*")
        )
      )
    )
    {
      :level_time_elapsed 0
      :last_spawn (:last_spawn state)
      :frame_count (q/frame-count)
      :player new_player
      :enemies [ ]
      :projectiles [ ]
      :images (:images state)
      :fonts (:fonts state)
    }
  )
)

(defn up_the_stakes [state]
  (println "Upping the stakes, time vs last is" @time_now @time_of_last_bid_change)
  (if (< 0.25 (- @time_now @time_of_last_bid_change))
    (let []
      (swap! time_of_last_bid_change (fn [old] @time_now))
      (swap! current_bet_bid (fn [old] (clamp (+ old 1) 0 9)))
      (swap! life_for_player (fn [old] (- 10 @current_bet_bid)))
    )
  )
)

(defn lower_the_stakes [state]
  (if (< 0.25 (- @time_now @time_of_last_bid_change))
    (let []
      (swap! time_of_last_bid_change (fn [old] @time_now))
      (swap! current_bet_bid (fn [old] (clamp (- old 1) 0 9)))
      (swap! life_for_player (fn [old] (- 10 @current_bet_bid)))
    )
  )
)

(defn go_to_next_level [state]
  (swap! prior_bet_bid (fn [old] @current_bet_bid))
  (swap! life_for_player (fn [old] (- 10 @current_bet_bid)))
  (swap! current_scene (fn [old] :GAME))
)

(defn finish_level [state]
  (swap! wallet_balance (fn [old] (+ old @current_bet_bid)))
  (swap! current_scene (fn [old] :INTERSTITIAL))
)

(defn purchase [state upgrade]
  (if (and (>= @wallet_balance 5) (< 0.5 (- @time_now @time_of_last_purchase)))
    (let [new_purchases {
           :fire_rate (if (= upgrade :fire_rate) (+ 1 (:fire_rate (:purchases (:player state)))) (:fire_rate (:purchases (:player state))))
           :fire_spread (if (= upgrade :fire_spread) (+ 1 (:fire_spread (:purchases (:player state)))) (:fire_spread (:purchases (:player state))))
           :armor (if (= upgrade :armor) (+ 1 (:armor (:purchases (:player state)))) (:armor (:purchases (:player state))))
           :bullet_size (if (= upgrade :bullet_size) (+ 1 (:bullet_size (:purchases (:player state)))) (:bullet_size (:purchases (:player state))))
           :bullet_speed (if (= upgrade :bullet_speed) (+ 1 (:bullet_speed (:purchases (:player state)))) (:bullet_speed (:purchases (:player state))))
           :vessel_size (if (= upgrade :vessel_size) (+ 1 (:vessel_size (:purchases (:player state)))) (:vessel_size (:purchases (:player state))))
           }]
      (swap! time_of_last_purchase (fn [old] @time_now))
      (println "Purchasing " upgrade " for 5")
      (swap! wallet_balance (fn [old] (- old 5)))
      (swap! purchases (fn [old] new_purchases))
    )
    (println "Insufficient vespene gas")
  )
)

(defn update-state [state]
  (let [dt (/ (- (q/frame-count) (:frame_count state)) (q/target-frame-rate))
        new_time_elapsed (+ dt (:level_time_elapsed state))]
    (swap! time_now (fn [old] (+ old dt)))
    (if (> new_time_elapsed 30)
      (let []
        (swap! current_scene (fn [old] :INTERSTITIAL))
        (swap! current_level (fn [old] (+ 1 old)))
      )
    )
    (if (= 0 (:life (:player state)))
      (swap! current_scene (fn [old]  :OVER))
    )
    (case @current_scene
      :GAME (game_update_draw_state state dt)
      :INTERSTITIAL (interstitial_update_draw_state state dt)
      :OVER (over_update_draw_state state dt)
      state
    )
  )
)

(defn draw_player [state player]
  ; Set circle color.
  (q/fill (:color player) 255 (* 255 (- 1.0 (:invulnerability_timer player))))
  ; Calculate x and y coordinates of the circle.
  (let [x (:x_offset player)
        y (:y_offset player)
        life (:life player)
        invuln (:invulnerability_timer player)
        shot_timer (:shot_timer player)
        r (:player_size player) ]
    ; Move origin point to the top left corner of the sketch.
    (q/text (str "Life: " life) 15 15)
    (q/scale 0.5)
    (doseq [i (range (- life 1))]
      (draw-image state :upgradepip [(+ 0 (* i 30)) 0])
    )
    (q/scale 2.0)
    (q/with-translation [0 0]
      ; Draw the circle.
      (q/ellipse x y r r)
    ))
)

(defn draw_enemy [state enemy]
  (q/fill (:color enemy) 255 255)
  ; Calculate x and y coordinates of the circle.
  (let [y (:y_offset enemy)
        x (:x_offset enemy)
        r (:radius enemy)]
    ; Move origin point to the center of the sketch.
    (q/with-translation [0 0]
      ; Draw the circle.
      (q/ellipse x y r r)
      ))
)

(defn draw_bullet [state bullet]
  (q/fill (:color bullet) 255 255)
  ; Calculate x and y coordinates of the circle.
  (let [y (:y_offset bullet)
        x (:x_offset bullet)
        r (:radius bullet)]
    ; Move origin point to the center of the sketch.
    (q/with-translation [0 0]
      ; Draw the circle.
      (q/ellipse x y r r)
      ))
)

(defn draw-state [state]
  (case @current_scene
    :GAME (draw_game_state state)
    :INTERSTITIAL (draw_interstitial_state state)
    :OVER (draw_game_over state)
    state
  )
)

(defn draw_game_state [state]
  ; Clear the sketch by filling it with light-grey color.
  (q/background 0 0 0)
  (let [player (:player state)
        enemies (:enemies state)
        projectiles (:projectiles state)
        ]
    ;;Draw Player
    (draw_player state player)
    ;;Draw Enemy
    (doseq [enemy enemies]
      (draw_enemy state enemy)
    )
    (doseq [bullet projectiles]
      (draw_bullet state bullet)
    )
  )
)

(defn draw_interstitial_state [state]
  (q/background 0)
  (q/fill 0 0 255)
  ;;Draw background
  (draw-image state :bg [0 0])
  ;;Draw Level Complete
  (draw_bet_dialog state)
  (draw_money_progress state)
  (draw_store state)
  state
)

(defn draw_game_over [state]
  (q/background 0)
  (q/text "You Died!" 250 400)
  (q/text "Refresh this page to try again!" 100 450)
  state
)

(defn draw_bet_dialog [state ]
  ;; Show life/money balance
  (draw-image state (str "bid" @current_bet_bid) [115 360] 0 55)
)

(defn draw_money_progress []
  ;; Substitute in current_bet and balance info
  (draw-text state :earthorbiteracad (str "Balance: $" @wallet_balance) [400 500])
)

(defn draw_store []
  ;; Draw rank of what purchase would be
  (doseq [[i [kind purchase]] (zipmap (range (count @purchases)) @purchases)]
    (let [ locs {:fire_spread 0 :fire_rate 1 :armor 2 :bullet_size 3 :vessel_size 4 :bullet_speed 5}]
      (q/text (str (+ 1 purchase)) (+ 80 (* (kind locs) 95)) 600)
    )
  )
  ;; Gray-out entries that aren't available
  (if (< @wallet_balance 5)
    (let []
      (q/fill (q/color 0 0 0 100))
      (q/rect 0 450 600 220)
    )
  )
)

; this function is called in index.html
(defn ^:export run-sketch []
  (q/defsketch ludum44js
    :host "ludum44js"
    :size [600 800]
    ; setup function called only once, during sketch initialization.
    :setup setup
    ; update-state is called on each iteration before draw-state.
    :update update-state
    :draw draw-state
    ; This sketch uses functional-mode middleware.
    ; Check quil wiki for more info about middlewares and particularly
    ; fun-mode.
    :middleware [m/fun-mode]))

; uncomment this line to reset the sketch:
; (run-sketch)

