function resizeImg(img) {
	var imageWidth=img.clientWidth;
	var imageHeight=img.clientHeight;
	let windowWidth= window.innerWidth;
	let windowHeight= window.innerHeight;
	
	if(imageWidth > imageHeight ){
		if(imageWidth > windowWidth){
			img.width = windowWidth;
		}else{
			img.width = imageWidth;
		}
	}else{
		if(imageHeight > windowHeight ){
			img.height = ( windowHeight );
		}else{
			img.height = imageHeight;
		}
	}
}

window.onload = (event) => {
	
	var loader=document.getElementById("loader");
	loader.style.width = "100%";
	
	var url='https://shurly.app/api/campaign/update-view/59';
	fetch(url)
	  .then();

	/*
	setTimeout(function(){
		window.location.href = 'https://invotyx.com';
	}, 3000);
	*/
};