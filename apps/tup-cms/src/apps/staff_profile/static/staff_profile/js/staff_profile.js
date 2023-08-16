/* Staff Profile Pages */
/* https://www.tacc.utexas.edu/about/staff-directory/.../ */
/* FAQ: Not specific to plugin, because manual staff profiles use this too */

const col1 = document.querySelector('.row.c-staff-profile > .col:nth-child(1)');
const col2 = document.querySelector('.row.c-staff-profile > .col:nth-child(2)');
const image = col2.querySelector(':scope > *:first-child');
const header = col1.querySelector(':scope > *:first-child');

function moveImage() {
  const isWideScreen = window.matchMedia('(min-width: 768px)');
  const isImageInWideSpot = col2.contains( image );
  const shouldMoveImage = ( isWideScreen.matches && ! isImageInWideSpot );

  console.log({
    isImageInWideSpot,
    isWideScreen: isWideScreen.matches,
    image,
    shouldMoveImage,
    imagePreviousSibling: image.previousSibling.outerHTML
  })

  if ( shouldMoveImage ) {
    col2.prepend( image );
  } else {
    header.after( image );
  }
}

moveImage();
window.addEventListener('resize', () => moveImage() );
