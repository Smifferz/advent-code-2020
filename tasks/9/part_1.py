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

file_path = 'input.txt'
preamble = 25

lines = []
with open(file_path) as f:
    lines = [int(x) for x in f]

for i in range(len(lines)):
    if i >= preamble:
        valid = isNumberValid(lines, i)

        if valid == False:
            print("Number {} is not valid".format(lines[i]))