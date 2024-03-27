function checkIfEnterL(event) {
    const inputcodeText = document.getElementById('inputLeftBox').value;
    const leftColumn = document.getElementById('leftColumn');
    const leftColumnMain = document.querySelector('.left-column');
    const placeholderL = document.getElementById('placeholder-left');

    if (event && event.key === "Enter") {
        if (inputcodeText !== '' && leftColumnMain.contains(placeholderL)) {
            placeholderL.remove();
            updateLeftDiv(); 
        } else if (inputcodeText !== '' && leftColumn.contains(newPlaceholderDiv)) {
            newPlaceholderDiv.remove();
            updateLeftDiv();
        } else if (inputcodeText === '' && leftColumnMain.contains(placeholderL)) {
            return;
        } else if (inputcodeText === '' && leftColumn.contains(newPlaceholderDiv)) {
            return;
        } else {
            updateLeftDiv();
        }

        return false;
    }
}

function checkIfEnterR(event) {
    const inputcodeTextRight = document.getElementById('inputRightBox').value;
    const rightColumn = document.getElementById('rightColumn');
    const rightColumnMain = document.querySelector('.right-column');
    const placeholderR = document.getElementById('placeholder-right');

    if (event && event.key === "Enter") {
         if (inputcodeTextRight !== '' && rightColumnMain.contains(placeholderR)) {
            placeholderR.remove();
            updateRightDiv(); 
        } else if (inputcodeTextRight !== '' && rightColumn.contains(newPlaceholderDivR)) {
            newPlaceholderDivR.remove();
            updateRightDiv();
        } else if (inputcodeTextRight === '' && rightColumnMain.contains(placeholderR)) {
            return;
        } else if (inputcodeTextRight === '' && rightColumn.contains(newPlaceholderDivR)) {
            return;
        } else {
            updateRightDiv();
        }
        
        return false;
    }
}

const newPlaceholderDiv = document.createElement('div');
const newPlaceholder = document.createElement('code');
const newPlaceholderDivR = document.createElement('div');
const newPlaceholderR = document.createElement('code');

function checkButtonClick(event) {
    const inputcodeText = document.getElementById('inputLeftBox').value;
    const inputcodeTextRight = document.getElementById('inputRightBox').value;
    const leftColumn = document.getElementById('leftColumn');
    const leftColumnMain = document.querySelector('.left-column');
    const rightColumn = document.getElementById('rightColumn');
    const rightColumnMain = document.querySelector('.right-column');
    const placeholderL = document.getElementById('placeholder-left');
    const placeholderR = document.getElementById('placeholder-right');

    if (event && event.target.classList.contains('button-left')) {
          if (inputcodeText !== '' && leftColumnMain.contains(placeholderL)) {
            placeholderL.remove();
            updateLeftDiv(); 
        } else if (inputcodeText !== '' && leftColumn.contains(newPlaceholderDiv)) {
            newPlaceholderDiv.remove();
            updateLeftDiv();
        } else if (inputcodeText === '' && leftColumnMain.contains(placeholderL)) {
            return
        } else if (inputcodeText === '' && leftColumn.contains(newPlaceholderDiv)) {
            return
        } else {
            updateLeftDiv();
        }
    } else if (event && event.target.classList.contains('button-right')) {
        if (inputcodeTextRight !== '' && rightColumnMain.contains(placeholderR)) {
            placeholderR.remove();
            updateRightDiv(); 
        } else if (inputcodeTextRight !== '' && rightColumn.contains(newPlaceholderDivR)) {
            newPlaceholderDivR.remove();
            updateRightDiv();
        } else if (inputcodeTextRight === '' && rightColumnMain.contains(placeholderR)) {
            return
        } else if (inputcodeTextRight === '' && rightColumn.contains(newPlaceholderDivR)) {
            return
        } else {
            updateRightDiv();
        }
    }
    return false;
}



function updateTopDiv() {
    var inputLogicText = document.getElementById('inputTopBox').value;

    document.getElementById('top-main').innerText = inputLogicText;
}

