import subprocess

# Запуск команды в параллельном процессе
process = subprocess.Popen(
    ["cmd"],  # Можно заменить на свою команду
    stdin=subprocess.PIPE,  # Передача данных через stdin
    stdout=subprocess.PIPE,  # Получение вывода через stdout
    stderr=subprocess.PIPE,  # Получение ошибок через stderr
    text=True  # Передача текста вместо байтов
)

# Передача данных в процесс через stdin
process.stdin.write('.\XACK.exe video face 25 v1.mp4')
process.stdin.close()

# Основная программа продолжает выполняться
print("22")  # Этот код выполняется до завершения процесса

# Ожидание завершения процесса и получение вывода
stdout, stderr = process.communicate()

# Вывод результата процесса
print("Output from process:")
print(stdout)
if stderr:
    print("Errors:")
    print(stderr)

