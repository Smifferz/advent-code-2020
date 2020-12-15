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

def getArrangements(index, reference, explored):
    if index == len(reference) - 1:
        return 1
    if index in explored:
        return explored[index]

    arrangements = 0
    for i in range(index + 1, len(reference)):
        if reference[i] - reference[index] <= 3:
            arrangements = arrangements + getArrangements(i, reference, explored)

    explored[index] = arrangements

    return arrangements
    

file_path = 'input.txt'
initialJolts = 0
adapter = 3

lines = []
with open(file_path) as f:
    lines = [int(x) for x in f]

lines.sort()

reference = getReference(lines, adapter)
stringReference = ' '.join(str(elem) for elem in reference)
arrangements = {}

finalArrangements = getArrangements(0, reference, arrangements)
print(finalArrangements)
