importScripts('./../node_modules/db.js/dist/db.min.js');

onmessage = function(e) {
  var action = e.data[0];
  var object = e.data[1];
  var callback = e.data[2];

  console.log(object);

  db.open({
      server: 'player',
      version: 5,
      schema: {
          songs: {
              key: { keyPath: 'id' },
              indexes: {
                  name: {},
                  file: { unique: true }
              }
          },
          artists: {
              key: { keyPath: 'mbid' },
              indexes: {
                  mbid:{},
                  name: {}
              }
          },
          albums: {
              key: { keyPath: 'id' },
              indexes: {
                  name: {}
              }
          }
      }
  }).then(function (server) {
      try {
          switch(action){
            case 'addTrack':
                addArtistIfNotExist(object);
                addTrackIfNotExist(object);

          }

          function addTrackIfNotExist(object){
                server.songs.query('file', object.file).all().execute().then(function(results){
                    if(!results.length){
                        server.songs.add({
                            file: object.file,
                            name: object.track.name
                        });
                    }
                });
            }

            function addArtistIfNotExist(object){
                server.artists.query('mbid', object.track.artist.mbid).all().execute().then(function(results){
                    if(!results.length){
                        server.artists.add({
                            mbid: object.track.artist.mbid,
                            name: object.track.artist.name
                        });
                    }
                });
            }
            
      } catch(e) {
          console.log(e);
      }
      
  });
}

