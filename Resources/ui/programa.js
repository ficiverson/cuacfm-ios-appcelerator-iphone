var programaWin = Titanium.UI.createWindow({  
    title:titulo2[indicador],
    backgroundImage:'/icons/fondopodcast.png',
    barColor:'black',
    width:'100%',
    height:'100%'
});



var vistaCabeza = Ti.UI.createView({
	top:0,
	left:0,
	width:'100%',
	height:90,
	backgroundColor:'black'
});
var border = Ti.UI.createView({
	height:2,
	backgroundColor:'white',
	bottom:0
});
 
vistaCabeza.add(border);
var coverCabeza =  Titanium.UI.createImageView({
			image:foto2[indicador],
			width:80,
			height:80,
			left:4,
			top:5
});
vistaCabeza.add(coverCabeza);
var titCabeza = Titanium.UI.createLabel({
			text:'Descripción programa',
			font:{fontSize:16,fontWeight:'bold'},
			width:235,
			textAlign:'left',
			top:8,
			color:'33CC00',
			left:87,
			height:20
});
vistaCabeza.add(titCabeza);
var titleCabeza = Titanium.UI.createLabel({
			text:descripcion2[indicador],
			font:{fontSize:16},
			width:235,
			textAlign:'left',
			top:32,
			color:'white',
			left:87,
			height:40
});
vistaCabeza.add(titleCabeza);
programaWin.add(vistaCabeza);


var titulo3=[];
var descripcion3=[];
var podcast3=[];
var indicador2;

var url3=podcast2[indicador];

var xhr3 = Titanium.Network.createHTTPClient();
 
xhr3.onload = function() {
    // Data is returned from the blog, start parsing
    var xml3 = Titanium.XML.parseString(xhr3.responseText);
    //var xml = this.responseXML;
    // the blog's title is in a node named "channel"
    var channel3 = xml3.documentElement.getElementsByTagName("channel");
    // blog posts are in nodes named "item"
    var items3 = xml3.documentElement.getElementsByTagName("item");
    
    for (var i=0;i<items3.length;i++) {
    	 
         titulo3[i]=items3.item(i).getElementsByTagName("title").item(0).text;
         descripcion3[i]=items3.item(i).getElementsByTagName("description").item(0).text;
         podcast3[i]=items3.item(i).getElementsByTagName("enclosure").item(0).getAttribute("url");
    }

    //actulizo la UI
    var data2=[];
	for (var i = 0; i <=  podcast3.length; i++){
		    Titanium.API.info('lololo'+titulo3[i]);
		var row2 = Titanium.UI.createTableViewRow();

		var title2 = Titanium.UI.createLabel({
			text:titulo3[i],
			font:{fontSize:18},
			width:280,
			textAlign:'left',
			top:5,
			color:'white',
			left:5,
			height:30
		});
	
		row2.add(title2);
		row2.hasChild=true;
		row2.className = 'coutry_row2';

		data2.push(row2);
	};
	var lista2 = Titanium.UI.createTableView({
		top:90,
		width:'100%',
		height:'95%',
		backgroundColor:'transparent',
		minRowHeight:'40dp',
		maxRowHeight:'40dp'
		
	});


	lista2.setData(data2);
	lista2.addEventListener('click',function(e) {
    	
    	indicador2 = e.index;
    	Ti.include('/ui/episodio.js');
	    navGroup.open(episodioWin);
    });
	programaWin.add(lista2);
    
};
xhr3.onerror = function(e) {
    alert('Problema con la conexión a internet '+e.error);
};
 
xhr3.open('GET',url3);
xhr3.send();

programaWin.open();