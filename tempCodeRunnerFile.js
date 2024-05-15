
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