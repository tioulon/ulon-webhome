const username = "ulon"; // your nekoweb username

const getStats = async () => {
    const request = await fetch(`https://nekoweb.org/api/site/info/${username}.dev`);
    const json = await request.json();
    console.log(json);

    // formats the date
    const updatedDate = new Date(json.updated_at);
    const updated = `${updatedDate.getMonth()+1}/${updatedDate.getDate()}/${updatedDate.getFullYear()}`;

    const createdDate = new Date(json.created_at);
    const created = `${createdDate.getMonth()}/${createdDate.getDate()}/${createdDate.getFullYear()}`;
    
    // change the exclemation marks to before and after texts. for example turn
// !!!! ${json.views} !!!! into
// you are my ${json.views}th visitor
   
  
    document.getElementById("visitors").innerHTML = `Nekoweb: ${json.views}`;
    //document.getElementById("created").innerHTML = `!!!! ${created} !!!!`;
    //document.getElementById("updated").innerHTML = `!!!! ${updated} !!!!`;
    document.getElementById("followers").innerHTML = `${json.followers}`.padStart(6, '0');
};
//getStats();





//--------------------------------------- BUTTON SOUND PLAYER
// 1. Load the sound file
const clickSound = new Audio('https://ulon.dev/sounds/mouse_click.ogg');

// 2. Select all buttons with the "btn-sound" class
const soundButtons = document.querySelectorAll('button');

// 3. Loop through each button and attach the click event
soundButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Reset sound to start (allows rapid clicking)
    clickSound.currentTime = 0; 
    // Play the audio
    clickSound.play();
  });
});