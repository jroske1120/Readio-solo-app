CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "is_teacher" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "user_book" (
 "user_id" INT REFERENCES "user" ON DELETE CASCADE,
 "book_id" SERIAL PRIMARY KEY,
 "book_title" VARCHAR,
 "book_authors" VARCHAR,
 "book_image" VARCHAR,
 "book_description" VARCHAR,
 "book_text" VARCHAR,
 "question_1" VARCHAR,
 "question_2" VARCHAR,
 "question_3" VARCHAR,
 "question_4" VARCHAR,
 "quiz_score" INT,
 "quiz_feedback" VARCHAR,
 "finish_book" BOOLEAN DEFAULT FALSE,
 "finish_quiz" BOOLEAN DEFAULT FALSE,
 "student_rating" INT
);