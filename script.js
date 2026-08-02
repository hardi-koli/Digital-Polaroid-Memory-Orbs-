// ============================================================
// ✏️  EDIT ME: This is the ONLY place you need to change content.
// Add, remove, or edit memory objects below to update the site.
//
//   type        -> 'photo-with-caption' | 'photo-only' | 'text-only'
//   imageUrl    -> image link (leave '' for text-only)
//   caption     -> label under photo, OR the sticky-note text for text-only
//   backMessage -> the message shown when the card is flipped
//   cardColor   -> front-of-card background color (also the orb's base color)
//   backColor   -> back-of-card background color (also the orb's glow color)
//   textColor   -> text color used on that card
//
// Add more objects to add more orbs (they auto-wrap into new shelf rows).
// ============================================================
const memories = [
    {
        type: 'photo-with-caption',
        imageUrl: 'Images/1st Trip.jpg',
        caption: 'Our first trip!',
        backMessage: 'I still cannot believe we managed to pull this trip off. Here is to a hundred more adventures together.',
        cardColor: '#ffffff', // Classic white front
        backColor: '#ffe5ec', // Soft pink back
        textColor: '#333333'
    },
    {
        type: 'photo-only',
        imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
        caption: '',
        backMessage: 'Sometimes no words are needed to explain a perfect day.',
        cardColor: '#e0f7fa', // Light cyan front
        backColor: '#b2ebf2', // Slightly darker cyan back
        textColor: '#333333'
    },
    {
        type: 'text-only',
        imageUrl: '',
        caption: 'The 3 AM Pizza Argument',
        backMessage: 'Arguing over pineapple on pizza instead of studying. You still owe me a slice! - Neha',
        cardColor: '#fff9c4', // Yellow sticky note front
        backColor: '#ffecb3', // Deeper yellow back
        textColor: '#d84315'  // Dark orange text for contrast
    },
    {
        type: 'photo-with-caption',
        imageUrl: 'Images/late-night-coding.jpg',
        caption: 'Late night coding',
        backMessage: 'Thanks for always keeping me sane during those ridiculous late-night coding sessions.',
        cardColor: '#e8f5e9', // Mint green front
        backColor: '#c8e6c9', // Darker mint green back
        textColor: '#1b5e20'
    }
];

// ============================================================
// ✏️  EDIT ME (optional): quick layout/style tweaks
// ============================================================
const ORBS_PER_ROW = 4;   // how many orbs per shelf row before it wraps

// Tape colors cycled across cards (add a name here if you add a matching
// .tape-yourname class in style.css)
const TAPE_CLASSES = ['tape-yellow', 'tape-pink', 'tape-blue', 'tape-mint'];

const shelf = document.getElementById('shelf');
const overlay = document.getElementById('memory-overlay');
const travelOrb = document.getElementById('travel-orb');
const focusedCard = document.getElementById('focused-card');
const focusedFront = focusedCard.querySelector('.polaroid-front');
const focusedBack = focusedCard.querySelector('.polaroid-back');
const flipHint = document.getElementById('flip-hint');
const closeBtn = document.getElementById('close-overlay');

// ---------- Build the shelf of orbs ----------
for (let rowStart = 0; rowStart < memories.length; rowStart += ORBS_PER_ROW) {
    const rowMemories = memories.slice(rowStart, rowStart + ORBS_PER_ROW);

    const row = document.createElement('div');
    row.className = 'shelf-row';

    const ballsWrap = document.createElement('div');
    ballsWrap.className = 'balls-wrap';

    rowMemories.forEach((memory, i) => {
        const globalIndex = rowStart + i;

        const ball = document.createElement('button');
        ball.type = 'button';
        ball.className = 'memory-ball';
        ball.style.setProperty('--ball-base', memory.cardColor || '#ffffff');
        ball.style.setProperty('--ball-glow', memory.backColor || '#ffe5ec');
        ball.style.animationDelay = `${(globalIndex % 5) * 0.4}s`;
        ball.setAttribute('aria-label', memory.caption ? `Open memory: ${memory.caption}` : 'Open memory');

        ball.addEventListener('click', () => openMemory(memory, ball, globalIndex));

        ballsWrap.appendChild(ball);
    });

    const plankGroup = document.createElement('div');
    plankGroup.className = 'shelf-plank-group';

    const topLine = document.createElement('div');
    topLine.className = 'shelf-top-line';

    const plank = document.createElement('div');
    plank.className = 'shelf-plank';

    plankGroup.appendChild(topLine);
    plankGroup.appendChild(plank);

    row.appendChild(ballsWrap);
    row.appendChild(plankGroup);
    shelf.appendChild(row);
}

