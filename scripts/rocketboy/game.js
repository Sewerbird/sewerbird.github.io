
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 6148, "filename": "/.DS_Store"}, {"audio": 0, "start": 6148, "crunched": 0, "end": 43012, "filename": "/.main.lua.swp"}, {"audio": 0, "start": 43012, "crunched": 0, "end": 66240, "filename": "/main.lua"}, {"audio": 0, "start": 66240, "crunched": 0, "end": 72388, "filename": "/assets/.DS_Store"}, {"audio": 0, "start": 72388, "crunched": 0, "end": 74043, "filename": "/assets/particle.png"}, {"audio": 0, "start": 74043, "crunched": 0, "end": 80191, "filename": "/assets/audio/.DS_Store"}, {"audio": 1, "start": 80191, "crunched": 0, "end": 136831, "filename": "/assets/audio/rocket boy death.mp3"}, {"audio": 1, "start": 136831, "crunched": 0, "end": 361663, "filename": "/assets/audio/rocket boy jet pack.mp3"}, {"audio": 1, "start": 361663, "crunched": 0, "end": 376255, "filename": "/assets/audio/rocket boy lava hiss.mp3"}, {"audio": 1, "start": 376255, "crunched": 0, "end": 488959, "filename": "/assets/audio/rocket boy lava rumble.mp3"}, {"audio": 1, "start": 488959, "crunched": 0, "end": 613567, "filename": "/assets/audio/rocket boy menu music.mp3"}, {"audio": 1, "start": 613567, "crunched": 0, "end": 628351, "filename": "/assets/audio/rocket boy pause.mp3"}, {"audio": 1, "start": 628351, "crunched": 0, "end": 1620031, "filename": "/assets/audio/rocket boy stage music among the stars.mp3"}, {"audio": 1, "start": 1620031, "crunched": 0, "end": 2580607, "filename": "/assets/audio/rocket boy stage music catastrophe.mp3"}, {"audio": 1, "start": 2580607, "crunched": 0, "end": 3590335, "filename": "/assets/audio/rocket boy stage music rocket jump.mp3"}, {"audio": 1, "start": 3590335, "crunched": 0, "end": 3647551, "filename": "/assets/audio/rocket boy victory.mp3"}, {"audio": 0, "start": 3647551, "crunched": 0, "end": 3655747, "filename": "/assets/characters/.DS_Store"}, {"audio": 0, "start": 3655747, "crunched": 0, "end": 3656556, "filename": "/assets/characters/anger boy/ascending.png"}, {"audio": 0, "start": 3656556, "crunched": 0, "end": 3657369, "filename": "/assets/characters/anger boy/descending.png"}, {"audio": 0, "start": 3657369, "crunched": 0, "end": 3658171, "filename": "/assets/characters/anger boy/static.png"}, {"audio": 0, "start": 3658171, "crunched": 0, "end": 3658998, "filename": "/assets/characters/anger boy/walk 0.png"}, {"audio": 0, "start": 3658998, "crunched": 0, "end": 3659833, "filename": "/assets/characters/anger boy/walk 1.png"}, {"audio": 0, "start": 3659833, "crunched": 0, "end": 3660600, "filename": "/assets/characters/Rocket Boy/ascending.png"}, {"audio": 0, "start": 3660600, "crunched": 0, "end": 3661387, "filename": "/assets/characters/Rocket Boy/descending.png"}, {"audio": 0, "start": 3661387, "crunched": 0, "end": 3662150, "filename": "/assets/characters/Rocket Boy/static.png"}, {"audio": 0, "start": 3662150, "crunched": 0, "end": 3662937, "filename": "/assets/characters/Rocket Boy/walk 0.png"}, {"audio": 0, "start": 3662937, "crunched": 0, "end": 3663731, "filename": "/assets/characters/Rocket Boy/walk 1.png"}, {"audio": 0, "start": 3663731, "crunched": 0, "end": 3664535, "filename": "/assets/characters/rocket clown/ascending.png"}, {"audio": 0, "start": 3664535, "crunched": 0, "end": 3665358, "filename": "/assets/characters/rocket clown/descending.png"}, {"audio": 0, "start": 3665358, "crunched": 0, "end": 3666159, "filename": "/assets/characters/rocket clown/static.png"}, {"audio": 0, "start": 3666159, "crunched": 0, "end": 3666983, "filename": "/assets/characters/rocket clown/walk 0.png"}, {"audio": 0, "start": 3666983, "crunched": 0, "end": 3667816, "filename": "/assets/characters/rocket clown/walk 1.png"}, {"audio": 0, "start": 3667816, "crunched": 0, "end": 3668721, "filename": "/assets/characters/rocket girl/ascending.png"}, {"audio": 0, "start": 3668721, "crunched": 0, "end": 3669639, "filename": "/assets/characters/rocket girl/descending.png"}, {"audio": 0, "start": 3669639, "crunched": 0, "end": 3670529, "filename": "/assets/characters/rocket girl/static.png"}, {"audio": 0, "start": 3670529, "crunched": 0, "end": 3671454, "filename": "/assets/characters/rocket girl/walk 0.png"}, {"audio": 0, "start": 3671454, "crunched": 0, "end": 3672379, "filename": "/assets/characters/rocket girl/walk 1.png"}, {"audio": 0, "start": 3672379, "crunched": 0, "end": 3673358, "filename": "/assets/characters/rocket ROM/ascending.png"}, {"audio": 0, "start": 3673358, "crunched": 0, "end": 3674359, "filename": "/assets/characters/rocket ROM/descending.png"}, {"audio": 0, "start": 3674359, "crunched": 0, "end": 3675334, "filename": "/assets/characters/rocket ROM/static.png"}, {"audio": 0, "start": 3675334, "crunched": 0, "end": 3676336, "filename": "/assets/characters/rocket ROM/walk 0.png"}, {"audio": 0, "start": 3676336, "crunched": 0, "end": 3677342, "filename": "/assets/characters/rocket ROM/walk 1.png"}, {"audio": 0, "start": 3677342, "crunched": 0, "end": 3678220, "filename": "/assets/characters/rocket shades/ascending.png"}, {"audio": 0, "start": 3678220, "crunched": 0, "end": 3679104, "filename": "/assets/characters/rocket shades/descending.png"}, {"audio": 0, "start": 3679104, "crunched": 0, "end": 3679964, "filename": "/assets/characters/rocket shades/static.png"}, {"audio": 0, "start": 3679964, "crunched": 0, "end": 3680861, "filename": "/assets/characters/rocket shades/walk 0.png"}, {"audio": 0, "start": 3680861, "crunched": 0, "end": 3681753, "filename": "/assets/characters/rocket shades/walk 1.png"}, {"audio": 0, "start": 3681753, "crunched": 0, "end": 3686498, "filename": "/assets/tileset/background tile biodome.png"}, {"audio": 0, "start": 3686498, "crunched": 0, "end": 3691485, "filename": "/assets/tileset/background tile crystal.png"}, {"audio": 0, "start": 3691485, "crunched": 0, "end": 3692594, "filename": "/assets/tileset/background tile default.png"}, {"audio": 0, "start": 3692594, "crunched": 0, "end": 3697725, "filename": "/assets/tileset/background tile star screens.png"}, {"audio": 0, "start": 3697725, "crunched": 0, "end": 3698838, "filename": "/assets/tileset/background tile steel.png"}, {"audio": 0, "start": 3698838, "crunched": 0, "end": 3700330, "filename": "/assets/tileset/foreground tile biodome.png"}, {"audio": 0, "start": 3700330, "crunched": 0, "end": 3702470, "filename": "/assets/tileset/foreground tile crystal.png"}, {"audio": 0, "start": 3702470, "crunched": 0, "end": 3703603, "filename": "/assets/tileset/foreground tile star screens.png"}, {"audio": 0, "start": 3703603, "crunched": 0, "end": 3704653, "filename": "/assets/tileset/foreground tile steel.png"}, {"audio": 0, "start": 3704653, "crunched": 0, "end": 3704919, "filename": "/assets/tileset/lava sprite deep 1.png"}, {"audio": 0, "start": 3704919, "crunched": 0, "end": 3705191, "filename": "/assets/tileset/lava sprite deep 2.png"}, {"audio": 0, "start": 3705191, "crunched": 0, "end": 3705444, "filename": "/assets/tileset/lava sprite deep 3.png"}, {"audio": 0, "start": 3705444, "crunched": 0, "end": 3705674, "filename": "/assets/tileset/lava sprite surface 1.png"}, {"audio": 0, "start": 3705674, "crunched": 0, "end": 3705957, "filename": "/assets/tileset/lava sprite surface 2.png"}, {"audio": 0, "start": 3705957, "crunched": 0, "end": 3706200, "filename": "/assets/tileset/lava sprite surface 3.png"}, {"audio": 0, "start": 3706200, "crunched": 0, "end": 3706447, "filename": "/assets/tileset/lava sprite surface 4.png"}, {"audio": 0, "start": 3706447, "crunched": 0, "end": 3706664, "filename": "/assets/tileset/lava sprite surface 5.png"}, {"audio": 0, "start": 3706664, "crunched": 0, "end": 3711117, "filename": "/assets/tileset/victory background.png"}, {"audio": 0, "start": 3711117, "crunched": 0, "end": 3717265, "filename": "/assets/ui/.DS_Store"}, {"audio": 0, "start": 3717265, "crunched": 0, "end": 3718767, "filename": "/assets/ui/countdown 0.png"}, {"audio": 0, "start": 3718767, "crunched": 0, "end": 3719447, "filename": "/assets/ui/countdown 1.png"}, {"audio": 0, "start": 3719447, "crunched": 0, "end": 3720258, "filename": "/assets/ui/countdown 2.png"}, {"audio": 0, "start": 3720258, "crunched": 0, "end": 3720969, "filename": "/assets/ui/countdown 3.png"}, {"audio": 0, "start": 3720969, "crunched": 0, "end": 3731803, "filename": "/assets/ui/credits screen.png"}, {"audio": 0, "start": 3731803, "crunched": 0, "end": 3733210, "filename": "/assets/ui/death.png"}, {"audio": 0, "start": 3733210, "crunched": 0, "end": 3733735, "filename": "/assets/ui/pause.png"}, {"audio": 0, "start": 3733735, "crunched": 0, "end": 3734237, "filename": "/assets/ui/unpause.png"}, {"audio": 0, "start": 3734237, "crunched": 0, "end": 3738154, "filename": "/assets/ui/victory banner.png"}], "remote_package_size": 3738154, "package_uuid": "2e592739-6dfe-4756-9c1b-8c09c284e462"});

})();
