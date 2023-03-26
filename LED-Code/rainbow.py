import sys
import board
import neopixel
import time
pixels = neopixel.NeoPixel(board.D18, 150) 
pixelCount  = 150
def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        return (0, 0, 0)
    if pos < 85:
        return (255 - pos * 3, pos * 3, 0)
    if pos < 170:
        pos -= 85
        return (0, 255 - pos * 3, pos * 3)
    pos -= 170
    return (pos * 3, 0, 255 - pos * 3)
while True:
    for j in range(255):
            for i in range(pixelCount):
                rc_index = (i * 256 // pixelCount) + j
                pixels[i] = wheel(rc_index & 255)
                print(f"{wheel(rc_index & 255)}: {i}")
            time.sleep(.1)