# Terrace Nine: Rooftop Cinema Tickets

A ticket-selection website for an imaginary rooftop cinema. You look at the
seating map, zoom around, click a seat to see what it costs, and only then
decide whether it goes in your cart.

I'm building this for my Web & Mobile I course, using plain HTML, CSS and
JavaScript (no frameworks, no backend).

## The idea

Terrace Nine shows films outdoors on a rooftop. The seating is a mix of
beanbags near the screen, deckchairs in the middle and a few sofas at the back
for people who want to be comfortable. Nothing here is a real venue, I made up
the layout and the prices.

## What it will do

- Show the whole rooftop with different zones and price levels
- Generate every seat from JavaScript data (no copy-pasted seat elements)
- Let you click a seat to inspect it first, and only add it with **Add to cart**
- Zoom and move around the map with buttons (and, if time allows, mouse wheel and drag)
- Keep a cart with a running total and keep it in sync with the map
- Remember the cart after a page refresh using localStorage

## Project status

Work in progress. See the commit history for what has been done so far.

## Running it

No build step. Open `index.html` in a browser.

## Project structure

```
index.html        page structure
css/style.css     styling
js/               venue data and application logic (coming soon)
docs/             design notes and the layout sketch
```
