import time
from os import system
import sys

process = sys.argv[1]

for i in range(0,10):
    print(f'PROCESS: {process}')
    sys.stdout.flush()
    time.sleep(1)
