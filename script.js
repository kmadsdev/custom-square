var input = document.getElementById("values");
var gradient = document.getElementById("gradientValues");
var box = document.getElementById("box");
var textBox = document.getElementById('textBox');
var colorPicker = document.querySelector('.colorPicker');
var themeToggle = document.getElementById('theme-toggle');
var boxContainer = document.querySelector('.box-container');
var sizeMinEl = document.getElementById('size-min');
var sizeMaxEl = document.getElementById('size-max');

var DEFAULT_SIZE = 300;
var MIN_SIZE = 120;
var maxSize = 640;

/**
 * Sets the application theme.
 * @param {boolean} isDark - True for dark theme, false for light theme.
 */
function setAppTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    themeToggle.checked = isDark;
}

themeToggle.addEventListener('change', function() {
    localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    setAppTheme(this.checked);
});

input.addEventListener("input", function() {
    var vls = input.value;
    if (vls.trim() === "") {
        reset();
        return;
    }
    var styles = vls.split(';');
    
    box.style.background = styles[0] || (document.body.classList.contains('dark-theme') ? '#2d3748' : 'white');
    box.style.borderRadius = styles[1] || '8px';
    box.style.borderColor = styles[2] || (document.body.classList.contains('dark-theme') ? '#4a5568' : '#e2e8f0');
    box.style.borderWidth = styles[3] || '2px';
    computeMaxSize();
    applyBoxSizes(styles[4] || DEFAULT_SIZE, styles[5] || styles[4] || DEFAULT_SIZE);
});

gradient.addEventListener("input", function() {
    var vls = gradient.value;
    if (vls.trim() === "") {
        box.style.background = document.body.classList.contains('dark-theme') ? '#2d3748' : 'white';
        return;
    }
    setGradient(vls.split(';'));
});

function computeMaxSize() {
    if (!boxContainer) return maxSize;
    var styles = getComputedStyle(boxContainer);
    var paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
    var paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    var innerWidth = boxContainer.clientWidth - paddingX;
    var innerHeight = boxContainer.clientHeight - paddingY;
    var candidate = Math.max(MIN_SIZE, Math.floor(Math.min(innerWidth, innerHeight)));
    maxSize = candidate;
    if (sizeMinEl) sizeMinEl.textContent = MIN_SIZE + 'px';
    if (sizeMaxEl) sizeMaxEl.textContent = maxSize + 'px';
    return candidate;
}

function clampSize(value) {
    if (value === undefined || value === null || value === '') {
        return Math.min(DEFAULT_SIZE, maxSize);
    }
    if (typeof value === 'number') {
        return Math.min(Math.max(value, MIN_SIZE), maxSize);
    }
    var num = parseFloat(String(value));
    if (isNaN(num)) {
        return Math.min(DEFAULT_SIZE, maxSize);
    }
    return Math.min(Math.max(num, MIN_SIZE), maxSize);
}

function applyBoxSizes(heightVal, widthVal) {
    var h = clampSize(heightVal);
    var w = clampSize(widthVal !== undefined ? widthVal : heightVal);
    box.style.height = h + 'px';
    box.style.width = w + 'px';
}

document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setAppTheme(savedTheme === 'dark');
    } else {
        setAppTheme(prefersDark);
    }

    if(colorPicker) {
        colorPicker.addEventListener("input", function() {
            textBox.textContent = colorPicker.value;
            textBox.style.backgroundColor = colorPicker.value;
            // Simple check for contrast to change text color
            const hex = colorPicker.value.replace('#', '');
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            if (luminance > 0.5) {
                textBox.style.color = '#000000';
            } else {
                textBox.style.color = '#ffffff';
            }
        });
    }

    computeMaxSize();
    applyBoxSizes(DEFAULT_SIZE, DEFAULT_SIZE);
});

window.addEventListener('resize', function() {
    computeMaxSize();
    applyBoxSizes(box.style.height, box.style.width);
});

function setGradient(vls) {
    const colors = vls.filter(c => c.trim() !== '').slice(0, 8);
    if (colors.length > 1) {
        box.style.background = `linear-gradient(${colors.join(', ')})`;
    } else if (colors.length === 1) {
        box.style.background = colors[0];
    }
}

function reset() {
    const isDark = document.body.classList.contains('dark-theme');
    box.style.borderRadius = '8px';
    box.style.borderColor = isDark ? '#4a5568' : '#e2e8f0';
    box.style.borderWidth = '2px';
    box.style.background = isDark ? '#1a202c' : 'white';
    computeMaxSize();
    applyBoxSizes(DEFAULT_SIZE, DEFAULT_SIZE);
    input.value = "";
    gradient.value = "";
    colorPicker.value = '#ffffff';
    textBox.textContent = '#ffffff';
    textBox.style.backgroundColor = isDark ? '#1a202c' : '#f7fafc';
    textBox.style.color = isDark ? '#e2e8f0' : '#2d3748';
}

function setColor() {
    box.style.background = colorPicker.value;
}
