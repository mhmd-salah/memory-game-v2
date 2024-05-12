let log = console.log
document.querySelector( ".control-buttons span" ).onclick = function (e)
{
  let userName = prompt( "What's Your Name : " )
  if ( userName == null || userName == "" )
  {
    document.querySelector(".name span").innerHTML = "Unknown"
  } else
  {
    document.querySelector(".name span").innerHTML = userName
  }
  e.target.parentElement.classList.add("hidden")
  // e.target.parentElement.remove()
};

//   |- start -|

let duration = 1000;

let blocksContainer = document.querySelector( ".memory-game-blocks" );

let blocks = Array.from( blocksContainer.children )

let orderRange = [ ...Array( blocks.length ).keys() ];

//add order css property to game blocks

blocks.forEach( (block , index) =>
{
  block.style.order = orderRange[index];
} );

function shuffle ( array )
{
  let current = array.length,
    tamp,
    random;
  while (current > 0)
  {
    //random number in range arraygit
    random = Math.floor(Math.random() * current)
    
    current--;
  }
}
document.addEventListener( "DOMContentLoaded", () =>
{
  document.querySelector(".loading").remove()
})