function updateLeftDiv() {
  var inputcodeText = document.getElementById('inputLeftBox').value;
  var leftColumn = document.getElementById('leftColumn');
  var newWrapperDiv = document.createElement('div');
  newWrapperDiv.classList.add('wrapper');

  newWrapperDiv.setAttribute('draggable', 'true');
  newWrapperDiv.addEventListener('dragstart', drag); // Use addEventListener instead of ondragstart

    var newDiv = document.createElement('div');
    newDiv.innerText = inputcodeText;

    newWrapperDiv.appendChild(newDiv);

    var iconsContainer = document.createElement('div');
    iconsContainer.classList.add('icons-container');
    newWrapperDiv.appendChild(iconsContainer)

    var icon = document.createElement('i');
    icon.classList.add('fas', 'fa-bars');
    // Ensure the icon is visible
    icon.style.visibility = 'visible';
    icon.style.color = '#d4d4d4';

    iconsContainer.appendChild(icon);

    var cancelIcon = document.createElement('i');
    cancelIcon.classList.add('fa-solid', 'fa-xmark');
    cancelIcon.style.visibility = 'visible';
    cancelIcon.style.color = '#d4d4d4';

    iconsContainer.appendChild(cancelIcon)

    icon.addEventListener('mouseenter', function(iconx) {
        icon.style.color = '#63E6BE'
    });

    icon.addEventListener('mouseleave', function(iconx) {
        icon.style.color = '#d4d4d4'
    });

    cancelIcon.addEventListener('mouseenter', function(icon) {
        cancelIcon.style.color = '#f74545'
    });

    cancelIcon.addEventListener('mouseleave', function(icon) {
        cancelIcon.style.color = '#d4d4d4'
    });

    cancelIcon.addEventListener('click', function(event) {
        newWrapperDiv.remove();
        
        addPlaceholder()
    });

    function addPlaceholder() {
        const divsContainer =  leftColumn.children;
        if (divsContainer.length === 0) {
            newPlaceholder.id = 'placeholder-right';
            newPlaceholder.innerHTML = 'ex. gameObject.SetActive(true);';
            newPlaceholderDiv.appendChild(newPlaceholder);
            leftColumn.appendChild(newPlaceholderDiv);
        }
    }

    // Attach contextmenu event listener to copy the text when right-clicked
    newWrapperDiv.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default right-click menu
        copyToClipboard(inputcodeText);
    });

    if (inputcodeText === '') {
        addPlaceholder()
        return;
    } else {
        leftColumn.appendChild(newWrapperDiv);
    }

    document.getElementById('inputLeftBox').value = "";
}

let draggedElement = null;

function allowDrop(event) {
    event.preventDefault();
}


function drag(event) {
    draggedElement = event.target;
    draggedElement.classList.add('drag-highlight');
    event.dataTransfer.setData("text", ""); // Clear data to prevent duplication
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove('drop-highlight');
    if (draggedElement && draggedElement !== event.target) {
        const target = event.target;
        const rect = target.getBoundingClientRect();
        
        // Check if the target is a wrapper element
        if (target.classList.contains('wrapper')) {
            // Determine whether to insert before or after the target
            const insertBefore = event.clientY <= rect.top + rect.height / 2;
            
            // Get the parent of the target
            const parent = target.parentNode;
            
            // Remove the dragged element from its current position
            draggedElement.remove();
            
            // Insert the dragged element at the calculated index
            if (insertBefore) {
                parent.insertBefore(draggedElement, target);
            } else {
                parent.insertBefore(draggedElement, target.nextSibling);
            }
        }
        
        draggedElement = null; // Reset draggedElement
    }
}


