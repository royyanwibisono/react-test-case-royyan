def detect_strings(input_arr, query_arr):
    output = []
    msg = []
    for q in query_arr:
        count = 0
        for string in input_arr:
            if q == string:
                count += 1

        if count == 0:
            msg.append(f"kata {q} tidak ada pada INPUT")
        else:
            msg.append(f"kata {q} terdapat {count} pada INPUT")

        output.append(count)
    return (output, msg)


input = ['xc', 'dz', 'bbb', 'dz']
print(f"INPUT: {input}")

query = ['bbb', 'ac', 'dz']
print(f"QUERY: {query}")

output, message = detect_strings(input, query)
print(f"result: {output}")
print(f"message: {', '.join(message)}")