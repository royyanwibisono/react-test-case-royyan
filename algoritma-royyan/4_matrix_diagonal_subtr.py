def diagonal_sum(matrix):
    msg = ['diagonal pertama = ','diagonal kedua = ']
    # checker
    n = len(matrix)
    for m in matrix:
        if len(m) != n:
            raise ValueError('Input matrix must be a square matrix')

    sum1 = 0
    sum2 = 0
    for i in range(len(matrix)):
        sum1 += matrix[i][i]
        msg[0] += str(matrix[i][i]) 

        sum2 += matrix[i][len(matrix)-i-1]
        msg[1] += str(matrix[i][len(matrix)-i-1])

        if i == len(matrix)-1:
            msg[0]+= " = " + str(sum1)
            msg[1]+= " = " + str(sum2)
        else:
            msg[0]+= " + "
            msg[1]+= " + "

    msg.append(f"maka hasilnya adalah {sum1} - {sum2} = {sum1 - sum2}")
    return sum1 - sum2, msg

input_matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]]
print(f"input square matrix: {input_matrix}")

result, message = diagonal_sum(input_matrix)
print(f"result diagonal subtraction: {result}")
print(f"message: {', '.join(message)}")
