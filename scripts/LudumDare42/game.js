
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'data', true, true);
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/lib', 'moonshine', true, true);
Module['FS_createPath']('/', 'resources', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 2810, "filename": "/assets.lua"}, {"audio": 0, "start": 2810, "crunched": 0, "end": 2954, "filename": "/conf.lua"}, {"audio": 0, "start": 2954, "crunched": 0, "end": 3268, "filename": "/constants.lua"}, {"audio": 0, "start": 3268, "crunched": 0, "end": 5681, "filename": "/credits_scene.lua"}, {"audio": 0, "start": 5681, "crunched": 0, "end": 14873, "filename": "/debug_console.lua"}, {"audio": 0, "start": 14873, "crunched": 0, "end": 24360, "filename": "/game.lua"}, {"audio": 0, "start": 24360, "crunched": 0, "end": 26657, "filename": "/level_loader.lua"}, {"audio": 0, "start": 26657, "crunched": 0, "end": 28875, "filename": "/main.lua"}, {"audio": 0, "start": 28875, "crunched": 0, "end": 50016, "filename": "/main_scene.lua"}, {"audio": 0, "start": 50016, "crunched": 0, "end": 52395, "filename": "/scene.lua"}, {"audio": 0, "start": 52395, "crunched": 0, "end": 61764, "filename": "/splat.lua"}, {"audio": 0, "start": 61764, "crunched": 0, "end": 65794, "filename": "/title_scene.lua"}, {"audio": 0, "start": 65794, "crunched": 0, "end": 66303, "filename": "/data/level1.lua"}, {"audio": 0, "start": 66303, "crunched": 0, "end": 66962, "filename": "/data/level2.lua"}, {"audio": 0, "start": 66962, "crunched": 0, "end": 67568, "filename": "/data/level3.lua"}, {"audio": 0, "start": 67568, "crunched": 0, "end": 68472, "filename": "/data/level4.lua"}, {"audio": 0, "start": 68472, "crunched": 0, "end": 69405, "filename": "/data/level5.lua"}, {"audio": 0, "start": 69405, "crunched": 0, "end": 79248, "filename": "/lib/inspect.lua"}, {"audio": 0, "start": 79248, "crunched": 0, "end": 81280, "filename": "/lib/moonshine/boxblur.lua"}, {"audio": 0, "start": 81280, "crunched": 0, "end": 82862, "filename": "/lib/moonshine/chromasep.lua"}, {"audio": 0, "start": 82862, "crunched": 0, "end": 83994, "filename": "/lib/moonshine/colorgradesimple.lua"}, {"audio": 0, "start": 83994, "crunched": 0, "end": 86424, "filename": "/lib/moonshine/crt.lua"}, {"audio": 0, "start": 86424, "crunched": 0, "end": 88027, "filename": "/lib/moonshine/desaturate.lua"}, {"audio": 0, "start": 88027, "crunched": 0, "end": 92405, "filename": "/lib/moonshine/dmg.lua"}, {"audio": 0, "start": 92405, "crunched": 0, "end": 97723, "filename": "/lib/moonshine/fastgaussianblur.lua"}, {"audio": 0, "start": 97723, "crunched": 0, "end": 99728, "filename": "/lib/moonshine/filmgrain.lua"}, {"audio": 0, "start": 99728, "crunched": 0, "end": 101658, "filename": "/lib/moonshine/gaussianblur.lua"}, {"audio": 0, "start": 101658, "crunched": 0, "end": 105092, "filename": "/lib/moonshine/glow.lua"}, {"audio": 0, "start": 105092, "crunched": 0, "end": 108338, "filename": "/lib/moonshine/godsray.lua"}, {"audio": 0, "start": 108338, "crunched": 0, "end": 113270, "filename": "/lib/moonshine/init.lua"}, {"audio": 0, "start": 113270, "crunched": 0, "end": 115086, "filename": "/lib/moonshine/pixelate.lua"}, {"audio": 0, "start": 115086, "crunched": 0, "end": 117073, "filename": "/lib/moonshine/posterize.lua"}, {"audio": 0, "start": 117073, "crunched": 0, "end": 119408, "filename": "/lib/moonshine/scanlines.lua"}, {"audio": 0, "start": 119408, "crunched": 0, "end": 121622, "filename": "/lib/moonshine/sketch.lua"}, {"audio": 0, "start": 121622, "crunched": 0, "end": 123510, "filename": "/lib/moonshine/vignette.lua"}, {"audio": 0, "start": 123510, "crunched": 0, "end": 129658, "filename": "/resources/.DS_Store"}, {"audio": 0, "start": 129658, "crunched": 0, "end": 131582, "filename": "/resources/assets.lua"}, {"audio": 0, "start": 131582, "crunched": 0, "end": 133447, "filename": "/resources/assets.manifest"}, {"audio": 1, "start": 133447, "crunched": 0, "end": 1550707, "filename": "/resources/compo_song.wav"}, {"audio": 0, "start": 1550707, "crunched": 0, "end": 1591646, "filename": "/resources/cover.png"}, {"audio": 0, "start": 1591646, "crunched": 0, "end": 1738776, "filename": "/resources/credits.afdesign"}, {"audio": 0, "start": 1738776, "crunched": 0, "end": 1793977, "filename": "/resources/credits.png"}, {"audio": 1, "start": 1793977, "crunched": 0, "end": 3187857, "filename": "/resources/Disasterpiece - Malbone Street Wreck.ogg"}, {"audio": 1, "start": 3187857, "crunched": 0, "end": 3207431, "filename": "/resources/diskette_available.wav"}, {"audio": 1, "start": 3207431, "crunched": 0, "end": 3217619, "filename": "/resources/dropped_diskette.wav"}, {"audio": 1, "start": 3217619, "crunched": 0, "end": 3236065, "filename": "/resources/found_diskette.wav"}, {"audio": 0, "start": 3236065, "crunched": 0, "end": 3511843, "filename": "/resources/master_sprite_sheet.afdesign"}, {"audio": 0, "start": 3511843, "crunched": 0, "end": 3571313, "filename": "/resources/master_sprite_sheet.png"}, {"audio": 0, "start": 3571313, "crunched": 0, "end": 3677905, "filename": "/resources/Monaco.ttf"}, {"audio": 1, "start": 3677905, "crunched": 0, "end": 3753457, "filename": "/resources/move.wav"}, {"audio": 1, "start": 3753457, "crunched": 0, "end": 3821315, "filename": "/resources/no_move.wav"}, {"audio": 1, "start": 3821315, "crunched": 0, "end": 3860145, "filename": "/resources/reached_exit.wav"}, {"audio": 1, "start": 3860145, "crunched": 0, "end": 3895747, "filename": "/resources/reset_level.wav"}, {"audio": 0, "start": 3895747, "crunched": 0, "end": 3897850, "filename": "/resources/theme.ceol"}, {"audio": 0, "start": 3897850, "crunched": 0, "end": 3946061, "filename": "/resources/title.png"}, {"audio": 1, "start": 3946061, "crunched": 0, "end": 3956249, "filename": "/resources/used_diskette.wav"}, {"audio": 0, "start": 3956249, "crunched": 0, "end": 3999918, "filename": "/resources/win.png"}], "remote_package_size": 3999918, "package_uuid": "801079a4-10b6-45f8-b52d-adeb8ae774e0"});

})();
