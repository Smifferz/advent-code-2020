
file_path = 'input.txt'
initialJolts = 0
adapter = 3

lines = []
with open(file_path) as f:
    lines = [int(x) for x in f]

lines.sort()

currentJolts = initialJolts

differences = {}

for i in range(len(lines)):
    print(lines[i])
    if lines[i] < currentJolts + 4:
        joltDiff = lines[i] - currentJolts
        if joltDiff in differences:
            differences[joltDiff] = differences[joltDiff] + 1
        else:
            differences[joltDiff] = 1
        print(differences)
        currentJolts = lines[i]
    else:
        print("Error current jolts is " + str(currentJolts) +
              " and next is " + str(lines[i]))

maxJoltage = currentJolts + adapter
differences[3] = differences[3] + 1
print("Max joltage = " + str(maxJoltage))
print(differences)

multiplied = differences[1] * differences[3]
print("Multiplied result = " + str(multiplied))