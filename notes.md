In the rotate method of IPiece, there is a redundant line of code after
the switch that made the square green again, even though it's already been
made green in the switch lines. Without it, there is a white space when
you quickly press the up button again and again. Maybe you can use this
redundancy in other methods to avoid 'white flashes'.


jsperf.com -- JS performance benchmarks -- looping
FOR is faster than FOREACH , maybe use that to avoid 'flashes'


ANIMATE -- apparently is 'faster' than SETINTERVAL


generate piece above row 0
in checkStop, if every piecePo is above row -2, end game;
