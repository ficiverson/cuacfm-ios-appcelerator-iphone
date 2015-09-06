Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
//
// create base UI tab and root window
//
var mainWindow = Titanium.UI.createWindow({  
    title:'Home',
    backgroundImage:'/icons/fondoreposo.png',
    barColor:'black',
    width:'100%',
    height:'100%',
    orientationModes: [ Titanium.UI.PORTRAIT ]
});

var navGroup = Ti.UI.iPhone.createNavigationGroup({
	window:mainWindow
});



var directo = Ti.UI.createButton({
  width:140,
  height:60,
  bottom:60,
  left:0,
  backgroundSelectedImage:'/icons/emisionon.png',
  backgroundImage:'/icons/emisionoff.png'
});

directo.addEventListener('click',function(e){
	Ti.include('/ui/directo.js');
	navGroup.open(directoWin);
});

var podcast = Ti.UI.createButton({
  left:0,
  bottom:0,
  width:140,
  height:60,
  backgroundSelectedImage:'/icons/podcaston.png',
  backgroundImage:'/icons/podcastoff.png'
});
podcast.addEventListener('click',function(e){
	Ti.include('/ui/podcast.js');
	navGroup.open(podcastWin);
});

mainWindow.add(directo);
mainWindow.add(podcast);


//controla a traves del navgroup
var main = Ti.UI.createWindow();
main.add(navGroup);
main.open();






