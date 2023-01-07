import sys
import board
import neopixel

R = sys.argv[1]
G = sys.argv[2]
B = sys.argv[3]
print(len(sys.argv))
print(R,G,B)
pixels = neopixel.NeoPixel(board.D18, 150) #initialize light strip

pixels.fill((R, G, B))

sys.stdout.flush()