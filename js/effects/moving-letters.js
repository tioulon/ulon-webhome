function prepareAnimatedTextImmediate(element) {
  const text = element.innerText;
  const fragment = document.createDocumentFragment();
  
  text.split('').forEach((letter, index) => {
    const span = document.createElement('span');
    span.innerHTML = letter === ' ' ? '&nbsp;' : letter;
    
    span.style.setProperty('--i', index * -1);
    
    fragment.appendChild(span);
  });
  
  element.textContent = '';
  element.appendChild(fragment);
}

// Run the script on your elements
document.querySelectorAll('.bb-wave, .bb-shake').forEach(prepareAnimatedTextImmediate);
