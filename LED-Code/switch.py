from os import system
import sys
import board
import neopixel
import time

R1 = sys.argv[1]
G1 = sys.argv[2]
B1 = sys.argv[3]
R2 = sys.argv[4]
G2 = sys.argv[5]
B2 = sys.argv[6]
print(len(sys.argv))
pixels = neopixel.NeoPixel(board.D18, 150) #initialize light strip
while True:
    pixels.fill((int(R1), int(G1), int(B1)))
    time.wait(2)
    pixels.fill((int(R2), int(G2), int(B2)))
    time.wait(2)

sys.stdout.flush()