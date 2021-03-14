$(document).ready(function(){
	$('.chapter__title').on('click',function(event) {
		$(this).toggleClass('active').next().slideToggle(500);
	});
	$("nav").on("click","a", function(event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'))
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
function bodyUnLock() {
	setTimeout(function () {
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function (){
		unlock = true;
	}, timeout);
}
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});
let agit = document.querySelector('.agitation');
agit.onclick = function(e) {
	if (e.target.className != 'popup') return;
}
// Пасхалка
let logo = document.querySelectorAll('.logo');
logo[0].addEventListener('click', function() {
	this.classList.toggle('clicked');
});
//

//SLIDER
const container = document.querySelector('.carousel-container');
const track = document.querySelector('.carousel-track');
let itemIndex = 1;
showItems(itemIndex);
function currentItem(n) {
    showItems(itemIndex = n);
}
function showItems(n) {
	let i;
	let items = document.querySelectorAll('.carousel-item');
	let dots = document.querySelectorAll('.carousel-dot');
	if (n > items.length) {
      itemIndex = 1
    }
    if (n < 1) {
        itemIndex = items.length
    }
    for (i = 0; i < items.length; i++) {
        items[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    items[itemIndex - 1].style.display = "block";
    dots[itemIndex - 1].className += " active";
}
const setPosition = () => {
	track.style.transform = `translateX(${position}px)`;
};
