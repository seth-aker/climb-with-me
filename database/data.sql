BEGIN TRANSACTION;

INSERT INTO climbing_styles (style_code, name) 
VALUES 
    ('s', 'Sport Climbing'),
    ('b', 'Bouldering'),
    ('t', 'Trad Climbing'),
    ('r', 'Top Rope');

INSERT INTO status_code (code_id, status_name) 
VALUES 
    ('p', 'pending'),
    ('a', 'accepted'),
    ('b', 'blocked'),
    ('u', 'unfriended'),
    ('d', 'denied');

COMMIT TRANSACTION;
