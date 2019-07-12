// Set Project Name

var d = new Date();
const monNumber = 2; // March (couting from 0; Jan = 0, Feb = 1, Mar = 2, etc.)
const dayNumber = 14; // Fourteenth day (counting from 1)
export var projectName;

// Celebrate Pi Day (March 14).  Replace Gordon 360 by Gordon 2pi
if (d.getMonth() === monNumber && d.getDate() === dayNumber) {
  projectName = 'Gordon 2\u03C0'; // renders as Gordon 2pi
} else {
  projectName = 'Gordon 360';
}