// ---------- Build the front/back of the focused card ----------
function buildFrontContent(memory) {
    focusedFront.innerHTML = '';
    focusedFront.style.backgroundColor = memory.cardColor || '#ffffff';
    // No caption on photo-only cards, so let the photo fill the whole card
    focusedFront.classList.toggle('photo-only-front', memory.type === 'photo-only');

    if (memory.type === 'photo-with-caption' || memory.type === 'photo-only') {
        const photoContainer = document.createElement('div');
        photoContainer.className = 'photo-container';
        const img = document.createElement('img');
        img.src = memory.imageUrl;
        img.alt = 'Memory';
        photoContainer.appendChild(img);
        focusedFront.appendChild(photoContainer);

        if (memory.type === 'photo-with-caption') {
            const captionDiv = document.createElement('div');
            captionDiv.className = 'caption';
            captionDiv.textContent = memory.caption;
            captionDiv.style.color = memory.textColor || '#333333';
            focusedFront.appendChild(captionDiv);
        }
    } else if (memory.type === 'text-only') {
        const textDiv = document.createElement('div');
        textDiv.className = 'text-only-front';
        textDiv.textContent = memory.caption;
        textDiv.style.color = memory.textColor || '#333333';
        focusedFront.appendChild(textDiv);
    }
}

function buildBackContent(memory) {
    focusedBack.innerHTML = '';
    focusedBack.style.backgroundColor = memory.backColor || '#fff9e6';

    const backMsg = document.createElement('div');
    backMsg.className = 'back-message';
    backMsg.textContent = memory.backMessage;
    backMsg.style.color = memory.textColor || '#333333';
    focusedBack.appendChild(backMsg);
}

// ---------- Orb -> center -> card animation ----------
function openMemory(memory, ballEl, index) {
    const ballRect = ballEl.getBoundingClientRect();

    // Place the traveling orb exactly on top of the ball that was clicked
    travelOrb.style.transition = 'none';
    travelOrb.style.setProperty('--ball-base', memory.cardColor || '#ffffff');
    travelOrb.style.setProperty('--ball-glow', memory.backColor || '#ffe5ec');
    travelOrb.style.width = `${ballRect.width}px`;
    travelOrb.style.height = `${ballRect.height}px`;
    travelOrb.style.left = `${ballRect.left}px`;
    travelOrb.style.top = `${ballRect.top}px`;
    travelOrb.style.opacity = '1';

    // Reset and populate the focused card
    focusedCard.className = `polaroid-wrapper focused-card ${TAPE_CLASSES[index % TAPE_CLASSES.length]}`;
    flipHint.textContent = 'Tap the card to flip';
    flipHint.classList.remove('visible');
    buildFrontContent(memory);
    buildBackContent(memory);

    overlay.classList.add('active');

    // Force a reflow so the browser registers the starting position
    // before we animate to the target position.
    void travelOrb.offsetWidth;

    const targetSize = 140;
    const centerX = window.innerWidth / 2 - targetSize / 2;
    const centerY = window.innerHeight / 2 - targetSize / 2;

    travelOrb.style.transition =
        'left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), ' +
        'top 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), ' +
        'width 0.7s ease, height 0.7s ease';
    travelOrb.style.width = `${targetSize}px`;
    travelOrb.style.height = `${targetSize}px`;
    travelOrb.style.left = `${centerX}px`;
    travelOrb.style.top = `${centerY}px`;

    // Once the orb reaches the center, fade it out and reveal the card
    travelOrb.addEventListener(
        'transitionend',
        () => {
            travelOrb.style.opacity = '0';
            focusedCard.classList.add('revealed');
            setTimeout(() => flipHint.classList.add('visible'), 300);
        },
        { once: true }
    );
}

// ---------- Tap the card to flip it ----------
focusedCard.addEventListener('click', () => {
    const isFlipped = focusedCard.classList.toggle('flipped');
    flipHint.textContent = isFlipped ? 'Tap to flip back' : 'Tap the card to flip';
});

// ---------- Close and return to the shelf ----------
function closeOverlay() {
    overlay.classList.remove('active');
    focusedCard.classList.remove('revealed', 'flipped');
    travelOrb.style.opacity = '0';
}

closeBtn.addEventListener('click', closeOverlay);
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeOverlay();
});
