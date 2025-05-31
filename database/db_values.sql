INSERT INTO UserRoles (name)
VALUES
    ('RegisteredUser'),
    ('Admin');

INSERT INTO restaurantuserroles(id, name) VALUES (1, 'moderator'), (2, 'admin');

INSERT INTO User (name, email, password, UserRoles_id)
VALUES
    ('admin', 'admin@ad.a' , '$2a$10$EBA165BuATpd.LSb6aZhmOcvxpZnnu8C1AlCWycR8vvzy3Zr5hIK2', 2),
    ('user', 'user@us.u', '$2a$10$pFGjMOsOSFzpAoFV5ZLpn.E71m4yWwzV01748yXtUFv3QN3TDnGLu', 1);

INSERT INTO Restaurant (name, address, city, phone_number, description, short_description, image, opening_hours)
VALUES
    ('La Bella Italia', 'Via Roma 123', 'Warszawa', '+48221234567',
     '"La Bella Italia" to autentyczna włoska restauracja, położona przy urokliwej ulicy Via Roma 123 w samym sercu Warszawy. To miejsce, gdzie włoska kultura, kuchnia i atmosfera spotykają się, tworząc niezapomniane doświadczenie kulinarne.

Specjalnością restauracji są klasyczne włoskie dania przygotowywane zgodnie z tradycyjnymi recepturami, z wykorzystaniem najwyższej jakości składników, sprowadzanych prosto z Włoch. W menu znajdziesz świeżo wypiekaną pizzę na cienkim cieście, ręcznie robione makarony, aromatyczne risotto oraz wyjątkowe desery, takie jak tiramisu czy panna cotta.', 'Włoskie specjały','https://label-magazine.com/media/thumbnails/127b7dd51685d2f6a139c648d5f43dd5.webp' ,
     '{"Poniedziałek": "12:00-22:00", "Wtorek": "12:00-22:00", "Środa": "12:00-22:00", "Czwartek": "12:00-22:00", "Piątek": "12:00-22:00", "Sobota": "10:00-23:00", "Niedziela": "10:00-23:00"}'),

    ('Sushi Zen', 'Ul. Kwiatowa 45', 'Warszawa', '+48229876543',
     'Najlepsze sushi w Warszawie, świeżo przygotowywane na miejscu.', 'Świeże sushi', 'https://harmoniasmakow.pl/img/uploads/AdobeStock_82346311_min_min.jpeg',
     '{"Poniedziałek": "11:00-22:00", "Wtorek": "11:00-22:00", "Środa": "11:00-22:00", "Czwartek": "11:00-22:00", "Piątek": "11:00-22:00", "Sobota": "11:00-22:00", "Niedziela": "11:00-22:00"}'),

    ('Steak House', 'Al. Niepodległości 50', 'Warszawa', '+48221230000',
     'Miejsce dla miłośników steków i grillowanych specjałów.', 'Grill i steki', 'https://florina.pl/data/include/cms//steki_z_grilla__autor__Sakrapee_Nopparat.jpg',
     '{"Poniedziałek": "15:00-23:00", "Wtorek": "15:00-23:00", "Środa": "15:00-23:00", "Czwartek": "15:00-23:00", "Piątek": "15:00-23:00", "Sobota": "12:00-24:00", "Niedziela": "12:00-24:00"}'),

    ('Veggie Delight', 'Pl. Zielony 12', 'Warszawa', '+48225556677',
     'Zdrowe i smaczne dania wegetariańskie i wegańskie.', 'Wege kuchnia', 'https://cdn.galleries.smcloud.net/t/galleries/gf-msXy-U3aN-rofR_danie-wegetarianskie-na-obiad-1920x1080-nocrop.jpg',
     '{"Poniedziałek": "10:00-20:00", "Wtorek": "10:00-20:00", "Środa": "10:00-20:00", "Czwartek": "10:00-20:00", "Piątek": "10:00-20:00", "Sobota": "10:00-20:00", "Niedziela": "10:00-20:00"}');

INSERT INTO MenuCategory (name, restaurant_id)
VALUES
    ('Przystawki', 1), ('Dania główne', 1), ('Desery', 1),
    ('Nigiri', 2), ('Maki', 2), ('Tempura', 2),
    ('Steki', 3), ('Dodatki', 3), ('Napoje', 3),
    ('Sałatki', 4), ('Dania główne', 4), ('Desery', 4);

