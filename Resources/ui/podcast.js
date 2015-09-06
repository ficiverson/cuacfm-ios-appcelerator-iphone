
//
// create base UI tab and root window
//
var podcastWin = Titanium.UI.createWindow({  
    title:'Podcast',
    backgroundImage:'/icons/fondopodcast.png',
    barColor:'black',
    width:'100%',
    height:'100%'
});

var foto2=[];
var titulo2=[];
var descripcion2=[];
var podcast2=[];
var indicador;

var url2="http://programacion.cuacfm.org/android/programas.xml"; //  xml feed url
var xhr2 = Titanium.Network.createHTTPClient();
 
xhr2.onload = function() {
    // Data is returned from the blog, start parsing
    var xml2 = Titanium.XML.parseString(xhr2.responseText);
    //var xml = this.responseXML;
    // the blog's title is in a node named "channel"
    var channel2 = xml2.documentElement.getElementsByTagName("channel");
    // blog posts are in nodes named "item"
    var items2 = xml2.documentElement.getElementsByTagName("item");
    
    for (var i=0;i<items2.length;i++) {
    	 
         foto2[i]=items2.item(i).getElementsByTagName("link").item(0).text;
         titulo2[i]=items2.item(i).getElementsByTagName("title").item(0).text;
         descripcion2[i]=items2.item(i).getElementsByTagName("description").item(0).text;
         podcast2[i]=items2.item(i).getElementsByTagName("enclosure").item(0).getAttribute("url");
    }
    
    //actulizo la UI
    var data=[];
	for (var i = 0; i <=  podcast2.length; i++){
	
		var row = Titanium.UI.createTableViewRow();
	
		var cover =  Titanium.UI.createImageView({
			image:foto2[i],
			width:60,
			height:60,
			left:4,
			top:5
		});
	
	
		var title = Titanium.UI.createLabel({
			text:titulo2[i],
			font:{fontSize:18,fontWeight:'bold'},
			width:'100%',
			textAlign:'left',
			top:25,
			color:'white',
			left:67,
			height:20
		});
	
		row.add(cover);
		row.add(title);
		row.hasChild=true;
		row.className = 'coutry_row2';
	
	
		data.push(row);
	};
	var lista = Titanium.UI.createTableView({
		top:'90dp',
		width:'100%',
		height:'95%',
		backgroundColor:'transparent',
		minRowHeight:'70dp',
		maxRowHeight:'70dp'
		
	});


	lista.setData(data);
	lista.addEventListener('click',function(e) {

    	indicador = e.index;
    	Ti.include('/ui/programa.js');
	    navGroup.open(programaWin);
    	
    
    });
	podcastWin.add(lista);
    
};
xhr2.onerror = function(e) {
    // should do something more robust
    alert('Problema con la conexión a internet '+e.error);
};
 
xhr2.open('GET',url2);
xhr2.send();



podcastWin.open();






