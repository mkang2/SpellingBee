import requests
from bs4 import BeautifulSoup

def is_word_valid(word):
    url = 'https://scrabble.merriam.com/finder'
    data = {
        'ent': word,
        'dict': 'all',
        'mode': 'search'
    }
    
    response = requests.post(url, data=data)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find the result section that indicates whether the word is valid
    result = soup.find('div', {'class': 'entry'})
    if result:
        return True
    return False

def filter_words(input_file, output_file):
    with open(input_file, 'r') as file:
        words = file.readlines()
    
    valid_words = [word.strip() for word in words if is_word_valid(word.strip())]
    
    with open(output_file, 'w') as file:
        for word in valid_words:
            file.write(word + '\n')
