
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
Module['FS_createPath']('/', 'assets', true, true);
Module['FS_createPath']('/assets', 'audio', true, true);
Module['FS_createPath']('/assets', 'characters', true, true);
Module['FS_createPath']('/assets/characters', 'anger boy', true, true);
Module['FS_createPath']('/assets/characters', 'Rocket Boy', true, true);
Module['FS_createPath']('/assets/characters', 'rocket clown', true, true);
Module['FS_createPath']('/assets/characters', 'rocket girl', true, true);
Module['FS_createPath']('/assets/characters', 'rocket ROM', true, true);
Module['FS_createPath']('/assets/characters', 'rocket shades', true, true);
Module['FS_createPath']('/assets', 'tileset', true, true);
Module['FS_createPath']('/assets', 'ui', true, true);

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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 6148, "filename": "/.DS_Store"}, {"audio": 0, "start": 6148, "crunched": 0, "end": 63492, "filename": "/.main.lua.swp"}, {"audio": 0, "start": 63492, "crunched": 0, "end": 87568, "filename": "/main.lua"}, {"audio": 0, "start": 87568, "crunched": 0, "end": 93716, "filename": "/assets/.DS_Store"}, {"audio": 0, "start": 93716, "crunched": 0, "end": 95371, "filename": "/assets/particle.png"}, {"audio": 0, "start": 95371, "crunched": 0, "end": 101519, "filename": "/assets/audio/.DS_Store"}, {"audio": 1, "start": 101519, "crunched": 0, "end": 158159, "filename": "/assets/audio/rocket boy death.mp3"}, {"audio": 1, "start": 158159, "crunched": 0, "end": 382991, "filename": "/assets/audio/rocket boy jet pack.mp3"}, {"audio": 1, "start": 382991, "crunched": 0, "end": 397583, "filename": "/assets/audio/rocket boy lava hiss.mp3"}, {"audio": 1, "start": 397583, "crunched": 0, "end": 510287, "filename": "/assets/audio/rocket boy lava rumble.mp3"}, {"audio": 1, "start": 510287, "crunched": 0, "end": 634895, "filename": "/assets/audio/rocket boy menu music.mp3"}, {"audio": 1, "start": 634895, "crunched": 0, "end": 649679, "filename": "/assets/audio/rocket boy pause.mp3"}, {"audio": 1, "start": 649679, "crunched": 0, "end": 1641359, "filename": "/assets/audio/rocket boy stage music among the stars.mp3"}, {"audio": 1, "start": 1641359, "crunched": 0, "end": 2601935, "filename": "/assets/audio/rocket boy stage music catastrophe.mp3"}, {"audio": 1, "start": 2601935, "crunched": 0, "end": 3611663, "filename": "/assets/audio/rocket boy stage music rocket jump.mp3"}, {"audio": 1, "start": 3611663, "crunched": 0, "end": 3668879, "filename": "/assets/audio/rocket boy victory.mp3"}, {"audio": 0, "start": 3668879, "crunched": 0, "end": 3677075, "filename": "/assets/characters/.DS_Store"}, {"audio": 0, "start": 3677075, "crunched": 0, "end": 3677884, "filename": "/assets/characters/anger boy/ascending.png"}, {"audio": 0, "start": 3677884, "crunched": 0, "end": 3678697, "filename": "/assets/characters/anger boy/descending.png"}, {"audio": 0, "start": 3678697, "crunched": 0, "end": 3679499, "filename": "/assets/characters/anger boy/static.png"}, {"audio": 0, "start": 3679499, "crunched": 0, "end": 3680326, "filename": "/assets/characters/anger boy/walk 0.png"}, {"audio": 0, "start": 3680326, "crunched": 0, "end": 3681161, "filename": "/assets/characters/anger boy/walk 1.png"}, {"audio": 0, "start": 3681161, "crunched": 0, "end": 3681928, "filename": "/assets/characters/Rocket Boy/ascending.png"}, {"audio": 0, "start": 3681928, "crunched": 0, "end": 3682715, "filename": "/assets/characters/Rocket Boy/descending.png"}, {"audio": 0, "start": 3682715, "crunched": 0, "end": 3683478, "filename": "/assets/characters/Rocket Boy/static.png"}, {"audio": 0, "start": 3683478, "crunched": 0, "end": 3684265, "filename": "/assets/characters/Rocket Boy/walk 0.png"}, {"audio": 0, "start": 3684265, "crunched": 0, "end": 3685059, "filename": "/assets/characters/Rocket Boy/walk 1.png"}, {"audio": 0, "start": 3685059, "crunched": 0, "end": 3685863, "filename": "/assets/characters/rocket clown/ascending.png"}, {"audio": 0, "start": 3685863, "crunched": 0, "end": 3686686, "filename": "/assets/characters/rocket clown/descending.png"}, {"audio": 0, "start": 3686686, "crunched": 0, "end": 3687487, "filename": "/assets/characters/rocket clown/static.png"}, {"audio": 0, "start": 3687487, "crunched": 0, "end": 3688311, "filename": "/assets/characters/rocket clown/walk 0.png"}, {"audio": 0, "start": 3688311, "crunched": 0, "end": 3689144, "filename": "/assets/characters/rocket clown/walk 1.png"}, {"audio": 0, "start": 3689144, "crunched": 0, "end": 3690049, "filename": "/assets/characters/rocket girl/ascending.png"}, {"audio": 0, "start": 3690049, "crunched": 0, "end": 3690967, "filename": "/assets/characters/rocket girl/descending.png"}, {"audio": 0, "start": 3690967, "crunched": 0, "end": 3691857, "filename": "/assets/characters/rocket girl/static.png"}, {"audio": 0, "start": 3691857, "crunched": 0, "end": 3692782, "filename": "/assets/characters/rocket girl/walk 0.png"}, {"audio": 0, "start": 3692782, "crunched": 0, "end": 3693707, "filename": "/assets/characters/rocket girl/walk 1.png"}, {"audio": 0, "start": 3693707, "crunched": 0, "end": 3694686, "filename": "/assets/characters/rocket ROM/ascending.png"}, {"audio": 0, "start": 3694686, "crunched": 0, "end": 3695687, "filename": "/assets/characters/rocket ROM/descending.png"}, {"audio": 0, "start": 3695687, "crunched": 0, "end": 3696662, "filename": "/assets/characters/rocket ROM/static.png"}, {"audio": 0, "start": 3696662, "crunched": 0, "end": 3697664, "filename": "/assets/characters/rocket ROM/walk 0.png"}, {"audio": 0, "start": 3697664, "crunched": 0, "end": 3698670, "filename": "/assets/characters/rocket ROM/walk 1.png"}, {"audio": 0, "start": 3698670, "crunched": 0, "end": 3699548, "filename": "/assets/characters/rocket shades/ascending.png"}, {"audio": 0, "start": 3699548, "crunched": 0, "end": 3700432, "filename": "/assets/characters/rocket shades/descending.png"}, {"audio": 0, "start": 3700432, "crunched": 0, "end": 3701292, "filename": "/assets/characters/rocket shades/static.png"}, {"audio": 0, "start": 3701292, "crunched": 0, "end": 3702189, "filename": "/assets/characters/rocket shades/walk 0.png"}, {"audio": 0, "start": 3702189, "crunched": 0, "end": 3703081, "filename": "/assets/characters/rocket shades/walk 1.png"}, {"audio": 0, "start": 3703081, "crunched": 0, "end": 3707826, "filename": "/assets/tileset/background tile biodome.png"}, {"audio": 0, "start": 3707826, "crunched": 0, "end": 3712813, "filename": "/assets/tileset/background tile crystal.png"}, {"audio": 0, "start": 3712813, "crunched": 0, "end": 3713922, "filename": "/assets/tileset/background tile default.png"}, {"audio": 0, "start": 3713922, "crunched": 0, "end": 3719053, "filename": "/assets/tileset/background tile star screens.png"}, {"audio": 0, "start": 3719053, "crunched": 0, "end": 3720166, "filename": "/assets/tileset/background tile steel.png"}, {"audio": 0, "start": 3720166, "crunched": 0, "end": 3721658, "filename": "/assets/tileset/foreground tile biodome.png"}, {"audio": 0, "start": 3721658, "crunched": 0, "end": 3723798, "filename": "/assets/tileset/foreground tile crystal.png"}, {"audio": 0, "start": 3723798, "crunched": 0, "end": 3724931, "filename": "/assets/tileset/foreground tile star screens.png"}, {"audio": 0, "start": 3724931, "crunched": 0, "end": 3725981, "filename": "/assets/tileset/foreground tile steel.png"}, {"audio": 0, "start": 3725981, "crunched": 0, "end": 3726247, "filename": "/assets/tileset/lava sprite deep 1.png"}, {"audio": 0, "start": 3726247, "crunched": 0, "end": 3726519, "filename": "/assets/tileset/lava sprite deep 2.png"}, {"audio": 0, "start": 3726519, "crunched": 0, "end": 3726772, "filename": "/assets/tileset/lava sprite deep 3.png"}, {"audio": 0, "start": 3726772, "crunched": 0, "end": 3727002, "filename": "/assets/tileset/lava sprite surface 1.png"}, {"audio": 0, "start": 3727002, "crunched": 0, "end": 3727285, "filename": "/assets/tileset/lava sprite surface 2.png"}, {"audio": 0, "start": 3727285, "crunched": 0, "end": 3727528, "filename": "/assets/tileset/lava sprite surface 3.png"}, {"audio": 0, "start": 3727528, "crunched": 0, "end": 3727775, "filename": "/assets/tileset/lava sprite surface 4.png"}, {"audio": 0, "start": 3727775, "crunched": 0, "end": 3727992, "filename": "/assets/tileset/lava sprite surface 5.png"}, {"audio": 0, "start": 3727992, "crunched": 0, "end": 3732445, "filename": "/assets/tileset/victory background.png"}, {"audio": 0, "start": 3732445, "crunched": 0, "end": 3738593, "filename": "/assets/ui/.DS_Store"}, {"audio": 0, "start": 3738593, "crunched": 0, "end": 3740095, "filename": "/assets/ui/countdown 0.png"}, {"audio": 0, "start": 3740095, "crunched": 0, "end": 3740775, "filename": "/assets/ui/countdown 1.png"}, {"audio": 0, "start": 3740775, "crunched": 0, "end": 3741586, "filename": "/assets/ui/countdown 2.png"}, {"audio": 0, "start": 3741586, "crunched": 0, "end": 3742297, "filename": "/assets/ui/countdown 3.png"}, {"audio": 0, "start": 3742297, "crunched": 0, "end": 3753131, "filename": "/assets/ui/credits screen.png"}, {"audio": 0, "start": 3753131, "crunched": 0, "end": 3754538, "filename": "/assets/ui/death.png"}, {"audio": 0, "start": 3754538, "crunched": 0, "end": 3755063, "filename": "/assets/ui/pause.png"}, {"audio": 0, "start": 3755063, "crunched": 0, "end": 3755565, "filename": "/assets/ui/unpause.png"}, {"audio": 0, "start": 3755565, "crunched": 0, "end": 3759482, "filename": "/assets/ui/victory banner.png"}], "remote_package_size": 3759482, "package_uuid": "1d69bd83-e305-4393-a9fd-152f821e96aa"});

})();
