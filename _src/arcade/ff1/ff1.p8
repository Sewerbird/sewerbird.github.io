pico-8 cartridge // http://www.pico-8.com
version 34
__lua__

function empty_coroutine(self)
  self.c = nil
end

function create_entity(x,y,frames,customizations)
  local result = {
    x = x, y = y, d = 1, f = 1, fc = 8, frames = frames
  }
  for key, value in pairs(customizations) do
    result[key] = value
  end
  return result
end

function create_transition(src_x,src_y,dst_room,dst_x,dst_y)
  return { x=src_x,y=src_y,on_enter=move_player_to(dst_room,dst_x,dst_y) }
end

function espr(n,x,y,w,h,flip_x,flip_y)
  w = w and w or 1
  h = h and h or 1
  flip_y = flip_y and flip_y or false
  spr(abs(n),x,y,w,h,n<0,flip_y)
end

function clamp(val,min,max)
  if val < min then return min end
  if val > max then return max end
  return val
end

function distance(a,b)
  return sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y))
end

function opposite_facing(direction)
  local opposites = {2,1,4,3}
  return opposites[direction]
end

function sort(table, key)
  local i,j,midx
  for i = 1,#table-1 do
    midx = i;
    for j = i+1,#table do
      if table[j][key] < table[midx][key] then
        midx = j
      end
    end
    local temp = table[a]
    table[a] = b
    table[b] = temp
  end
end

function pathfind(src, tgt)
  local pmap, queue = {[src.x]={[src.y]=true}}, {{x=src.x,y=src.y}}

  local end_node = nil
  while #queue > 0 do
    local current_node = deli(queue,1)
    if current_node.x == tgt.x and current_node.y == tgt.y then
      end_node = current_node
      break
    end
    local up = {x=current_node.x,y=current_node.y-1}
    local down = {x=current_node.x,y=current_node.y+1}
    local left = {x=current_node.x-1,y=current_node.y}
    local right = {x=current_node.x+1,y=current_node.y}
    local candidates = {up,down,left,right}
    for candidate in all(candidates) do
      local mm = mget(maps[curr_map].map_x+flr(candidate.x),maps[curr_map].map_y+flr(candidate.y))
      if not fget(mm,0) and mm > 0 and 
        (not pmap[candidate.x] or not pmap[candidate.x][candidate.y]) then
        if not pmap[candidate.x] then
          pmap[candidate.x] = {}
        end
        if not pmap[candidate.x][candidate.y] then
          --Check for sprite collisions
          local blocked = false
          for entity in all(entities) do
            if candidate.x == entity.x and candidate.y == entity.y and not entity.passable then
              blocked = true
            end
          end
          if not blocked then
            pmap[candidate.x][candidate.y] = true
            candidate.p = current_node
            add(queue, candidate)
          end
        end
      end
    end
  end
  local path = {}
  while end_node and end_node.p do
    add(path,end_node,1)
    end_node = end_node.p
  end
  return path
end

function move_player_to(destination_map,x,y)
  return function()
    player.x = x
    player.last_x = x
    player.y = y
    player.last_y = y
    for entity in all(entities) do
      if entity.friend and entity.following then
        --friends can move with you!
        entity.x = player.x
        entity.y = player.y
        entity.px = nil
        entity.py = nil
        entity.c = nil
        add(maps[destination_map].entities,entity)
        del(maps[curr_map].entities, entity)
      end
    end
    curr_map = destination_map
    triggers = maps[curr_map].triggers
    entities = maps[curr_map].entities
    for entity in all(entities) do
      if entity.on_load then
        entity.on_load(entity)
      end
    end
  end
end

function draw_dialog_box(text)
   if not dialog_active then return end
   local x,y,w,h = 0,80,120,40
   rectfill(x,y,x+w,y+h,7)
   local tb_cnt = w
   local lr_cnt = h
   for i = 8,tb_cnt,8 do
     espr(2,x+i,y)
     espr(18,x+i,y+h)
   end
   for i = 8,lr_cnt,8 do
     espr(3,x,y+i)
     espr(-3,x+w,y+i)
   end
   --Corners
   espr(1,x,y)
   espr(-1,x+w,y)
   espr(17,x,y+h)
   espr(-17,x+w,y+h)
   local columns = flr((w-12)/4)
   local c_x, c_y = 0,0
   --Text
   for line in all(split(text,"\n")) do
     for word in all(split(line," ")) do
       local word_length = #(tostr(word))*4
       local end_of_word = c_x+word_length
       if end_of_word > w-8 then
         c_y += 8
         c_x = 0
       end
       print(word, x+c_x+8, y+c_y+8, 0)
       c_x += word_length+2
     end
     c_y += 6
     c_x = 0
   end
   if dialog_icon then
     print(dialog_icon,w-4,y+h-2,0)
   end
end

