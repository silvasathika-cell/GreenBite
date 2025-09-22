/* ============================================================
   Mobile nav toggle (hamburger shows only on small screens)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuBtn');
  const mainNav = document.getElementById('mainNav');

  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
      const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    // Close the menu after tapping a link (mobile)
    mainNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
});

/* ============================================================
   Recipe data (stored in a simple JS array = JSON-like)
   category: breakfast | lunch | dinner | dessert | soup
   ============================================================ */
const RECIPES = [
  {
    id: 'overnight_oats',
    title: 'Overnight Oats',
    category: 'breakfast',
    desc: 'Creamy oats with banana & chia. Make ahead and enjoy.',
    img: 'images/14.jpg',
    ingredients: [
      '1/2 cup rolled oats', '1/2 cup milk', '1 tsp chia seeds', '1/2 banana, sliced', 'Honey to taste'
    ],
    steps: [
      'Mix oats, milk, and chia in a jar.',
      'Refrigerate overnight.',
      'Top with banana and honey; serve.'
    ],
    nutrition: { calories: 320, protein: '10g', carbs: '55g', fat: '8g' }
  },
  {
    id: 'pesto_gnocchi',
    title: 'Pesto Gnocchi',
    category: 'lunch',
    desc: 'Soft gnocchi tossed in fresh pesto.',
    img: 'images/3.jpg',
    ingredients: [
      '250g gnocchi', '2 tbsp pesto', 'Cherry tomatoes', 'Salt & pepper'
    ],
    steps: [
      'Boil gnocchi per pack instructions.',
      'Toss with pesto and tomatoes.',
      'Season and serve warm.'
    ],
    nutrition: { calories: 460, protein: '12g', carbs: '80g', fat: '12g' }
  },
  {
    id: 'pesto_pasta',
    title: 'Pesto Pasta',
    category: 'dinner',
    desc: 'Twirl a bowl of zesty pesto pasta.',
    img: 'images/12.jpg',
    ingredients: [
      '200g pasta', '2 tbsp pesto', 'Olive oil', 'Parmesan', 'Salt'
    ],
    steps: [
      'Cook pasta until al dente.',
      'Mix with pesto and olive oil.',
      'Top with Parmesan and serve.'
    ],
    nutrition: { calories: 520, protein: '14g', carbs: '85g', fat: '14g' }
  },
  {
    id: 'fresh_salad',
    title: 'Fresh Salad',
    category: 'lunch',
    desc: 'Crisp greens with a lemony dressing.',
    img: 'images/8.jpg',
    ingredients: [
      'Lettuce mix', 'Cucumber', 'Tomato', 'Lemon juice', 'Olive oil', 'Salt'
    ],
    steps: [
      'Chop veggies.',
      'Whisk lemon juice, oil, and salt.',
      'Toss and serve.'
    ],
    nutrition: { calories: 180, protein: '5g', carbs: '18g', fat: '10g' }
  },
  {
    id: 'skivers',
    title: 'Skivers',
    category: 'dessert',
    desc: 'Little pancake balls — light and fluffy.',
    img: 'images/2.jpg',
    ingredients: [
      'Batter (pancake mix)', 'Butter', 'Jam or honey'
    ],
    steps: [
      'Heat pan; add butter.',
      'Cook small scoops of batter.',
      'Serve with jam/honey.'
    ],
    nutrition: { calories: 260, protein: '6g', carbs: '38g', fat: '9g' }
  },
  {
    id: 'healthy_pizza',
    title: 'Healthy Pizza',
    category: 'dinner',
    desc: 'Whole-wheat base with colorful veggies.',
    img: 'images/13.jpg',
    ingredients: [
      'Whole-wheat base', 'Tomato sauce', 'Veggies', 'Mozzarella'
    ],
    steps: [
      'Spread sauce on base.',
      'Top with veggies & cheese.',
      'Bake until golden.'
    ],
    nutrition: { calories: 540, protein: '22g', carbs: '68g', fat: '18g' }
  },
  {
    id: 'banana_oats_dessert',
    title: 'Banana Oats Dessert',
    category: 'dessert',
    desc: 'Warm oats with banana & cinnamon.',
    img: 'images/21.jpg',
    ingredients: [
      'Rolled oats', 'Milk', 'Banana', 'Cinnamon', 'Honey'
    ],
    steps: [
      'Cook oats with milk.',
      'Stir in banana & cinnamon.',
      'Drizzle honey and serve.'
    ],
    nutrition: { calories: 300, protein: '9g', carbs: '52g', fat: '6g' }
  },
  {
    id: 'pumpkin_soup',
    title: 'Pumpkin Soup',
    category: 'soup',
    desc: 'Silky pumpkin soup with a hint of spice.',
    img: 'images/65.jpg',
    ingredients: [
      'Pumpkin', 'Onion', 'Stock', 'Cream (optional)', 'Salt & pepper'
    ],
    steps: [
      'Sauté onion; add pumpkin & stock.',
      'Simmer until soft; blend smooth.',
      'Season; add cream if desired.'
    ],
    nutrition: { calories: 220, protein: '5g', carbs: '28g', fat: '9g' }
  },
  {
    id: 'healthy_tacos',
    title: 'Healthy Tacos',
    category: 'dinner',
    desc: 'Loaded with beans, corn, and salsa.',
    img: 'images/20.jpg',
    ingredients: [
      'Taco shells', 'Beans', 'Corn', 'Salsa', 'Lettuce'
    ],
    steps: [
      'Warm taco shells.',
      'Fill with beans, corn, and salsa.',
      'Top with lettuce; serve.'
    ],
    nutrition: { calories: 430, protein: '15g', carbs: '56g', fat: '14g' }
  }
];