INSERT INTO MenuItem (name, description, price, menucategory_id)
VALUES
    -- Przystawki (menucategory_id = 1)
    ('Bruschetta', 'Chrupiąca grzanka z pomidorami i bazylią', 15.00, 1),
    ('Caprese', 'Plastry mozzarelli i pomidorów z bazylią i oliwą', 18.00, 1),
    ('Arancini', 'Chrupiące kulki ryżowe z sosem pomidorowym', 22.00, 1),
    ('Olive all’Ascolana', 'Oliwki faszerowane i smażone', 16.00, 1),
    ('Crostini', 'Małe grzanki z różnymi dodatkami', 14.00, 1),
    ('Carpaccio', 'Cienkie plastry wołowiny z rukolą i parmezanem', 25.00, 1),
    ('Suppli', 'Rzymskie kulki ryżowe z mozzarellą', 20.00, 1),

    -- Dania główne (menucategory_id = 2)
    ('Spaghetti Carbonara', 'Tradycyjny włoski makaron z kremowym sosem', 35.00, 2),
    ('Lasagna', 'Zapiekanka z makaronu, mięsa i sosu beszamelowego', 40.00, 2),
    ('Risotto ai Funghi', 'Kremowe risotto z grzybami', 38.00, 2),
    ('Pollo alla Cacciatora', 'Kurczak duszony z warzywami i winem', 42.00, 2),
    ('Saltimbocca', 'Cielęcina z szynką parmeńską i szałwią', 45.00, 2),
    ('Fettuccine Alfredo', 'Makaron z kremowym sosem serowym', 36.00, 2),
    ('Pizza Margherita', 'Klasyczna pizza z mozzarellą i bazylią', 30.00, 2),

    -- Desery (menucategory_id = 3)
    ('Tiramisu', 'Klasyczny włoski deser na bazie kawy i mascarpone', 20.00, 3),
    ('Panna Cotta', 'Delikatny deser śmietankowy z owocowym sosem', 18.00, 3),
    ('Cannoli', 'Rurki z kremowym nadzieniem z ricotty', 22.00, 3),
    ('Zabaglione', 'Deser z jajek, cukru i wina Marsala', 25.00, 3),
    ('Gelato', 'Włoskie lody w różnych smakach', 15.00, 3),
    ('Semifreddo', 'Mrożony deser kremowy', 19.00, 3),
    ('Torta Caprese', 'Czekoladowe ciasto migdałowe', 28.00, 3),


    -- Sushi Zen
    ('Nigiri z łososiem', 'Kawałek świeżego łososia na ryżu', 10.00, 4),
    ('Maki z tuńczykiem', 'Rolki sushi z tuńczykiem i ogórkiem', 25.00, 5),
    ('Krewetki w tempurze', 'Chrupiące krewetki smażone w tempurze', 30.00, 6),

    -- Steak House
    ('T-bone Steak', 'Soczysty stek T-bone', 80.00, 7),
    ('Pieczone ziemniaki', 'Ziemniaki pieczone z masłem czosnkowym', 15.00, 8),
    ('Piwo rzemieślnicze', 'Lokalne piwo o wyjątkowym smaku', 12.00, 9),

    -- Veggie Delight
    ('Sałatka grecka', 'Mieszanka świeżych warzyw z fetą', 18.00, 10),
    ('Kotlety z ciecierzycy', 'Podawane z sosem jogurtowym', 25.00, 11),
    ('Deser z chia', 'Nasiona chia w mleku kokosowym z owocami', 15.00, 12);

INSERT INTO RestaurantTable (seats, description, restaurant_id)
VALUES
    -- La Bella Italia
    (2, 'Stolik dwuosobowy przy oknie', 1),
    (4, 'Stolik dla rodziny', 1),

    -- Sushi Zen
    (2, 'Stolik na parterze', 2),
    (6, 'Stolik w prywatnym pokoju', 2),

    -- Steak House
    (4, 'Stolik blisko grilla', 3),
    (8, 'Stolik dla grupy', 3),

    -- Veggie Delight
    (2, 'Stolik z widokiem na park', 4),
    (4, 'Stolik w zaciszu', 4);



INSERT INTO reservation (reservation_start, reservation_end, created_at, customer_name, customer_email, user_id, table_id)
VALUES
    ('2025-01-12 18:00:00', '2025-01-12 20:00:00', '2025-01-10 14:35:00', 'Anna Kowalska', 'anna.kowalska@example.com', 1, 1),
    ('2025-01-13 19:00:00', '2025-01-13 21:30:00', '2025-01-11 10:20:00', 'Jan Nowak', 'jan.nowak@example.com', 2, 2),
    ('2025-01-14 12:30:00', '2025-01-14 14:00:00', '2025-01-12 16:50:00', 'Katarzyna Wiśniewska', 'katarzyna.wisniewska@example.com', 2, 1),
    ('2025-01-15 17:00:00', '2025-01-15 19:00:00', '2025-01-13 09:45:00', 'Tomasz Zieliński', 'tomasz.zielinski@example.com', 2, 2),
    ('2025-01-16 20:00:00', '2025-01-16 22:00:00', '2025-01-14 13:30:00', 'Maria Kamińska', 'maria.kaminska@example.com', 1, 1),
    ('2025-01-17 11:00:00', '2025-01-17 13:00:00', '2025-01-15 18:10:00', 'Paweł Jankowski', 'pawel.jankowski@example.com', 2, 2);

INSERT INTO restaurantuser ( user_id, restaurant_id, RestaurantUserRoles_id)
VALUES ( 1, 1, 2), (1, 2, 1);