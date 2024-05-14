let log = console.log;

// loder 
document.addEventListener( "DOMContentLoaded", () =>
{
  document.querySelector( ".loading" ).remove();
} );

// start game button
document.querySelector( ".control-buttons span" ).onclick = function ( e )
{
  let userName = prompt( "What's Your Name : " );
  if ( userName == null || userName == "" )
  {
    document.querySelector( ".name span" ).innerHTML = "Unknown";
  } else
  {
    document.querySelector( ".name span" ).innerHTML = userName;
  }
  e.target.parentElement.classList.add( "hidden" );
  // e.target.parentElement.remove()
};

//   |- start -|

let duration = 1000;

let blocksContainer = document.querySelector( ".memory-game-blocks" );

let blocks = Array.from( blocksContainer.children );

let orderRange = [ ...Array( blocks.length ).keys() ];
shuffle( orderRange );
//add order css property to game blocks

blocks.forEach( ( block, index ) =>
{
  block.style.order = orderRange[ index ];

  // add click event 
  block.addEventListener( "click", ( e ) =>
  {
    flipBlock( block );
  } );
} );

//flip  block functino
function flipBlock ( selectedBlock )
{
  selectedBlock.classList.add( "is-flipped" );
  //collect all flipped cards
  let allFlippedBlocks = blocks.filter( flippedBlock => flippedBlock.classList.contains( "is-flipped" ) );

  // if theres two selected blocks
  if ( allFlippedBlocks.length == 2 )
  {
    //stop clicking functino
    stopClicking();
    //check matched block function
    checkMathcedBlocks( allFlippedBlocks[ 0 ], allFlippedBlocks[ 1 ] );
  }

}


// function shuffle ( array )
// {
//   let current = array.length,
//     temp,
//     random;
//   while (current > 0)
//   {
//     //random number in range arraygit
//     random = Math.floor(Math.random() * current)

//     current--;
//     temp = array[current]
//     array[ current ] = array[ random ]
//     array[ random ] = temp;
//   }
//   return array
// }

function shuffle ( array )
{
  return array.sort( () => Math.random() - 0.5 );
}

//stop clicking function
function stopClicking ()
{
  //add class no clicking on main container
  blocksContainer.classList.add( "no-clicking" );
  setTimeout( () =>
  {
    blocksContainer.classList.remove( "no-clicking" );
  }, duration );

}

//check matched blocks function
function checkMathcedBlocks ( firsBlock, secondBlock )
{


  let triesElement = document.querySelector( ".tries span" );

  if ( firsBlock.dataset.thechnology === secondBlock.dataset.thechnology )
  {
    firsBlock.classList.remove( "is-flipped" );
    secondBlock.classList.remove( "is-flipped" );

    firsBlock.classList.add( "has-match" );
    secondBlock.classList.add( "has-match" );
    document.querySelector("#success").play()

  } else
  { 
    triesElement.innerHTML = parseInt( triesElement.innerHTML ) + 1;
    document.querySelector("#fail").play()
    setTimeout( () =>
    {
      firsBlock.classList.remove( "is-flipped" );
      secondBlock.classList.remove( "is-flipped" );
    }, duration );
  }

}