/* ============================================================
   Rendering, Search & Filters, Modal
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('recipeGrid');
  const searchInput = document.getElementById('recipeSearch');
  const chips = document.querySelectorAll('.chip');

  // Modal elements
  const modal = document.getElementById('recipeModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalIngredients = document.getElementById('modalIngredients');
  const modalSteps = document.getElementById('modalSteps');
  const modalNutrition = document.getElementById('modalNutrition');

  let activeFilter = 'all';

  function renderCards(list) {
    grid.innerHTML = '';
    list.forEach(r => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img class="card__img" src="${r.img}" alt="${r.title}">
        <div class="card__body">
          <h3 class="card__title">${r.title}</h3>
          <p class="card__desc">${r.desc}</p>
          <button class="card__btn" data-id="${r.id}">View Recipe</button>
        </div>
      `;
      // Open modal on card image/title click too
      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('card__btn') || e.target.closest('.card__img') || e.target.closest('.card__title')) {
          openModal(r);
        }
      });
      grid.appendChild(card);
    });
  }

  function applyFilters() {
    const q = (searchInput.value || '').toLowerCase().trim();
    const filtered = RECIPES.filter(r => {
      const byCat = (activeFilter === 'all') || (r.category === activeFilter);
      const byText = !q || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q);
      return byCat && byText;
    });
    renderCards(filtered);
  }

  // Initial render
  renderCards(RECIPES);

  // Search
  searchInput.addEventListener('input', applyFilters);

  // Category chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      applyFilters();
    });
  });

  // Modal handlers
  function openModal(recipe) {
    modalTitle.textContent = recipe.title;
    modalDesc.textContent = recipe.desc;

    // Ingredients
    modalIngredients.innerHTML = '';
    recipe.ingredients.forEach(i => {
      const li = document.createElement('li');
      li.textContent = i;
      modalIngredients.appendChild(li);
    });

    // Steps
    modalSteps.innerHTML = '';
    recipe.steps.forEach(s => {
      const li = document.createElement('li');
      li.textContent = s;
      modalSteps.appendChild(li);
    });

    // Nutrition
    modalNutrition.innerHTML = `
      <tr>
        <td>${recipe.nutrition.calories}</td>
        <td>${recipe.nutrition.protein}</td>
        <td>${recipe.nutrition.carbs}</td>
        <td>${recipe.nutrition.fat}</td>
      </tr>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click backdrop
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
});
