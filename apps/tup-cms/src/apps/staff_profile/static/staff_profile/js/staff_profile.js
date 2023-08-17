/* Staff Profile Pages */
/* https://www.tacc.utexas.edu/about/staff-directory/.../ */

const mainColumn = document.querySelector(
  '.row.s-staff-profile > .col:nth-child(1)'
);
const sideColumn = document.querySelector(
  '.row.s-staff-profile > .col:nth-child(2)'
);
const mainHeader = mainColumn.querySelector(':scope > h2');
const image = sideColumn.querySelector(':scope > *:first-child');

/** Move image to side column on wide screen, otherwise to main column */
function moveImage() {
  const isWideScreen = window.matchMedia('(min-width: 768px)').matches;

  if (isWideScreen) {
    if (!sideColumn.contains(image)) {
      sideColumn.prepend(image);
      if (window.DEBUG) console.log('Staff image should be in side column');
    }
  } else {
    if (!mainColumn.contains(image)) {
      mainHeader.after(image);
      if (window.DEBUG) console.log('Staff image should be in main column');
    }
  }
}

moveImage();

// HELP: Can event be limited to width resize only? Is it worth it?
// SEE: https://stackoverflow.com/a/71782892/11817077
window.addEventListener('resize', () => {
  moveImage();
});
