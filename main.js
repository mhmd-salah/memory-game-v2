let log = console.log;

// loder 
document.addEventListener( "DOMContentLoaded", () =>
{
  document.querySelector( ".loading" ).remove();
} );

let usersRate;
if ( window.localStorage.getItem( "rates" ) )
{
  usersRate = JSON.parse(window.localStorage.getItem("rates"))
} else
{
  usersRate = []
}


let userName;
// start game button
document.querySelector( ".control-buttons span" ).onclick = function ( e )
{
  userName = document.querySelector("#username").value
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

let ratesElement = document.querySelector( ".control-buttons .rates" )
if ( localStorage.getItem("rates") == undefined )
{
  ratesElement.style.display="none"
}
document.querySelector( ".rates .clear" ).onclick = () =>
{
  ratesElement.remove()
  window.localStorage.removeItem("rates")
  // usersRate = []
}
for ( let i = 0; i < usersRate.length; i++ )
{
  let div = document.createElement( "div" )
  div.className = "userInfo"
  let markup = `
  <span style="width: 200px">${usersRate[i].username}</span>
  <span style="width: 100px">Tries: ${usersRate[i].tries}</span>
  <span style="width: 110px">Rate: ${usersRate[i].rate}</span>
  `
  div.innerHTML = markup
  div.style.display= "flex"
  div.style.justifyContent = "space-between"
  ratesElement.prepend(div)
}


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
  let blockHasMatched = blocks.filter(block => block.classList.contains("has-match"))
  if ( blockHasMatched.length == blocksContainer.children.length ) // whene win - 1
  {
    createObjUser( userName, triesElement.innerHTML )
    document.querySelector( ".winGame" ).classList.add( "on" )
    let temp = 0
    let x = setInterval( () =>
    {
      temp++
      document.querySelector("#success").play()
      if ( temp == 10 )
      {
        clearInterval( x )
        document.querySelector('.winGame .btn').onclick()
      }
    },500)
  }

}
function createObjUser ( username, tries )
{
  let user = {
    username: username || "UnKnown",
    tries: tries,
    rate : tries == 0 ? "100%" : tries / 2
  }
  usersRate.push( user )
  setRateInLocalStorage(usersRate)
}
function setRateInLocalStorage ( usersRate )
{
  window.localStorage.setItem("rates", JSON.stringify(usersRate))
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
let triesElement;
//check matched blocks function
function checkMathcedBlocks ( firsBlock, secondBlock )
{
  
  
  triesElement = document.querySelector( ".tries span" );
  
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
document.querySelector( ".winGame .btn" ).onclick = ()=>{
    window.location = window.location
  }