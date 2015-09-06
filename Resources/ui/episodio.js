Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
var episodioWin = Titanium.UI.createWindow({  
    title:titulo2[indicador],
    backgroundImage:'/icons/fondodescargas.png',
    barColor:'black',
    width:'100%',
    height:'100%'
});



var vistaCabeza2 = Ti.UI.createView({
	top:0,
	left:0,
	width:'100%',
	height:90,
	backgroundColor:'black'
});
var border2 = Ti.UI.createView({
	height:2,
	backgroundColor:'white',
	bottom:0
});
 
vistaCabeza2.add(border2);
var coverCabeza2 =  Titanium.UI.createImageView({
			image:foto2[indicador],
			width:80,
			height:80,
			left:4,
			top:5
});
vistaCabeza2.add(coverCabeza2);
var titCabeza2 = Titanium.UI.createLabel({
			text:'Titulo episodio',
			font:{fontSize:16,fontWeight:'bold'},
			width:235,
			textAlign:'left',
			top:8,
			color:'660000',
			left:87,
			height:20
});
vistaCabeza2.add(titCabeza2);
var titleCabeza2 = Titanium.UI.createLabel({
			text:titulo3[indicador2],
			font:{fontSize:16},
			width:235,
			textAlign:'left',
			top:32,
			color:'white',
			left:87,
			height:40
});
vistaCabeza2.add(titleCabeza2);
episodioWin.add(vistaCabeza2);

var infobg2 = Titanium.UI.createView({
	top:110,
	width:'100%',
	height:200,
	backgroundColor:'black',
	opacity:0.7
	
});
episodioWin.add(infobg2);
var info2 = Titanium.UI.createView({
	
	width:'100%',
	height:200,
	backgroundColor:'transparent'
	
});


var webdes = Titanium.UI.createWebView({
	
	top:5,
	width:'100%',
	height:200,
	html: "<html><body style='color:white;font-size:18px;width:100%;'><div style='width:100%;overflow: hidden;'>" + descripcion3[indicador2] + "</div></body></html>",
	backgroundColor:'transparent',
	enableZoomControls:'false'
	
	
});
info2.add(webdes);
infobg2.add(info2);
episodioWin.add(infobg2);
/**
var podcast3 sonido abajo
indicador2*/

var play2 = Ti.UI.createButton({
  width:100,
  height:100,
  bottom:0,
  left:30,
  backgroundSelectedImage:'/icons/playb.png',
  backgroundImage:'/icons/play.png'
});

play2.addEventListener('click',function(e){
	// When paused, playing returns false.
    // If both are false, playback is stopped.
    if (audioPlayer2.playing )
    {
        audioPlayer2.pause();
 		play2.setBackgroundImage('/icons/play.png');
 		play2.setBackgroundSelectedImage('/icons/playb.png');
    }
    else
    {
        audioPlayer2.start();
		play2.setBackgroundImage('/icons/pause.png');
 		play2.setBackgroundSelectedImage('/icons/pauseb.png');
    }
});

var stop2 = Ti.UI.createButton({
  right:30,
  bottom:0,
  width:100,
  height:100,
  backgroundSelectedImage:'/icons/stopb.png',
  backgroundImage:'/icons/stop.png'
});
stop2.addEventListener('click',function(e){

        audioPlayer2.stop();
        play2.setBackgroundImage('/icons/play.png');
 		play2.setBackgroundSelectedImage('/icons/playb.png');

});
episodioWin.add(play2);
episodioWin.add(stop2);
// allowBackground: true on Android allows the 
// player to keep playing when the app is in the 
// background.
var audioPlayer2 = Ti.Media.createAudioPlayer({ 
    url: podcast3[indicador2],
    allowBackground: true
});

episodioWin.open();