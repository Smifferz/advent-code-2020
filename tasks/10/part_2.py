def getReference(input, adapter, reference):
    currentJolts = 0
    jumps = [currentJolts]
    for i in range(len(input)):
        if input[i] < currentJolts + 4:
            currentJolts = input[i]
            jumps.append(input[i])
        else:
            print("Error current jolts is " + str(currentJolts) +
                  " and next is " + str(lines[i]))
    for key, value in reference.items():
        if jumps == value:
            for i in range(len(input) - 1):
                

            return None
    jumps.append(currentJolts + adapter)
    return jumps


file_path = 'example.txt'
initialJolts = 0
adapter = 3

lines = []
with open(file_path) as f:
    lines = [int(x) for x in f]

lines.sort()

maxArrangements = len(lines) - (len(lines) / 3)
reference = {}
for i in range(maxArrangements):
    referenceJumps = getReference(lines, adapter, reference)
    if referenceJumps == None:
        print("***ERROR***: Matched reference")
        break
    reference[i] = referenceJumps
    print(reference[i])
