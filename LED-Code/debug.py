import time
offset = 0
pixelCount = 5
output = 0
while True:
    for i in range(pixelCount):
        if(offset>pixelCount):
            offset = 0
        if(offset+i<pixelCount):
            output = i +offset 
        else:
            output =pixelCount-( i+offset)
        print(abs(output))
    offset +=1
    print("-------------------------------------")
    time.sleep(.5)
