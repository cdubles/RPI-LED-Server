import sys
import board
import neopixel
import time
pixels = neopixel.NeoPixel(board.D18, 150) 
pixelCount  = 150
offset = 0
RED = (255,0,0)
BLUE = (0,0,255)
while True:
    for i in range(10):
        if i % 2 == 0:
            pixels[i] = RED
        else:
            pixels[i] = BLUE