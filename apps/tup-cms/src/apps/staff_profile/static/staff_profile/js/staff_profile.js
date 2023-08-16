/* Staff Profile Pages */
/* https://www.tacc.utexas.edu/about/staff-directory/.../ */
/* FAQ: Not specific to plugin, because manual staff profiles use this too */

function moveImage() {
  const isWideScreen = window.matchMedia('(min-width: 768px)');
  const isImageInWideSpot = col2.contains( img );

  if ( isWideScreen && ! isImageInWideSpot ) {
    col2.prepend( image );
  } else {
    image.insertAfter( header );
  }
}

export function rearrange() {
  const col1 = document.querySelector('.row.c-staff-profile > .col:nth-child(1)');
  const col2 = document.querySelector('.row.c-staff-profile > .col:nth-child(2)');
  const image = col2.querySelector(':scope > *:first-child');
  const header = col1.querySelector(':scope > *:first-child');

  moveImage();
  window.on('resize', () => moveImage() );
}
