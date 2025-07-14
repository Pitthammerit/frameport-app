-- =============================================================================
-- FRAMEPORT APP DATABASE SCHEMA
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- PHOTOGRAPHERS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS photographers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- GALLERIES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS galleries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photographer_id UUID REFERENCES photographers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  mode TEXT DEFAULT 'presentation' CHECK (mode IN ('presentation', 'collaboration')),
  settings JSONB DEFAULT '{
    "allowDownload": true,
    "allowComments": false,
    "allowRating": false,
    "allowColorMarking": false,
    "watermarkEnabled": false,
    "notificationEmails": []
  }',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- IMAGES TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  cloudflare_key TEXT NOT NULL,
  thumbnail_key TEXT,
  preview_key TEXT,
  metadata JSONB DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- SHARE LINKS TABLE
-- =============================================================================

CREATE TABLE IF NOT EXISTS share_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID REFERENCES galleries(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  permissions TEXT DEFAULT 'view_only' CHECK (permissions IN ('view_only', 'view_download', 'view_download_comment')),
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- COMMENTS TABLE (for collaboration mode)
-- =============================================================================

CREATE TABLE IF NOT EXISTS comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  share_link_id UUID REFERENCES share_links(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_email TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- RATINGS TABLE (for collaboration mode)
-- =============================================================================

CREATE TABLE IF NOT EXISTS ratings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  share_link_id UUID REFERENCES share_links(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(image_id, share_link_id)
);

-- =============================================================================
-- COLOR MARKINGS TABLE (for collaboration mode)
-- =============================================================================

CREATE TABLE IF NOT EXISTS color_markings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id UUID REFERENCES images(id) ON DELETE CASCADE,
  share_link_id UUID REFERENCES share_links(id) ON DELETE CASCADE,
  color TEXT NOT NULL CHECK (color IN ('red', 'yellow', 'green', 'blue', 'purple')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(image_id, share_link_id)
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Photographers indexes
CREATE INDEX IF NOT EXISTS idx_photographers_email ON photographers(email);
CREATE INDEX IF NOT EXISTS idx_photographers_subscription_tier ON photographers(subscription_tier);

-- Galleries indexes
CREATE INDEX IF NOT EXISTS idx_galleries_photographer_id ON galleries(photographer_id);
CREATE INDEX IF NOT EXISTS idx_galleries_mode ON galleries(mode);
CREATE INDEX IF NOT EXISTS idx_galleries_created_at ON galleries(created_at DESC);

-- Images indexes
CREATE INDEX IF NOT EXISTS idx_images_gallery_id ON images(gallery_id);
CREATE INDEX IF NOT EXISTS idx_images_cloudflare_key ON images(cloudflare_key);
CREATE INDEX IF NOT EXISTS idx_images_sort_order ON images(sort_order);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at DESC);

-- Share links indexes
CREATE INDEX IF NOT EXISTS idx_share_links_gallery_id ON share_links(gallery_id);
CREATE INDEX IF NOT EXISTS idx_share_links_token ON share_links(token);
CREATE INDEX IF NOT EXISTS idx_share_links_expires_at ON share_links(expires_at);
CREATE INDEX IF NOT EXISTS idx_share_links_created_at ON share_links(created_at DESC);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_image_id ON comments(image_id);
CREATE INDEX IF NOT EXISTS idx_comments_share_link_id ON comments(share_link_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);

-- Ratings indexes
CREATE INDEX IF NOT EXISTS idx_ratings_image_id ON ratings(image_id);
CREATE INDEX IF NOT EXISTS idx_ratings_share_link_id ON ratings(share_link_id);

-- Color markings indexes
CREATE INDEX IF NOT EXISTS idx_color_markings_image_id ON color_markings(image_id);
CREATE INDEX IF NOT EXISTS idx_color_markings_share_link_id ON color_markings(share_link_id);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_photographers_updated_at 
  BEFORE UPDATE ON photographers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_galleries_updated_at 
  BEFORE UPDATE ON galleries 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_images_updated_at 
  BEFORE UPDATE ON images 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_share_links_updated_at 
  BEFORE UPDATE ON share_links 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ratings_updated_at 
  BEFORE UPDATE ON ratings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_color_markings_updated_at 
  BEFORE UPDATE ON color_markings 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS
ALTER TABLE photographers ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE color_markings ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- RLS POLICIES
-- =============================================================================

-- Photographers policies
CREATE POLICY "Photographers can view own data" 
  ON photographers FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Photographers can update own data" 
  ON photographers FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Photographers can insert own data" 
  ON photographers FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Galleries policies
CREATE POLICY "Photographers can view own galleries" 
  ON galleries FOR SELECT 
  USING (auth.uid() = photographer_id);

CREATE POLICY "Photographers can create galleries" 
  ON galleries FOR INSERT 
  WITH CHECK (auth.uid() = photographer_id);

CREATE POLICY "Photographers can update own galleries" 
  ON galleries FOR UPDATE 
  USING (auth.uid() = photographer_id);

CREATE POLICY "Photographers can delete own galleries" 
  ON galleries FOR DELETE 
  USING (auth.uid() = photographer_id);

-- Images policies
CREATE POLICY "Photographers can view own images" 
  ON images FOR SELECT 
  USING (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

CREATE POLICY "Photographers can insert images to own galleries" 
  ON images FOR INSERT 
  WITH CHECK (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

CREATE POLICY "Photographers can update own images" 
  ON images FOR UPDATE 
  USING (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

CREATE POLICY "Photographers can delete own images" 
  ON images FOR DELETE 
  USING (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

-- Share links policies
CREATE POLICY "Photographers can view own share links" 
  ON share_links FOR SELECT 
  USING (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

CREATE POLICY "Photographers can create share links for own galleries" 
  ON share_links FOR INSERT 
  WITH CHECK (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

CREATE POLICY "Photographers can update own share links" 
  ON share_links FOR UPDATE 
  USING (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

CREATE POLICY "Photographers can delete own share links" 
  ON share_links FOR DELETE 
  USING (
    auth.uid() = (SELECT photographer_id FROM galleries WHERE id = gallery_id)
  );

-- Comments policies (allow anonymous access via share links)
CREATE POLICY "Comments can be viewed by gallery owners" 
  ON comments FOR SELECT 
  USING (
    auth.uid() = (
      SELECT photographer_id FROM galleries 
      WHERE id = (SELECT gallery_id FROM images WHERE id = image_id)
    )
  );

CREATE POLICY "Comments can be created via share links" 
  ON comments FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM share_links 
      WHERE id = share_link_id 
      AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

-- Ratings policies (allow anonymous access via share links)
CREATE POLICY "Ratings can be viewed by gallery owners" 
  ON ratings FOR SELECT 
  USING (
    auth.uid() = (
      SELECT photographer_id FROM galleries 
      WHERE id = (SELECT gallery_id FROM images WHERE id = image_id)
    )
  );

CREATE POLICY "Ratings can be created via share links" 
  ON ratings FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM share_links 
      WHERE id = share_link_id 
      AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

CREATE POLICY "Ratings can be updated via share links" 
  ON ratings FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM share_links 
      WHERE id = share_link_id 
      AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

-- Color markings policies (allow anonymous access via share links)
CREATE POLICY "Color markings can be viewed by gallery owners" 
  ON color_markings FOR SELECT 
  USING (
    auth.uid() = (
      SELECT photographer_id FROM galleries 
      WHERE id = (SELECT gallery_id FROM images WHERE id = image_id)
    )
  );

CREATE POLICY "Color markings can be created via share links" 
  ON color_markings FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM share_links 
      WHERE id = share_link_id 
      AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

CREATE POLICY "Color markings can be updated via share links" 
  ON color_markings FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM share_links 
      WHERE id = share_link_id 
      AND (expires_at IS NULL OR expires_at > NOW())
    )
  );

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Function to get gallery statistics
CREATE OR REPLACE FUNCTION get_gallery_stats(gallery_uuid UUID)
RETURNS TABLE (
  total_images INTEGER,
  total_size BIGINT,
  total_comments INTEGER,
  average_rating NUMERIC,
  last_updated TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(i.id)::INTEGER as total_images,
    COALESCE(SUM(i.file_size), 0) as total_size,
    COUNT(c.id)::INTEGER as total_comments,
    COALESCE(AVG(r.rating), 0) as average_rating,
    MAX(i.updated_at) as last_updated
  FROM images i
  LEFT JOIN comments c ON i.id = c.image_id
  LEFT JOIN ratings r ON i.id = r.image_id
  WHERE i.gallery_id = gallery_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired share links
CREATE OR REPLACE FUNCTION cleanup_expired_share_links()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM share_links 
  WHERE expires_at IS NOT NULL 
  AND expires_at < NOW();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- INITIAL DATA
-- =============================================================================

-- Insert default photographer settings
INSERT INTO photographers (id, email, name, subscription_tier) 
VALUES (
  gen_random_uuid(),
  'demo@frameport.app',
  'Demo Photographer',
  'free'
) ON CONFLICT (email) DO NOTHING;

-- =============================================================================
-- GRANTS
-- =============================================================================

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant table permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION get_gallery_stats(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION cleanup_expired_share_links() TO authenticated;