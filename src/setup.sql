CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES (
        'BrightFuture Builders',
        'A nonprofit focused on improving community infrastructure through sustainable construction projects.',
        'info@brightfuturebuilders.org',
        'brightfuture-logo.png'
    ),
    (
        'GreenHarvest Growers',
        'An urban farming collective promoting food sustainability and education in local neighborhoods.',
        'contact@greenharvest.org',
        'greenharvest-logo.png'
    ),
    (
        'UnityServe Volunteers',
        ' A volunteer coordination group supporting local charities and service initiatives.',
        'hello@unityserve.org',
        'unityserve-logo.png'
    );

CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(50) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(1, 'Community Playground Renovation',
 'Renovating an aging neighborhood playground with new equipment and safer surfaces.',
 'South Weber', '2025-04-12'),

(1, 'Accessible Ramp Installation',
 'Building wheelchair-accessible ramps for community buildings lacking proper access.',
 'Ogden', '2025-05-03'),

(1, 'River Trail Bridge Repair',
 'Repairing damaged footbridges along the local river trail system.',
 'Riverdale', '2025-06-18'),

(1, 'Emergency Home Repairs Day',
 'Providing essential home repairs for low-income families in the community.',
 'Layton', '2025-07-09'),

(1, 'Community Garden Shed Build',
 'Constructing storage sheds for tools and supplies at community garden sites.',
 'Clearfield', '2025-08-22');


INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(2, 'Urban Garden Expansion',
 'Adding new raised beds and irrigation lines to expand the downtown urban garden.',
 'Ogden', '2025-04-20');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
 (2, 'Youth Agriculture Workshop',
 'Teaching kids sustainable growing techniques and hands-on planting activities.',
 'South Weber', '2025-05-11');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(2, 'Neighborhood Composting Initiative',
 'Launching a compost drop-off program to reduce food waste and enrich soil.',
 'Kaysville', '2025-06-07');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
 (2, 'Fruit Tree Planting Day',
 'Planting fruit trees in public parks to support long-term food sustainability.',
 'Farmington', '2025-07-15');

 INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(2, 'Greenhouse Maintenance Project',
 'Cleaning, repairing, and reorganizing the community greenhouse facilities.',
 'Layton', '2025-08-30');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(3, 'Food Pantry Restock Event',
 'Sorting, packing, and distributing food donations for families in need.',
 'Ogden', '2025-04-05');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(3, 'Senior Center Tech Help Day',
 'Helping seniors learn basic smartphone and computer skills.',
 'South Weber', '2025-05-19');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(3, 'Community Park Cleanup',
 'Removing trash, trimming overgrowth, and refreshing paint at local parks.',
 'Riverdale', '2025-06-14');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(3, 'Back-to-School Supply Drive',
 'Collecting and distributing school supplies to students in underserved areas.',
 'Clearfield', '2025-07-28');

INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
(3, 'Warm Winter Clothing Giveaway',
 'Organizing and distributing coats, gloves, and blankets before winter.',
 'Layton', '2025-09-10');

-- ============================
-- CATEGORY TABLE
-- ============================
CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- ============================
-- PROJECT_CATEGORY JOIN TABLE
-- ============================
CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_project(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(category_id) ON DELETE CASCADE
);

INSERT INTO category (name) VALUES
('Environmental'),
('Community Support'),
('Education');

-- Environmental
INSERT INTO project_category VALUES (1, 1); -- Urban Garden Expansion
INSERT INTO project_category VALUES (3, 1); -- Neighborhood Composting Initiative
INSERT INTO project_category VALUES (4, 1); -- Fruit Tree Planting Day
INSERT INTO project_category VALUES (5, 1); -- Greenhouse Maintenance Project

-- Education
INSERT INTO project_category VALUES (2, 3); -- Youth Agriculture Workshop


INSERT INTO project_category VALUES 
-- Community Support
	(6, 2), -- Food Pantry Restock
	(9, 2), -- Back-to-School Supply Drive
	(10, 2); -- Warm Winter Clothing Giveaway
	
-- Education
INSERT INTO project_category VALUES
	(7, 3); -- Senior Center Tech Help Day

-- Environmental
INSERT INTO project_category VALUES
	(8, 1); -- Community Park Cleanup

