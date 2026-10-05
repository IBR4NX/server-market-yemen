-- =========================================================
-- SEED DATA
-- IBOVS PRICE PLATFORM
-- =========================================================

-- =========================================================
-- 1. CATEGORIES
-- =========================================================

INSERT INTO categories (name, description)
VALUES
    ('مواد غذائية', 'السلع والمواد الغذائية الأساسية'),
    ('مواد البناء', 'مواد البناء والتشييد'),
    ('الوقود', 'المحروقات ومشتقات النفط'),
    ('إلكترونيات', 'الأجهزة والمنتجات الإلكترونية')
ON CONFLICT (name) DO NOTHING;


-- =========================================================
-- 2. CITIES
-- =========================================================

INSERT INTO cities (name)
VALUES
    ('صنعاء'),
    ('تعز'),
    ('عدن'),
    ('إب'),
    ('الحديدة'),
    ('حضرموت')
ON CONFLICT (name) DO NOTHING;


-- =========================================================
-- 3. USERS
-- =========================================================
-- كلمات المرور هنا تجريبية فقط.
-- في التطبيق الحقيقي يجب تخزين Password Hash وليس النص الأصلي.

INSERT INTO users (
    name,
    email,
    password,
    role
)
VALUES
    (
        'Ibrahim',
        'ibrahim@example.com',
        '$2b$12$example_user_hash',
        'USER'
    ),
    (
        'Ahmed Employee',
        'employee@example.com',
        '$2b$12$example_employee_hash',
        'EMPLOYEE'
    ),
    (
        'System Admin',
        'admin@example.com',
        '$2b$12$example_admin_hash',
        'ADMIN'
    )
ON CONFLICT (email) DO NOTHING;


-- =========================================================
-- 4. PRODUCTS
-- =========================================================

INSERT INTO products (
    category_id,
    name,
    description,
    quantity,
    unit
)
SELECT
    c.id,
    p.name,
    p.description,
    p.quantity,
    p.unit
FROM categories c
JOIN (
    VALUES
        ('مواد غذائية', 'أرز بسمتي', 'أرز بسمتي', 10.000, 'كجم'),
        ('مواد غذائية', 'دقيق', 'دقيق أبيض', 50.000, 'كجم'),
        ('مواد غذائية', 'سكر', 'سكر أبيض', 50.000, 'كجم'),
        ('مواد غذائية', 'زيت طبخ', 'زيت نباتي', 1.000, 'لتر'),

        ('مواد البناء', 'إسمنت', 'كيس إسمنت', 50.000, 'كجم'),
        ('مواد البناء', 'حديد تسليح', 'حديد تسليح', 1.000, 'طن'),

        ('الوقود', 'بنزين', 'بنزين', 1.000, 'لتر'),
        ('الوقود', 'ديزل', 'ديزل', 1.000, 'لتر'),

        ('إلكترونيات', 'هاتف Samsung Galaxy A55', 'هاتف ذكي', 1.000, 'قطعة'),
        ('إلكترونيات', 'لابتوب Lenovo IdeaPad', 'حاسوب محمول', 1.000, 'قطعة')
) AS p(category_name, name, description, quantity, unit)
ON c.name = p.category_name
ON CONFLICT (category_id, name, quantity, unit) DO NOTHING;


-- =========================================================
-- 5. CURRENT PRICES
-- =========================================================

INSERT INTO current_prices (
    product_id,
    city_id,
    price,
    updated_by
)
SELECT
    p.id,
    c.id,
    x.price,
    u.id
FROM (
    VALUES
        ('أرز بسمتي', 'صنعاء', 12500.00),
        ('دقيق', 'صنعاء', 18000.00),
        ('سكر', 'صنعاء', 31000.00),
        ('زيت طبخ', 'صنعاء', 7500.00),

        ('إسمنت', 'صنعاء', 8500.00),
        ('حديد تسليح', 'صنعاء', 620000.00),

        ('بنزين', 'صنعاء', 1500.00),
        ('ديزل', 'صنعاء', 1600.00),

        ('أرز بسمتي', 'تعز', 13000.00),
        ('دقيق', 'تعز', 18500.00),
        ('سكر', 'تعز', 32000.00),

        ('أرز بسمتي', 'عدن', 13500.00),
        ('دقيق', 'عدن', 19000.00),
        ('سكر', 'عدن', 32500.00)
) AS x(product_name, city_name, price)
JOIN products p
    ON p.name = x.product_name
JOIN cities c
    ON c.name = x.city_name
JOIN users u
    ON u.email = 'admin@example.com'
ON CONFLICT (product_id, city_id)
DO UPDATE SET
    price = EXCLUDED.price,
    updated_at = CURRENT_TIMESTAMP,
    updated_by = EXCLUDED.updated_by;


-- =========================================================
-- 6. PRICE HISTORY
-- =========================================================

INSERT INTO price_history (
    product_id,
    city_id,
    price,
    approved_by,
    created_at
)
SELECT
    p.id,
    c.id,
    x.price,
    u.id,
    x.created_at::timestamptz
FROM (
    VALUES
        ('أرز بسمتي', 'صنعاء', 11000.00, '2026-09-01 10:00:00+03'),
        ('أرز بسمتي', 'صنعاء', 11500.00, '2026-09-15 10:00:00+03'),
        ('أرز بسمتي', 'صنعاء', 12000.00, '2026-09-25 10:00:00+03'),

        ('دقيق', 'صنعاء', 17000.00, '2026-09-01 10:00:00+03'),
        ('دقيق', 'صنعاء', 17500.00, '2026-09-15 10:00:00+03'),

        ('سكر', 'صنعاء', 30000.00, '2026-09-01 10:00:00+03'),
        ('سكر', 'صنعاء', 30500.00, '2026-09-20 10:00:00+03')
) AS x(product_name, city_name, price, created_at)
JOIN products p
    ON p.name = x.product_name
JOIN cities c
    ON c.name = x.city_name
JOIN users u
    ON u.email = 'admin@example.com';


-- =========================================================
-- 7. SAMPLE PRICE SUBMISSIONS
-- =========================================================

INSERT INTO price_submissions (
    product_id,
    city_id,
    user_id,
    price,
    note,
    status
)
SELECT
    p.id,
    c.id,
    u.id,
    x.price,
    x.note,
    x.status::submission_status
FROM (
    VALUES
        (
            'أرز بسمتي',
            'صنعاء',
            'ibrahim@example.com',
            12700.00,
            'السعر من السوق اليوم',
            'PENDING'
        ),
        (
            'دقيق',
            'تعز',
            'ibrahim@example.com',
            18800.00,
            'تم التحقق من السعر في السوق',
            'PENDING'
        ),
        (
            'سكر',
            'صنعاء',
            'ibrahim@example.com',
            31500.00,
            'سعر جديد',
            'PENDING'
        )
) AS x(product_name, city_name, user_email, price, note, status)
JOIN products p
    ON p.name = x.product_name
JOIN cities c
    ON c.name = x.city_name
JOIN users u
    ON u.email = x.user_email;