function animate_activate(direction)
  local tgt_x, tgt_y, dx, dy = 0,0,0,0
  if direction == 1 then dx = -1 end
  if direction == 2 then dx = 1 end
  if direction == 3 then dy = -1 end
  if direction == 4 then dy = 1 end
  tgt_x = player.x + dx
  tgt_y = player.y + dy
  for entity in all(entities) do
    if entity.x == tgt_x and entity.y == tgt_y and entity.on_activate then
      entity.c = cocreate(entity.on_activate(entity))
    end
  end
end

function animate_change_facing(mover,direction,end_pause)
  return function()
    mover.responsive = false
    mover.d = direction
    local cntr = 0
    while cntr < end_pause do
      cntr += 1
      yield()
    end
    mover.responsive = true
    mover.c = nil
  end
end

function animate_move(mover, direction, distance, end_pause)
  end_pause = end_pause and end_pause or 0
  local dx, dy, pixels = 0, 0, 0
  --Turn mover in direction of motion
  mover.d = direction
  if direction == 1 then dx = -1 end
  if direction == 2 then dx = 1 end
  if direction == 3 then dy = -1 end
  if direction == 4 then dy = 1 end

  return function()
    local distance_travelled = 0
    while distance_travelled < distance do
      local dest_x = flr(mover.x+dx)
      local dest_y = flr(mover.y+dy)
      --Check for map passability
      local impassable_flag = fget(mget(maps[curr_map].map_x+dest_x,maps[curr_map].map_y+dest_y),0)
      --Check for sprite passability
      for entity in all(entities) do
        if not entity.passable and dest_x == entity.x and dest_y == entity.y then
          impassable_flag = true
        end
      end
      -- Check for player passability    
      if not player.passable and dest_x == player.x and dest_y == player.y then
        impassable_flag = true
      end

      if impassable_flag then
        --Impassable. Can't keep moving so hafta stop
        mover.c = nil
        return false
      else
        mover.last_x = mover.x
        mover.last_y = mover.y
        mover.px = mover.x*16
        mover.py = mover.y*16
        mover.responsive = false  
        mover.x = dest_x
        mover.y = dest_y
        local t, ticks = 1, 10*1
        while t < ticks do
          mover.px = 16*dest_x - (16*(1-t/ticks)*dx)
          mover.py = 16*dest_y - (16*(1-t/ticks)*dy)
          t+=1
          yield()
        end
        mover.px = nil
        mover.py = nil
        distance_travelled += 1
      end
    end
    while end_pause > 0 do
      end_pause -= 1
      yield()
    end
    mover.responsive = true
    mover.c = nil
    return true
  end
end

function animate_move_path(mover, path, end_pause,do_facing,do_sprite_collision)
  end_pause = end_pause and end_pause or 0    
  return function()
    mover.responsive = false
    for step in all(path) do
      if do_sprite_collision then
        repeat 
          local blocked = false
          for entity in all(entities) do
            if not entity.passable and distance(step,entity) == 0 then
              blocked = true
              yield()
            end
          end
        until not blocked
      end
      mover.last_x = mover.x
      mover.last_y = mover.y
      local t, ticks, dx, dy = 1, 10, step.x-mover.x, step.y-mover.y
      if do_facing then
        if dx > 0 then mover.d = 2 end
        if dx < 0 then mover.d = 1 end
        if dy > 0 then mover.d = 4 end
        if dy < 0 then mover.d = 3 end
      end
      while t < ticks do
        mover.px = 16 * (mover.x + (t/ticks * dx))
        mover.py = 16 * (mover.y + (t/ticks * dy))
        t+=1
        yield()
      end
      mover.px = nil
      mover.py = nil
      mover.x = step.x
      mover.y = step.y
    end
    mover.responsive = true
    mover.c = nil
  end
end

function animate_popup_comment(self,comment)
  return animate_conversation(self,{[0] = {comment,0,exit=true}})
end

