def reverse_alpha_chars(input_string):
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    alphabet += alphabet.lower()

    chars = list(input_string)
    alpha_indices = [i for i, char in enumerate(chars) if (char in alphabet)]
    alpha_chars = []
    for i in range(len(chars)-1, -1, -1):
        if chars[i] in alphabet:
            alpha_chars.append(chars[i])
    for i, index in enumerate(alpha_indices):
        chars[index] = alpha_chars[i]

    return_string = ''.join(chars)
    return return_string

input_string = "NEGIE1"
print('input: ' + input_string)

output_string = reverse_alpha_chars(input_string)
print('output: ' + output_string) # EIGEN1

input_string = "nayyoR2"
print('input: ' + input_string)

output_string = reverse_alpha_chars(input_string)
print('output: ' + output_string) 
