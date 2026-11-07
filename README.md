# Terrace Nine: Rooftop Cinema Tickets

A ticket-selection website for an imaginary rooftop cinema. You look at the
seating map, zoom around, click a seat to see what it costs, and only then
decide whether it goes in your cart.

I built this for my Web & Mobile I course, using plain HTML, CSS and
JavaScript (no frameworks, no backend).

## The idea

Terrace Nine shows films outdoors on a rooftop. The seating is a mix of
beanbags near the screen, deckchairs in the middle and a few sofas at the back
for people who want to be comfortable. Nothing here is a real venue, I made up
the layout and the prices.

| Zone | Name        | Seats | Price (AZN) |
|------|-------------|-------|-------------|
| A    | Beanbags    | 30    | 9           |
| B    | Deck centre | 112   | 14          |
| C1   | Deck left   | 40    | 11          |
| C2   | Deck right  | 40    | 11          |
| D    | Sofa lounge | 16    | 22          |

That is 238 seats in total, and 33 of them are already sold.

## What it does

- Shows the whole rooftop with the zones and price levels
- Generates every seat from JavaScript data (no copy-pasted seat elements)
- Click a seat to see its details and price first. Nothing goes in the cart
  until you press **Add to cart**
- A seat can only be added once, and sold seats cannot be selected
- Cart with a running total. Removing a ticket also changes the seat on the map
- Zoom in, zoom out and move up, down, left and right with buttons, plus a
  **Reset view** button that fits the whole map back in the window
- The cart is saved with localStorage, so it is still there after a refresh
- Works on phones, tablets and laptops
- Can be used with the keyboard, and the seats have labels for screen readers

### Bonus

- Zoom with the mouse wheel (it zooms towards the mouse)
- Drag the map with the mouse to move it

The buttons still work next to both of these.

## Running it

No build step. Open `index.html` in a browser.

## Project structure

```
index.html          page structure
css/style.css       styling and the responsive layout
js/venue-data.js    the zones, prices and the list of sold seats
js/map.js           draws the seats and shows the seat details
js/cart.js          the cart, the total and saving it in localStorage
js/controls.js      zoom, move, reset, mouse wheel and drag
docs/               design notes and the layout sketch
```

## How it works

`venue-data.js` has an array of zones. Each zone says how many rows and seats
it has, its price, and where it sits on the map. `map.js` loops over the zones,
rows and seats and creates one button for each seat. The seat id looks like
`B-D-07` (zone, row letter, seat number).

The cart is an array of ticket objects. After every change it is saved as text
with `JSON.stringify`. When the page loads, the saved seats are read back and
checked against the venue data, so a seat that does not exist or was sold is
ignored.

The map is zoomed and moved with one CSS transform, using three numbers: `zoom`,
`moveX` and `moveY`. The buttons, the mouse wheel and the dragging all change
those same numbers.

## Known limits

- Dragging works with the mouse only. On a touch screen use the move buttons.
- The sold seats are a fixed list in `venue-data.js`, not random.
- You add one seat at a time.

## Project status

Finished for the course submission. The commit history shows how it was built.