function animate_conversation(self,convo)
  return function()
    player.responsive = false
    self.responsive = false
    while not self.exit do
      --Figure out node to display
      if not self.convo_state then self.convo_state = 0 end
      local node = convo[self.convo_state]
      local text = node[1]
      local nxt = node[2]
      if type(nxt) == 'function' then 
        nxt = nxt(self) 
      elseif type(nxt) == 'table' then
        dialog_options = {}
        --responses
        for option in all(nxt) do
          if option.fi then
            local doit = true
            for criteria, value in pairs(option.fi) do
              doit = doit and self[criteria] == value
            end
            if doit then
              add(dialog_options, option)
            end
          else
            add(dialog_options, option)
          end
        end
      end
      for k,v in pairs(node) do
        if type(k) == 'string' and k ~= 'exit' then
          self[k] = v
        end
      end
      --Calculate NPC Text
      dialog_icon=nil
      local cnt, ctxt = 16, ""
      while cnt > 0 do
        cnt -= 1
        ctxt = sub(text,0,#text/16*(16-cnt))
        dialog_active = true
        dialog_text = ctxt
        yield()
      end
      dialog_icon="🅾️" 
      --Calculate PC Text
      if #dialog_options > 0 then
        selected = 1
        --Await PC selection
        while not input.Op do
          ctxt = text .. "\n"
          --Select option
          local i = 1
          for option in all(dialog_options) do
            local cursor = "- "
            if selected == i then cursor = "> " end
            ctxt = ctxt .. cursor .. option[1].."\n"
            dialog_text = ctxt
            i += 1
          end
          if input.Up then
            selected = clamp(selected-1,1,#dialog_options)
          elseif input.Dp then
            selected = clamp(selected+1,1,#dialog_options)
          end
          yield()
        end
        local selection = dialog_options[selected]
        dialog_options = {}

        nxt = selection[2]
        if type(nxt) == 'function' then nxt = nxt(self) end
        self.exit = selection.exit
      end
      if nxt then self.convo_state = nxt end
      if (type(node.exit) == 'function' and node.exit()) or (type(node.exit) ~= 'function' and node.exit) then 
        self.exit = true 
      end
      --Wait for another click before continuing
      while not input.Op do 
        yield() 
      end
    end
    self.on_draw = nil
    dialog_active = false
    dialog_options = {}
    dialog_text = nil
    self.c = nil
    self.responsive = true
    player.responsive = true
    self.exit = false
  end
end

function animate(entity)
  entity.fc = entity.fc-1
  if entity.fc < 0 then
    entity.fc = entity.frames[entity.d].rate or 8
    entity.f = entity.f+1
    if entity.f > #entity.frames[entity.d] then
      entity.f = 1
    end
  end
end

function world_init()
  --music(0)
  --Globals
  debug = "World:" --topleft debug text
  input = {}
  dialog_active = false
  dialog_options = {}
  dialog_text = nil
  player = { --player object
    responsive = true,
    x = 4, y = 1,
    last_x = 1, last_y = 1, --Prior position. Only move by increments of 16!
    d = 3, f = 1, fc = 8,
    frames = {
      [1] = {-34,-36, rate=4}, --leftward
      [2] = {34,36, rate=4}, --rightward
      [3] = {38,-38}, --upward
      [4] = {32,-32}, --downward
    }
  }
  curr_map = 1
  maps = {
    { --First Room :1:
      map_x = 0, map_y = 0, map_w = 8, map_h = 8, map_specials = {},
      entities = { --active entities
        create_entity( --merchant
          2,2,{{-98,-100,rate=4},{98,100,rate=4},{102,-102},{96,-96}},{
          on_activate = function(self)
            self.d = opposite_facing(player.d)
            return animate_popup_comment(self,"hi, i am sarah the merchant")
          end
        }),
        create_entity( --chest
          5,2,{{10, 10},{12, 12}},{
          on_activate = function(self)
            self.d=2
            player.has_key = true
            self.on_activate = nil
            return animate_popup_comment(self,"you found a key!")
          end
        }),
        create_entity( --door
          4,4,{{4,-4},{6,-6}},{
            on_activate = function(self)
              if player.has_key then
                local c = 0
                return function()
                  player.responsive = false
                  self.passable = not self.passable
                  self.d = self.d == 2 and 1 or 2
                  while c < 8 do
                    c = c + 1
                    yield()
                  end
                  player.responsive = true
                  self.c = nil
                end
              else
                return animate_popup_comment(self,"needs a key...")
              end
            end
        }),
        create_entity( --monsterra
          3,5,{{8,-8}},{
          on_activate = function(self)
            return animate_popup_comment(self,"i am a monsterra!") 
          end
        }),
        create_entity( --colonel
          3,6,{{-42,-44, rate=4}, {42,44, rate=4}, {46,-46}, {40,-40},},{
            on_update = function(self)
              --Run AI to follow Player
              if not self.c and self.following then
                 if distance(self, player) > 8 and player.responsive then
                   self.x = player.last_x
                   self.y = player.last_y
                 end
                 path = pathfind(self,{x=player.last_x,y=player.last_y})
                 self.c = cocreate(animate_move_path(self,path,64,true,true))
              end
            end,
            on_activate = function(self)
              local convo = {
                [0] = {"meow?",{
                      {"*pet*",3,fi={friend=nil}},
                      {"follow",1,fi={friend=true,following=false}},
                      {"stay",2,fi={friend=true,following=true}},
                      {"tell me something",5,fi={friend=true}},
                      {"nevermind",0,exit=true}
                    }},
                {"waf waf!",0,following=true,passable=true,exit=true},
                {"pfft...",0,following=false,passable=false,exit=true},
                {"*purr*",function(a) 
                                if not a.friendship then a.friendship = 0 end
                                a.friendship += 1
                                debug = a.friendship
                                return a.friendship == 3 and 4 or 0
                              end},
                {"*mew!* The cat is your friend now!",0,following=true,passable=true,friend=true,exit=true},
                {"my name is colonel!\ni love to meow late at night,\nso some call me 'baritone'",0}
              }
              return animate_conversation(self, convo)
            end
        }),
      },
      triggers = { --active triggers
        create_transition(4,8,2,4,0),--To Pond Room
      },
    },
    { --Pond Room :2:
      map_x = 0, map_y = 8, map_w = 8, map_h = 8, map_specials = {},
      entities = {
      },
      triggers = { --active triggers
        create_transition(4,-1,1,4,7),--To First Room
        create_transition(8,4,3,0,4), --To Crouton Room
      }
    },
    { --Crouton Room :3:
      map_x = 8, map_y = 8, map_w = 8, map_h = 8, map_specials = {},
      dark = true,
      entities = {
        create_entity( --crouton
          3,4,{{14,-14},{64,-64}},{
          on_activate = function(self)
            if not self.dead then
              self.dead = true
              self.d = 2
              self.on_activate = nil
              return animate_popup_comment(self,"the light went out, I am miserable...")
            end
          end
        }),
        create_entity( --light bulb
          3,2,{{66,66},{66,66}},{
            snuffed = true,
            on_activate = function(self)
              return animate_popup_comment(self,"i wonder if i could replace this lightbulb...")
            end
        }),
        create_entity( --south door
          4,7,{{4,-4},{6,-6}}, {
            responsive = true,
            on_activate = function(self)
              if player.has_key then
                local c = 0
                return function()
                  player.responsive = false
                  self.passable = not self.passable
                  self.d = self.d == 1 and 2 or 1
                  while c < 8 do
                    c = c + 1
                    yield()
                  end
                  player.responsive = true
                  self.c = nil
                end
              else
                return animate_popup_comment(self,"needs a key...")
              end
            end
        }),
      },
      triggers = {
        create_transition(-1,4,2,7,4),--To Pond Room
        create_transition(8,4,4,0,12), --To Maze Room
        create_transition(4,8,6,4,0), --To Cactus Room
      }
    },
    { --Maze Room :4:
      map_x = 16, map_y = 0, map_w = 16, map_h = 16, map_specials = {},
      dark = true,
      entities = {
      },
      triggers = {
        create_transition(-1,12,3,7,4),--To Crouton Room
        create_transition(-1,1,5,7,1),--To Growlight Room
        create_transition(9,16,7,9,0),--To Boulder Room
      }
    },
    { --Growlight Room :5:
      map_x = 8, map_y = 0, map_w = 8, map_h = 8, map_specials = {},
      entities = {
        create_entity( --chest
          5,5,{{10,10},{12,12}}, {
            responsive = true,
            on_activate = function(self)
              self.d=2
              player.has_growlight = true
              self.on_activate = nil
              return animate_popup_comment(self,"you found a growlight bulb!")
            end
        }),
      },
      triggers = {
        create_transition(8,1,4,0,1),--To Maze Room
      }
    },
    { --Cactus Room :6:
      map_x = 8, map_y = 16, map_w = 8, map_h = 8, map_specials = {},
      entities = {
        create_entity( --leakypipe
          5,2,{{68,68}},{
          on_activate = function(self)
            return animate_popup_comment(self,"i wonder if i could fix this pipe...")
          end
        }),
        create_entity( --cactus
          5,4,{{70,-70}},{
          on_activate = function(self)
            return animate_popup_comment(self,"i am so miserable, this pipe is leaking on me!!!") 
          end
        })
      },
      triggers = {
        create_transition(4,-1,3,4,7),--To Crouton Room
        create_transition(8,5,7,0,5),--To Boulder Room
      }
    },
    { --Boulder Room :7:
      map_x = 16, map_y = 16, map_w = 16, map_h = 8, map_specials = {},
      entities = {
        create_entity( --boulder
          2,3,{{72},{72},{72},{72}},{
          tag = 'boulder',
          on_load = function(self)
            if not player.has_done_boulder then
              self.x = 2
              self.y = 3
            end
          end,
          on_activate = function(self)
            if not player.has_done_boulder then
              return animate_move(self, player.d, 128)
            else
              return empty_coroutine
            end
          end
        }),
        create_entity( --south door
          9,7,{{4,-4},{6,-6}}, {
            on_update = function(self)
              if player.has_done_boulder then
                self.passable = true
                self.d = 2
                self.c = nil
              end
            end,
            on_activate = function(self)
              if player.has_done_boulder then
                self.passable = true
                self.d = 2
                return empty_coroutine
              else
                return animate_popup_comment(self,"needs the boulder on the pad...")
              end
            end
        }),
      },
      triggers = {
        create_transition(-1,5,6,7,5),--To Cactus Room
        create_transition(9,-1,4,9,15),--To Maze Room
        {
          x=9,y=4,entity_prone=true,
          on_enter=function(self, enterer) 
            if enterer.tag == 'boulder' then
              if not player.has_done_boulder then
                player.has_done_boulder = true
                sfx(32,3,0,32)
              end
            end
          end 
        }
      }
    }
  }
  triggers = maps[curr_map].triggers
  entities = maps[curr_map].entities
end

function world_update()
  --Run prior routines
  if player.c then assert(coresume(player.c)) end
  for entity in all(entities) do
    if entity.c then
      assert(coresume(entity.c))
    end
    if entity.on_update then
      entity.on_update(entity)
    end
    for trigger in all(triggers) do
      if trigger.on_enter and trigger.entity_prone and  not trigger.activated and entity.x == trigger.x and entity.y == trigger.y then
        trigger.on_enter(trigger, entity)
      end
    end
  end


  --Accept input
  input = {
    L = btn(0),
    R = btn(1),
    U = btn(2),
    D = btn(3),
    O = btn(5),
    X = btn(4),
    Lp = btnp(0),
    Rp = btnp(1),
    Up = btnp(2),
    Dp = btnp(3),
    Op = btnp(5),
    Xp = btnp(4),
  }
  if player.responsive then
    local c = nil
    if input.Op then
      animate_activate(player.d)
    else
      if input.Lp and player.d ~= 1 then c = animate_change_facing(player,1,4)
      elseif input.Rp and player.d ~= 2 then c = animate_change_facing(player,2,4)
      elseif input.Up and player.d ~= 3 then c = animate_change_facing(player,3,4)
      elseif input.Dp and player.d ~= 4 then c = animate_change_facing(player,4,4)
      elseif input.L  then
        c = animate_move(player,1,1)
      elseif input.R  then
        c = animate_move(player,2,1)
      elseif input.U  then
        c = animate_move(player,3,1)
      elseif input.D  then
        c = animate_move(player,4,1)
      end
      if c then
       player.c = cocreate(c)
      end
    end
  end

  --Update animations
  animate(player)
  for entity in all(entities) do
    animate(entity)
  end
  --Activate triggers
  for trigger in all(triggers) do
    if trigger.on_enter and not trigger.activated and player.x == trigger.x and player.y == trigger.y then
      trigger.on_enter(trigger, player)
    end
  end
end

function world_draw()
  local px, py = player.px and player.px or player.x*16, player.py and player.py or player.y*16
  camera(px-56,py-56)
  --worldspace elements
  --draw map
  local mpx, mpy = maps[curr_map].map_x, maps[curr_map].map_y
  for y = 0, maps[curr_map].map_h-1 do
    for x = 0, maps[curr_map].map_w-1 do
      local s = mget(mpx+x, mpy+y)
      spr(s,x*16,y*16)
      spr(s,x*16+8,y*16)
      spr(s,x*16,y*16+8)
      spr(s,x*16+8,y*16+8)
    end
  end
  --map(maps[curr_map].map_x,maps[curr_map].map_y,0,0,16,16)
  --draw entities
  for entity in all(entities) do
    local px = entity.px and entity.px or entity.x*16
    local py = entity.py and entity.py or entity.y*16
    espr(entity.frames[entity.d][entity.f],px,py,2,2)
    if entity.on_draw then entity.on_draw(entity) end
  end
  espr(player.frames[player.d][player.f],px,py,2,2)
  --screenspace elements
  camera(0,0)
  if maps[curr_map].dark then
    rectfill(0,0,40,128,0)
    rectfill(0,0,128,40,0)
    rectfill(0,128,128,128-40,0)
    rectfill(128-40,0,128,128,0)
  end
  draw_dialog_box(dialog_text)
  print(debug,0,0,12)
end

_scenes = {
  start = {
    init = function () end,
    update = function()
      if btnp(4) then
        load_scene("world")
      end
    end,
    draw = function()
      cls(7)
      print("adventures in mannydom", 24, 64, 0)
      print("press a", 96, 112, 0)
    end
  },
  world = {
    init = world_init,
    update = world_update,
    draw = world_draw
  },
  victory = {
    init = function() end,
    update = function() end,
    draw = function()
      cls(7)
      print("you escaped!", 40, 64, 0)
      print("mannydom is saved", 32, 72, 0)
    end
  }
}
_currscene = "start"

function load_scene(scene_tag)
  _currscene = scene_tag
  _scenes[_currscene].init()
end

function _init()
  load_scene("start")
end

function _update()
  _scenes[_currscene].update()
end

function _draw()
  cls(0)
  palt(0,false)
  palt(14,true)
  _scenes[_currscene].draw()
end

__gfx__
00000000e0000000000000000757777750505077770505055050507777050505eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000eeee000eeeee00eee
0000000000077777777777770757777705050700007050500505070000705050eee00ee00eeeeeeeeee0000000000eee0077777777777700ee07700ee00770ee
000000000075555555555555075777775050707007070505505070eeee070505ee07700ee0eee0eee00057757757000e0555555555555550ee07770e077770ee
00000000075577777777777707577777050705700750705005070eeeeee07050e077770ee0e0070e00700000000007000050000000000500ee07770e07770eee
0000000007577777777777770757777750707570075707055070eeeeeeee0705e0775770e0e075700777777777777770e05500000000550eeee077707770eeee
0000000007577777777777770757777707057570075750700705eeeeeeee50700775770ee00077500000000000000000e00500000000500eeeee077077070eee
0000000007577777777777770757777757057570075750755705eeeeeeee50750757700ee00e07700575755775575750ee055555555550eeeeeee070007770ee
0000000007577777777777770757777707057570075750700705eeeeeeee507007700eeee0ee077000000070070000000000000000000000eeeee070777700ee
0777777507577777777777777777777757057570075750755705eeeeeeee5075070eeeeee0ee007007777770077777700777777007777770eee0ee0077000eee
e077775007577777777777777700777707057570075750700705eeeeeeee5070e0eeeeee00eee00e00000070070000000000007007000000ee070ee070eeeeee
ee07750e07577777777777777077007750757570075757055075eeeeeeee5705eeeeeee00eeeee0e05555007700555500555500770055550e0770ee00eeeeeee
e07750ee07577777777777777507770700750070070057000070eeeeeeee0700eeeeee00eeeeeeeee05555000055550ee05555000055550ee070eee00eeeeeee
07750eee07557777777777777507770750757070070757055070eeeeeeee0705eeee00000000eeeee00555555555500ee00555555555500eee0e00000000ee0e
e070eeee00755555555555557077007700757570075757000075eeeeeeee5700eeee07777770eeeeee005555555500eeee005555555500eeeeee07777770e070
ee070eee00077777777777777700777750757570075757055075eeeeeeee5705eeeee055550eeeee00000555555000000000055555500000eeeee055550ee070
eee05eeee000000000000000777777770000000000000000000eeeeeeeeee000eeeee000000eeeeee00000000000000ee00000000000000eeeeee000000eee0e
eeeee0000000eeeeeeeeee0000e00eeeeeeeee0000e00eeeeeee00000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0eeeeeeeeeeeeeee0eeeeeeeeeeeeeeeeeeee
eeee007777700eeeeeee0007770770eeeeee0007770770eeeee0077777700eeeeeee0eeeeeee0eeeeeeeeeeeee00eeeeeeeeeeeeee00eeeeeee0eeeeeee0eeee
eee00777707700eeeee007777777770eeee007777777770eee007777777700eeeeee00eeeee00eeeeeeeeeeeee070eeeeeeeeeeeee070eeeeee00eeeee00eeee
eee07777070770eeee00777770070070ee00777770070070ee077777777770eeeeee000eee000eeeee000eeeee0700eeee000eeeee0700eeeee000eee000eeee
eee07070777000eeeee070000770000eeee070000770000eee007777777770eeeeee070000070eeee0070eeee007700ee0070eeee007700eeee070000070eeee
ee0007077070000eeee000707070ee0eeee000707070ee0ee0000777777700eeeeee077575770eeee0770eeee0777070e0770eeee0770070eee077575770eeee
e05507077070550eeee077077070eeeeeee077077070eeeee05500777770550eeeee070777070eeee0500eeee0770070e0500eeee0777770eee077575770eeee
0005070770705000eee000707770eeeeeee000707770eeee000555000705500ee55550077700555ee070eeee00077770e070eeee00075770e5557777777555ee
0000507777050770eee00555000eeeeeeee00555000eeeee000055550005770eeee00777077700eee070ee0057075700e070ee0057057700ee00777577700eee
0077050000500770eee00000050eeeeeeee0000000500eee077005777750770e005550077700555ee05700775705000ee05700775700000eeeee0075700eee00
007700555500e00eeeee0077000eeeeeee07705550570eee077000555500000ee0eeee00000eeeeee0777577777770eee0777577777770eeeeeee07570ee0070
ee0007000070eeeeeeeee07700eeeeeeee07707550070eeee00e07000070eeeee00e0007770eeeeee0077777777700eee0077777777700eeeeeee07770005770
eeee07707770eeeeeeeee00000eeeeeeeee000770070eeeeeeee07707770eeeeee0000570750eeeeee00777000770eeeee007770007050eeeeee05777757700e
eeee00007700eeeeeeeee07770eeeeeeeee0777007750eeeeeee00007700eeeeeeeee07000770eeeeee0700ee0070eeeeee05070070e050eeee0770000000eee
eee0000055000eeeeeeee055550eeeeeeee005507050eeeeeee0000055000eeeeeeee550e0770eeeeee070eeee070eeeee050070070ee00eeee0770e000eeeee
eeeeeeeeeeeeeeeeeeeee000000eeeeeee00000000000eeeeeeeeeeeeeeeeeeeeeeeeeeee0000eeeeeee00eeeee00eeeeee00000000eeeeeeee0000eeeeeeeee
eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee07770eeeeeeeeeee000eeeeeeeeeeee000000eeeeeeeeeeeeeeeeee0ee00000000000000000000000000000000
eeeeeee5eeeee0eeeeeeeeeeeeeeeeeeeeeeee07770eeeeeeeeee0070eeeeeeeeee0075777500eeeeeeeeeeeeeeee0ee00000000000000000000000000000000
eeeeeeeeeeeee0eeeeeeeee00eeeeeeeeeeeee07770eeeeeeeeee077005eeeeeee077757777770eeeee0eeeeeeee00ee00000000000000000000000000000000
ee0eeeeeeeee0eeeeeeeee0770eeeeeeeeeeee05550eeeeeeeeee05700eeeeeee05777577777770eeee000eeeee070ee00000000000000000000000000000000
eee0eeeeeee0eeeeeeeeee0770eeeeeeeeeeee07770eeeeeeeeee07700e00eeee07775577755570eeeee070eee070eee00000000000000000000000000000000
eeee0eeeee0eeeeeeeeeee0770eeeeeeeeeeee07770eeeeeeeee007770070eee0777557775577770eeeee070e070eeee00000000000000000000000000000000
e5eee0e000eeeeeeeeeeee0770eeeeeeeeeeee077700eeeeeee50707500775ee0777577775777750eeeeee07070eeeee00000000000000000000000000000000
eeee50e0eeee00eeeeeeee0770eeeeeeeeeeee0075500eeeeeee070777570eee0577777777777770eeeeeee070eeeeee00000000000000000000000000000000
eee0ee00ee000eeeeeee00055000eeeeeeeeeeee55770000eeee057777700eee0577777777555770eeeeeee0770eeeee00000000000000000000000000000000
ee0eeee0e0eeeeeeeee0777777770eeeeeeeeeee07777757eeeee077700eeeee0577777777777770eeeeee070070eeee00000000000000000000000000000000
eeeeeee00eeeee5ee00777777777700eeeeeeeee00077757eeeeee0750eeeeee0557757777777750eeeee070ee070eee00000000000000000000000000000000
eeeeeee00eeeeeee0777777777777770eeeeeeeeee000000eeeeee0770eeeeeee05575777777770eeeee070eeee0000e00000000000000000000000000000000
eeee00000000eeee0555555555555550eeeeeeeeeeeeeeeeeee0000000000eeee05555777777570eeee070eeeeeee00e00000000000000000000000000000000
eeee07777770eeeee00007777770000eeeeeee0eeeeeeeeeeee0777777770eeeee055555777750eeeee00eeeeeeeeeee00000000000000000000000000000000
e00ee055550ee00eeeee00777700eeeeeeeee070eeeeeeeeeeee05555550eeeeeee0055555700eeeee00eeeeeeeeeeee00000000000000000000000000000000
0550e000000e0550eeeeee0000eeeeeeeeeeee0eeeeeeeeeeeeee000000eeeeeeeeee000000eeeeee0eeeeeeeeeeeeee00000000000000000000000000000000
eeeee000000eeeeeeeeeee0000000eeeeeeeee0000000eeeeeeee000000eeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000
eeee07777770eeeeeeee0077777700eeeeee0077777700eeeeee07777770eeeeeeeee000000eeeee000000000000000000000000000000000000000000000000
eee0777770770eeeeee07777777770eeeee07777777770eeeee0777777770eeeeeee07777770eeee000000000000000000000000000000000000000000000000
eee07707070770eeee077777700770eeee077777700770eeee07777777770eeeeee0775555770eee000000000000000000000000000000000000000000000000
ee077070777070eeee077770077070eeee077770077070eeee077777777770eeee075500005570ee000000000000000000000000000000000000000000000000
ee070007700070eee077770700700eeee077770700700eeeee077777777770eee07750555505770e000000000000000000000000000000000000000000000000
ee070707707070eee07777007070eeeee07770507070eeeeee077777777070eee07505777750570e000000000000000000000000000000000000000000000000
eee00707707070eee07770550770eeeee07707550770eeeeee07777777700eeee07505777750570e000000000000000000000000000000000000000000000000
ee0050777705000ee0777077000eeeeee0707770500eeeeee0005777770500eee07505777750570e000000000000000000000000000000000000000000000000
e007050000500700e0777070550eeeeee070700055070eee007005777700700ee07505777750570e000000000000000000000000000000000000000000000000
e077005555000770ee07707700eeeeeeee00007700770eee077000555500770ee07750555505770e000000000000000000000000000000000000000000000000
ee0007000070e00eee00700000eeeeeeee00077700000eeee00e0700007000eeee075500005570ee000000000000000000000000000000000000000000000000
eeee00707770eeeeeeee070770eeeeeeeeee055070eeeeeeeeee07770700eeeeeee0775555770eee000000000000000000000000000000000000000000000000
eeeeee00770eeeeeeeeee00770eeeeeeeee055007550eeeeeeeee07700eeeeeeeeee07777770eeee000000000000000000000000000000000000000000000000
eee0000055000eeeeeeeee05550eeeeeeee0500e050eeeeeeee0005500000eeeeeeee000000eeeee000000000000000000000000000000000000000000000000
eeeeeeeeeeeeeeeeeeeee000000eeeeeeeee0000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
55565555000000005660005056665666666566556666677700000000000000000000000000000000000000000000000000000000000000000000000000000000
66656666065666605060005066666666666665656666666600000000000000000000000000000000000000000000000000000000000000000000000000000000
55555555055555605006000066666666666566556777666600000000000000000000000000000000000000000000000000000000000000000000000000000000
66656666055555605005655065656565566665656666666600000000000000000000000000000000000000000000000000000000000000000000000000000000
55565565055555605055050066666666666566556666666600000000000000000000000000000000000000000000000000000000000000000000000000000000
66666656055555505050060056565656666665656666666600000000000000000000000000000000000000000000000000000000000000000000000000000000
55555555055555605050000065656565666566556667677600000000000000000000000000000000000000000000000000000000000000000000000000000000
66656666000000000006000055555555566665656666666600000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556006556006666666656566665555555550000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556065775605555555555665666565656560000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556657667565555555556566666656565650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556576666756666666655665666666666660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556576666755555555556566665565656560000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556657667565555555555665666666666660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556065775606666666656566666666666660000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
56556556006556005555555555665666666566650000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__gff__
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__map__
c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c2c2c2c0c0c0c4d3c0c0c0c0c0c2c0c0c0c2c0c0c0c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c2c2c2c0c2c2c2c2c2c2c0c2c0c2c0c2c0c2c0c2c2c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c2c2c0c0c0c2c2c2c0c0c0c2c0c0c0c2c0c2c0c2c0c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c2c2c2c0c2c2c2c2c2c0c0c0c0c0c2c2c0c2c0c2c2c2c2c2c0c0c0c2c0c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c2c0c0c0c0c0c2c2c0c2c0c0c0c2c0c2c0c2c2c2c0c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c2c2c0c0c0c2c2c2c2c2c2c2c0c2c0c2c0c2c0c2c2c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c2c2c2c3c2c2c2c2c2c2c2c2c2c2c2c2c0c0c0c2c0c2c0c0c0c2c0c0c0c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c2c2c2d4c2c2c2c2c2c2c2c2c2c2c2c2c0c2c0c0c0c2c2c2c2c2c0c2c2c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c2c2c0c0c0c0c2c2c0c2c2c2c0c0c0c0c0c2c0c0c0c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c1c0c0c1c0c2c2c1c1c1c1c1d2c2c2c0c0c0c2c2c2c2c2c0c2c2c2c2c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c5c5c0c0c2c2c2c2c2c2c2d2c2c2c2c2c0c0c0c2c0c2c0c0c2c0c2c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c5c5c0c0c4d3c0c0c0c0c0c0c4d3c0c2c0c2c0c2c0c2c2c2c2c0c2c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c1c0c0c1c0c2c2c0c0c0c0c0c0c2c2c0c2c0c2c0c2c0c2c0c0c0c0c0c0c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c0c0c0c0c0c0c2c2c0c0c0c0c0c0c2c2c0c0c0c2c0c0c0c2c0c2c2c2c2c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c2c2c2c2c2c2c2c2c2c2c2c3c2c2c2c2c2c2c2c2c2c2c2c2c3c2c2c2c2c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c2c2c2c2c2c2c2c2c2c2c2d4c2c2c2c2c2c2c2c2c2c2c2c2d4c2c2c2c2c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2000000000000c2c2c0c0c1d2c1c1c1c2c5c1c5c5c5c5c5c5c5c5c5c5c5c5c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2000000000000c2c2c0c0c2d2c2c2c2c2c5c5c5c5c5c5c5c5c5c5c5c5c1c5c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2000000000000c2c2c0c0c2d2c2c2c2c2c5c5c5c5c5c5c5c5c1c5c5c5c5c5c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2000000000000c2c2c0c0c0c0c0c0c2c2c1d2c1c5c5c5c5c5c0c5c5c5c5c5c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2000000000000c4d3c0c0c0c0c0c0c4d3c0c0c1c5c5c5c5c1c5c5c5c5c5c5c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2000000000000c2c2c0c0c0c0c0c0c2c2c0c0c1c5c5c5c5c5c5c5c5c1c5c5c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c3c2c2c2c2c2c2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
c200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
__sfx__
000400000000000000000000000000000000000000000000000001a05000000240500000000000340500000026050000002905000000290500000000000000000205000000250500000000000000000000000000
001000000c0430000000000000000c0430000000000000000c0430000000000000000c0430000000000000000c0430000000000000000c0430000000000000000c0430000000000000000c043000000000000000
001000000214002030021200204010130020200214002030021200204010130020200214010030021200204002130020200214002030021200204002130020201014002030021201004002130100400213010020
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
00100000021400203002120020400e13002020021400203002120020400e13002020021400e030021200204002130020200214002030021200204002130020200e14002030021200e040021300e040021300e020
00100000021400203002120020400c13002020021400203002120020400c13002020021400c030021200204002130020200214002030021200204002130020200c14002030021200c040021300c040021300c020
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
000600003005024050330503605020050380503a0503b0502a050000003b050390502e0503705036050300503405032050310502f0502d0502b050290502505023050290502b0502d0502f050300500000000000
__music__
01 01020304
00 05014344
02 06014344

