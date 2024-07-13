# Define the input and output file names
input_file = "public/validWords.txt"
output_file = 'public/validWords2.txt'

def is_valid_word(word):
    return len(word) >= 4 and word.isalpha()

# Open the input file and read its contents
with open(input_file, 'r') as file:
    lines = file.readlines()

# Filter out invalid words
filtered_lines = [line for line in lines if is_valid_word(line.strip())]

# Write the filtered words to the output file
with open(output_file, 'w') as file:
    file.writelines(line for line in filtered_lines)

print(f"Filtered words saved to {output_file}")
