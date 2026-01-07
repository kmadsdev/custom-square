# CSS Property Customizer
A web-based tool for visually customizing CSS properties on a box element in real-time. Features include property manipulation, gradient generation, color picking, and theme switching.

## Overview
This application allows users to experiment with CSS properties by providing an interactive interface to modify a box element's appearance. Changes are applied in real-time, making it an educational tool for learning CSS or a quick prototyping environment for testing visual styles.

## Features
- Real-time CSS property manipulation
- Linear gradient generator supporting up to 8 colors
- Visual color picker with hex code display
- Dark/light theme toggle with persistent preference
- Responsive design
- Clean and intuitive user interface

## How It Works
### CSS Properties Field
**Input Type:** Text field
**Format:** Values separated by semicolons (;)
This field applies CSS properties to the box in a specific order:
1. Background color or image
2. Border radius
3. Border color
4. Border width
5. Height
6. Width

**Example:**
```
#ff5733;20px;blue;4px;350px;350px
```
This sets the background to red-orange, border radius to 20px, border color to blue, border width to 4px, and dimensions to 350x350px.

### Gradient Field
**Input Type:** Text field
**Format:** Color values separated by semicolons (;)
Creates a linear gradient with the specified colors. Supports up to 8 colors. If only one color is provided, it applies as a solid background.
**Example:**
```
red;orange;yellow;green;blue
```
This creates a rainbow gradient from red to blue.

### Color Picker
**Input Type:** Color selector
Provides a visual interface for selecting colors. Features include:
- Native browser color picker
- Real-time hex code display
- Automatic text contrast adjustment for readability
- "Set Color" button to apply the selected color to the box background

### Reset Button
Restores all properties and inputs to their default values, clearing any customizations.

### Theme Toggle
Switches between light and dark themes. The selected theme is saved in browser local storage and persists across sessions. The application also respects the system's color scheme preference on first load.

## File Structure
```
custom-square/
├── index.html      # Main HTML structure
├── style.css       # Styles and theme definitions
├── script.js       # Application logic and interactivity
└── README.md       # This file
```

## Usage
1. Open `index.html` in a web browser
2. Use the CSS Properties field to enter values separated by semicolons
3. Use the Gradient field to create color gradients
4. Use the Color Picker to visually select and apply colors
5. Click Reset to clear all customizations
6. Toggle between light and dark themes using the switch in the header

## Technical Details
### Dependencies
- Google Fonts (Poppins)
- No JavaScript frameworks or libraries required

### Browser Compatibility
Works in all modern browsers that support:
- CSS custom properties (CSS variables)
- HTML5 color input
- ES6 JavaScript features
- Local storage API

### Theme System
The application uses CSS custom properties to manage themes. Theme preference is stored in `localStorage` under the key `theme` with values `light` or `dark`.
