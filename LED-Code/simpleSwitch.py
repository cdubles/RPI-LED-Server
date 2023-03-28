import sys
import board
import neopixel
import time
pixels = neopixel.NeoPixel(board.D18, 150) 
pixelCount  = 150
offset = 0
RED = (255,0,0)
BLUE = (0,0,255)
inc = 0
while True:
    for i in range(pixelCount):
        if (i+inc) % 2 == 0:
            pixels[i] = RED
        else:
            pixels[i] = BLUE
    inc+=1