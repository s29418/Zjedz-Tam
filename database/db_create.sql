CREATE SCHEMA zjedz_tam;

USE zjedz_tam;

-- Tabela: Restaurant
CREATE TABLE Restaurant (
    restaurant_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NULL,
    description TEXT NULL,
    short_description TEXT NULL,
    image VARCHAR(500) NULL,
    opening_hours JSON NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT Restaurant_pk PRIMARY KEY (restaurant_id)
);

-- Tabela: MenuCategory
CREATE TABLE MenuCategory (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    restaurant_id INT NOT NULL,
    CONSTRAINT MenuCategory_pk PRIMARY KEY (id),
    CONSTRAINT MenuCategory_Restaurant FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (restaurant_id) ON DELETE CASCADE
);

-- Tabela: MenuItem
CREATE TABLE MenuItem (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    menucategory_id INT NOT NULL,
    CONSTRAINT MenuItem_pk PRIMARY KEY (id),
    CONSTRAINT MenuItem_MenuCategory FOREIGN KEY (menucategory_id)
        REFERENCES MenuCategory (id) ON DELETE CASCADE
);

-- Tabela: UserRoles
CREATE TABLE UserRoles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    CONSTRAINT UserRoles_pk PRIMARY KEY (id)
);

-- Tabela: RestaurantUserRoles
CREATE TABLE RestaurantUserRoles (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    CONSTRAINT RestaurantUserRoles_pk PRIMARY KEY (id)
);

-- Tabela: User
CREATE TABLE User (
    user_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UserRoles_id INT,
    CONSTRAINT User_pk PRIMARY KEY (user_id),
    CONSTRAINT User_UserRoles FOREIGN KEY (UserRoles_id)
        REFERENCES UserRoles (id) ON DELETE SET NULL
);

-- Tabela: RestaurantUser
CREATE TABLE RestaurantUser (
    restaurant_user_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    restaurant_id INT NOT NULL,
    RestaurantUserRoles_id INT NOT NULL,
    CONSTRAINT RestaurantUser_pk PRIMARY KEY (restaurant_user_id),
    CONSTRAINT RestaurantUser_Restaurant FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (restaurant_id) ON DELETE CASCADE,
    CONSTRAINT RestaurantUser_RestaurantUserRoles FOREIGN KEY (RestaurantUserRoles_id)
        REFERENCES RestaurantUserRoles (id) ON DELETE CASCADE,
    CONSTRAINT RestaurantUser_User FOREIGN KEY (user_id)
        REFERENCES User (user_id) ON DELETE SET NULL
);

-- Tabela: RestaurantTable
CREATE TABLE RestaurantTable (
    table_id INT NOT NULL AUTO_INCREMENT,
    seats INT NOT NULL,
    description VARCHAR(500) NULL,
    restaurant_id INT NOT NULL,
    CONSTRAINT RestaurantTable_pk PRIMARY KEY (table_id),
    CONSTRAINT Table_Restaurant FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (restaurant_id) ON DELETE CASCADE
);

-- Tabela: Reservation
CREATE TABLE Reservation (
    reservation_id INT NOT NULL AUTO_INCREMENT,
    reservation_start DATETIME NOT NULL,
    reservation_end DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    customer_name VARCHAR(50) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    user_id INT,
    table_id INT NOT NULL,
    CONSTRAINT Reservation_pk PRIMARY KEY (reservation_id),
    CONSTRAINT Reservation_Table FOREIGN KEY (table_id)
        REFERENCES RestaurantTable (table_id) ON DELETE CASCADE,
    CONSTRAINT Reservation_User FOREIGN KEY (user_id)
        REFERENCES User (user_id) ON DELETE SET NULL
);

-- Tabela: Review
CREATE TABLE Review (
    review_id INT NOT NULL AUTO_INCREMENT,
    rating INT NOT NULL,
    comment TEXT NULL,
    user_id INT ,
    restaurant_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT Review_pk PRIMARY KEY (review_id),
    CONSTRAINT Review_Restaurant FOREIGN KEY (restaurant_id)
        REFERENCES Restaurant (restaurant_id) ON DELETE CASCADE,
    CONSTRAINT Review_User FOREIGN KEY (user_id)
        REFERENCES User (user_id) ON DELETE SET NULL
);


