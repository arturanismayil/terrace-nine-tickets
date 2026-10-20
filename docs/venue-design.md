# Venue design: Terrace Nine

Venue type: auditorium style (open-air, on a rooftop).
The screen is at the top of the map, the seats face it.

## Layout sketch

```
                    [ ======= SCREEN ======= ]

        BEANBAGS (Zone A)   3 rows x 10 seats
     ---------------------------------------------

   DECK LEFT      DECK CENTRE (Zone B)      DECK RIGHT
   (Zone C)       8 rows x 14 seats         (Zone C)
   8 rows x 5                               8 rows x 5

     ---------------------------------------------
          SOFA LOUNGE (Zone D)   2 rows x 8 seats

        [ entrance / stairs ]        [ bar ]
```

Aisles run between the left, centre and right deckchair blocks, and between
the beanbags and the deckchairs.

## Zones and prices

| Zone | Name           | Rows x seats    | Seats | Price |
|------|----------------|-----------------|-------|-------|
| A    | Beanbags       | 3 x 10          | 30    | 9     |
| B    | Deck centre    | 8 x 14          | 112   | 14    |
| C    | Deck sides     | 8 x 5 (two)     | 80    | 11    |
| D    | Sofa lounge    | 2 x 8           | 16    | 22    |

Total: about 238 seats.

Reasoning behind the prices: beanbags are cheap because you sit low and close
to the screen; the centre deckchairs have the best view of the screen; the sides
are slightly cheaper because of the angle; the sofas cost the most because
they are the comfortable option.

## Seat naming

Seat id: zone + row letter + seat number, for example `B-D-07` means zone B,
row D, seat 7.

## Seat states

- available
- inspected (the one seat currently being looked at)
- in cart
- unavailable (already sold; a fixed set of seats marked in the data)

## Decisions still open

- exact pixel size of a seat on the map
- how many seats to mark as unavailable (aiming for around 15%)
