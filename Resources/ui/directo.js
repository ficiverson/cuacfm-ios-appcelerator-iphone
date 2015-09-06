// create base UI tab and root window
Ti.Media.defaultAudioSessionMode = Ti.Media.AUDIO_SESSION_MODE_PLAYBACK;
var directoWin = Titanium.UI.createWindow({  
    title:'Directo',
    backgroundImage:'/icons/fondoemision.png',
    barColor:'black',
    width:'100%',
    height:'100%'
});

//parsear el xml para calcular los datos 
var foto=[];
var titulo=[];
var categoria=[];
var descripcion=[];
var horario=[];

function obtenerDatos(){
	
	var url="http://programacion.cuacfm.org/android/directo.xml"; //  xml feed url
var xhr = Titanium.Network.createHTTPClient();
 
xhr.onload = function() {
    // Data is returned from the blog, start parsing
    var xml = Titanium.XML.parseString(xhr.responseText);
    //var xml = this.responseXML;
    // the blog's title is in a node named "channel"
    var channel = xml.documentElement.getElementsByTagName("channel");
    // blog posts are in nodes named "item"
    var items = xml.documentElement.getElementsByTagName("item");
  Ti.API.info(items);
    
    for (var i=0;i<items.length;i++) {
         foto[i]=items.item(i).getElementsByTagName("link").item(0).text;
         titulo[i]=items.item(i).getElementsByTagName("title").item(0).text;
         categoria[i]=items.item(i).getElementsByTagName("guid").item(0).text;
         descripcion[i]=items.item(i).getElementsByTagName("description").item(0).text;
         horario[i]=items.item(i).getElementsByTagName("pubDate").item(0).text;
    }
    var fecha = new Date;
	var dia = fecha.getDay()+1;
	var hora = fecha.getHours();
	
	
	var indice = horario.indexOf(dia.toString() +hora.toString() );
	Ti.API.info(indice);
	
	imprograma.setImage(foto[indice]);
	titprograma.setText(titulo[indice]);
	catprograma.setText(categoria[indice]);
	desprograma.setText(descripcion[indice]);
    
};
xhr.onerror = function(e) {
    // should do something more robust
    alert('Problema con la conexión a internet '+e.error);
};
 
xhr.open('GET',url);
xhr.send();

	
}
obtenerDatos();
var recargar = Titanium.UI.createButton({
	width:90,
	height:30,
	color:'black',
	top:75,
	left:10,
	title:'Recargar'
	
});
recargar.addEventListener('click',function(e){
	obtenerDatos();
});
directoWin.add(recargar);
//vista intermedia
var infobg = Titanium.UI.createView({
	
	width:'100%',
	height:200,
	backgroundColor:'black',
	opacity:0.7
	
});
directoWin.add(infobg);
var info = Titanium.UI.createView({
	
	width:'100%',
	height:200,
	backgroundColor:'transparent'
	
});

var imprograma = Titanium.UI.createImageView({
	top:10,
	left:10,
	width:90,
	height:90

});

info.add(imprograma);
var tit = Titanium.UI.createLabel({
	top:10,
	left:120,
	height:20,
	width:'auto',
	text:'Estás escuchando',
	color:'purple',
	font:{fontSize:'20dp',fontWeight:'bold'}
	
});
info.add(tit);
var titprograma = Titanium.UI.createLabel({
	top:30,
	left:120,
	height:20,
	width:'auto',
	text:'Cargando...',
	color:'white',
	font:{fontSize:'18dp'}
	
});
info.add(titprograma);
var cat = Titanium.UI.createLabel({
	top:60,
	left:120,
	height:20,
	width:'auto',
	text:'Categoría',
	color:'purple',
	font:{fontSize:'20dp',fontWeight:'bold'}
	
});
info.add(cat);
var catprograma = Titanium.UI.createLabel({
	top:80,
	left:120,
	height:20,
	width:'auto',
	text:'',
	color:'white',
	font:{fontSize:'18dp'}
	
});
info.add(catprograma);
var des = Titanium.UI.createLabel({
	top:110,
	left:0,
	height:20,
	width:'auto',
	text:'Decripción',
	color:'purple',
	font:{fontSize:'20dp',fontWeight:'bold'}
	
});
info.add(des);


var desprograma = Titanium.UI.createLabel({
	top:130,
	left:0,
	height:30,
	width:'auto',
	text:'',
	color:'white',
	font:{fontSize:'18dp'}
});
info.add(desprograma);

directoWin.add(info);
//fin de vista intermedia

var play = Ti.UI.createButton({
  width:100,
  height:100,
  bottom:0,
  left:30,
  backgroundSelectedImage:'/icons/playb.png',
  backgroundImage:'/icons/play.png'
});

play.addEventListener('click',function(e){
	// When paused, playing returns false.
    // If both are false, playback is stopped.
    if (audioPlayer.playing )
    {
        audioPlayer.pause();
 		play.setBackgroundImage('/icons/play.png');
 		play.setBackgroundSelectedImage('/icons/playb.png');
    }
    else
    {
        audioPlayer.start();
		play.setBackgroundImage('/icons/pause.png');
 		play.setBackgroundSelectedImage('/icons/pauseb.png');
    }
});

var stop = Ti.UI.createButton({
  right:30,
  bottom:0,
  width:100,
  height:100,
  backgroundSelectedImage:'/icons/stopb.png',
  backgroundImage:'/icons/stop.png'
});
stop.addEventListener('click',function(e){

        audioPlayer.stop();
        play.setBackgroundImage('/icons/play.png');
 		play.setBackgroundSelectedImage('/icons/playb.png');

});
directoWin.add(play);
directoWin.add(stop);
// allowBackground: true on Android allows the 
// player to keep playing when the app is in the 
// background.
var audioPlayer = Ti.Media.createAudioPlayer({ 
    url: 'http://193.147.40.30/cuacfm.mp3',
    allowBackground: true
});

directoWin.addEventListener('close',function() {
    //audioPlayer.stop();

});



directoWin.open();