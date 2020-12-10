def isNumberValid(inputList, index):
    i = 0
    while i < preamble:
        i += 1
        for j in range(preamble):
            if i == (i + j):
                continue
            result = inputList[index - i] + inputList[index - (i + j)]
            if result == inputList[index]:
                return True
    return False

def getEncryptionWeakness(inputList, invalid):
    contiguousList = []
    for i in range(len(inputList)):
        j = i
        contiguousList.clear()
        contiguousSum = inputList[i]
        contiguousList.append(inputList[i])
        while(contiguousSum < invalid):
            j += 1
            contiguousSum += inputList[j]
            contiguousList.append(inputList[j])
        if contiguousSum == invalid:
            break
    contiguousList.sort()
    encyptionWeakness = contiguousList[0] + contiguousList[-1]
    return encyptionWeakness

file_path = 'input.txt'
preamble = 25

lines = []
with open(file_path) as f:
    lines = [int(x) for x in f]

invalidNumber = 0
for i in range(len(lines)):
    if i >= preamble:
        valid = isNumberValid(lines, i)
        if valid == False:
            print("Number {} is not valid".format(lines[i]))
            invalidNumber = lines[i]
            break

encyptionWeakness = getEncryptionWeakness(lines, invalidNumber)
print("Encryption weakness is {}".format(encyptionWeakness))