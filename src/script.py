def remove_capital_words(input_file, output_file):
    with open(input_file, 'r') as infile:
        words = infile.readlines()

    # Filter out words that start with a capital letter
    filtered_words = [word for word in words if not word.strip().startswith(tuple('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))]

    with open(output_file, 'w') as outfile:
        outfile.writelines(filtered_words)

# Usage example
input_file = 'public/validWords2.txt'
output_file = 'public/validWords3.txt'
remove_capital_words(input_file, output_file)
