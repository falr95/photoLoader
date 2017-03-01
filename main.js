/*
{
	node:new Node(),
	photos:[],
	pipeline:[]
}
*/



function PhotoLoader(){
	var fileInputsRegistered = [];
	var beingEvaluated;
	var defaultTasks = {
		"passOnlyNewPhotos":function(resolve, reject){
			console.log(beingEvaluated);
			resolve();
		},
		"putear": function(resolve,reject){
			console.log("LA REPUTAQUETEREPARIÓ")
		}
	};
	function appendThumbnail(filePhoto, container){
		var appender = function (e, name) {
			var temp = "<img pht-remover filename='"+name+"' class='thumb' src='"+e.target.result+"'>";
	    	container.append(temp);
	    	container.appendChild(document.createElement(temp))
	    };
		var reader = new FileReader();
		var name = filePhoto["name"];
		reader.onload = function(e){appender(e, name)}
		reader.readAsDataURL(filePhoto);
	}

	this.handleFilesFor = function(fileQuerySelector, gallery, pipeline){
		console.log(defaultTasks);
		var elements;
		if(typeof fileQuerySelector == "string"){
			elements = document.querySelectorAll(fileQuerySelector);
		}else if(fileQuerySelector instanceof NodeList){
			elements = fileQuerySelector;
		}else if(fileQuerySelector instanceof Node){
			elements = [fileQuerySelector];
		}else{
			throw "Error: query selector must be an string, Node or NodeList";
		}
		gallery = gallery || [];
		var selectedPhotos = [];
		elements.forEach(function(input){
			input.pipeline = pipeline || defaultTasks;
			/*var temp = {
				lastAdded:[],
				photos:[],
				pipeline:[],
				gallery:gallery,
			}*/
			input.onchange = function(){
				input.lastAdded = [];
			    for(var i = 0; i < input.files.length; i++){
					var reader = new FileReader();
					var name = input.files[i]["name"];
					reader.onload = function(e){
						var img = document.createElement("img");
						img.src =e.target.result;
						input.lastAdded.push(img);
						if(i == input.files.length-1){
							beingEvaluated = input;
							console.log(input.pipeline);
							Promise.all(input.pipeline).then(function(){
								console.log("ok")
							},function(err){
								console.log("failed", err);
							})
						}
					}
					reader.readAsDataURL(input.files[i]);
			    }
			}
		})
	}

	}