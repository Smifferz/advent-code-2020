def getReference(input, adapter):
    currentJolts = 0
    jumps = [currentJolts]
    for i in range(len(input)):
        if input[i] < currentJolts + 4:
            currentJolts = input[i]
            jumps.append(input[i])
        else:
            print("Error current jolts is " + str(currentJolts) +
                  " and next is " + str(lines[i]))
            return False
    jumps.append(currentJolts + adapter)
    return jumps

def getArrangements(reference, rotationIndex, arrangements):
    newArrangements = {}
    for i in range(rotationIndex, len(reference) - 2):
        recurArrangements = {}
        if reference[i + 2] - reference[i] <= 3:
            tmp = [reference[i]]
            arrangement = reference[:i] + tmp + reference[i + 2:]
            print(arrangement)
            exists = 0
            for key, value in arrangements.items():
                if value == arrangement:
                    exists = 1
                    return False
            if exists == 0:
                recurArrangements = getArrangements(arrangement, i, arrangements)
                # print(recurArrangements)
                if recurArrangements != False:
                    newArrangements = {**newArrangements, **recurArrangements}
     
    return  newArrangements

file_path = 'example.txt'
initialJolts = 0
adapter = 3

lines = []
with open(file_path) as f:
    lines = [int(x) for x in f]

lines.sort()

reference = getReference(lines, adapter)
arrangements = {}
arrangements[0] = reference
for i in range(len(reference)):
    newArrangements = getArrangements(reference, i, arrangements)
    arrangements = {**arrangements, **newArrangements}
    print(arrangements)
print(reference)