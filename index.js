const { app, BrowserWindow, TouchBar, TouchBarScrubber } = require('electron');
const el = require('electron');

const {
  TouchBarLabel,
  TouchBarButton,
  TouchBarSpacer,
  TouchBarPopover,
} = TouchBar;

let spinning = false;

// Reel labels
const reel1 = new TouchBarLabel();
const reel2 = new TouchBarLabel();
const reel3 = new TouchBarLabel();

// Spin result label
const result = new TouchBarLabel();

// Spin button
const spin = new TouchBarButton({
  label: '🎰 Spin',
  backgroundColor: '#7851A9',
  click: () => {
    // Ignore clicks if already spinning
    if (spinning) {
      return;
    }

    spinning = true;
    result.label = '';

    let timeout = 10;
    const spinLength = 4 * 1000; // 4 seconds
    const startTime = Date.now();

    const spinReels = () => {
      updateReels();

      if (Date.now() - startTime >= spinLength) {
        finishSpin();
      } else {
        // Slow down a bit on each spin
        timeout *= 1.1;
        setTimeout(spinReels, timeout);
      }
    };

    spinReels();
  },
});

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀'];
  return values[Math.floor(Math.random() * values.length)];
};

const updateReels = () => {
  reel1.label = getRandomValue();
  reel2.label = getRandomValue();
  reel3.label = getRandomValue();
};

const finishSpin = () => {
  const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size;
  if (uniqueValues === 1) {
    // All 3 values are the same
    result.label = '💰 Jackpot!';
    result.textColor = '#FDFF00';
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!';
    result.textColor = '#FDFF00';
  } else {
    // No values are the same
    result.label = '🙁 Spin Again';
    result.textColor = null;
  }
  spinning = false;
};

let window;

const img = new TouchBarButton({
  backgroundColor: '#000',
  iconPosition: 'center',
  icon: el.nativeImage
    .createFromPath('/Users/nizami/Documents/work/touchbar/counter.png')
    .resize({ width: 3248, height: 100 }),
  click: () => {
    console.log(123123);
    // img.icon = el.nativeImage
    //   .createFromPath('/Users/nizami/Documents/work/touchbar/update.png')
    //   .resize({ width: 3248, height: 100 });
  },
});

const touchBar = new TouchBar({
  items: [img],
});

app.whenReady().then(() => {
  window = new BrowserWindow({
    width: 1500,
    height: 75,
  });
  window.loadURL('https://www.electronjs.org/');
  window.setTouchBar(touchBar);

  setInterval(
    () =>
      window.webContents.capturePage().then((image) => {
        img.icon = image; //.resize({ width: 3248, height: 100 });
      }),
    1
  );
});
