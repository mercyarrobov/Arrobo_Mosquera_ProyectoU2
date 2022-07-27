/* TODO - 1. Refactor to make more DRY and hide more variables, too many in global
 *        2. Should be compliant with IE
 *
 * Submitted by Brent Robertson
 */

var drag1 = document.getElementById('drag1');
var drag2 = document.getElementById('drag2');
var drag3 = document.getElementById('drag3');
var drag4 = document.getElementById('drag4');
var drag5 = document.getElementById('drag5');

var drop1 = document.getElementById('drop1');
var drop2 = document.getElementById('drop2');
var drop3 = document.getElementById('drop3');
var drop4 = document.getElementById('drop4');
var drop5 = document.getElementById('drop5');

var currentOccupant = [null, null, null, null, null];
var correctAnswers = [drag1, drag2, drag3, drag4, drag5];
var totalAnswers = 0;

// Initially add event listeners
drag1.addEventListener('mousedown', mouseDown);
drag2.addEventListener('mousedown', mouseDown);
drag3.addEventListener('mousedown', mouseDown);
drag4.addEventListener('mousedown', mouseDown);
drag5.addEventListener('mousedown', mouseDown);

// Setup all of the original positions of elements
var origPos1 = {
	x: drag1.offsetLeft,
	y: drag1.offsetTop
}

var origPos2 = {
	x: drag2.offsetLeft,
	y: drag2.offsetTop
}

var origPos3 = {
	x: drag3.offsetLeft,
	y: drag3.offsetTop
}

var origPos4 = {
	x: drag4.offsetLeft,
	y: drag4.offsetTop
}

var origPos5 = {
	x: drag5.offsetLeft,
	y: drag5.offsetTop
}

var dropPos1 = {
	x: drop1.offsetLeft,
	y: drop1.offsetTop
}

var dropPos2 = {
	x: drop2.offsetLeft,
	y: drop2.offsetTop
}

var dropPos3 = {
	x: drop3.offsetLeft,
	y: drop3.offsetTop
}

var dropPos4 = {
	x: drop4.offsetLeft,
	y: drop4.offsetTop
}

var dropPos5 = {
	x: drop5.offsetLeft,
	y: drop5.offsetTop
}

function mouseDown(e) {
	// Increase the z-index so that it can move over other drag boxes
	e.target.style.zIndex = "20";
	console.log('the mouse is down');
	// Add these event listeners everytime a drag item is clicked and held
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);
}

function checkCurrentBox(current) {
	if (current.id === 'drag1') {
		currDrag = drag1;
	} else if (current.id === 'drag2') {
		currDrag = drag2;
	} else if (current.id === 'drag3') {
		currDrag = drag3;
	} else if (current.id === 'drag4') {
		currDrag = drag4;
	} else if (current.id === 'drag5') {
		currDrag = drag5;
	}

	return currDrag;
}

function mouseMove(e) {
	console.log(e.target);
	var currDrag = null;
	currDrag = checkCurrentBox(e.target);

	currDrag.style.left = e.clientX - (currDrag.offsetWidth / 2) + 'px';
	currDrag.style.top = e.clientY - (currDrag.offsetHeight / 2) + 'px';
	currDrag.style.cursor = 'move';
}

function returnToOriginalPosition(currDrag, e) {
	if (currDrag === drag1) {
		e.target.style.left = origPos1.x + 'px';
		e.target.style.top = origPos1.y + 'px';

	} else if (currDrag === drag2) {
		e.target.style.left = origPos2.x + 'px';
		e.target.style.top = origPos2.y + 'px';

	} else if (currDrag === drag3) {
		e.target.style.left = origPos3.x + 'px';
		e.target.style.top = origPos3.y + 'px';

	} else if (currDrag === drag4) {
		e.target.style.left = origPos4.x + 'px';
		e.target.style.top = origPos4.y + 'px';

	} else if (currDrag === drag5) {
		e.target.style.left = origPos5.x + 'px';
		e.target.style.top = origPos5.y + 'px';
	}


	currDrag.style.borderColor = "#678CDC";

	/* Check to see if currDrag was assigned to any dropBox (no pun intended)
	 * If it was, it needs to be removed from currentOccupant array
	 */
	for (let i = 0; i < 5; i++) {
		if (currentOccupant[i] === currDrag) {
			currentOccupant[i] = null;
			totalAnswers--;
		}
	}
}
const music = new Audio('adf.wav');
music.play();
music.loop = true;
music.playbackRate = 2;
music.pause();
qqazszdgfbgtyj

