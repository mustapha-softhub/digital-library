import { createClient } from '@supabase/supabase-js';

// Sample book data for the Digital Library
const books = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    publication_date: "1997",
    publisher: "Bloomsbury",
    summary: "Harry Potter has never even heard of Hogwarts when the letters start dropping on the doormat at number four, Privet Drive. Addressed in green ink on yellowish parchment with a purple seal, they are swiftly confiscated by his grisly aunt and uncle. Then, on Harry's eleventh birthday, a great beetle-eyed giant of a man called Rubeus Hagrid bursts in with some astonishing news: Harry Potter is a wizard, and he has a place at Hogwarts School of Witchcraft and Wizardry.",
    availability: "EBook,Physical,Audio",
    categories: ["Fantasy", "Young Adult", "Magic"],
    tags: ["Wizards", "Magic School", "Coming of Age"]
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    publication_date: "1960",
    publisher: "J. B. Lippincott & Co.",
    summary: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. 'To Kill A Mockingbird' became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.",
    availability: "EBook,Physical",
    categories: ["Fiction", "Classic", "Historical Fiction"],
    tags: ["Social Justice", "Racism", "Great Depression"]
  },
  {
    title: "1984",
    author: "George Orwell",
    publication_date: "1949",
    publisher: "Secker & Warburg",
    summary: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real. Published in 1949, the book offers political satirist George Orwell's nightmarish vision of a totalitarian, bureaucratic world and one poor stiff's attempt to find individuality.",
    availability: "EBook,Physical,Audio",
    categories: ["Fiction", "Dystopian", "Classic"],
    tags: ["Totalitarianism", "Surveillance", "Political Fiction"]
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    publication_date: "1925",
    publisher: "Charles Scribner's Sons",
    summary: "The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession,' it is an exquisitely crafted tale of America in the 1920s.",
    availability: "EBook,Physical",
    categories: ["Fiction", "Classic", "Literary Fiction"],
    tags: ["American Dream", "Wealth", "Roaring Twenties"]
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    publication_date: "1813",
    publisher: "T. Egerton, Whitehall",
    summary: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child' and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.'",
    availability: "EBook,Physical,Audio",
    categories: ["Fiction", "Classic", "Romance"],
    tags: ["Social Class", "Marriage", "19th Century"]
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    publication_date: "1937",
    publisher: "George Allen & Unwin",
    summary: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
    availability: "EBook,Physical,Audio",
    categories: ["Fantasy", "Adventure", "Classic"],
    tags: ["Dragons", "Quests", "Middle Earth"]
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    publication_date: "1951",
    publisher: "Little, Brown and Company",
    summary: "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.",
    availability: "EBook,Physical",
    categories: ["Fiction", "Coming of Age", "Classic"],
    tags: ["Teenage Angst", "Alienation", "Identity"]
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    publication_date: "1988",
    publisher: "HarperOne",
    summary: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago's journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life's path, and, most importantly, to follow our dreams.",
    availability: "EBook,Physical,Audio",
    categories: ["Fiction", "Philosophy", "Adventure"],
    tags: ["Self-Discovery", "Dreams", "Spirituality"]
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    publication_date: "2011",
    publisher: "Harper",
    summary: "In Sapiens, Dr. Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical – and sometimes devastating – breakthroughs of the Cognitive, Agricultural and Scientific Revolutions. Drawing on insights from biology, anthropology, paleontology and economics, he explores how the currents of history have shaped our human societies, the animals and plants around us, and even our personalities.",
    availability: "EBook,Physical,Audio",
    categories: ["Non-fiction", "History", "Science"],
    tags: ["Human Evolution", "Anthropology", "Civilization"]
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    publication_date: "2011",
    publisher: "Farrar, Straus and Giroux",
    summary: "In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.",
    availability: "EBook,Physical",
    categories: ["Non-fiction", "Psychology", "Economics"],
    tags: ["Decision Making", "Cognitive Biases", "Behavioral Economics"]
  },
  {
    title: "Educated",
    author: "Tara Westover",
    publication_date: "2018",
    publisher: "Random House",
    summary: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent. When another brother got himself into college, Tara decided to try a new kind of life.",
    availability: "EBook,Physical,Audio",
    categories: ["Non-fiction", "Memoir", "Biography"],
    tags: ["Education", "Family", "Resilience"]
  },
  {
    title: "The Silent Patient",
    author: "Alex Michaelides",
    publication_date: "2019",
    publisher: "Celadon Books",
    summary: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    availability: "EBook,Physical",
    categories: ["Fiction", "Thriller", "Mystery"],
    tags: ["Psychological Thriller", "Plot Twist", "Mental Health"]
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    publication_date: "2018",
    publisher: "Avery",
    summary: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    availability: "EBook,Physical,Audio",
    categories: ["Non-fiction", "Self-help", "Psychology"],
    tags: ["Habits", "Personal Development", "Productivity"]
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    publication_date: "2020",
    publisher: "Viking",
    summary: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?",
    availability: "EBook,Physical,Audio",
    categories: ["Fiction", "Fantasy", "Contemporary"],
    tags: ["Parallel Lives", "Regret", "Second Chances"]
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    publication_date: "1965",
    publisher: "Chilton Books",
    summary: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...",
    availability: "EBook,Physical,Audio",
    categories: ["Science Fiction", "Fantasy", "Classic"],
    tags: ["Space Opera", "Politics", "Ecology"]
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    publication_date: "1997",
    publisher: "Namaste Publishing",
    summary: "To make the journey into the Now we will need to leave our analytical mind and its false created self, the ego, behind. From the very first page of this extraordinary book, we move rapidly into a significantly higher altitude where we breathe a lighter air. We become connected to the indestructible essence of our Being, "The eternal, ever present One Life beyond the myriad forms of life that are subject to birth and death."",
    availability: "EBook,Physical,Audio",
    categories: ["Non-fiction", "Spirituality", "Self-help"],
    tags: ["Mindfulness", "Presence", "Consciousness"]
  },
  {
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    publication_date: "2003",
    publisher: "Riverhead Books",
    summary: "The unforgettable, heartbreaking story of the unlikely friendship between a wealthy boy and the son of his father's servant, The Kite Runner is a beautifully crafted novel set in a country that is in the process of being destroyed. It is about the power of reading, the price of betrayal, and the possibility of redemption; and an exploration of the power of fathers over sons—their love, their sacrifices, their lies.",
    availability: "EBook,Physical",
    categories: ["Fiction", "Historical Fiction", "Cultural"],
    tags: ["Afghanistan", "Friendship", "Redemption"]
  },
  {
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    publication_date: "2018",
    publisher: "G.P. Putnam's Sons",
    summary: "For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say. Sensitive and intelligent, she has survived for years alone in the marsh that she calls home, finding friends in the gulls and lessons in the sand.",
    availability: "EBook,Physical,Audio",
    categories: ["Fiction", "Mystery", "Coming of Age"],
    tags: ["Nature", "Isolation", "Murder Mystery"]
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    publication_date: "2018",
    publisher: "Crown",
    summary: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address.",
    availability: "EBook,Physical,Audio",
    categories: ["Non-fiction", "Memoir", "Biography"],
    tags: ["Politics", "First Lady", "American History"]
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    publication_date: "1997",
    publisher: "Amber-Allen Publishing",
    summary: "In The Four Agreements, bestselling author don Miguel Ruiz reveals the source of self-limiting beliefs that rob us of joy and create needless suffering. Based on ancient Toltec wisdom, The Four Agreements offer a powerful code of conduct that can rapidly transform our lives to a new experience of freedom, true happiness, and love.",
    availability: "EBook,Physical",
    categories: ["Non-fiction", "Spirituality", "Self-help"],
    tags: ["Personal Freedom", "Toltec Wisdom", "Life Principles"]
  }
];

