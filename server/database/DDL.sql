-- -----------------------------------------------------
-- Disable foreign key checks to prevent constraint errors during inserts
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

-- -----------------------------------------------------
-- Drop Existing Tables if They Exist (to prevent conflicts)
-- -----------------------------------------------------
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS libraries;
DROP TABLE IF EXISTS reviews;

-- -----------------------------------------------------
-- Create Table: users
-- -----------------------------------------------------

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Stored Procedure: RegisterUser
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS RegisterUser;
DELIMITER //

CREATE PROCEDURE RegisterUser(
    IN p_username VARCHAR(50),
    IN p_email VARCHAR(100),
    IN p_password_hash VARCHAR(255)
)
BEGIN
    INSERT INTO users (username, email, password_hash)
    VALUES (p_username, p_email, p_password_hash);
END //

DELIMITER ; 

-- -----------------------------------------------------
-- Stored Procedure: GetUserInfo
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetUserInfo;
DELIMITER //

CREATE PROCEDURE GetUserInfo (IN p_username VARCHAR(50))
BEGIN
    SELECT
        users.id,
        users.email,
        users.password_hash
    FROM users
    WHERE users.username = p_username;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Create Table: movies
-- -----------------------------------------------------

CREATE TABLE movies (
    id INT PRIMARY KEY,  
    title VARCHAR(255) NOT NULL,
    poster_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Stored Procedure: AddMovie
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS AddMovie;
DELIMITER //

CREATE PROCEDURE AddMovie(
    IN p_id INT,
    IN p_title VARCHAR(255),
    IN p_poster_url VARCHAR(500)
)
BEGIN
    INSERT INTO movies (id, title, poster_url)
    VALUES (p_id, p_title, p_poster_url);
END //

DELIMITER ; 


-- -----------------------------------------------------
-- Create Table: libraries
-- -----------------------------------------------------

CREATE TABLE libraries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, movie_id), 
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Stored Procedure: AddMovieToLibrary
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS AddMovieToLibrary;
DELIMITER //

CREATE PROCEDURE AddMovieToLibrary(
    IN p_userId INT,
    IN p_movieId INT
)
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM libraries 
        WHERE user_id = p_userId AND movie_id = p_movieId
    ) THEN
        INSERT INTO libraries (user_id, movie_id)
        VALUES (p_userId, p_movieId);
    END IF;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: GetLibrary
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetLibrary;
DELIMITER //

CREATE PROCEDURE GetLibrary (IN p_id INT)
BEGIN
    SELECT 
        m.id, 
        m.title, 
        m.poster_url, 
        l.saved_at
    FROM libraries l
    JOIN movies m ON l.movie_id = m.id
    WHERE l.user_id = p_id;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Create Table: reviews
-- -----------------------------------------------------

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    review TEXT NOT NULL,
    rating INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE(user_id, movie_id),  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Stored Procedure: AddReview
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS AddReview;
DELIMITER //

CREATE PROCEDURE AddReview (
    IN in_user_id INT,
    IN in_movie_id INT,
    IN in_rating INT,
    IN in_review TEXT
)
BEGIN
    INSERT INTO reviews (user_id, movie_id, rating, review)
    VALUES (in_user_id, in_movie_id, in_rating, in_review);
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: GetReview
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS GetReview;
DELIMITER //

CREATE PROCEDURE GetReview (
    IN in_user_id INT,
    IN in_movie_id INT
)
BEGIN
    SELECT rating, review, created_at
    FROM reviews
    WHERE user_id = in_user_id AND movie_id = in_movie_id;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: UpdateReview
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS UpdateReview;
DELIMITER //

CREATE PROCEDURE UpdateReview (
    IN in_user_id INT,
    IN in_movie_id INT,
    IN in_rating INT,
    IN in_review TEXT
)
BEGIN
    UPDATE reviews
    SET
        rating = in_rating,
        review = in_review,
        updated_at = CURRENT_TIMESTAMP
    WHERE user_id = in_user_id AND movie_id = in_movie_id;
END //

DELIMITER ;

-- -----------------------------------------------------
-- Stored Procedure: DeleteReview
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS DeleteReview;
DELIMITER //

CREATE PROCEDURE DeleteReview (
    IN in_user_id INT,
    IN in_movie_id INT
)
BEGIN
    -- Delete from review table
    DELETE FROM reviews
    WHERE user_id = in_user_id AND movie_id = in_movie_id;

    -- Delete from library table
    DELETE FROM libraries
    WHERE user_id = in_user_id AND movie_id = in_movie_id;
END //

DELIMITER ;


-- -----------------------------------------------------
-- Re-enable foreign key checks and commit changes
-- -----------------------------------------------------
SET FOREIGN_KEY_CHECKS=1;
COMMIT;