function mouseUp(e) {
	// console.log('the mouse is up');
	var currDrag = checkCurrentBox(e.target);
	var trueTop = e.clientY - (currDrag.offsetHeight / 2);
	var trueLeft = e.clientX - (currDrag.offsetWidth / 2);
	document.removeEventListener('mousemove', mouseMove);
	document.removeEventListener('mouseup', mouseUp);
	// Put z-index back to normal
	e.target.style.zIndex = '10'
	console.log(e.clientX + '  :  ' + drop1.offsetLeft);
	console.log(e.clientY + '  :  ' + drop1.offsetTop);

	/* TODO - check to see if currDrag box is over a drop area
	 * If not, then send back to original position
	 */
	// Check height first since all heights are the same
	if (trueTop >= (drop1.offsetTop - 50) &&
		trueTop <= (drop1.offsetTop + 50) &&
		trueLeft <= (drop5.offsetLeft + 50) &&
		trueLeft >= (drop1.offsetLeft - 50)) {
		if (trueLeft >= (drop1.offsetLeft - 50) && trueLeft <= (drop1.offsetLeft + 50)) {
			// Snap into place
			if (currentOccupant[0] === null || currentOccupant[0] === currDrag) { // nothing there so add
				var currIndex = 0;
				currDrag.style.left = dropPos1.x + 'px';
				currDrag.style.top = dropPos1.y + 'px';
				if (currentOccupant[0] !== currDrag) {
					totalAnswers++;
				}
				// Place in the value of the current dragged elem
				currentOccupant[0] = currDrag;
				/* Check to see if currDrag was assigned to any dropBox (no pun intended)
				 * If it was, it needs to be removed from currentOccupant array
				 */
				for (let i = 0; i < 5; i++) {
					if (currIndex !== i && currentOccupant[i] === currDrag) {
						currentOccupant[i] = null;
						totalAnswers--;
					}
				}
			} else { // occupied so dont add and return to position
				returnToOriginalPosition(currDrag, e);
			}
		} else if (trueLeft >= (drop2.offsetLeft - 50) && trueLeft <= (drop2.offsetLeft + 50)) {
			// Snap into place
			if (currentOccupant[1] === null || currentOccupant[1] === currDrag) { // nothing there so add
				currIndex = 1;
				currDrag.style.left = dropPos2.x + 'px';
				currDrag.style.top = dropPos2.y + 'px';
				if (currentOccupant[1] !== currDrag) {
					totalAnswers++;
				}
				// Place in the value of the current dragged elem
				currentOccupant[1] = currDrag;
				/* Check to see if currDrag was assigned to any dropBox (no pun intended)
				 * If it was, it needs to be removed from currentOccupant array
				 */
				for (let i = 0; i < 5; i++) {
					if (currIndex != i && currentOccupant[i] === currDrag) {
						currentOccupant[i] = null;
						totalAnswers--;
					}
				}
			} else { // occupied so dont add and return to position
				returnToOriginalPosition(currDrag, e);
			}
		} else if (trueLeft >= (drop3.offsetLeft - 50) && trueLeft <= (drop3.offsetLeft + 50)) {
			// Snap into place
			if (currentOccupant[2] === null || currentOccupant[2] === currDrag) { // nothing there so add
				currIndex = 2;
				currDrag.style.left = dropPos3.x + 'px';
				currDrag.style.top = dropPos3.y + 'px';
				if (currentOccupant[2] !== currDrag) {
					totalAnswers++;
				}
				// Place in the value of the current dragged elem
				currentOccupant[2] = currDrag;
				/* Check to see if currDrag was assigned to any dropBox (no pun intended)
				 * If it was, it needs to be removed from currentOccupant array
				 */
				for (let i = 0; i < 5; i++) {
					if (currIndex != i && currentOccupant[i] === currDrag) {
						currentOccupant[i] = null;
						totalAnswers--;
					}
				}
			} else { // occupied so dont add and return to position
				returnToOriginalPosition(currDrag, e);
			}
		} else if (trueLeft >= (drop4.offsetLeft - 50) && trueLeft <= (drop4.offsetLeft + 50)) {
			// Snap into place
			if (currentOccupant[3] === null || currentOccupant[3] === currDrag) { // nothing there so add
				currIndex = 3;
				currDrag.style.left = dropPos4.x + 'px';
				currDrag.style.top = dropPos4.y + 'px';
				if (currentOccupant[3] !== currDrag) {
					totalAnswers++;
				}
				// Place in the value of the current dragged elem
				currentOccupant[3] = currDrag;
				/* Check to see if currDrag was assigned to any dropBox (no pun intended)
				 * If it was, it needs to be removed from currentOccupant array
				 */
				for (let i = 0; i < 5; i++) {
					if (currIndex != i && currentOccupant[i] === currDrag) {
						currentOccupant[i] = null;
						totalAnswers--;
					}
				}
			} else { // occupied so dont add and return to position
				returnToOriginalPosition(currDrag, e);
			}
		} else if (trueLeft >= (drop5.offsetLeft - 50) && trueLeft <= (drop5.offsetLeft + 50)) {
			// Snap into place
			if (currentOccupant[4] === null || currentOccupant[4] === currDrag) { // nothing there so add
				currIndex = 4;
				currDrag.style.left = dropPos5.x + 'px';
				currDrag.style.top = dropPos5.y + 'px';
				if (currentOccupant[4] !== currDrag) {
					totalAnswers++;
				}
				// Place in the value of the current dragged elem
				currentOccupant[4] = currDrag;
				/* Check to see if currDrag was assigned to any dropBox (no pun intended)
				 * If it was, it needs to be removed from currentOccupant array
				 */
				for (let i = 0; i < 5; i++) {
					if (currIndex != i && currentOccupant[i] === currDrag) {
						currentOccupant[i] = null;
						totalAnswers--;
					}
				}
			} else { // occupied so dont add and return to position
				returnToOriginalPosition(currDrag, e);
			}
		}

		currDrag.style.borderColor = '#f48642';
	} else {
		returnToOriginalPosition(currDrag, e);
	}

	function checkAnswers() {
		let correct = 0;

		function restartGame() {
			currentOccupant = [null, null, null, null, null];
			totalAnswers = 0;
			drag1.style.left = origPos1.x + 'px';
			drag1.style.top = origPos1.y + 'px';
			drag2.style.left = origPos2.x + 'px';
			drag2.style.top = origPos2.y + 'px';
			drag3.style.left = origPos3.x + 'px';
			drag3.style.top = origPos3.y + 'px';
			drag4.style.left = origPos4.x + 'px';
			drag4.style.top = origPos4.y + 'px';
			drag5.style.left = origPos5.x + 'px';
			drag5.style.top = origPos5.y + 'px';
			drag1.style.borderColor = '#678CDC';
			drag2.style.borderColor = '#678CDC';
			drag3.style.borderColor = '#678CDC';
			drag4.style.borderColor = '#678CDC';
			drag5.style.borderColor = '#678CDC';
			document.getElementById('play-again').classList.add('hidden');
			document.getElementById('check-answers').classList.remove('hidden');
			document.getElementById('check-answers').classList.add('disabled');
			document.getElementById('response').textContent = '';
			document.getElementById('check-answers').removeEventListener('click', checkAnswers);

		}

		for (let i = 0; i < 5; i++) {
			if (currentOccupant[i] === correctAnswers[i]) {
				correct++;
			}
		}

		if (correct === 5) {
			document.getElementById('response').textContent = '⭐⭐⭐⭐⭐';
			document.getElementById('check-answers').classList.add('hidden');
			document.getElementById('play-again').classList.remove('hidden');
			document.getElementById('play-again').addEventListener('click', restartGame);
		} else {
			document.getElementById('response').textContent = (5 - correct) + " ❌❌❌❌❌";
		}
	}

	/* Check if all three answers filled, if so highlight box to check answer
	 * onclick - check to make sure answers in correct order in currentOccupant[]
	 * If not all filled then return box to gray
	 */
	if (totalAnswers === 5) { // answers complete
		// document.getElementById('check-answers').style.backgroundColor = '#f48642';
		document.getElementById('check-answers').classList.remove('disabled');
		document.getElementById('check-answers').addEventListener('click', checkAnswers);
	} else {
		document.getElementById('check-answers').classList.add('disabled');
	}
}