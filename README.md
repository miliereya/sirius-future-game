# npm run dev

useState баг в компоненте <Game />
Прокидываемый itemSuccessHandler берет массив из стейта itemsPlaced, разворачивает его через спред-оператор, докидывает name и сетит setItemsPlaced.
Однако вместо того, чтобы брать обновленный стейт itemsPlaced, он берет пустой массив (initial state). Вопрос: Почему?!. Я не знаю. Потратив 6 часов я так и не смог решить этот вопрос. 
Все остальное отлично работает. Если код ревьюер сможет починить этот странный баг - увидит готовое приложение 0_o

# P.S.
Не удивлюсь, если проблема в самом next js. 
Подключать ради такого mobX или Redux у меня желания нет