// Function to add sample books to the database
async function addSampleBooks() {
  // Initialize Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase URL or key is missing');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Create admin user
  const { data: adminUser, error: adminError } = await supabase.auth.signUp({
    email: 'admin@digitallibrary.com',
    password: 'Admin123!',
    options: {
      data: {
        role: 'admin',
        full_name: 'System Administrator'
      }
    }
  });
  
  if (adminError) {
    console.error('Error creating admin user:', adminError);
    return;
  }
  
  // Insert admin user into users table
  const { error: userError } = await supabase
    .from('users')
    .insert({
      id: adminUser.user?.id,
      email: 'admin@digitallibrary.com',
      role: 'admin',
      full_name: 'System Administrator'
    });
  
  if (userError) {
    console.error('Error inserting admin user:', userError);
  }
  
  // Insert moods
  const moods = [
    { name: 'happy', description: 'Books for when you are feeling joyful and positive' },
    { name: 'down', description: 'Books for when you are feeling sad or melancholic' },
    { name: 'calm', description: 'Books for when you want to relax and unwind' },
    { name: 'stressed', description: 'Books for when you are feeling anxious or overwhelmed' },
    { name: 'curious', description: 'Books for when you want to learn something new' },
    { name: 'tired', description: 'Books for when you need a mental escape' }
  ];
  
  for (const mood of moods) {
    const { error: moodError } = await supabase
      .from('moods')
      .insert(mood);
    
    if (moodError) {
      console.error(`Error inserting mood ${mood.name}:`, moodError);
    }
  }
  
  // Add books
  for (const book of books) {
    // Insert book
    const { data: newBook, error: bookError } = await supabase
      .from('books')
      .insert({
        title: book.title,
        author: book.author,
        publication_date: book.publication_date,
        publisher: book.publisher,
        summary: book.summary,
        availability: book.availability,
        added_by: adminUser.user?.id
      })
      .select()
      .single();
    
    if (bookError) {
      console.error(`Error inserting book ${book.title}:`, bookError);
      continue;
    }
    
    // Add categories
    for (const categoryName of book.categories) {
      // Check if category exists
      let { data: category, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', categoryName)
        .single();
      
      if (categoryError) {
        // Create category
        const { data: newCategory, error: newCategoryError } = await supabase
          .from('categories')
          .insert({ name: categoryName })
          .select()
          .single();
        
        if (newCategoryError) {
          console.error(`Error creating category ${categoryName}:`, newCategoryError);
          continue;
        }
        
        category = newCategory;
      }
      
      // Link book to category
      const { error: linkError } = await supabase
        .from('book_categories')
        .insert({
          book_id: newBook.id,
          category_id: category.id
        });
      
      if (linkError) {
        console.error(`Error linking book ${book.title} to category ${categoryName}:`, linkError);
      }
    }
    
    // Add tags
    for (const tagName of book.tags) {
      // Check if tag exists
      let { data: tag, error: tagError } = await supabase
        .from('tags')
        .select('id')
        .eq('name', tagName)
        .single();
      
      if (tagError) {
        // Create tag
        const { data: newTag, error: newTagError } = await supabase
          .from('tags')
          .insert({ name: tagName })
          .select()
          .single();
        
        if (newTagError) {
          console.error(`Error creating tag ${tagName}:`, newTagError);
          continue;
        }
        
        tag = newTag;
      }
      
      // Link book to tag
      const { error: linkError } = await supabase
        .from('book_tags')
        .insert({
          book_id: newBook.id,
          tag_id: tag.id
        });
      
      if (linkError) {
        console.error(`Error linking book ${book.title} to tag ${tagName}:`, linkError);
      }
    }
    
    console.log(`Added book: ${book.title}`);
  }
  
  console.log('Sample data added successfully');
}

// Export the function to be used in scripts
export { addSampleBooks };
