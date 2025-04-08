# Digital Library Database Schema

## Overview
This document outlines the database schema for the Digital Library application. The schema is designed to support all the required features including user authentication, book management, chat history, and mood-based recommendations.

## Tables

### 1. Users
Stores user information and authentication details.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  role TEXT NOT NULL CHECK (role IN ('admin', 'librarian', 'reader')),
  full_name TEXT,
  avatar_url TEXT
);
```

### 2. Books
Stores information about books in the library.

```sql
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  author TEXT,
  publication_date TEXT,
  publisher TEXT,
  summary TEXT,
  cover_image TEXT,
  availability TEXT NOT NULL CHECK (availability IN ('EBook', 'Physical', 'Audio', 'EBook,Physical', 'EBook,Audio', 'Physical,Audio', 'EBook,Physical,Audio')),
  added_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Book Categories
Stores categories for books.

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Book-Category Relationship
Maps books to categories (many-to-many relationship).

```sql
CREATE TABLE book_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(book_id, category_id)
);
```

### 5. Tags
Stores tags for books.

```sql
CREATE TABLE tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 6. Book-Tag Relationship
Maps books to tags (many-to-many relationship).

```sql
CREATE TABLE book_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(book_id, tag_id)
);
```

### 7. Chat History
Stores chat conversations about books.

```sql
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 8. Chat Messages
Stores individual messages in chat conversations.

```sql
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID REFERENCES chat_history(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 9. Moods
Stores predefined mood options for recommendations.

```sql
CREATE TABLE moods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 10. Book-Mood Relationship
Maps books to moods they match (many-to-many relationship).

```sql
CREATE TABLE book_moods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  mood_id UUID REFERENCES moods(id) ON DELETE CASCADE,
  score FLOAT NOT NULL DEFAULT 0.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(book_id, mood_id)
);
```

### 11. User Preferences
Stores user preferences for recommendations.

```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  preferred_categories TEXT[],
  preferred_authors TEXT[],
  reading_history UUID[] REFERENCES books(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Initial Data

### Moods
```sql
INSERT INTO moods (name, description) VALUES
('happy', 'Books for when you are feeling joyful and positive'),
('down', 'Books for when you are feeling sad or melancholic'),
('calm', 'Books for when you want to relax and unwind'),
('stressed', 'Books for when you are feeling anxious or overwhelmed'),
('curious', 'Books for when you want to learn something new'),
('tired', 'Books for when you need a mental escape');
```

### Default Admin User
```sql
INSERT INTO users (email, role, full_name) VALUES
('admin@digitallibrary.com', 'admin', 'System Administrator');
```

## Indexes
To optimize query performance:

```sql
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_availability ON books(availability);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_chat_history_book_id ON chat_history(book_id);
CREATE INDEX idx_chat_messages_chat_id ON chat_messages(chat_id);
CREATE INDEX idx_book_moods_mood_id ON book_moods(mood_id);
CREATE INDEX idx_book_categories_category_id ON book_categories(category_id);
```

## Row-Level Security Policies
To ensure proper access control:

```sql
-- Users can only read their own data unless they are admins
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY users_policy ON users
  USING (role = 'admin' OR id = auth.uid());

-- Only librarians and admins can add/edit books
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY books_read_policy ON books FOR SELECT
  USING (true);
CREATE POLICY books_insert_policy ON books FOR INSERT
  WITH CHECK (auth.jwt() ->> 'role' IN ('admin', 'librarian'));
CREATE POLICY books_update_policy ON books FOR UPDATE
  USING (auth.jwt() ->> 'role' IN ('admin', 'librarian'));

-- Chat history is private to each user
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
CREATE POLICY chat_history_policy ON chat_history
  USING (user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- Chat messages are accessible only to the user who created the chat
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY chat_messages_policy ON chat_messages
  USING (EXISTS (
    SELECT 1 FROM chat_history
    WHERE chat_history.id = chat_messages.chat_id
    AND (chat_history.user_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin')
  ));
```

## Functions and Triggers

### Function to update timestamps
```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_books_timestamp
BEFORE UPDATE ON books
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

CREATE TRIGGER update_chat_history_timestamp
BEFORE UPDATE ON chat_history
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();
```

### Function to search books using NLP parameters
```sql
CREATE OR REPLACE FUNCTION search_books(search_params JSONB)
RETURNS SETOF books AS $$
DECLARE
  query_text TEXT;
BEGIN
  query_text := 'SELECT * FROM books WHERE 1=1';
  
  IF search_params ? 'title' THEN
    query_text := query_text || ' AND title ILIKE ''%' || search_params ->> 'title' || '%''';
  END IF;
  
  IF search_params ? 'author' THEN
    query_text := query_text || ' AND author ILIKE ''%' || search_params ->> 'author' || '%''';
  END IF;
  
  IF search_params ? 'categories' THEN
    query_text := query_text || ' AND id IN (
      SELECT book_id FROM book_categories 
      JOIN categories ON book_categories.category_id = categories.id
      WHERE categories.name = ANY(''{"' || search_params ->> 'categories' || '"}'')
    )';
  END IF;
  
  IF search_params ? 'tags' THEN
    query_text := query_text || ' AND id IN (
      SELECT book_id FROM book_tags 
      JOIN tags ON book_tags.tag_id = tags.id
      WHERE tags.name = ANY(''{"' || search_params ->> 'tags' || '"}'')
    )';
  END IF;
  
  IF search_params ? 'availability' THEN
    query_text := query_text || ' AND availability = ''' || search_params ->> 'availability' || '''';
  END IF;
  
  RETURN QUERY EXECUTE query_text;
END;
$$ LANGUAGE plpgsql;
```
