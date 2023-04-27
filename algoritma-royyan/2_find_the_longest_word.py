def find_longest_word(sentence):
    words = sentence.split()
    longest_word = ''
    for word in words:
        if len(word) > len(longest_word):
            longest_word = word
    print(f"Kata terpanjang adalah '{longest_word}' dengan {len(longest_word)} character")

sentence = "Saya sangat senang mengerjakan soal algoritma"

print(f"input: {sentence}")
find_longest_word(sentence)