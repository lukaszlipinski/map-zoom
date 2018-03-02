var img = document.querySelector('img');
var wrapper = document.querySelector('.wrapper');
var startWidth, startHeight;
var currentScale, currentTranslateX = 0, currentTranslateY = 0;

img.onload = function() {
	saveImageStartSize();
	adjustImageToWrapper();

	wrapper.addEventListener('mousewheel',function(e){
		var direction = e.deltaY / Math.abs(e.deltaY);

		zoomToPoint(e.clientX, e.clientY, direction);

		return false;
	}, false);
};

function getCurrentScale() {
	return currentScale;
}

function getCurrentTranslateX() {
	return currentTranslateX;
}

function getCurrentTranslateY() {
	return currentTranslateY;
}

function tickScale(direction) {
	var scale = getCurrentScale();

	setImageScale(Math.min(Math.max(0.2, scale + 0.03 * direction), 1), getCurrentTranslateX(), getCurrentTranslateY());
}

function getXYRelativelyToImage(x, y) {
	var rect = getImageRect();

	return {
		x: x - rect.left,
		y: y - rect.top
	};
}

function zoomToPoint(x, y, direction) {
	var relativelyToImageStart = getXYRelativelyToImage(x, y);
	var currentScale = getCurrentScale();

	tickScale(direction);

	var newScale = getCurrentScale();
	var newPointPositionX = parseInt(relativelyToImageStart.x * (newScale / currentScale), 10);
	var newPointPositionY = parseInt(relativelyToImageStart.y * (newScale / currentScale), 10);

	var diffX = newPointPositionX - relativelyToImageStart.x;
	var diffY = newPointPositionY - relativelyToImageStart.y;

	var imgRect = getImageRect();
	var wrapperRect = getWrapperRect();

console.log(wrapperRect.left , imgRect.left, wrapperRect.top, imgRect.top);
	img.style.left = (wrapperRect.left - imgRect.left) - diffX + 'px';
	img.style.top = (wrapperRect.top - imgRect.top) - diffY + 'px';


	//setImageScale(newScale, newPointPositionX - relativelyToImageStart.x, newPointPositionY - relativelyToImageStart.y);
}

function getImageRect() {
	return img.getBoundingClientRect();
}

function setImageScale(scale, translateX, translateY) {
	img.style.transform = 'scale(' + scale + ') translate(' + translateX + 'px,' + translateY +'px)';
	img.style.transformOrigin = '0 0';

	currentScale = scale;
	currentTranslateX = translateX;
	currentTranslateY = translateY;
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
		setImageScale(scaleVer, 0, 0);
	} else {
		setImageScale(scaleHor, 0, 0);
	}
}