function updateRightDiv() {
    var inputcodeTextRight = document.getElementById('inputRightBox').value;
    var rightColumn = document.getElementById('rightColumn');
    var newWrapperDivR = document.createElement('div');

    newWrapperDivR.classList.add('wrapper');

    newWrapperDivR.setAttribute('draggable', 'true');
    newWrapperDivR.addEventListener('dragstart', dragTwo); // Use addEventListener instead of ondragstart

    var newDivR = document.createElement('div');
    newDivR.innerText = inputcodeTextRight;

    newWrapperDivR.appendChild(newDivR);
    
    var iconsContainerR = document.createElement('div');
    iconsContainerR.classList.add('icons-container');
    newWrapperDivR.appendChild(iconsContainerR)

    var iconR = document.createElement('i');
    iconR.classList.add('fas', 'fa-bars');
    // Ensure the icon is visible
    iconR.style.visibility = 'visible';
    iconR.style.color = '#d4d4d4';

    iconsContainerR.appendChild(iconR);

    var cancelIconR = document.createElement('i');
    cancelIconR.classList.add('fa-solid', 'fa-xmark');
    cancelIconR.style.visibility = 'visible';
    cancelIconR.style.color = '#d4d4d4';

    iconsContainerR.appendChild(cancelIconR)

    iconR.addEventListener('mouseenter', function(icon) {
        iconR.style.color = '#63E6BE'
    });

    iconR.addEventListener('mouseleave', function(icon) {
        iconR.style.color = '#d4d4d4'
    });

    cancelIconR.addEventListener('mouseenter', function(iconTwo) {
        cancelIconR.style.color = '#f74545'
    });

    cancelIconR.addEventListener('mouseleave', function(iconTwo) {
        cancelIconR.style.color = '#d4d4d4'
    });

    cancelIconR.addEventListener('click', function(event) {
        newWrapperDivR.remove();
        
        addPlaceholderR()
    });

    function addPlaceholderR() {
        const divsContainerR =  rightColumn.children;
        if (divsContainerR.length === 0) {
            newPlaceholderR.id = 'placeholder-left';
            newPlaceholderR.innerHTML = 'ex. Set active state(visibility) of gameObject to true.<br>&nbsp&nbsp&nbsp&nbsp&nbspSet the gameObject to be active&nbsp&nbsp<br>&nbsp&nbsp&nbsp&nbsp&nbspSetVisibilityOfGameObject(true)&nbsp';
            newPlaceholderDivR.appendChild(newPlaceholderR);
            rightColumn.appendChild(newPlaceholderDivR);
        }
    }

    // Attach contextmenu event listener to copy the text when right-clicked
    newWrapperDivR.addEventListener('contextmenu', function(event) {
        event.preventDefault(); // Prevent default right-click menu
        copyToClipboard(inputcodeTextRight);
    });

    const placeholderStringR = 'ex. Set active state(visibility) of gameObject to true.<br>&nbsp&nbsp&nbsp&nbsp&nbspSet the gameObject to be active&nbsp&nbsp<br>&nbsp&nbsp&nbsp&nbsp&nbspSetVisibilityOfGameObject(true)&nbsp';

    if (inputcodeTextRight === '') {
        addPlaceholderR()
        return;
    } else {
        rightColumn.appendChild(newWrapperDivR);
    }


    document.getElementById('inputRightBox').value = "";
}

  
let draggedElementRight = null;

function allowDropTwo(event) {
    event.preventDefault();
}


function dragTwo(event) {
    draggedElementRight = event.target;
    event.target.classList.add('drag-highlight'); // Add highlight class when dragging
    event.dataTransfer.setData("text", ""); // Clear data to prevent duplication
}
  
  function dropTwo(event) {
    event.preventDefault();
    if (draggedElementRight && draggedElementRight !== event.target) {
        const target = event.target;
        const rect = target.getBoundingClientRect();
        
        // Check if the target is a wrapper element
        if (target.classList.contains('wrapper')) {
            // Determine whether to insert before or after the target
            const insertBefore = event.clientY <= rect.top + rect.height / 2;
            
            // Get the parent of the target
            const parent = target.parentNode;
            
            // Remove the dragged element from its current position
            draggedElementRight.remove();
            
            // Insert the dragged element at the calculated index
            if (insertBefore) {
                parent.insertBefore(draggedElementRight, target);
            } else {
                parent.insertBefore(draggedElementRight, target.nextSibling);
            }
        }
        
        draggedElementRight = null; // Reset draggedElement
    }
  }

  // Function to copy text to clipboard
function copyToClipboard(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function cardToggle() {
    const angleButtons = document.querySelectorAll('.card-header-icon');

    angleButtons.forEach(angleButton => {
        angleButton.addEventListener('click', function () {
            const cardContent = this.closest('.card').querySelector('.card-content');
            cardContent.classList.toggle('hidden');
        });
    });
}



document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keypress', checkIfEnterL);
    document.addEventListener('keypress', checkIfEnterR);
    document.addEventListener('keypress', updateTopDiv);
    document.addEventListener('click', checkButtonClick);
    cardToggle() 
});

