function prepareAnimatedTextStacked(element) {
  const text = element.innerText;
  const classes = Array.from(element.classList);
  const fragment = document.createDocumentFragment();
  
  text.split('').forEach((letter, index) => {
    // 1. Create the base span (where Rainbow goes, as color won't conflict)
    let currentSpan = document.createElement('span');
    currentSpan.innerHTML = letter === ' ' ? '&nbsp;' : letter;
    currentSpan.style.setProperty('--i', index);
    
    if (classes.includes('bb-rainbow')) currentSpan.classList.add('bb-rainbow-target');

    // 2. If SHAKE is present, wrap the letter in a shaking span layer
    if (classes.includes('bb-shake')) {
      const shakeSpan = document.createElement('span');
      shakeSpan.classList.add('bb-shake-target');
      shakeSpan.style.setProperty('--i', index);
      shakeSpan.appendChild(currentSpan);
      currentSpan = shakeSpan; // Update current top layer to shake
    }

    // 3. If WAVE is present, wrap everything in a waving span layer
    if (classes.includes('bb-wave')) {
      const waveSpan = document.createElement('span');
      waveSpan.classList.add('bb-wave-target');
      waveSpan.style.setProperty('--i', index);
      waveSpan.appendChild(currentSpan);
      currentSpan = waveSpan; // Update current top layer to wave
    }
    
    fragment.appendChild(currentSpan);
  });
  
  element.textContent = '';
  element.appendChild(fragment);
  
  // Clear original parent classes to prevent effect duplication
  element.classList.remove('bb-wave', 'bb-shake', 'bb-rainbow');
}

// Find and process all elements using the original classes
document.querySelectorAll('.bb-wave, .bb-shake, .bb-rainbow').forEach(prepareAnimatedTextStacked);
