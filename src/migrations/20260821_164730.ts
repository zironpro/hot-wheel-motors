import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`cars_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`feature\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cars_features_order_idx\` ON \`cars_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cars_features_parent_id_idx\` ON \`cars_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`cars_images\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`cars\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`cars_images_order_idx\` ON \`cars_images\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`cars_images_parent_id_idx\` ON \`cars_images\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`cars_images_image_idx\` ON \`cars_images\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`cars\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`make\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`model\` text NOT NULL,
  	\`year\` numeric NOT NULL,
  	\`vin\` text,
  	\`currency\` text DEFAULT 'AED' NOT NULL,
  	\`price\` numeric NOT NULL,
  	\`engine\` text NOT NULL,
  	\`km_driven\` text NOT NULL,
  	\`color\` text NOT NULL,
  	\`available\` integer DEFAULT true,
  	\`is_featured\` integer DEFAULT false,
  	\`description\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`cars_slug_idx\` ON \`cars\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`cars_updated_at_idx\` ON \`cars\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`cars_created_at_idx\` ON \`cars\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`brands\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`brands_logo_idx\` ON \`brands\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`brands_updated_at_idx\` ON \`brands\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`brands_created_at_idx\` ON \`brands\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`reviews\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`role\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`rating\` numeric DEFAULT 5 NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`reviews_updated_at_idx\` ON \`reviews\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`reviews_created_at_idx\` ON \`reviews\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`cars_id\` integer,
  	\`media_id\` integer,
  	\`brands_id\` integer,
  	\`reviews_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`cars_id\`) REFERENCES \`cars\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`brands_id\`) REFERENCES \`brands\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`reviews_id\`) REFERENCES \`reviews\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_cars_id_idx\` ON \`payload_locked_documents_rels\` (\`cars_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_brands_id_idx\` ON \`payload_locked_documents_rels\` (\`brands_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_reviews_id_idx\` ON \`payload_locked_documents_rels\` (\`reviews_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`about_page_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_features_order_idx\` ON \`about_page_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_features_parent_id_idx\` ON \`about_page_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page_why_choose_us_cards\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_why_choose_us_cards_order_idx\` ON \`about_page_why_choose_us_cards\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_page_why_choose_us_cards_parent_id_idx\` ON \`about_page_why_choose_us_cards\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_why_choose_us_cards_image_idx\` ON \`about_page_why_choose_us_cards\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text DEFAULT 'Driven by Passion.
  Defined by Trust.' NOT NULL,
  	\`hero_subheading\` text DEFAULT 'Hot Wheels Motors is a luxury automotive boutique in Dubai, curating and delivering exceptional pre-owned vehicles to discerning clients worldwide.' NOT NULL,
  	\`hero_background_image_desktop_id\` integer,
  	\`hero_background_image_mobile_id\` integer,
  	\`story_heading\` text DEFAULT 'Our Journey' NOT NULL,
  	\`story_paragraph1\` text DEFAULT 'Founded with a clear vision, Hot Wheel Used Motors Trading LLC has become a trusted destination for exceptional pre-owned vehicles. We believe every purchase should feel transparent, seamless and rewarding.' NOT NULL,
  	\`story_paragraph2\` text DEFAULT 'Our curated collection brings together refined everyday luxury and rare performance models. Each vehicle is carefully selected to connect discerning drivers with the perfect car.' NOT NULL,
  	\`story_image_id\` integer,
  	\`why_choose_us_heading\` text DEFAULT 'Excellence in Every Detail.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_background_image_desktop_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_background_image_mobile_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`story_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page_hero_hero_background_image_desktop_idx\` ON \`about_page\` (\`hero_background_image_desktop_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_hero_hero_background_image_mobile_idx\` ON \`about_page\` (\`hero_background_image_mobile_id\`);`)
  await db.run(sql`CREATE INDEX \`about_page_story_story_image_idx\` ON \`about_page\` (\`story_image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_page_services_list_services\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`image_id\` integer,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`services_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`services_page_services_list_services_order_idx\` ON \`services_page_services_list_services\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`services_page_services_list_services_parent_id_idx\` ON \`services_page_services_list_services\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`services_page_services_list_services_image_idx\` ON \`services_page_services_list_services\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`services_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_heading\` text DEFAULT 'Premium Services' NOT NULL,
  	\`hero_subheading\` text DEFAULT 'From worldwide shipping to tailored financing, we make your luxury car purchase effortless.' NOT NULL,
  	\`hero_background_image_id\` integer,
  	\`services_list_heading\` text DEFAULT 'What We Offer' NOT NULL,
  	\`services_list_subheading\` text DEFAULT 'Thoughtfully designed services supporting every stage of your luxury car journey.' NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_page_hero_hero_background_image_idx\` ON \`services_page\` (\`hero_background_image_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_opening_hours\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`days\` text NOT NULL,
  	\`hours\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_opening_hours_order_idx\` ON \`site_settings_opening_hours\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_opening_hours_parent_id_idx\` ON \`site_settings_opening_hours\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer,
  	\`phone_number\` text DEFAULT '+971 55 578 1902',
  	\`email\` text DEFAULT 'sales@hotwheelmotors.com',
  	\`address\` text DEFAULT '123 Luxury Car Showroom
  Sheikh Zayed Road
  Dubai, UAE',
  	\`opening_hours_note\` text DEFAULT '* Viewings can be arranged outside these hours by appointment.',
  	\`contact_us_button_text\` text DEFAULT 'Enquire Now',
  	\`contact_us_button_link\` text DEFAULT '/contact',
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_why_us_features\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`icon\` text NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_why_us_features_order_idx\` ON \`home_page_why_us_features\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_why_us_features_parent_id_idx\` ON \`home_page_why_us_features\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`promo_banner_heading\` text DEFAULT 'Looking to sell your car?',
  	\`promo_banner_subheading\` text DEFAULT 'Get the best price for your car in just a few simple steps.',
  	\`promo_banner_button_text\` text DEFAULT 'Sell Your Car Today',
  	\`promo_banner_button_link\` text DEFAULT '/contact?message=I%20am%20interested%20in%20selling%20my%20car',
  	\`shipping_section_heading\` text DEFAULT 'WORLDWIDE SHIPPING & EXPORT ASSISTANCE',
  	\`shipping_section_subheading\` text DEFAULT 'Seamless international delivery from Dubai to your doorstep.',
  	\`shipping_section_button_text\` text DEFAULT 'LEARN MORE',
  	\`shipping_section_button_link\` text DEFAULT '/services',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`cars_features\`;`)
  await db.run(sql`DROP TABLE \`cars_images\`;`)
  await db.run(sql`DROP TABLE \`cars\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`brands\`;`)
  await db.run(sql`DROP TABLE \`reviews\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
  await db.run(sql`DROP TABLE \`about_page_features\`;`)
  await db.run(sql`DROP TABLE \`about_page_why_choose_us_cards\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`services_page_services_list_services\`;`)
  await db.run(sql`DROP TABLE \`services_page\`;`)
  await db.run(sql`DROP TABLE \`site_settings_opening_hours\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`home_page_why_us_features\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
}
