// ... existing code ... ...
import React, { useState, useEffect, useMemo } from 'react';

// --- INLINE SVG ICON COMPONENTS (Replaces lucide-react dependencies) ---
const BarChart2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const Scale = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1zM7 21h10M12 3v18M3 7h18" />
  </svg>
);

const Utensils = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M18 2v20M21 15V2v0a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3zM3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20" />
  </svg>
);

const Flame = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
  </svg>
);

const Target = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const Plus = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Trash2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const Check = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ChevronDown = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ChevronUp = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

const TrendingUp = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const Activity = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const History = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
  </svg>
);

const Edit2 = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const X = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// --- INITIAL INGREDIENTS DATA FOR PRE-SET 7 MEALS ---
const initialMealsData = [
  {
    id: 'meal_1',
    name: 'Meal 1: Tea + Dhokla',
    time: '07:30 AM',
    eaten: false,
    ingredients: [
      { id: 'm1_1', name: 'Tea + Dhokla', calories: 235, protein: 6, carbs: 32, fat: 9, selected: true }
    ]
  },
  {
    id: 'meal_2',
    name: 'Meal 2: Mass-Gainer Shake',
    time: '09:00 AM',
    eaten: false,
    ingredients: [
      { id: 'm2_1', name: 'Mass Gainer Powder', calories: 132, protein: 5, carbs: 16, fat: 6, selected: true },
      { id: 'm2_2', name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0, selected: true },
      { id: 'm2_3', name: 'Milk', calories: 150, protein: 7, carbs: 11, fat: 8, selected: true },
      { id: 'm2_4', name: 'Peanut Butter', calories: 95, protein: 4, carbs: 3, fat: 8, selected: true }
    ]
  },
  {
    id: 'meal_3',
    name: 'Meal 3: Salad',
    time: '11:30 AM',
    eaten: false,
    ingredients: [
      { id: 'm3_1', name: 'Chana', calories: 41, protein: 2, carbs: 7, fat: 1, selected: true },
      { id: 'm3_2', name: 'Sprouts', calories: 8, protein: 1, carbs: 2, fat: 0, selected: true },
      { id: 'm3_3', name: 'Curd', calories: 24, protein: 1, carbs: 2, fat: 1, selected: true },
      { id: 'm3_4', name: 'Peanuts', calories: 85, protein: 4, carbs: 2, fat: 7, selected: true }
    ]
  },
  {
    id: 'meal_4',
    name: 'Meal 4: Lunch Options',
    time: '01:30 PM',
    eaten: false,
    ingredients: [
      { id: 'm4_1', name: 'Roti + Sabji', calories: 350, protein: 11, carbs: 52, fat: 10, selected: true },
      { id: 'm4_2', name: 'Roti + Meat', calories: 450, protein: 25, carbs: 48, fat: 18, selected: false },
      { id: 'm4_3', name: 'Roti + Chicken', calories: 408, protein: 30, carbs: 45, fat: 12, selected: false }
    ]
  },
  {
    id: 'meal_5',
    name: 'Meal 5: Calorie Booster',
    time: '03:00 PM to 06:00 PM',
    eaten: false,
    ingredients: [
      { id: 'm5_1', name: 'Egg', calories: 78, protein: 6, carbs: 1, fat: 5, selected: true },
      { id: 'm5_2', name: 'Gond laddu', calories: 190, protein: 3, carbs: 23, fat: 10, selected: true },
      { id: 'm5_3', name: 'Ragi sheera', calories: 180, protein: 3, carbs: 27, fat: 7, selected: true },
      { id: 'm5_4', name: 'Soya Chunks', calories: 103, protein: 16, carbs: 10, fat: 0, selected: true }
    ]
  },
  {
    id: 'meal_6',
    name: 'Meal 6: Dinner Options',
    time: '08:30 PM',
    eaten: false,
    ingredients: [
      { id: 'm6_1', name: 'Khichdi + Sabji', calories: 485, protein: 13, carbs: 72, fat: 16, selected: true },
      { id: 'm6_2', name: 'Khichdi + Meat', calories: 600, protein: 28, carbs: 70, fat: 25, selected: false },
      { id: 'm6_3', name: 'Khichdi + Chicken', calories: 520, protein: 29, carbs: 38, fat: 25, selected: false }
    ]
  },
  {
    id: 'meal_7',
    name: 'Meal 7: Recovery Milk',
    time: 'Bedtime',
    eaten: false,
    ingredients: [
      { id: 'm7_1', name: 'Milk', calories: 150, protein: 7, carbs: 11, fat: 8, selected: true },
      { id: 'm7_2', name: 'Powder', calories: 132, protein: 5, carbs: 16, fat: 6, selected: true }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Keep the current online styling intact; this will be replaced by bundled
  // local Tailwind CSS when offline/PWA support is added in the next stage.
  useEffect(() => {
    if (!document.getElementById('tailwind-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  const [profile, setProfile] = useState(() => {
    // Clear the old demonstration profile and logs once after this update.
    // Deliberately preserve wg_meals so all seven preset meals remain unchanged.
    if (localStorage.getItem('wg_clean_start_v1') !== 'done') {
      localStorage.removeItem('wg_profile');
      localStorage.removeItem('wg_nutrition_logs');
      localStorage.removeItem('wg_weight_logs');
      localStorage.setItem('wg_clean_start_v1', 'done');
    }
    const saved = localStorage.getItem('wg_profile');
    return saved ? JSON.parse(saved) : {
      gender: '',
      breastfeeding: '',
      startingDate: '',
      startWeight: '',
      currentWeight: '',
      targetWeight: '',
      height: '',
      age: '',
      activityLevel: '',
      surplusGoal: '',
    };
  });

  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem('wg_meals');
    return saved ? JSON.parse(saved) : initialMealsData;
  });

  const [nutritionLogs, setNutritionLogs] = useState(() => {
    const saved = localStorage.getItem('wg_nutrition_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [weightLogs, setWeightLogs] = useState(() => {
    const saved = localStorage.getItem('wg_weight_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedNutritionMonth, setSelectedNutritionMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  const [selectedWeightMonth, setSelectedWeightMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  });

  const [isNutritionModalOpen, setIsNutritionModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [expandedMealId, setExpandedMealId] = useState('meal_1');
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);

  // --- LOCAL EDIT FORM FOR PROFILE TO PREVENT DRIFT ON REFRESH ---
  const [tempProfile, setTempProfile] = useState(() => ({ ...profile }));

  // Keep local temp form synced if profile is updated externally
  useEffect(() => {
    setTempProfile({ ...profile });
  }, [profile]);

  // --- INGREDIENT EDIT/ADD MODAL STATES ---
  const [editingIngredient, setEditingIngredient] = useState(null); // { mealId, ingredient } or null
  const [ingredientForm, setIngredientForm] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const [nutritionForm, setNutritionForm] = useState({
    date: new Date().toISOString().split('T')[0],
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    notes: ''
  });

  const [weightForm, setWeightForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: profile.currentWeight || '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('wg_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('wg_meals', JSON.stringify(meals));
  }, [meals]);

  useEffect(() => {
    localStorage.setItem('wg_nutrition_logs', JSON.stringify(nutritionLogs));
  }, [nutritionLogs]);

  useEffect(() => {
    localStorage.setItem('wg_weight_logs', JSON.stringify(weightLogs));
  }, [weightLogs]);

  // --- DYNAMIC TARGET CALCULATIONS ---
  const calculatedTargets = useMemo(() => {
    const weight = Number(profile.currentWeight || profile.startWeight || 0);
    const height = Number(profile.height || 0);
    const age = Number(profile.age || 0);
    const activityLevel = Number(profile.activityLevel || 0);
    const surplusGoal = Number(profile.surplusGoal || 0);
    const isProfileComplete = weight > 0 && height > 0 && age > 0 && activityLevel > 0 &&
      surplusGoal >= 0 && (profile.gender === 'male' || profile.gender === 'female') &&
      (profile.breastfeeding === 'yes' || profile.breastfeeding === 'no');

    if (!isProfileComplete) {
      return { isProfileComplete: false, bmr: 0, maintenance: 0, breastfeedingAddon: 0,
        targetCalories: 0, targetProtein: 0, targetFat: 0, targetCarbs: 0 };
    }

    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (profile.gender === 'male') bmr += 5;
    else bmr -= 161;

    const maintenance = bmr * activityLevel;
    const breastfeedingAddon = (profile.gender === 'female' && profile.breastfeeding === 'yes') ? 500 : 0;
    const targetCalories = Math.round(maintenance + surplusGoal + breastfeedingAddon);
    const proteinFactor = (profile.gender === 'female' && profile.breastfeeding === 'yes') ? 2.2 : 2.0;
    const targetProtein = Math.round(weight * proteinFactor);
    const targetFat = Math.round((targetCalories * 0.25) / 9);
    const proteinCalories = targetProtein * 4;
    const fatCalories = targetFat * 9;
    const remainingCalories = targetCalories - (proteinCalories + fatCalories);
    const targetCarbs = Math.max(0, Math.round(remainingCalories / 4));

    return { isProfileComplete: true, bmr: Math.round(bmr), maintenance: Math.round(maintenance),
      breastfeedingAddon, targetCalories, targetProtein, targetFat, targetCarbs };
  }, [profile]);

  // --- DAILY CONSUMPTION TOTALS (ONLY ADDED IF EATEN IS TRUE) ---
  const todayTotals = useMemo(() => {
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    meals.forEach(meal => {
      if (meal.eaten) {
        meal.ingredients.forEach(ing => {
          if (ing.selected) {
            totalCalories += ing.calories || 0;
            totalProtein += ing.protein || 0;
            totalCarbs += ing.carbs || 0;
            totalFat += ing.fat || 0;
          }
        });
      }
    });

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    };
  }, [meals]);

  // --- HANDLERS ---
  const handleToggleMealEaten = (mealId) => {
    setMeals(prev => prev.map(meal => 
      meal.id === mealId ? { ...meal, eaten: !meal.eaten } : meal
    ));
  };

  const handleToggleIngredient = (mealId, ingredientId) => {
    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        const updatedIngredients = meal.ingredients.map(ing => 
          ing.id === ingredientId ? { ...ing, selected: !ing.selected } : ing
        );
        return { ...meal, ingredients: updatedIngredients };
      }
      return meal;
    }));
  };

  // --- INGREDIENT CRUD HANDLERS ---
  const handleOpenAddIngredient = (mealId) => {
    setEditingIngredient({ mealId, isNew: true });
    setIngredientForm({ name: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const handleOpenEditIngredient = (mealId, ing) => {
    setEditingIngredient({ mealId, id: ing.id, isNew: false });
    setIngredientForm({
      name: ing.name,
      calories: ing.calories || '',
      protein: ing.protein || '',
      carbs: ing.carbs || '',
      fat: ing.fat || ''
    });
  };

  const handleSaveIngredient = (e) => {
    e.preventDefault();
    if (!editingIngredient) return;

    const newIng = {
      id: editingIngredient.isNew ? `ing_${Date.now()}` : editingIngredient.id,
      name: ingredientForm.name.trim() || 'Custom Ingredient',
      calories: parseInt(ingredientForm.calories) || 0,
      protein: parseInt(ingredientForm.protein) || 0,
      carbs: parseInt(ingredientForm.carbs) || 0,
      fat: parseInt(ingredientForm.fat) || 0,
      selected: true
    };

    setMeals(prev => prev.map(meal => {
      if (meal.id === editingIngredient.mealId) {
        if (editingIngredient.isNew) {
          return { ...meal, ingredients: [...meal.ingredients, newIng] };
        } else {
          return {
            ...meal,
            ingredients: meal.ingredients.map(ing => ing.id === newIng.id ? { ...ing, ...newIng } : ing)
          };
        }
      }
      return meal;
    }));

    setEditingIngredient(null);
  };

  const handleDeleteIngredient = (mealId, ingredientId) => {
    setMeals(prev => prev.map(meal => {
      if (meal.id === mealId) {
        return {
          ...meal,
          ingredients: meal.ingredients.filter(ing => ing.id !== ingredientId)
        };
      }
      return meal;
    }));
  };

  const handleAddNutritionSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now().toString(),
      date: nutritionForm.date,
      calories: parseInt(nutritionForm.calories) || todayTotals.calories,
      protein: parseInt(nutritionForm.protein) || todayTotals.protein,
      carbs: parseInt(nutritionForm.carbs) || todayTotals.carbs,
      fat: parseInt(nutritionForm.fat) || todayTotals.fat,
      notes: nutritionForm.notes
    };

    setNutritionLogs(prev => [newEntry, ...prev.filter(l => l.date !== newEntry.date)]);
    setIsNutritionModalOpen(false);
  };

  const handleAddWeightSubmit = (e) => {
    e.preventDefault();
    const newWeightVal = parseFloat(weightForm.weight);
    if (!newWeightVal) return;

    const newEntry = {
      id: Date.now().toString(),
      date: weightForm.date,
      weight: newWeightVal,
      notes: weightForm.notes
    };

    setWeightLogs(prev => {
      const filtered = prev.filter(l => l.date !== newEntry.date);
      return [...filtered, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    setProfile(prev => ({ ...prev, currentWeight: newWeightVal }));
    setIsWeightModalOpen(false);
  };

  const handleDeleteNutritionLog = (id) => {
    setNutritionLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleDeleteWeightLog = (id) => {
    setWeightLogs(prev => prev.filter(l => l.id !== id));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...tempProfile });
    localStorage.setItem('wg_profile', JSON.stringify(tempProfile));
    setProfileSavedFeedback(true);
    setTimeout(() => setProfileSavedFeedback(false), 2500);
  };

  // Nav items for mobile bottom navigation bar
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: BarChart2 },
    { id: 'meals', label: 'Meals', icon: Utensils },
    { id: 'weight_logs', label: 'Weight', icon: Scale },
    { id: 'nutrition_logs', label: 'History', icon: History },
    { id: 'calculator', label: 'Surplus', icon: Flame },
    { id: 'goals', label: 'Profile', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pb-24 md:pb-8">
      {/* MOBILE APP TOP BAR */}
      <header className="border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40 px-4 py-3 sm:px-6">
        <div className="max-w-md md:max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white tracking-wide flex items-center gap-1.5">
                BulkTrack
                <span className="text-[10px] uppercase font-black bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">PRO</span>
              </h1>
              <p className="text-[11px] text-slate-400">Smart Surplus & Macro App</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setWeightForm({
                  date: new Date().toISOString().split('T')[0],
                  weight: profile.currentWeight || '',
                  notes: ''
                });
                setIsWeightModalOpen(true);
              }}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 rounded-xl transition-all border border-slate-700/60 active:scale-95 flex items-center gap-1 text-xs font-semibold"
              title="Record Weight"
            >
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Weight</span>
            </button>

            <button
              onClick={() => {
                setNutritionForm({
                  date: new Date().toISOString().split('T')[0],
                  calories: todayTotals.calories,
                  protein: todayTotals.protein,
                  carbs: todayTotals.carbs,
                  fat: todayTotals.fat,
                  notes: ''
                });
                setIsNutritionModalOpen(true);
              }}
              className="px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log Day</span>
            </button>
          </div>
        </div>
      </header>

      {/* DESKTOP/TABLET SECONDARY TOP NAVIGATION */}
      <nav className="hidden md:block border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-4xl mx-auto px-6 flex space-x-2 py-2.5 overflow-x-auto scrollbar-none">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-md md:max-w-4xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-6">

        {/* --- DASHBOARD TAB --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* HERO CALORIE RING CARD */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-5 rounded-3xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full filter blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Flame className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Today's Calorie Goal</span>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  +{profile.surplusGoal || '—'} kcal surplus
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5 my-2">
                {/* Visual Progress Doughnut Ring */}
                <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-emerald-400 transition-all duration-1000 ease-out"
                      strokeDasharray={`${(calculatedTargets.targetCalories > 0 ? Math.min(100, Math.round(todayTotals.calories / calculatedTargets.targetCalories * 100)) : 0)}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center flex flex-col items-center">
                    <span className="text-2xl font-black text-white tracking-tight">{todayTotals.calories}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">/ {calculatedTargets.isProfileComplete ? calculatedTargets.targetCalories : '—'} kcal</span>
                  </div>
                </div>

                {/* Right Breakdown Metrics */}
                <div className="flex-1 w-full space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Target Remaining</span>
                    <span className="font-bold text-emerald-400">
                      {calculatedTargets.isProfileComplete ? Math.max(0, calculatedTargets.targetCalories - todayTotals.calories) + ' kcal' : 'Complete profile to calculate'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (calculatedTargets.targetCalories > 0 ? todayTotals.calories / calculatedTargets.targetCalories * 100 : 0))}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Current Weight</span>
                      <span className="text-sm font-black text-white">{profile.currentWeight || '—'} <span className="text-xs text-emerald-400 font-semibold">kg</span></span>
                    </div>
                    <div className="bg-slate-800/40 p-2.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Target Weight</span>
                      <span className="text-sm font-black text-slate-200">{profile.targetWeight || '—'} <span className="text-xs text-slate-500 font-semibold">kg</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK MACROS PROGRESS CARDS */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg space-y-4">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                Macro Goals Progress
              </h2>

              <div className="space-y-3">
                {/* Protein */}
                <div className="bg-slate-800/30 border border-slate-800/80 p-3 rounded-2xl">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-bold text-purple-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Protein
                    </span>
                    <span className="font-semibold text-slate-300">{todayTotals.protein} <span className="text-slate-500">/ {calculatedTargets.isProfileComplete ? calculatedTargets.targetProtein : '—'}g</span></span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${Math.min(100, (calculatedTargets.targetProtein > 0 ? todayTotals.protein / calculatedTargets.targetProtein * 100 : 0))}%` }} />
                  </div>
                </div>

                {/* Carbs */}
                <div className="bg-slate-800/30 border border-slate-800/80 p-3 rounded-2xl">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Carbohydrates
                    </span>
                    <span className="font-semibold text-slate-300">{todayTotals.carbs} <span className="text-slate-500">/ {calculatedTargets.isProfileComplete ? calculatedTargets.targetCarbs : '—'}g</span></span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full transition-all duration-300" style={{ width: `${Math.min(100, (calculatedTargets.targetCarbs > 0 ? todayTotals.carbs / calculatedTargets.targetCarbs * 100 : 0))}%` }} />
                  </div>
                </div>

                {/* Fats */}
                <div className="bg-slate-800/30 border border-slate-800/80 p-3 rounded-2xl">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-bold text-amber-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Healthy Fats
                    </span>
                    <span className="font-semibold text-slate-300">{todayTotals.fat} <span className="text-slate-500">/ {calculatedTargets.isProfileComplete ? calculatedTargets.targetFat : '—'}g</span></span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${Math.min(100, (calculatedTargets.targetFat > 0 ? todayTotals.fat / calculatedTargets.targetFat * 100 : 0))}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK 7-MEAL SNAPSHOT */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-emerald-400" />
                  Today's 7 Meals Summary
                </h2>
                <button 
                  onClick={() => setActiveTab('meals')}
                  className="text-xs text-emerald-400 hover:underline font-bold flex items-center gap-0.5"
                >
                  Manage <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {meals.map((meal) => {
                  const activeIngs = meal.ingredients.filter(i => i.selected);
                  const mealCal = meal.eaten ? activeIngs.reduce((acc, i) => acc + i.calories, 0) : 0;
                  const mealProt = meal.eaten ? activeIngs.reduce((acc, i) => acc + i.protein, 0) : 0;

                  return (
                    <div 
                      key={meal.id} 
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                        meal.eaten 
                          ? 'bg-emerald-500/5 border-emerald-500/30' 
                          : 'bg-slate-900/40 border-slate-800/80 opacity-60'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-xs font-bold text-slate-200 block truncate">{meal.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          {meal.eaten ? `${mealCal} kcal • ${mealProt}g protein` : 'Skipped (0 kcal)'}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleToggleMealEaten(meal.id)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-bold transition-all ${
                          meal.eaten 
                            ? 'bg-emerald-500 text-slate-950 font-black' 
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {meal.eaten ? 'Eaten' : 'Skipped'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- MEAL & CALORIE LOG TAB --- */}
        {activeTab === 'meals' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header & Live Tracker Banner */}
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-3">
              <div>
                <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Utensils className="w-5 h-5 text-emerald-400" />
                  Daily 7-Meal Ingredient Log
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Toggle <span className="text-emerald-400 font-semibold">Eaten</span> state to calculate your active calorie intake.
                </p>
              </div>

              {/* Dynamic Live Totals Pill */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800">
                <div className="bg-slate-800/50 p-2 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block">Calories</span>
                  <span className="font-black text-amber-400 text-xs sm:text-sm">{todayTotals.calories}</span>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block">Protein</span>
                  <span className="font-bold text-purple-400 text-xs sm:text-sm">{todayTotals.protein}g</span>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block">Carbs</span>
                  <span className="font-bold text-cyan-400 text-xs sm:text-sm">{todayTotals.carbs}g</span>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 block">Fat</span>
                  <span className="font-bold text-amber-300 text-xs sm:text-sm">{todayTotals.fat}g</span>
                </div>
              </div>
            </div>

            {/* List of 7 Meals */}
            <div className="space-y-3.5">
              {meals.map((meal) => {
                const isExpanded = expandedMealId === meal.id;
                
                const activeIngredients = meal.ingredients.filter(i => i.selected);
                const mealCalories = meal.eaten ? activeIngredients.reduce((sum, i) => sum + i.calories, 0) : 0;
                const mealProtein = meal.eaten ? activeIngredients.reduce((sum, i) => sum + i.protein, 0) : 0;
                const mealCarbs = meal.eaten ? activeIngredients.reduce((sum, i) => sum + i.carbs, 0) : 0;
                const mealFat = meal.eaten ? activeIngredients.reduce((sum, i) => sum + i.fat, 0) : 0;

                return (
                  <div 
                    key={meal.id}
                    className={`border rounded-2xl transition-all overflow-hidden ${
                      meal.eaten 
                        ? 'bg-slate-900/90 border-slate-800 shadow-md' 
                        : 'bg-slate-900/40 border-slate-800/50 opacity-80'
                    }`}
                  >
                    {/* Meal Header Strip */}
                    <div className="p-3.5 flex items-center justify-between gap-3 bg-slate-800/30">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Interactive Eaten Switch */}
                        <button
                          onClick={() => handleToggleMealEaten(meal.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex-shrink-0 active:scale-95 ${
                            meal.eaten 
                              ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20' 
                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
                          }`}
                        >
                          <Check className={`w-3.5 h-3.5 ${meal.eaten ? 'stroke-[3]' : 'opacity-40'}`} />
                          <span>{meal.eaten ? 'Eaten' : 'Skipped'}</span>
                        </button>

                        <div className="min-w-0">
                          <h3 className="font-bold text-xs sm:text-sm text-white truncate">{meal.name}</h3>
                          <span className="text-[10px] text-slate-400 block">{meal.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right text-xs">
                          {meal.eaten ? (
                            <span className="font-bold text-amber-400">{mealCalories} kcal</span>
                          ) : (
                            <span className="text-slate-500 text-[10px]">Skipped</span>
                          )}
                        </div>

                        <button
                          onClick={() => setExpandedMealId(isExpanded ? null : meal.id)}
                          className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Expandable Ingredient Checklist */}
                    {isExpanded && (
                      <div className="p-3.5 border-t border-slate-800/80 bg-slate-950/40 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-medium">Ingredients Checklist:</span>
                          <button
                            onClick={() => handleOpenAddIngredient(meal.id)}
                            className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            Add Item
                          </button>
                        </div>

                        <div className="space-y-2">
                          {meal.ingredients.map((ing) => (
                            <div
                              key={ing.id}
                              className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                                meal.eaten && ing.selected
                                  ? 'bg-slate-800/70 border-emerald-500/30 text-slate-200' 
                                  : 'bg-slate-900/30 border-slate-800/60 text-slate-500 line-through opacity-60'
                              }`}
                            >
                              <label className="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0 pr-2">
                                <input
                                  type="checkbox"
                                  checked={ing.selected && meal.eaten}
                                  disabled={!meal.eaten}
                                  onChange={() => handleToggleIngredient(meal.id, ing.id)}
                                  className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20 w-4 h-4 disabled:opacity-50 flex-shrink-0"
                                />
                                <span className="font-semibold text-slate-100 text-xs truncate">
                                  {ing.name}
                                </span>
                              </label>

                              <div className="flex items-center gap-2 text-[11px] flex-shrink-0">
                                <span className="text-amber-400 font-semibold">{ing.calories} kcal</span>
                                
                                <div className="flex items-center gap-1 border-l border-slate-700/60 pl-1.5">
                                  <button
                                    onClick={() => handleOpenEditIngredient(meal.id, ing)}
                                    className="p-1 text-slate-400 hover:text-white rounded"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteIngredient(meal.id, ing.id)}
                                    className="p-1 text-slate-400 hover:text-rose-400 rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* --- WEIGHT LOG HISTORY TAB --- */}
        {activeTab === 'weight_logs' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 border border-slate-800 rounded-3xl shadow-lg">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  Weight Tracker History
                </h2>
                <p className="text-xs text-slate-400">Independent weight logs & trend charts</p>
              </div>

              <input 
                type="month"
                value={selectedWeightMonth}
                onChange={(e) => setSelectedWeightMonth(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 self-start sm:self-auto"
              />
            </div>

            {/* Monthly Weight Analytics Cards */}
            {(() => {
              const filteredWeightLogs = weightLogs.filter(log => log.date.startsWith(selectedWeightMonth))
                .sort((a, b) => new Date(a.date) - new Date(b.date));

              const logCount = filteredWeightLogs.length;
              const avgWeight = logCount > 0 
                ? (filteredWeightLogs.reduce((acc, l) => acc + l.weight, 0) / logCount).toFixed(1)
                : '-';
              
              const firstWeight = logCount > 0 ? filteredWeightLogs[0].weight : 0;
              const lastWeight = logCount > 0 ? filteredWeightLogs[logCount - 1].weight : 0;
              const monthlyGain = logCount > 0 ? (lastWeight - firstWeight).toFixed(1) : '0.0';

              return (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Average Weight</span>
                      <span className="text-xl font-black text-emerald-400">{avgWeight} kg</span>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Monthly Gain</span>
                      <span className="text-xl font-black text-amber-400">
                        {parseFloat(monthlyGain) >= 0 ? `+${monthlyGain}` : monthlyGain} kg
                      </span>
                    </div>
                  </div>

                  {/* VISUAL SVG WEIGHT PROGRESS GRAPH */}
                  <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-lg">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      Weight Curve ({selectedWeightMonth})
                    </h3>

                    {filteredWeightLogs.length >= 2 ? (
                      <div className="w-full h-40 relative pt-4 pb-2">
                        {(() => {
                          const minW = Math.min(...filteredWeightLogs.map(l => l.weight)) - 0.5;
                          const maxW = Math.max(...filteredWeightLogs.map(l => l.weight)) + 0.5;
                          const range = maxW - minW || 1;

                          const points = filteredWeightLogs.map((log, idx) => {
                            const x = (idx / (filteredWeightLogs.length - 1)) * 100;
                            const y = 100 - (((log.weight - minW) / range) * 100);
                            return { x, y, ...log };
                          });

                          const pathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');

                          return (
                            <div className="w-full h-full relative">
                              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <line x1="0" y1="25" x2="100" y2="25" stroke="#334155" strokeDasharray="2" strokeWidth="0.5" />
                                <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeDasharray="2" strokeWidth="0.5" />
                                <line x1="0" y1="75" x2="100" y2="75" stroke="#334155" strokeDasharray="2" strokeWidth="0.5" />
                                <path d={pathD} fill="none" stroke="#10b981" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                              </svg>

                              {points.map((p, idx) => (
                                <div
                                  key={p.id || idx}
                                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                                >
                                  <div className="w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full shadow-lg" />
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    ) : (
                      <div className="py-8 text-center text-slate-500 text-xs">
                        Requires at least 2 weight logs to show trend curve.
                      </div>
                    )}
                  </div>

                  {/* Weight Entries List */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-lg space-y-1">
                    <div className="p-3.5 bg-slate-800/40 border-b border-slate-800 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider">Entries ({selectedWeightMonth})</h3>
                      <button
                        onClick={() => setIsWeightModalOpen(true)}
                        className="text-xs text-emerald-400 font-bold"
                      >
                        + Add Entry
                      </button>
                    </div>

                    <div className="divide-y divide-slate-800/60">
                      {filteredWeightLogs.length > 0 ? (
                        filteredWeightLogs.slice().reverse().map((log) => (
                          <div key={log.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/30">
                            <div>
                              <span className="text-sm font-bold text-emerald-400 block">{log.weight} kg</span>
                              <span className="text-[10px] text-slate-400">{log.date} {log.notes && `• ${log.notes}`}</span>
                            </div>
                            <button 
                              onClick={() => handleDeleteWeightLog(log.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center text-slate-500 text-xs">No logs for this month.</div>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* --- NUTRITION LOG HISTORY TAB --- */}
        {activeTab === 'nutrition_logs' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-4 border border-slate-800 rounded-3xl shadow-lg">
              <div>
                <h2 className="text-base font-bold text-white">Nutrition Logs History</h2>
                <p className="text-xs text-slate-400">Daily calorie and macro logs</p>
              </div>

              <input 
                type="month"
                value={selectedNutritionMonth}
                onChange={(e) => setSelectedNutritionMonth(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 self-start sm:self-auto"
              />
            </div>

            {/* Monthly Nutrition Summary Cards */}
            {(() => {
              const filteredLogs = nutritionLogs.filter(log => log.date.startsWith(selectedNutritionMonth));
              const totalDays = filteredLogs.length;
              const avgCalories = totalDays > 0 ? Math.round(filteredLogs.reduce((acc, l) => acc + (l.calories || 0), 0) / totalDays) : 0;
              const avgProtein = totalDays > 0 ? Math.round(filteredLogs.reduce((acc, l) => acc + (l.protein || 0), 0) / totalDays) : 0;

              return (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Avg Daily Intake</span>
                      <span className="text-xl font-black text-amber-400">{avgCalories} kcal</span>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-2xl">
                      <span className="text-[11px] text-slate-400 block mb-0.5">Avg Protein</span>
                      <span className="text-xl font-black text-purple-400">{avgProtein} g</span>
                    </div>
                  </div>

                  {/* Nutrition Log List */}
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-lg divide-y divide-slate-800/60">
                    {filteredLogs.length > 0 ? (
                      filteredLogs.slice().reverse().map((log) => {
                        const isTargetMet = calculatedTargets.isProfileComplete && (log.calories || 0) >= calculatedTargets.targetCalories;
                        return (
                          <div key={log.id} className="p-3.5 flex items-center justify-between hover:bg-slate-800/30">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-200">{log.date}</span>
                                <span className={`px-2 py-0.5 text-[9px] rounded-md font-bold ${
                                  isTargetMet ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {isTargetMet ? 'Target Met' : 'Below Target'}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
                                <span className="text-amber-400">{log.calories || 0} kcal</span> • 
                                <span className="text-purple-400">{log.protein || 0}g P</span> • 
                                <span className="text-cyan-400">{log.carbs || 0}g C</span> • 
                                <span className="text-amber-300">{log.fat || 0}g F</span>
                              </div>
                            </div>

                            <button 
                              onClick={() => handleDeleteNutritionLog(log.id)}
                              className="text-slate-500 hover:text-rose-400 p-1.5 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-slate-500 text-xs">No records for {selectedNutritionMonth}.</div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* --- SURPLUS CALCULATOR TAB --- */}
        {activeTab === 'calculator' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-lg">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                Calorie & Macro Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Dynamic formula output based on metabolic metrics</p>
            </div>

            <div className="space-y-3">
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metabolic Breakdown</h3>
                
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-slate-300">Basal Metabolic Rate (BMR)</span>
                  <span className="font-bold text-white">{calculatedTargets.isProfileComplete ? calculatedTargets.bmr : 'Complete profile'} kcal</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-slate-300">Maintenance Intake (TDEE)</span>
                  <span className="font-bold text-white">{calculatedTargets.isProfileComplete ? calculatedTargets.maintenance : 'Complete profile'} kcal</span>
                </div>

                {calculatedTargets.breastfeedingAddon > 0 && (
                  <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-xs">
                    <span className="text-emerald-400 font-medium">Lactation Bonus</span>
                    <span className="font-bold text-emerald-400">+{calculatedTargets.breastfeedingAddon} kcal</span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-amber-400 font-medium">Weight Surplus Goal</span>
                  <span className="font-bold text-amber-400">+{profile.surplusGoal || '—'} kcal</span>
                </div>

                <div className="flex justify-between items-center p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                  <span className="text-xs font-bold text-emerald-400">Target Daily Intake</span>
                  <span className="font-black text-emerald-400 text-base">{calculatedTargets.isProfileComplete ? calculatedTargets.targetCalories : '—'} kcal</span>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl space-y-2.5">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommended Macros</h3>

                <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-400">Protein Target</span>
                  <span className="font-black text-white text-base">{calculatedTargets.isProfileComplete ? calculatedTargets.targetProtein : 'Complete profile'} g</span>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400">Carbohydrates Target</span>
                  <span className="font-black text-white text-base">{calculatedTargets.isProfileComplete ? calculatedTargets.targetCarbs : 'Complete profile'} g</span>
                </div>

                <div className="p-3 bg-slate-800/40 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300">Healthy Fats Target</span>
                  <span className="font-black text-white text-base">{calculatedTargets.isProfileComplete ? calculatedTargets.targetFat : 'Complete profile'} g</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- PROFILE & TARGETS TAB --- */}
        {activeTab === 'goals' && (
          <div className="space-y-5 animate-fadeIn">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-lg flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  Profile & Goals Settings
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Customize body parameters & surplus target</p>
              </div>

              {profileSavedFeedback && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-xl animate-fadeIn">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Saved!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="bg-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-lg space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Gender</label>
                  <select
                    value={tempProfile.gender || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, gender: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Breastfeeding</label>
                  <select
                    value={tempProfile.breastfeeding || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, breastfeeding: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select</option>
                    <option value="no">No</option>
                    <option value="yes">Yes (+500 kcal)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Start Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempProfile.startWeight ?? ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, startWeight: e.target.value === '' ? '' : parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Current Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempProfile.currentWeight ?? ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, currentWeight: e.target.value === '' ? '' : parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Target Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempProfile.targetWeight ?? ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, targetWeight: e.target.value === '' ? '' : parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Height (cm)</label>
                  <input
                    type="number"
                    value={tempProfile.height ?? ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, height: e.target.value === '' ? '' : parseInt(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Age (years)</label>
                  <input
                    type="number"
                    value={tempProfile.age ?? ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, age: e.target.value === '' ? '' : parseInt(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Activity Level</label>
                  <select
                    value={tempProfile.activityLevel || ''}
                    onChange={(e) => setTempProfile({ ...tempProfile, activityLevel: parseFloat(e.target.value) })}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Select activity level</option>
                    <option value={1.2}>Sedentary (1.2)</option>
                    <option value={1.375}>Light Active (1.375)</option>
                    <option value={1.55}>Moderate Active (1.55)</option>
                    <option value={1.725}>Very Active (1.725)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Daily Surplus Goal</label>
                <select
                  value={tempProfile.surplusGoal || ''}
                  onChange={(e) => setTempProfile({ ...tempProfile, surplusGoal: parseInt(e.target.value) })}
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
                >
                  <option value="">Select surplus goal</option>
                  <option value={300}>Mild Surplus (+300 kcal)</option>
                  <option value={500}>Standard Surplus (+500 kcal)</option>
                  <option value={750}>Aggressive Surplus (+750 kcal)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Save Profile Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="fixed bottom-0 inset-x-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 z-40 md:hidden px-2 py-2">
        <div className="max-w-md mx-auto flex justify-around items-center">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="text-[10px] tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* MODAL 1: RECORD MANUAL NUTRITION */}
      {isNutritionModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Log Cumulative Nutrition</h3>
              <button 
                onClick={() => setIsNutritionModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNutritionSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Date</label>
                <input
                  type="date"
                  value={nutritionForm.date}
                  onChange={(e) => setNutritionForm({ ...nutritionForm, date: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Calories (kcal)</label>
                  <input
                    type="number"
                    value={nutritionForm.calories}
                    onChange={(e) => setNutritionForm({ ...nutritionForm, calories: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-amber-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Protein (g)</label>
                  <input
                    type="number"
                    value={nutritionForm.protein}
                    onChange={(e) => setNutritionForm({ ...nutritionForm, protein: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-purple-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Carbs (g)</label>
                  <input
                    type="number"
                    value={nutritionForm.carbs}
                    onChange={(e) => setNutritionForm({ ...nutritionForm, carbs: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-cyan-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Fat (g)</label>
                  <input
                    type="number"
                    value={nutritionForm.fat}
                    onChange={(e) => setNutritionForm({ ...nutritionForm, fat: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-amber-300 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Notes</label>
                <textarea
                  value={nutritionForm.notes}
                  onChange={(e) => setNutritionForm({ ...nutritionForm, notes: e.target.value })}
                  rows="2"
                  placeholder="e.g. Completed intake targets"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNutritionModalOpen(false)}
                  className="flex-1 bg-slate-800 text-slate-300 font-semibold text-xs py-3 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RECORD MANUAL WEIGHT */}
      {isWeightModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Record Weight Entry</h3>
              <button 
                onClick={() => setIsWeightModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddWeightSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Date</label>
                <input
                  type="date"
                  value={weightForm.date}
                  onChange={(e) => setWeightForm({ ...weightForm, date: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weightForm.weight}
                  onChange={(e) => setWeightForm({ ...weightForm, weight: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-emerald-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  placeholder="61.5"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Notes</label>
                <textarea
                  value={weightForm.notes}
                  onChange={(e) => setWeightForm({ ...weightForm, notes: e.target.value })}
                  rows="2"
                  placeholder="e.g. Morning weighing"
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl p-3 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWeightModalOpen(false)}
                  className="flex-1 bg-slate-800 text-slate-300 font-semibold text-xs py-3 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD / EDIT INGREDIENT */}
      {editingIngredient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingIngredient.isNew ? 'Add Custom Ingredient' : 'Edit Ingredient'}
              </h3>
              <button 
                onClick={() => setEditingIngredient(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveIngredient} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-semibold">Ingredient Name</label>
                <input
                  type="text"
                  value={ingredientForm.name}
                  onChange={(e) => setIngredientForm({ ...ingredientForm, name: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Greek Yogurt"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Calories (kcal)</label>
                  <input
                    type="number"
                    value={ingredientForm.calories}
                    onChange={(e) => setIngredientForm({ ...ingredientForm, calories: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-amber-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Protein (g)</label>
                  <input
                    type="number"
                    value={ingredientForm.protein}
                    onChange={(e) => setIngredientForm({ ...ingredientForm, protein: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-purple-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Carbs (g)</label>
                  <input
                    type="number"
                    value={ingredientForm.carbs}
                    onChange={(e) => setIngredientForm({ ...ingredientForm, carbs: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-cyan-400 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Fat (g)</label>
                  <input
                    type="number"
                    value={ingredientForm.fat}
                    onChange={(e) => setIngredientForm({ ...ingredientForm, fat: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 text-amber-300 font-bold rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingIngredient(null)}
                  className="flex-1 bg-slate-800 text-slate-300 font-semibold text-xs py-3 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs py-3 rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}