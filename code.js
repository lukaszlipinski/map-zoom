var img = document.querySelector('img');
var wrapper = document.querySelector('.wrapper');
var startWidth, startHeight;

img.onload = function() {
	saveImageStartSize();
	adjustImageToWrapper();
};

function getImageRect() {
	return img.getBoundingClientRect();
}

function setImageScale(scale) {
	img.style.transform = 'scale(' + scale + ')';
	img.style.transformOrigin = '0 0';
}

function getWrapperRect() {
	return wrapper.getBoundingClientRect();
}

function saveImageStartSize() {
	var rect = getImageRect();

	startWidth = rect.width;
	startHeight = rect.height;
}

function adjustImageToWrapper() {
	var imgRect = getImageRect();
	var wrapperRect = getWrapperRect();
	var scaleVer = wrapperRect.height / imgRect.height;
	var scaleHor = wrapperRect.width / imgRect.width;

	//Nic nie rob jesli obrazek jest juz mniejszy od wrappera
	if (imgRect.height <= wrapperRect.height || imgRect.width <= wrapperRect.width) {
		return;
	}

	if (imgRect.height < imgRect.width && imgRect.width * scaleVer >= wrapperRect.width) {
		setImageScale(scaleVer);
	} else {
		setImageScale(scaleHor);
	}
}
